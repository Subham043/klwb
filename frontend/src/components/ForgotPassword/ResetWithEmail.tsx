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
import { getResetPasswordPath } from "../../utils/helper";
import CaptchaInput from "../FormInput/CaptchaInput";
import TextInput from "../FormInput/TextInput";

type SchemaType = {
  email: string;
  captcha: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    email: yup.string().typeError("Email must contain characters only").email().required("Email is required"),
    captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
  })
  .required();

export default function ResetWithEmail({title, login_link}:{title:string; login_link:string}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const navigate = useNavigate();
    const axios = useAxios();
    const captchaRef = useRef<ReCAPTCHA>(null);

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
            const response = await axios.post<{ token: string }>(api_routes.auth.forgot_password.email, getValues());
            toastSuccess("Please check your email or phone to reset your password.");
            reset({
                email: "",
                captcha: "",
            });
            navigate(getResetPasswordPath(title, response.data.token), {replace: true});
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
            <TextInput name="email" type="email" label="Email" focus={true} control={control} error={errors.email?.message} />
            <CaptchaInput control={control} error={errors.captcha?.message} ref={captchaRef} />
            <Form.Group>
                <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Reset</Button>
                    <Link to={login_link} style={{ marginLeft: '10px' }}><Button appearance="link" type='button'>Remember Your Password?</Button></Link>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}