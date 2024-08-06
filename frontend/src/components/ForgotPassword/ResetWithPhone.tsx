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
import CaptchaInput from "../FormInput/CaptchaInput";
import TextInput from "../FormInput/TextInput";
import { page_routes } from "../../utils/page_routes";

type Props = {
    login_link: string;
    reset_password_redirect?:string;
    forgot_password_phone_api_link?:string;
};

type SchemaType = {
  phone: number;
  captcha: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    phone: yup.number().typeError("Phone must contain numbers only").positive().required("Phone is required"),
    captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
  })
  .required();

export default function ResetWithPhone({login_link, reset_password_redirect=page_routes.auth.student.reset_password, forgot_password_phone_api_link=api_routes.user.auth.forgot_password.phone}: Props) {
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
        defaultValues: { phone: undefined },
        resolver: yupResolver(schema) 
    });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            const response = await axios.post<{ param: string }>(forgot_password_phone_api_link, getValues());
            toastSuccess("This page is valid for next 5 minutes. Please check your email or phone to reset your password.");
            reset({
                phone: undefined,
                captcha: "",
            });
            navigate(reset_password_redirect.replace(":token", response.data.param), {replace: true});
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