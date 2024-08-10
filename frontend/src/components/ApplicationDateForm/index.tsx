import { Button, ButtonToolbar, Form } from 'rsuite'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from "../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../Drawer";
import { useApplicationDateQuery } from '../../hooks/data/application_date';
import { useAxios } from '../../hooks/useAxios';
import TextInput from '../FormInput/TextInput';
import ToggleInput from '../FormInput/ToggleInput';
import DateInput from '../FormInput/DateInput';
import { api_routes } from '../../utils/routes/api';
import ErrorBoundaryLayout from '../../layouts/ErrorBoundaryLayout';

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
    const {data, isFetching, isLoading, isRefetching, error, refetch: refetchData } = useApplicationDateQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));
    const axios = useAxios();

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
        setLoading(true);
        try {
            await axios.post(drawer.type === "Edit" ? api_routes.admin.application_date.update(drawer.id) : api_routes.admin.application_date.create, getValues());
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
            <ErrorBoundaryLayout loading={(isFetching || isLoading || isRefetching)} error={error} refetch={refetchData}>
                <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                    <DateInput name="from_date" label="From Date" control={control} error={errors.from_date?.message} />
                    <DateInput name="to_date" label="To Date" control={control} error={errors.to_date?.message} />
                    <DateInput name="approval_end_date" label="Approval End Date" control={control} error={errors.approval_end_date?.message} />
                    <DateInput name="verification_end_date" label="Verification End Date" control={control} error={errors.approval_end_date?.message} />
                    <TextInput name="application_year" label="Application Year" type="number" focus={true} control={control} error={errors.application_year?.message} />
                    <ToggleInput name="is_active" checkedLabel="Active" uncheckedLabel="Inactive" control={control} error={errors.is_active?.message} />
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