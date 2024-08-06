import { Button, ButtonToolbar, Form } from 'rsuite'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from "../../hooks/useToast";
import { isAxiosError } from 'axios';
import { AxiosErrorResponseType } from '../../utils/types';
import { useAxios } from '../../hooks/useAxios';
import PasswordInput from '../FormInput/PasswordInput';
import { useUser } from '../../hooks/useUser';

type SchemaType = {
  old_password: string;
  password: string;
  confirm_password: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    old_password: yup.string().typeError("Old Password must contain characters only").required("Old Password is required"),
    password: yup.string().typeError("Password must contain characters only").required("Password is required"),
    confirm_password: yup.string().typeError("Confirm Password must contain characters only").required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

export default function PasswordUpdate() {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const axios = useAxios();
    const {passwordUpdateApiLink} = useUser();

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
            await axios.post(passwordUpdateApiLink, getValues());
            toastSuccess("Password Update Successful");
            reset({
                old_password: "",
                password: "",
                confirm_password: "",
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
        }
    });

    return (
        <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
            <PasswordInput name="old_password" label="Old Password" control={control} error={errors.old_password?.message} />
            <PasswordInput name="password" label="Password" control={control} error={errors.password?.message} />
            <PasswordInput name="confirm_password" label="Confirm Password" control={control} error={errors.confirm_password?.message} />
            <Form.Group>
                <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Update</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}