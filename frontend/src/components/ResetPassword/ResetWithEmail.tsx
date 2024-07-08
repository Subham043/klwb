import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Form } from 'rsuite'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { api_routes } from "../../utils/api_routes";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../utils/types";
import { useAxios } from "../../hooks/useAxios";
import { getLoginPath } from "../../utils/helper";
import CaptchaInput from "../FormInput/CaptchaInput";
import PasswordInput from "../FormInput/PasswordInput";
import TextInput from "../FormInput/TextInput";

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
    const [loading, setLoading] = useState<boolean>(false);
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
        defaultValues: { email: '' },
        resolver: yupResolver(schema) 
    });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await axios.post(api_routes.auth.reset_password.email + `/${props.token}`, getValues());
            toastSuccess("Password reset successfully. Please login with new password.");
            reset({
                email: "",
                password: "",
                password_confirmation: "",
                otp: 0,
                captcha: "",
            });
            navigate(getLoginPath(props.type), {replace: true});
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
            <TextInput name="email" label="Email" helpText="Enter your registered email" focus={true} control={control} error={errors.email?.message} />
            <TextInput name="otp" label="OTP" helpText="Please Enter the OTP sent to your email and mobile" focus={true} control={control} error={errors.otp?.message} />
            <PasswordInput name="password" label="Password" control={control} error={errors.password?.message} />
            <PasswordInput name="password_confirmation" label="Confirm Password" control={control} error={errors.password_confirmation?.message} />
            <CaptchaInput control={control} error={errors.captcha?.message} ref={captchaRef} />
            <Form.Group>
                <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Reset</Button>
                    <Link to={getLoginPath(props.type)} style={{ marginLeft: '10px' }}><Button appearance="link" type='button'>Remember Your Password?</Button></Link>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}