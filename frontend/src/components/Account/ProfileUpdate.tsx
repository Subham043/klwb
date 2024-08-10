import { Button, ButtonToolbar, Form } from 'rsuite'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from "../../hooks/useToast";
import { AuthType, AxiosErrorResponseType } from "../../utils/types";
import { useProfileQuery, useUpdateProfileMutation } from '../../hooks/data/profile';
import { MutateOptions } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import TextInput from '../FormInput/TextInput';
import ErrorBoundaryLayout from '../../layouts/ErrorBoundaryLayout';

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
    const {data, isLoading: isProfileLoading, isFetching: isProfileFetching, isRefetching, refetch, error} = useProfileQuery(display);
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
        <ErrorBoundaryLayout loading={(isProfileFetching || isProfileLoading || isRefetching)} error={error} refetch={refetch}>
            <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                <TextInput name="name" label="Name" focus={true} control={control} error={errors.name?.message} />
                <TextInput type="email" name="email" label="Email" helpText='Changing email will lead to re-verification process of your account' control={control} error={errors.email?.message} />
                <TextInput name="phone" label="Phone" helpText='Changing phone will lead to re-verification process of your account' control={control} error={errors.phone?.message} />
                <Form.Group>
                    <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Button appearance="primary" size='lg' type="submit" loading={updateProfile.isPending} disabled={updateProfile.isPending}>Update</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </ErrorBoundaryLayout>
    )
}