import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Form, Input, InputGroup } from 'rsuite'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { page_routes } from "../../utils/page_routes";
import { useRef, useState } from "react";
import { useToast } from "../../hooks/useToast";
import api from "../../utils/axios";
import { api_routes } from "../../utils/api_routes";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../utils/types";
import VisibleIcon from '@rsuite/icons/Visible';
import UnvisibleIcon from '@rsuite/icons/Unvisible';

type SchemaType = {
    otp: number;
  email: string;
  password: string;
  password_confirmation: string;
  captcha: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
     otp: yup.number().typeError("OTP must contain numbers only").positive().required("OTP is required"),
    email: yup.string().typeError("Email must contain characters only").email().required("Email is required"),
    password: yup.string().typeError("Password must contain characters only").required("Password is required"),
    password_confirmation: yup.string().typeError("Confirm Password must contain characters only").required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
    captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
  })
  .required();

export default function ResetWithEmail(props: {token: string; type: string}) {
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const navigate = useNavigate();
    const captchaRef = useRef<ReCAPTCHA>(null);

    const handleChange = () => {
        setVisible(!visible);
    };

    const {
        control,
        handleSubmit,
        getValues,
        setError,
        reset,
        formState: { errors }
    } = useForm<SchemaType>({ 
        defaultValues: { email: '' },
        resolver: yupResolver(schema) 
    });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await api.post(api_routes.auth.reset_password.email + `/${props.token}`, getValues());
            toastSuccess("Password reset successfully. Please login with new password.");
            reset({
                email: "",
                password: "",
                password_confirmation: "",
                otp: 0,
                captcha: "",
            });
            switch (props.type.toLowerCase()) {
                case 'student':
                    navigate(page_routes.auth.student.login, {replace: true});
                    break;
                case 'institute':
                    navigate(page_routes.auth.institute.login, {replace: true});
                    break;
                case 'industry':
                    navigate(page_routes.auth.industry.login, {replace: true});
                    break;
                case 'contribution':
                    navigate(page_routes.auth.contribution.login, {replace: true});
                    break;
                case 'govt':
                    navigate(page_routes.auth.govt.login, {replace: true});
                    break;
                case 'admin':
                    navigate(page_routes.auth.admin.login, {replace: true});
                    break;
                default:
                    navigate(page_routes.auth.student.login, {replace: true});
                    break;
            }
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

    return (
        <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
            <Form.Group>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Form.ControlLabel>Email</Form.ControlLabel>
                            <Form.Control name={field.name} type="email" value={field.value} onChange={field.onChange} />
                            <Form.HelpText><i>Please Enter your registered email</i></Form.HelpText>
                            <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                {errors[field.name]?.message}
                            </Form.ErrorMessage>
                        </>
                    )}
                />
            </Form.Group>
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
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Form.ControlLabel>Password</Form.ControlLabel>
                            <InputGroup inside>
                                <Input type={visible ? 'text' : 'password'} name={field.name} value={field.value} onChange={field.onChange} />
                                <InputGroup.Button onClick={handleChange}>
                                    {visible ? <UnvisibleIcon /> : <VisibleIcon />}
                                </InputGroup.Button>
                            </InputGroup>
                            <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                {errors[field.name]?.message}
                            </Form.ErrorMessage>
                        </div>
                    )}
                />
            </Form.Group>
            <Form.Group>
                <Controller
                    name="password_confirmation"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Form.ControlLabel>Confirm Password</Form.ControlLabel>
                            <InputGroup inside>
                                <Input type={visible ? 'text' : 'password'} name={field.name} value={field.value} onChange={field.onChange} />
                                <InputGroup.Button onClick={handleChange}>
                                    {visible ? <UnvisibleIcon /> : <VisibleIcon />}
                                </InputGroup.Button>
                            </InputGroup>
                            <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                {errors[field.name]?.message}
                            </Form.ErrorMessage>
                        </div>
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
                    <Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Reset</Button>
                    <Button appearance="primary" color='orange' size='lg' type="button" loading={loading} disabled={loading}>Resend OTP</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}