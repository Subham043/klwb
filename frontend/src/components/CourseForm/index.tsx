import { Button, ButtonToolbar, Form, Loader, SelectPicker, Toggle } from 'rsuite'
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
import { useCourseQuery } from '../../hooks/data/course';
import { useGradutaionSelectQuery } from '../../hooks/data/graduation';

type SchemaType = {
  name: string;
  is_active: number;
  graduation_id: number;
};


const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup.string().typeError("Name must contain characters only").required("Name is required"),
    graduation_id: yup.number().typeError("Graduation must contain numbers only").required("Graduation is required"),
    is_active: yup.number().typeError("Active/Inactive must contain numbers only").min(0).max(1).required("Active/Inactive is required"),
  })
  .required();

export default function CourseForm({drawer, drawerHandler, refetch}:{drawer: DrawerProps; drawerHandler: (value:DrawerProps)=>void; refetch: ()=>void}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {data, isFetching, isLoading } = useCourseQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));
    const {data:granduations, isFetching:isGraduationFetching, isLoading:isGraduationLoading } = useGradutaionSelectQuery(drawer.status);


    const {
        control,
        handleSubmit,
        getValues,
        reset,
        setError,
        formState: { errors }
    } = useForm<SchemaType>({ 
        resolver: yupResolver(schema),
        values: drawer.type==="Edit" ? {
            name: data? data.name : "",
            graduation_id: data? data.graduation.id : 0,
            is_active: data? (data.is_active ? 1: 0) : 0
        } : {
            name: "",
            graduation_id: 0,
            is_active: 1
        }
     });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await api.post(drawer.type === "Edit" ? api_routes.admin.course.update(drawer.id) : api_routes.admin.course.create, getValues());
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
        <Drawer title="Course" drawer={drawer} drawerHandler={drawerHandler}>
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
                        name="graduation_id"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Form.ControlLabel>Graduation</Form.ControlLabel>
                                <SelectPicker data={granduations ? granduations.map(item => ({ label: item.name, value: item.id })) : []} name={field.name} value={field.value} onChange={field.onChange} loading={isGraduationFetching || isGraduationLoading} className='w-100' />
                                <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                    {errors[field.name]?.message}
                                </Form.ErrorMessage>
                            </>
                        )}
                    />
                </Form.Group>
                <Form.Group>
                    <Controller
                        name="is_active"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Toggle size="lg" checkedChildren="Active" unCheckedChildren="Inactive" checked={field.value === 1} onChange={(checked) => field.onChange(checked ? 1 : 0)} />
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