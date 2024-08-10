import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Form } from 'rsuite'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../utils/types";
import { useAxios } from "../../hooks/useAxios";
import CaptchaInput from "../FormInput/CaptchaInput";
import PasswordInput from "../FormInput/PasswordInput";
import TextInput from "../FormInput/TextInput";
import { page_routes } from "../../utils/routes/pages";
import { api_routes } from "../../utils/routes/api";

type Props = {
    login_link?: string;
    reset_password_api_link?:string;
    reset_password_resend_otp_api_link?:string;
    token: string;
    expires: string; 
    signature: string
};

type SchemaType = {
  otp: number;
  password: string;
  password_confirmation: string;
  captcha: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    otp: yup.number().typeError("OTP must contain numbers only").positive().required("OTP is required"),
    password: yup.string().typeError("Password must contain characters only").required("Password is required"),
    password_confirmation: yup.string().typeError("Confirm Password must contain characters only").required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
    captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
  })
  .required();

export default function ResetPassword({
    login_link = page_routes.student.auth.login,
    reset_password_api_link = api_routes.user.auth.reset_password.index,
    reset_password_resend_otp_api_link = api_routes.user.auth.reset_password.resend_otp,
    token,
    expires,
    signature
}: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [otpLoading, setOtpLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const navigate = useNavigate();
    const captchaRef = useRef<ReCAPTCHA>(null);
    const axios = useAxios();

    const {
        control,
        handleSubmit,
        getValues,
        setError,
        reset,
        formState: { errors }
    } = useForm<SchemaType>({
        resolver: yupResolver(schema) 
    });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await axios.post(reset_password_api_link + `/${token}?expires=${expires}&signature=${signature}`, getValues());
            toastSuccess("Password reset successfully. Please login with new password.");
            reset({
                password: "",
                password_confirmation: "",
                otp: 0,
                captcha: "",
            });
            navigate(login_link, {replace: true});
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

    const otpHandler = async () => {
        setOtpLoading(true);
        try {
            await axios.get(reset_password_resend_otp_api_link + `/${token}`);
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
        <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
            <TextInput name="otp" label="OTP" helpText="Please Enter the OTP sent to your email and mobile" focus={true} control={control} error={errors.otp?.message} />
            <PasswordInput name="password" label="Password" control={control} error={errors.password?.message} />
            <PasswordInput name="password_confirmation" label="Confirm Password" control={control} error={errors.password_confirmation?.message} />
            <CaptchaInput control={control} error={errors.captcha?.message} ref={captchaRef} />
            <Form.Group>
                <ButtonToolbar style={{ width: '100%' }}>
                    <Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Reset</Button>
                    <Button appearance="primary" color='orange' size='lg' type="button" loading={otpLoading} disabled={otpLoading} onClick={otpHandler}>Resend OTP</Button>
                    <Button appearance="primary" as={Link} to={login_link} color='red' size='lg' type="button">Go Back</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}