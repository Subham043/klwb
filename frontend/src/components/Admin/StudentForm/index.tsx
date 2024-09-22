import { Button, ButtonToolbar, Form } from 'rsuite'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from "../../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../../Drawer";
import { useStudentQuery } from '../../../hooks/data/student';
import { useAxios } from '../../../hooks/useAxios';
import PasswordInput from '../../FormInput/PasswordInput';
import TextInput from '../../FormInput/TextInput';
import { api_routes } from '../../../utils/routes/api';
import ErrorBoundaryLayout from '../../../layouts/ErrorBoundaryLayout';

type UpdateSchemaType = {
  name: string;
  email: string;
  phone: number;
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
})
.required();

const createSchema: yup.ObjectSchema<CreateSchemaType> = updateSchema
.shape({
    password: yup.string().typeError("Password must contain characters only").required("Password is required"),
    password_confirmation: yup.string().typeError("Confirm Password must contain characters only").required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
})
.required();

export default function StudentForm({drawer, drawerHandler, refetch}:{drawer: DrawerProps; drawerHandler: (value:DrawerProps)=>void; refetch: ()=>void}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {data, isFetching, isLoading, isRefetching, error, refetch:refetchData } = useStudentQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));
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
        } : {
            name: "",
            email: "",
            phone: 0,
            password: "",
            password_confirmation: "",
        }
     });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            const {...rest} = getValues();
            await axios.post(drawer.type === "Edit" ? api_routes.admin.student.update(drawer.id) : api_routes.admin.student.create, {...rest});
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
        <Drawer title="Student" drawer={drawer} drawerHandler={drawerHandler}>
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