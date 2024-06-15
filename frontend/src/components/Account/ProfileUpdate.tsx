import { Button, ButtonToolbar, Form, Loader } from 'rsuite'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from "../../hooks/useToast";
import { AuthType, AxiosErrorResponseType } from "../../utils/types";
import { useProfileQuery, useUpdateProfileMutation } from '../../hooks/data/profile';
import { MutateOptions } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

type SchemaType = {
  email: string;
  name: string;
  phone: number;
};

type ProfileMutateOptionsType = MutateOptions<AuthType, Error, SchemaType, unknown>;

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup.string().typeError("Name must contain characters only").required("Name is required"),
    email: yup.string().typeError("Email must contain characters only").email().required("Email is required"),
    phone: yup.number().typeError("Phone must contain numbers only").positive().required("Phone is required"),
  })
  .required();

export default function ProfileUpdate({display}: {display: boolean}) {
    const {data, isLoading: isProfileLoading, isFetching: isProfileFetching} = useProfileQuery(display);
    const {toastError} = useToast();
    const updateProfile = useUpdateProfileMutation()

    const {
        control,
        handleSubmit,
        getValues,
        setError,
        formState: { errors }
    } = useForm<SchemaType>({ 
        resolver: yupResolver(schema),
        values: {
            name: data ? data.name : "",
            email: data ? data.email : "",
            phone: data ? Number(data.phone) : 0,
        }
    });

    const onSubmit = handleSubmit(async () => {
        const profileMutateOptions:ProfileMutateOptionsType = {
            onError: (error:Error) => {
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
            }
        }
        await updateProfile.mutateAsync(getValues(), profileMutateOptions);
    });

    return (
        <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
            {(isProfileFetching || isProfileLoading) && <Loader backdrop content="loading..." vertical style={{ zIndex: 1000 }} />}
            <Form.Group>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Form.ControlLabel>Name</Form.ControlLabel>
                            <Form.Control name={field.name} type="text" value={field.value} onChange={field.onChange} />
                            <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                {errors[field.name]?.message}
                            </Form.ErrorMessage>
                        </>
                    )}
                />
            </Form.Group>
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
                <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button appearance="primary" size='lg' type="submit" loading={updateProfile.isPending} disabled={updateProfile.isPending}>Update</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}