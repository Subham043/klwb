import { Button, ButtonToolbar, Form } from 'rsuite'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isAxiosError } from "axios";
import { AxiosErrorResponseType, DrawerProps } from '../../../utils/types';
import { useToast } from '../../../hooks/useToast';
import { useIndustryEmployeeQuery } from '../../../hooks/data/industry_employee';
import { useAxios } from '../../../hooks/useAxios';
import { api_routes } from '../../../utils/routes/api';
import Drawer from '../../Drawer';
import ErrorBoundaryLayout from '../../../layouts/ErrorBoundaryLayout';
import TextInput from '../../FormInput/TextInput';
import PasswordInput from '../../FormInput/PasswordInput';
import ToggleInput from '../../FormInput/ToggleInput';

type UpdateSchemaType = {
  name: string;
  email: string;
  phone: number;
  is_blocked: number;
};

type CreateSchemaType = UpdateSchemaType & {
  password: string;
  password_confirmation: string;
};


const updateSchema: yup.ObjectSchema<UpdateSchemaType> = yup
.object({
    name: yup.string().typeError("Name must contain characters only").required("Name is required"),
    email: yup.string().typeError("Email must contain characters only").email().required("Email is required"),
    phone: yup.number().typeError("Phone must contain numbers only").positive().required("Phone is required"),
    is_blocked: yup.number().typeError("Blocked must contain numbers only").min(0).max(1).required("Blocked is required"),
})
.required();

const createSchema: yup.ObjectSchema<CreateSchemaType> = updateSchema
.shape({
    password: yup.string().typeError("Password must contain characters only").required("Password is required"),
    password_confirmation: yup.string().typeError("Confirm Password must contain characters only").required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
})
.required();

export default function IndustryEmployeeForm({drawer, drawerHandler, refetch}:{drawer: DrawerProps; drawerHandler: (value:DrawerProps)=>void; refetch: ()=>void}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {data, isFetching, isLoading, isRefetching, error, refetch:refetchData } = useIndustryEmployeeQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));
    const axios = useAxios();

    const {
        control,
        handleSubmit,
        getValues,
        reset,
        setError,
        formState: { errors }
    } = useForm({ 
        resolver: yupResolver(drawer.type==="Edit" ? updateSchema : createSchema),
        values: drawer.type==="Edit" ? {
            name: data? data.name : "",
            email: data? data.email : "",
            phone: data? Number(data.phone) : 0,
            is_blocked: data? (!data.is_blocked ? 1: 0) : 0
        } : {
            name: "",
            email: "",
            phone: 0,
            password: "",
            password_confirmation: "",
            is_blocked: 1
        }
     });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            const {is_blocked, ...rest} = getValues();
            await axios.post(drawer.type === "Edit" ? api_routes.industry.employee.update(drawer.id) : api_routes.industry.employee.create, {...rest, is_blocked: is_blocked===1 ? 0: 1});
            toastSuccess("Saved Successfully");
            if(drawer.type==="Create"){
                reset({
                    name: "",
                });
            }
            drawerHandler({status:false, type:'Create'});
            refetch();
        } catch (error) {
            if(isAxiosError<AxiosErrorResponseType>(error)){
                if(error?.response?.data?.errors){
                    for (const [key, value] of Object.entries(error?.response?.data?.errors)) {
                        setError(key as (keyof UpdateSchemaType | keyof CreateSchemaType), {
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
        <Drawer title="Employee" drawer={drawer} drawerHandler={drawerHandler}>
            <ErrorBoundaryLayout loading={(isFetching || isLoading || isRefetching)} error={error} refetch={refetchData}>
                <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                    <TextInput name="name" label="Name" focus={true} control={control} error={errors.name?.message} />
                    <TextInput name="email" label="Email" type='email' control={control} error={errors.email?.message} />
                    <TextInput name="phone" label="Phone" control={control} error={errors.phone?.message} />
                    {
                        drawer.type==="Create" && <>
                            <PasswordInput name="password" label="Password" control={control} error={errors.password?.message} />
                            <PasswordInput name="password_confirmation" label="Confirm Password" control={control} error={errors.password_confirmation?.message} />
                        </>
                    }
                    <ToggleInput name="is_blocked" checkedLabel="Active" uncheckedLabel="Blocked" control={control} error={errors.is_blocked?.message} />
                    <Form.Group>
                        <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                            <Button appearance="primary" active size='lg' type="submit" loading={loading} disabled={loading}>Save</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </ErrorBoundaryLayout>
        </Drawer>
    )
}