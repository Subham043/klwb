import classes from './index.module.css'
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Divider, Form } from 'rsuite'
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from '../../../hooks/useToast';
import { isAxiosError } from 'axios';
import { AxiosErrorResponseType } from '../../../utils/types';
import IntroScreen from '../../../components/IntroScreen';
import DetailIcon from '@rsuite/icons/Detail';
import { useAxios } from '../../../hooks/useAxios';
import CaptchaInput from '../../../components/FormInput/CaptchaInput';
import PasswordInput from '../../../components/FormInput/PasswordInput';
import TextInput from '../../../components/FormInput/TextInput';
import { api_routes } from '../../../utils/routes/api';
import { page_routes } from '../../../utils/routes/pages';

type SchemaType = {
  email: string;
  name: string;
  phone: number;
  password: string;
  confirm_password: string;
  captcha: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup.string().typeError("Name must contain characters only").required("Name is required"),
    email: yup.string().typeError("Email must contain characters only").email().required("Email is required"),
    phone: yup.number().typeError("Phone must contain numbers only").positive().required("Phone is required"),
    password: yup.string().typeError("Password must contain characters only").required("Password is required"),
    confirm_password: yup.string().typeError("Confirm Password must contain characters only").required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
    captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
  })
  .required();

function StudentRegisterPage() {

    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const captchaRef = useRef<ReCAPTCHA>(null);
    const axios = useAxios();

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
            await axios.post(api_routes.user.auth.register.student, getValues());
            toastSuccess("Registration Successful");
            reset({
                name: "",
                email: "",
                phone: undefined,
                password: "",
                confirm_password: "",
                captcha: "",
            });
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
    <div className="row justify-center">
        <div className={classes.info_col}>
            <IntroScreen>
                <p><b>If You Already Have an Account? <Link to={page_routes.student.auth.login}>Login</Link></b></p>
                <p>For Student Registration Manual Kindly</p>
                <p><b><Link to='/'><DetailIcon style={{fontSize:'1.6rem'}} /></Link></b></p>
                <p>ವಿದ್ಯಾರ್ಥಿ ನೋಂದಣಿಯ ಮಾಹಿತಿಗಾಗಿ</p>
                <p><b><Link to='/'><DetailIcon style={{fontSize:'1.6rem'}} /></Link></b></p>
            </IntroScreen>
            <Divider>Note</Divider>
            <p><b>Students applying for Scholarship must look for two points</b></p>
            <ol>
                <li>Education Institution where student studying must register before students apply.</li>
                <li>Industry where student's parents (Father / Mother) work must be registered before students apply.</li>
                <li>After the registration of both (Educational Institution and Industry) then only students will be able to REGISTER AND apply for Scholarship.</li>
            </ol>
        </div>
        <div className={classes.form_col}>
            <div className={classes.formContainer}>
                <div className={classes.formTitle}>
                Student Registration
                </div>
                <div className={classes.formFields}>
                <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                    <TextInput name="name" label="Name" focus={true} control={control} error={errors.name?.message} />
                    <TextInput name="email" type='email' label="Email" control={control} error={errors.email?.message} />
                    <TextInput name="phone" label="Phone" control={control} error={errors.phone?.message} />
                    <PasswordInput name="password" label="Password" control={control} error={errors.password?.message} />
                    <PasswordInput name="confirm_password" label="Confirm Password" control={control} error={errors.confirm_password?.message} />
                    <CaptchaInput control={control} error={errors.captcha?.message} ref={captchaRef} />
                    <Form.Group>
                        <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                            <Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Register</Button>
                            <Link to={page_routes.student.auth.login} style={{ marginLeft: '10px' }}><Button appearance="link" type='button'>Already have an account?</Button></Link>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudentRegisterPage
