import { Button, ButtonToolbar, Form } from 'rsuite'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from "../../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../../Drawer";
import { useApplicationDateQuery } from '../../../hooks/data/application_date';
import { useAxios } from '../../../hooks/useAxios';
import TextInput from '../../FormInput/TextInput';
import ToggleInput from '../../FormInput/ToggleInput';
import DateInput from '../../FormInput/DateInput';
import { api_routes } from '../../../utils/routes/api';
import ErrorBoundaryLayout from '../../../layouts/ErrorBoundaryLayout';
import moment from 'moment';

const date = new Date()

type SchemaType = {
  from_date: string;
  to_date: string;
  application_year: number;
  can_resubmit: number;
  can_approve: number;
  can_verify: number;
  is_active: number;
};


const schema: yup.ObjectSchema<SchemaType> = yup
  .object().shape({
    application_year: yup.number().typeError("Application Year must contain numbers only").positive("Application Year must contain positive numbers only").required("Application Year is required"),
    from_date: yup.string().typeError("From Date must contain characters only").required("From Date is required"),
    to_date: yup.string().typeError("To Date must contain characters only").required("To Date is required"),
    can_resubmit: yup.number().typeError("Resubmission must contain numbers only").min(0).max(1).required("Resubmission is required"),
    can_approve: yup.number().typeError("Approval must contain numbers only").min(0).max(1).required("Approval is required"),
    can_verify: yup.number().typeError("Verification must contain numbers only").min(0).max(1).required("Verification is required"),
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
        watch,
        formState: { errors }
    } = useForm<SchemaType>({ 
        resolver: yupResolver(schema),
        values: drawer.type==="Edit" ? {
            application_year: data? data.application_year : date.getFullYear(),
            from_date: data? moment(data.from_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
            to_date: data? moment(data.to_date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
            can_resubmit: data? (data.can_resubmit ? 1: 0) : 0,
            can_approve: data? (data.can_approve ? 1: 0) : 0,
            can_verify: data? (data.can_verify ? 1: 0) : 0,
            is_active: data? (data.is_active ? 1: 0) : 0
        } : {
            application_year: date.getFullYear(),
            from_date: moment().format('YYYY-MM-DD'),
            to_date: moment().format('YYYY-MM-DD'),
            can_resubmit: 1,
            can_approve: 1,
            can_verify: 1,
            is_active: 1,
        }
     });

     const watchFromDate = watch("from_date");

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await axios.post(drawer.type === "Edit" ? api_routes.admin.application_date.update(drawer.id) : api_routes.admin.application_date.create, getValues());
            toastSuccess("Saved Successfully");
            if(drawer.type==="Create"){
                reset({
                    from_date: moment().format('YYYY-MM-DD'),
                    to_date: moment().format('YYYY-MM-DD'),
                    application_year: date.getFullYear(),
                    can_resubmit: 1,
                    can_approve: 1,
                    can_verify: 1,
                    is_active: 1
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
                    <DateInput name="from_date" label="From Date" shouldDisableDate={(dates) => drawer.type === "Edit" ? moment(dates).isSameOrBefore(moment(watchFromDate).subtract(1, "days").format("YYYY-MM-DD")) : moment(dates).isSameOrBefore(moment().subtract(1, "days").format("YYYY-MM-DD"))} control={control} error={errors.from_date?.message} />
                    <DateInput name="to_date" label="To Date" shouldDisableDate={(dates) => moment(dates).isSameOrBefore(moment(watchFromDate).format("YYYY-MM-DD"))} control={control} error={errors.to_date?.message} />
                    <TextInput name="application_year" label="Application Year" type="number" focus={true} control={control} error={errors.application_year?.message} />
                    <ToggleInput name="can_resubmit" checkedLabel="Student Can Resubmit" uncheckedLabel="Student Cannot Resubmit" control={control} error={errors.can_resubmit?.message} />
                    <ToggleInput name="can_approve" checkedLabel="Industry/Institute Can Approve" uncheckedLabel="Industry/Institute Cannot Approve" control={control} error={errors.can_approve?.message} />
                    <ToggleInput name="can_verify" checkedLabel="Officials Can Verify" uncheckedLabel="Officials Cannot Verify" control={control} error={errors.can_verify?.message} />
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