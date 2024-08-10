import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Container, Content, Divider, Form } from 'rsuite';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import classes from './index.module.css'
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from '../../hooks/useToast';
import { isAxiosError } from 'axios';
import { AuthType, AxiosErrorResponseType } from '../../utils/types';
import { useUser } from '../../hooks/useUser';
import { useAccountModal } from '../../hooks/useAccountModal';
import IntroScreen from '../../components/IntroScreen';
import { useAxios } from '../../hooks/useAxios';
import CaptchaInput from '../../components/FormInput/CaptchaInput';
import TextInput from '../../components/FormInput/TextInput';
import { api_routes } from '../../utils/routes/api';
import { getLoginPath } from '../../utils/helpers/getLoginPath';
import { RolesEnum } from '../../utils/constants/role';

type AccountVerifyProps = {
    profile_verify_api_link?: string;
    logout_api_link?: string;
    resend_otp_api_link?: string;
}
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

const AccountVerify:FC<AccountVerifyProps> = ({profile_verify_api_link = api_routes.user.account.profile_verify, logout_api_link = api_routes.user.auth.logout, resend_otp_api_link = api_routes.user.account.resend_otp}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
    const [otpLoading, setOtpLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {user, removeUser, setUser} = useUser();
    const captchaRef = useRef<ReCAPTCHA>(null);
    const navigate = useNavigate();
    const {toggleAccountModal} = useAccountModal();
    const axios = useAxios();

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
            const response = await axios.post<{ profile: AuthType }>(profile_verify_api_link, getValues());
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
            await axios.get(logout_api_link);
            removeUser();
            toastSuccess("Logged Out Successful");
            navigate(getLoginPath(((user && user.role) ? user.role : RolesEnum.STUDENT)), {replace: true});
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
            await axios.get(resend_otp_api_link);
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
            <Header />
            <Content className={classes.content}>
                <div className="container grid-center">
                    <div className="row justify-center">
                        <div className={classes.info_col}>
                            <IntroScreen />
                            <Divider>Note</Divider>
                            <p><b>OTP will be shared with your registered mobile number and email</b></p>
                        </div>
                        <div className={classes.form_col}>
                            <div className={classes.formContainer}>
                                <div className={classes.formTitle}>
                                    Account Verification
                                </div>
                                <div className={classes.formFields}>
                                    <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                                        <TextInput name="otp" label="OTP" helpText='Please Enter the OTP sent to your mobile number and email' focus={true} control={control} error={errors.otp?.message} />
                                        <CaptchaInput control={control} error={errors.captcha?.message} ref={captchaRef} />
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
