import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Container, Content, Divider, Form } from 'rsuite';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import classes from './index.module.css'
import logo from '../../assets/images/logo.png'
import ReCAPTCHA from "react-google-recaptcha";
import { page_routes } from '../../utils/page_routes';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from '../../hooks/useToast';
import api from '../../utils/axios';
import { api_routes } from '../../utils/api_routes';
import { isAxiosError } from 'axios';
import { AuthType, AxiosErrorResponseType } from '../../utils/types';
import { useUser } from '../../hooks/useUser';
import { useAccountModal } from '../../hooks/useAccountModal';

type SchemaType = {
  otp: number;
  captcha: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    otp: yup.number().typeError("OTP must contain numbers only").positive().required("OTP is required"),
    captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
  })
  .required();

const AccountVerify:FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
    const [otpLoading, setOtpLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {removeUser, setUser} = useUser();
    const captchaRef = useRef<ReCAPTCHA>(null);
    const navigate = useNavigate();
    const {toggleAccountModal} = useAccountModal();

    useEffect(() => {
        toggleAccountModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const {
        control,
        handleSubmit,
        reset,
        getValues,
        setError,
        formState: { errors }
    } = useForm<SchemaType>({ resolver: yupResolver(schema) });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            const response = await api.post<{ profile: AuthType }>(api_routes.account.profile_verify, getValues());
            toastSuccess("Verification Successful");
            reset({
                otp: undefined,
                captcha: "",
            });
            setUser(response.data.profile);
        } catch (error) {
            if(isAxiosError<AxiosErrorResponseType>(error)){
                if(error?.response?.data?.errors){
                    for (const [key, value] of Object.entries(error?.response?.data?.errors)) {
                        setError(key as keyof SchemaType, {
                            type: "server",
                            message: value[0],
                        });
                    }
                }else if(error?.response?.data?.message){
                    toastError(error.response.data.message);
                }
            }
        }finally {
            setLoading(false);
            captchaRef.current?.reset();
        }
    });

    const logoutHandler = async () => {
        setLogoutLoading(true);
        try {
            await api.get(api_routes.auth.logout);
            removeUser();
            toastSuccess("Logged Out Successful");
            navigate(page_routes.auth.login, {replace: true});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.response?.data?.message) {
                toastError(error?.response?.data?.message);
            }
        }finally {
            setLogoutLoading(false);
        }
    };

    const otpHandler = async () => {
        setOtpLoading(true);
        try {
            await api.get(api_routes.account.resend_otp);
            toastSuccess("OTP Sent Successfully");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.response?.data?.message) {
                toastError(error?.response?.data?.message);
            }
        }finally {
            setOtpLoading(false);
        }
    };

    return (
        <Container>
            <Header>
                <></>
            </Header>
            <Content className={classes.content}>
                <div className="container grid-center">
                    <div className="row justify-center">
                        <div className={classes.info_col}>
                            <div className="text-center">
                                <img src={logo} alt="" className={classes.logo} />
                                <h2>Welcome To</h2>
                                <h1>Karnataka Labour Welfare Board</h1>
                            </div>
                            <Divider>Note</Divider>
                            <p><b>OTP will be shared with your registered mobile number and email</b></p>
                        </div>
                        <div className={classes.form_col}>
                            <div className={classes.formContainer}>
                                <div className={classes.formTitle}>
                                    Student Account Verification
                                </div>
                                <div className={classes.formFields}>
                                    <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                                        <Form.Group>
                                            <Controller
                                                name="otp"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <Form.ControlLabel>OTP</Form.ControlLabel>
                                                        <Form.Control name={field.name} type="text" value={field.value} onChange={field.onChange} />
                                                        <Form.HelpText><i>Please Enter the OTP sent to your mobile number and email</i></Form.HelpText>
                                                        <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                                            {errors[field.name]?.message}
                                                        </Form.ErrorMessage>
                                                    </>
                                                )}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Controller
                                                name="captcha"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <ReCAPTCHA
                                                            sitekey={import.meta.env.VITE_USER_GOOGLE_CAPTCHA_SITE_KEY}
                                                            onChange={field.onChange}
                                                            ref={captchaRef}
                                                        />
                                                        <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                                            {errors[field.name]?.message}
                                                        </Form.ErrorMessage>
                                                    </>
                                                )}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <ButtonToolbar style={{ width: '100%' }}>
                                                <Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Verify</Button>
                                                <Button appearance="primary" color='orange' size='lg' type="button" loading={otpLoading} disabled={otpLoading} onClick={otpHandler}>Resend OTP</Button>
                                                <Button appearance="primary" color='red' size='lg' type="button" loading={logoutLoading} disabled={logoutLoading} onClick={logoutHandler}>Logout</Button>
                                            </ButtonToolbar>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
            <Footer />
        </Container>
    )
}

export default AccountVerify
