import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, Form } from 'rsuite'
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

export default function ResetWithEmail() {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const navigate = useNavigate();
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
            const response = await api.post<{ token: string }>(api_routes.auth.forgot_password.email, getValues());
            toastSuccess("Please check your email or phone to reset your password.");
            reset({
                email: "",
                captcha: "",
            });
            navigate(page_routes.auth.reset_password.replace(":token", response.data.token), {replace: true});
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
                <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Reset</Button>
                    <Link to={page_routes.auth.login} style={{ marginLeft: '10px' }}><Button appearance="link" type='button'>Remember Your Password?</Button></Link>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}