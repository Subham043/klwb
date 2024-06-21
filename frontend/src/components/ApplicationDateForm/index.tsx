import { Button, ButtonToolbar, DatePicker, Form, Loader, Toggle } from 'rsuite'
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
import { useApplicationDateQuery } from '../../hooks/data/application_date';

const date = new Date()

type SchemaType = {
  from_date: string;
  to_date: string;
  approval_end_date: string;
  verification_end_date: string;
  application_year: number;
  is_active: number;
};


const schema: yup.ObjectSchema<SchemaType> = yup
  .object().shape({
    application_year: yup.number().typeError("Application Year must contain numbers only").positive("Application Year must contain positive numbers only").required("Application Year is required"),
    from_date: yup.string().typeError("From Date must contain characters only").required("From Date is required"),
    to_date: yup.string().typeError("To Date must contain characters only").required("To Date is required"),
    approval_end_date: yup.string().typeError("Approval End Date must contain characters only").required("Approval End Date is required"),
    verification_end_date: yup.string().typeError("Verification End Date must contain characters only").required("Verification End Date is required"),
    is_active: yup.number().typeError("Active/Inactive must contain numbers only").min(0).max(1).required("Active/Inactive is required"),
  })
  .required();

export default function ApplicationDateForm({drawer, drawerHandler, refetch}:{drawer: DrawerProps; drawerHandler: (value:DrawerProps)=>void; refetch: ()=>void}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {data, isFetching, isLoading } = useApplicationDateQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));

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
            application_year: data? data.application_year : date.getFullYear(),
            from_date: data? data.from_date : date.toISOString(),
            to_date: data? data.to_date : date.toISOString(),
            approval_end_date: data? data.approval_end_date : date.toISOString(),
            verification_end_date: data? data.verification_end_date : date.toISOString(),
            is_active: data? (data.is_active ? 1: 0) : 0
        } : {
            application_year: date.getFullYear(),
            from_date: date.toISOString(),
            to_date: date.toISOString(),
            approval_end_date: date.toISOString(),
            verification_end_date: date.toISOString(),
            is_active: 1
        }
     });

    const onSubmit = handleSubmit(async () => {
        console.log(getValues())
        setLoading(true);
        try {
            await api.post(drawer.type === "Edit" ? api_routes.admin.application_date.update(drawer.id) : api_routes.admin.application_date.create, getValues());
            toastSuccess("Saved Successfully");
            if(drawer.type==="Create"){
                reset({
                    from_date: date.toISOString(),
                    to_date: date.toISOString(),
                    approval_end_date: date.toISOString(),
                    verification_end_date: date.toISOString(),
                    application_year: date.getFullYear(),
                });
            }
            drawerHandler({status:false, type:'Create'});
            refetch();
        } catch (error) {
            console.log(error);
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
        <Drawer title="Application Date" drawer={drawer} drawerHandler={drawerHandler}>
            {(isFetching || isLoading) && <Loader backdrop content="loading..." vertical style={{ zIndex: 1000 }} />}
            <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                <Form.Group>
                    <Controller
                        name="from_date"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Form.ControlLabel>From Date</Form.ControlLabel>
                                <DatePicker name={field.name} value={new Date(field.value)} onChange={field.onChange} format='dd-MM-yyyy' className='w-100' />
                                <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                    {errors[field.name]?.message}
                                </Form.ErrorMessage>
                            </>
                        )}
                    />
                </Form.Group>
                <Form.Group>
                    <Controller
                        name="to_date"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Form.ControlLabel>To Date</Form.ControlLabel>
                                <DatePicker name={field.name} value={new Date(field.value)} onChange={field.onChange} format='dd-MM-yyyy' className='w-100' />
                                <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                    {errors[field.name]?.message}
                                </Form.ErrorMessage>
                            </>
                        )}
                    />
                </Form.Group>
                <Form.Group>
                    <Controller
                        name="approval_end_date"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Form.ControlLabel>Approval End Date</Form.ControlLabel>
                                <DatePicker name={field.name} value={new Date(field.value)} onChange={field.onChange} format='dd-MM-yyyy' className='w-100' />
                                <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                    {errors[field.name]?.message}
                                </Form.ErrorMessage>
                            </>
                        )}
                    />
                </Form.Group>
                <Form.Group>
                    <Controller
                        name="verification_end_date"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Form.ControlLabel>Verification End Date</Form.ControlLabel>
                                <DatePicker name={field.name} value={new Date(field.value)} onChange={field.onChange} format='dd-MM-yyyy' className='w-100' />
                                <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                    {errors[field.name]?.message}
                                </Form.ErrorMessage>
                            </>
                        )}
                    />
                </Form.Group>
                <Form.Group>
                    <Controller
                        name="application_year"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Form.ControlLabel>Application Year</Form.ControlLabel>
                                <Form.Control name={field.name} type="number" value={field.value} onChange={field.onChange} />
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