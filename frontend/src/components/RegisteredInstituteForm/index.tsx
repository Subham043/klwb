import { Button, ButtonToolbar, Form, Loader } from 'rsuite'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api_routes } from "../../utils/api_routes";
import { useToast } from "../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../Drawer";
import { useRegisteredInstituteQuery } from '../../hooks/data/registered_institute';
import { useTaluqSelectQuery } from '../../hooks/data/taluq';
import { useAxios } from '../../hooks/useAxios';
import TextInput from '../FormInput/TextInput';
import ToggleInput from '../FormInput/ToggleInput';
import SelectInput from '../FormInput/SelectInput';
import { useCitySelectQuery } from '../../hooks/data/city';

type SchemaType = {
  name: string;
  management_type: string;
  category: string;
  type: string;
  urban_rural: string;
  is_active: number;
  city_id: number;
  taluq_id: number;
};


const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup.string().typeError("Institute Name must contain characters only").required("Name is required"),
    management_type: yup.string().typeError("Management Type must contain characters only").required("Management Type is required"),
    category: yup.string().typeError("Institute Category must contain characters only").required("Category is required"),
    type: yup.string().typeError("Institute Type must contain characters only").required("Type is required"),
    urban_rural: yup.string().typeError("Urban/Rural must contain characters only").required("Urban/Rural is required"),
    city_id: yup.number().typeError("District must contain numbers only").required("District is required"),
    taluq_id: yup.number().typeError("Taluq must contain numbers only").required("Taluq is required"),
    is_active: yup.number().typeError("Active/Inactive must contain numbers only").min(0).max(1).required("Active/Inactive is required"),
  })
  .required();

export default function RegisteredInstituteForm({drawer, drawerHandler, refetch}:{drawer: DrawerProps; drawerHandler: (value:DrawerProps)=>void; refetch: ()=>void}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {data, isFetching, isLoading } = useRegisteredInstituteQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));
    const axios = useAxios();

    const {
        control,
        handleSubmit,
        getValues,
        reset,
        setError,
        watch,
        setValue,
        formState: { errors }
    } = useForm<SchemaType>({ 
        resolver: yupResolver(schema),
        values: drawer.type==="Edit" ? {
            name: data? data.name : "",
            management_type: data? data.management_type : "",
            category: data? data.category : "",
            type: data? data.type : "",
            urban_rural: data? data.urban_rural : "",
            taluq_id: data? data.taluq.id : 0,
            city_id: data? data.taluq.city.id : 0,
            is_active: data? (data.is_active ? 1: 0) : 0
        } : {
            name: "",
            management_type: "",
            category: "",
            type: "",
            urban_rural: "",
            city_id: 0,
            taluq_id: 0,
            is_active: 1
        }
     });

    const city_id = watch("city_id");

    const {data:cities, isFetching:isCityFetching, isLoading:isCityLoading } = useCitySelectQuery(drawer.status);
    const {data:taluqs, isFetching:isTaluqFetching, isLoading:isTaluqLoading } = useTaluqSelectQuery((drawer.status && city_id!==0), (city_id===0 ? undefined : city_id));

    useEffect(() => {
        if(drawer.type==="Edit"){
            if(data && city_id===data.taluq.city_id){
                setValue("taluq_id", data.taluq.id)
            }else{
                setValue("taluq_id", 0)
            }
        }else{
            setValue("taluq_id", 0)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city_id, data, drawer.type]);
    

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await axios.post(drawer.type === "Edit" ? api_routes.admin.registered_institute.update(drawer.id) : api_routes.admin.registered_institute.create, getValues());
            toastSuccess("Saved Successfully");
            if(drawer.type==="Create"){
                reset({
                    name: "",
                    management_type: "",
                    category: "",
                    type: "",
                    urban_rural: "",
                    city_id: 0,
                    taluq_id: 0,
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
        <Drawer title="Institute" drawer={drawer} drawerHandler={drawerHandler}>
            {(isFetching || isLoading) && <Loader backdrop content="loading..." vertical style={{ zIndex: 1000 }} />}
            <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                <TextInput name="name" label="Institute Name" control={control} error={errors.name?.message} />
                <TextInput name="management_type" label="Management Type" control={control} error={errors.management_type?.message} />
                <TextInput name="category" label="Institute Category" control={control} error={errors.category?.message} />
                <TextInput name="type" label="Institute Type" control={control} error={errors.type?.message} />
                <SelectInput name="urban_rural" label="Urban/Rural" data={[{label:'Urban', value:'Urban'}, {label:'Rural', value:'Rural'}]} control={control} error={errors.urban_rural?.message} />
                <SelectInput name="city_id" label="District" data={cities ? cities.map(item => ({ label: item.name, value: item.id })) : []} loading={isCityFetching || isCityLoading} control={control} error={errors.city_id?.message} />
                <SelectInput name="taluq_id" label="Taluq" data={taluqs ? taluqs.map(item => ({ label: item.name, value: item.id })) : []} disabled={city_id===0} loading={isTaluqFetching || isTaluqLoading} control={control} error={errors.taluq_id?.message} />
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