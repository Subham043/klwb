import ReCAPTCHA from "react-google-recaptcha";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Form } from 'rsuite'
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { page_routes } from "../../utils/page_routes";
import { api_routes } from "../../utils/api_routes";
import { useToast } from "../../hooks/useToast";
import { AuthType, AxiosErrorResponseType } from "../../utils/types";
import { useUser } from "../../hooks/useUser";
import { isAxiosError } from "axios";
import { useAxios } from "../../hooks/useAxios";
import CaptchaInput from "../FormInput/CaptchaInput";
import PasswordInput from "../FormInput/PasswordInput";
import TextInput from "../FormInput/TextInput";

type SchemaType = {
  email: string;
  password: string;
  captcha: string;
};


const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    email: yup.string().typeError("Email must contain characters only").email().required("Email is required"),
    password: yup.string().typeError("Password must contain characters only").required("Password is required"),
    captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
  })
  .required();

export default function LoginWithEmail({forgot_password_link}: {forgot_password_link:string}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {setUser} = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || page_routes.dashboard;
    const captchaRef = useRef<ReCAPTCHA>(null);
    const axios = useAxios();

    const {
        control,
        handleSubmit,
        getValues,
        reset,
        setError,
        formState: { errors }
    } = useForm<SchemaType>({ resolver: yupResolver(schema) });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            const response = await axios.post<{user:AuthType}>(api_routes.auth.login.email, getValues());
            setUser(response.data.user);
            toastSuccess("Login Successful");
            reset({
                email: "",
                password: "",
                captcha: "",
            });
            navigate(from, {replace: true});
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
            <TextInput type="email" name="email" label="Email" focus={true} control={control} error={errors.email?.message} />
            <PasswordInput name="password" label="Password" control={control} error={errors.password?.message} />
            <CaptchaInput control={control} error={errors.captcha?.message} ref={captchaRef} />
            <Form.Group>
                <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Login</Button>
                    <Link to={forgot_password_link} style={{ marginLeft: '10px' }}><Button appearance="link" type='button'>Forgot Password?</Button></Link>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}