import ReCAPTCHA from "react-google-recaptcha";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Form } from 'rsuite'
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from "../../hooks/useToast";
import { useUser } from "../../hooks/useUser";
import { AuthType, AxiosErrorResponseType } from "../../utils/types";
import { isAxiosError } from "axios";
import { useAxios } from "../../hooks/useAxios";
import CaptchaInput from "../FormInput/CaptchaInput";
import PasswordInput from "../FormInput/PasswordInput";
import TextInput from "../FormInput/TextInput";
import { api_routes } from "../../utils/routes/api";
import { page_routes } from "../../utils/routes/pages";

type Props = {
    forgot_password_link: string;
    login_phone_api_link?: string;
    authenticated_redirect_link?: string;
};

type SchemaType = {
  phone: number;
  password: string;
  captcha: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    phone: yup.number().typeError("Phone must contain numbers only").positive().required("Phone is required"),
    password: yup.string().typeError("Password must contain characters only").required("Password is required"),
    captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
  })
  .required();

export default function LoginWithPhone({forgot_password_link, login_phone_api_link=api_routes.user.auth.login.phone, authenticated_redirect_link=page_routes.student.dashboard}: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {setUser} = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || authenticated_redirect_link;
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
            const response = await axios.post<{user:AuthType}>(login_phone_api_link, getValues());
            setUser(response.data.user);
            toastSuccess("Login Successful");
            reset({
                phone: undefined,
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
            <TextInput name="phone" label="Phone" focus={true} control={control} error={errors.phone?.message} />
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