import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Form } from 'rsuite'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { page_routes } from "../../utils/page_routes";

const schema = yup
  .object({
    phone: yup.number().typeError("Phone must contain numbers only").positive().required("Phone is required"),
  })
  .required();

export default function ResetWithPhone() {

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ 
        defaultValues: { phone: undefined },
        resolver: yupResolver(schema) 
    });

    const onSubmit = handleSubmit(async () => alert(JSON.stringify('submitted', null, 2)));

    return (
        <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
            <Form.Group>
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Form.ControlLabel>Phone</Form.ControlLabel>
                            <Form.Control name={field.name} type="text" value={field.value} onChange={field.onChange} />
                            <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                {errors[field.name]?.message}
                            </Form.ErrorMessage>
                        </>
                    )}
                />
            </Form.Group>
            <Form.Group>
                <ReCAPTCHA
                    sitekey={import.meta.env.VITE_USER_GOOGLE_CAPTCHA_SITE_KEY}
                />
            </Form.Group>
            <Form.Group>
                <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button appearance="primary" size='lg' type="submit">Reset</Button>
                    <Link to={page_routes.auth.login} style={{ marginLeft: '10px' }}><Button appearance="link" type='button'>Remember Your Password?</Button></Link>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}