import { Button, ButtonToolbar, Form, Loader } from 'rsuite'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api_routes } from "../../utils/api_routes";
import { useToast } from "../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../Drawer";
import { useEmployeeQuery } from '../../hooks/data/employee';
import { useRoleSelectQuery } from '../../hooks/data/role';
import { useAxios } from '../../hooks/useAxios';
import PasswordInput from '../FormInput/PasswordInput';
import TextInput from '../FormInput/TextInput';
import ToggleInput from '../FormInput/ToggleInput';
import SelectInput from '../FormInput/SelectInput';

type UpdateSchemaType = {
  name: string;
  email: string;
  phone: number;
  is_blocked: number;
  role: string;
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
    role: yup.string().typeError("Role must contain characters only").required("Role is required"),
    is_blocked: yup.number().typeError("Blocked must contain numbers only").min(0).max(1).required("Blocked is required"),
})
.required();

const createSchema: yup.ObjectSchema<CreateSchemaType> = updateSchema
.shape({
    password: yup.string().typeError("Password must contain characters only").required("Password is required"),
    password_confirmation: yup.string().typeError("Confirm Password must contain characters only").required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
})
.required();

export default function EmployeeForm({drawer, drawerHandler, refetch}:{drawer: DrawerProps; drawerHandler: (value:DrawerProps)=>void; refetch: ()=>void}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {data, isFetching, isLoading } = useEmployeeQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));
    const {data:roles, isFetching:isGraduationFetching, isLoading:isGraduationLoading } = useRoleSelectQuery(drawer.status);
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
            role: (data && data.role)? data.role : "",
            is_blocked: data? (data.is_blocked ? 1: 0) : 0
        } : {
            name: "",
            email: "",
            phone: 0,
            password: "",
            password_confirmation: "",
            role: "",
            is_blocked: 0
        }
     });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await axios.post(drawer.type === "Edit" ? api_routes.admin.employee.update(drawer.id) : api_routes.admin.employee.create, getValues());
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
            {(isFetching || isLoading) && <Loader backdrop content="loading..." vertical style={{ zIndex: 1000 }} />}
            <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                <TextInput name="name" label="Name" focus={true} control={control} error={errors.name?.message} />
                <TextInput name="email" label="Email" type='email' control={control} error={errors.email?.message} />
                <TextInput name="phone" label="Phone" control={control} error={errors.phone?.message} />
                <SelectInput name="role" label="Role" data={roles ? roles.map(item => ({ label: item.name, value: item.name })) : []} loading={isGraduationFetching || isGraduationLoading} control={control} error={errors.role?.message} />
                {
                    drawer.type==="Create" && <>
                        <PasswordInput name="password" label="Password" control={control} error={errors.password?.message} />
                        <PasswordInput name="password_confirmation" label="Confirm Password" control={control} error={errors.password_confirmation?.message} />
                    </>
                }
                <ToggleInput name="is_blocked" checkedLabel="Yes" uncheckedLabel="No" control={control} error={errors.is_blocked?.message} />
                <Form.Group>
                    <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Button appearance="primary" active size='lg' type="submit" loading={loading} disabled={loading}>Save</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </Drawer>
    )
}