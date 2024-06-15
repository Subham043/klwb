import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Form, Input, InputGroup } from 'rsuite'
import { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { page_routes } from "../../utils/page_routes";
import VisibleIcon from '@rsuite/icons/Visible';
import UnvisibleIcon from '@rsuite/icons/Unvisible';
import api from "../../utils/axios";
import { api_routes } from "../../utils/api_routes";
import { useToast } from "../../hooks/useToast";

const schema = yup
  .object({
    email: yup.string().typeError("Email must contain characters only").email().required("Email is required"),
    password: yup.string().typeError("Password must contain characters only").required("Password is required"),
    captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
  })
  .required();

export default function LoginWithEmail() {
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const captchaRef = useRef<ReCAPTCHA>(null);

    const handleChange = () => {
        setVisible(!visible);
    };

    const {
        control,
        handleSubmit,
        getValues,
        reset,
        setError,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await api.post(api_routes.auth.login.email, getValues());
            toastSuccess("Login Successful");
            reset({
                email: "",
                password: "",
                captcha: "",
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.response?.data?.message) {
                toastError(error?.response?.data?.message);
            }
            if (error?.response?.data?.errors?.email) {
                setError("email", {
                type: "server",
                message: error?.response?.data?.errors?.email[0],
                });
            }
            if (error?.response?.data?.errors?.password) {
                setError("password", {
                type: "server",
                message: error?.response?.data?.errors?.password[0],
                });
            }
            if (error?.response?.data?.errors?.captcha) {
                setError("captcha", {
                type: "server",
                message: error?.response?.data?.errors?.captcha[0],
                });
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
                    <Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Login</Button>
                    <Link to={page_routes.auth.forgot_password} style={{ marginLeft: '10px' }}><Button appearance="link" type='button'>Forgot Password?</Button></Link>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}