import { Button, ButtonToolbar, Form } from 'rsuite'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from "../../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../../Drawer";
import { useApplicationFeeQuery } from '../../../hooks/data/application_fee';
import { useAxios } from '../../../hooks/useAxios';
import TextInput from '../../FormInput/TextInput';
import ToggleInput from '../../FormInput/ToggleInput';
import SelectInput from '../../FormInput/SelectInput';
import { api_routes } from '../../../utils/routes/api';
import ErrorBoundaryLayout from '../../../layouts/ErrorBoundaryLayout';
import { useGraduationSelectQuery } from '../../../hooks/data/graduation';

type SchemaType = {
  amount: number;
  is_active: number;
  graduation_id: number;
};


const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    amount: yup.number().typeError("Amount must contain numbers only").positive("Amount must contain positive numbers only").required("Amount is required"),
    graduation_id: yup.number().typeError("Graduation must contain numbers only").required("Graduation is required").test("notZero", "Graduation is required", (value) => !(value === 0)),
    is_active: yup.number().typeError("Active/Inactive must contain numbers only").min(0).max(1).required("Active/Inactive is required"),
  })
  .required();

export default function ApplicationFeeForm({drawer, drawerHandler, refetch}:{drawer: DrawerProps; drawerHandler: (value:DrawerProps)=>void; refetch: ()=>void}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {data, isFetching, isLoading, isRefetching, refetch:refetchData, error } = useApplicationFeeQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));
    const {data:graduations, isFetching:isGraduationFetching, isLoading:isGraduationLoading } = useGraduationSelectQuery(drawer.status);
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
            amount: data? data.amount : 0,
            graduation_id: data? data.graduation.id : 0,
            is_active: data? (data.is_active ? 1: 0) : 0
        } : {
            amount: 0,
            graduation_id: 0,
            is_active: 1
        }
     });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await axios.post(drawer.type === "Edit" ? api_routes.admin.application_fee.update(drawer.id) : api_routes.admin.application_fee.create, getValues());
            toastSuccess("Saved Successfully");
            if(drawer.type==="Create"){
                reset({
                    amount: 0,
                    graduation_id: 0,
                    is_active: 1
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
        <Drawer title="Scholarship Fee" drawer={drawer} drawerHandler={drawerHandler}>
            <ErrorBoundaryLayout loading={(isFetching || isLoading || isRefetching)} error={error} refetch={refetchData}>
                <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                    <TextInput name="amount" label="Amount" type="number" focus={true} control={control} error={errors.amount?.message} />
                    <SelectInput name="graduation_id" label="Graduation" data={graduations ? graduations.map(item => ({ label: item.name, value: item.id })) : []} loading={isGraduationFetching || isGraduationLoading} control={control} error={errors.graduation_id?.message} />
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