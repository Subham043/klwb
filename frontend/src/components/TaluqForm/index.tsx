import { Button, ButtonToolbar, Form } from 'rsuite'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from "../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../Drawer";
import { useTaluqQuery } from '../../hooks/data/taluq';
import { useCitySelectQuery } from '../../hooks/data/city';
import { useAxios } from '../../hooks/useAxios';
import TextInput from '../FormInput/TextInput';
import ToggleInput from '../FormInput/ToggleInput';
import SelectInput from '../FormInput/SelectInput';
import { api_routes } from '../../utils/routes/api';
import ErrorBoundaryLayout from '../../layouts/ErrorBoundaryLayout';

type SchemaType = {
  name: string;
  is_active: number;
  city_id: number;
};


const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup.string().typeError("Name must contain characters only").required("Name is required"),
    city_id: yup.number().typeError("City must contain numbers only").required("City is required"),
    is_active: yup.number().typeError("Active/Inactive must contain numbers only").min(0).max(1).required("Active/Inactive is required"),
  })
  .required();

export default function TaluqForm({drawer, drawerHandler, refetch}:{drawer: DrawerProps; drawerHandler: (value:DrawerProps)=>void; refetch: ()=>void}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {data, isFetching, isLoading, isRefetching, refetch:refetchData, error } = useTaluqQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));
    const {data:cities, isFetching:isCityFetching, isLoading:isCityLoading } = useCitySelectQuery(drawer.status);
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
            name: data? data.name : "",
            city_id: data? data.city.id : 0,
            is_active: data? (data.is_active ? 1: 0) : 0
        } : {
            name: "",
            city_id: 0,
            is_active: 1
        }
     });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await axios.post(drawer.type === "Edit" ? api_routes.admin.taluq.update(drawer.id) : api_routes.admin.taluq.create, getValues());
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
        <Drawer title="Taluq" drawer={drawer} drawerHandler={drawerHandler}>
            <ErrorBoundaryLayout loading={(isFetching || isLoading || isRefetching)} error={error} refetch={refetchData}>
                <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                    <TextInput name="name" label="Name" focus={true} control={control} error={errors.name?.message} />
                    <SelectInput name="city_id" label="District" data={cities ? cities.map(item => ({ label: item.name, value: item.id })) : []} loading={isCityFetching || isCityLoading} control={control} error={errors.city_id?.message} />
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