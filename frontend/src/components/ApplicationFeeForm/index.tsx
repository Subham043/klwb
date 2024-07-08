import { Button, ButtonToolbar, Form, Loader, SelectPicker } from 'rsuite'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api_routes } from "../../utils/api_routes";
import { useToast } from "../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../Drawer";
import { useApplicationFeeQuery } from '../../hooks/data/application_fee';
import { useClassSelectQuery } from '../../hooks/data/class';
import { useAxios } from '../../hooks/useAxios';
import TextInput from '../FormInput/TextInput';
import ToggleInput from '../FormInput/ToggleInput';

type SchemaType = {
  amount: number;
  is_active: number;
  class_id: number;
};


const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    amount: yup.number().typeError("Amount must contain numbers only").positive("Amount must contain positive numbers only").required("Amount is required"),
    class_id: yup.number().typeError("Class must contain numbers only").required("Class is required"),
    is_active: yup.number().typeError("Active/Inactive must contain numbers only").min(0).max(1).required("Active/Inactive is required"),
  })
  .required();

export default function ApplicationFeeForm({drawer, drawerHandler, refetch}:{drawer: DrawerProps; drawerHandler: (value:DrawerProps)=>void; refetch: ()=>void}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {data, isFetching, isLoading } = useApplicationFeeQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));
    const {data:classes, isFetching:isClassFetching, isLoading:isClassLoading } = useClassSelectQuery(drawer.status);
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
            class_id: data? data.classes.id : 0,
            is_active: data? (data.is_active ? 1: 0) : 0
        } : {
            amount: 0,
            class_id: 0,
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
                    class_id: 0,
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
            {(isFetching || isLoading) && <Loader backdrop content="loading..." vertical style={{ zIndex: 1000 }} />}
            <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                <TextInput name="amount" label="Amount" type="number" focus={true} control={control} error={errors.amount?.message} />
                <Form.Group>
                    <Controller
                        name="class_id"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Form.ControlLabel>Class</Form.ControlLabel>
                                <SelectPicker data={classes ? classes.map(item => ({ label: item.name, value: item.id })) : []} name={field.name} value={field.value} onChange={field.onChange} loading={isClassFetching || isClassLoading} className='w-100' />
                                <Form.ErrorMessage show={!!errors[field.name]?.message} placement="bottomStart">
                                    {errors[field.name]?.message}
                                </Form.ErrorMessage>
                            </>
                        )}
                    />
                </Form.Group>
                <ToggleInput name="is_active" checkedLabel="Active" uncheckedLabel="Inactive" control={control} error={errors.is_active?.message} />
                <Form.Group>
                    <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Button appearance="primary" active size='lg' type="submit" loading={loading} disabled={loading}>Save</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </Drawer>
    )
}