import { Button, ButtonToolbar, Form, Input, InputGroup, Loader, SelectPicker, Toggle } from 'rsuite'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from "../../utils/axios";
import { api_routes } from "../../utils/api_routes";
import { useToast } from "../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../Drawer";
import { useEmployeeQuery } from '../../hooks/data/employee';
import { useRoleSelectQuery } from '../../hooks/data/role';
import VisibleIcon from '@rsuite/icons/Visible';
import UnvisibleIcon from '@rsuite/icons/Unvisible';

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
    const [visible, setVisible] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {data, isFetching, isLoading } = useEmployeeQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));
    const {data:roles, isFetching:isGraduationFetching, isLoading:isGraduationLoading } = useRoleSelectQuery(drawer.status);

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
            await api.post(drawer.type === "Edit" ? api_routes.admin.employee.update(drawer.id) : api_routes.admin.employee.create, getValues());
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
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Form.ControlLabel>Role</Form.ControlLabel>
                                <SelectPicker data={roles ? roles.map(item => ({ label: item.name, value: item.name })) : []} name={field.name} value={field.value} onChange={field.onChange} loading={isGraduationFetching || isGraduationLoading} className='w-100' />
                                <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                    {errors[field.name]?.message}
                                </Form.ErrorMessage>
                            </>
                        )}
                    />
                </Form.Group>
                {
                    drawer.type==="Create" && <>
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
                                name="password_confirmation"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <Form.ControlLabel>Confirm Password</Form.ControlLabel>
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
                    </>
                }
                <Form.Group>
                    <Controller
                        name="is_blocked"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Form.ControlLabel>Block</Form.ControlLabel>
                                <Toggle size="lg" checkedChildren="Yes" unCheckedChildren="No" checked={field.value === 1} onChange={(checked) => field.onChange(checked ? 1 : 0)} />
                                <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                    {errors[field.name]?.message}
                                </Form.ErrorMessage>
                            </>
                        )}
                    />
                </Form.Group>
                <Form.Group>
                    <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Button appearance="primary" active size='lg' type="submit" loading={loading} disabled={loading}>Save</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </Drawer>
    )
}