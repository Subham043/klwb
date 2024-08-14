import { Button, Form, Modal, Panel, Stack } from 'rsuite'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from "../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../utils/types";
import { isAxiosError } from "axios";
import { useRegisteredIndustryQuery } from '../../hooks/data/registered_industry';
import { useAxios } from '../../hooks/useAxios';
import TextInput from '../FormInput/TextInput';
import ToggleInput from '../FormInput/ToggleInput';
import SelectInput from '../FormInput/SelectInput';
import { api_routes } from '../../utils/routes/api';
import ErrorBoundaryLayout from '../../layouts/ErrorBoundaryLayout';
import { useMediaQuery } from 'rsuite/esm/useMediaQuery/useMediaQuery';

type SchemaType = {
  name: string;
  act: string;
  is_active: number;
};


const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup.string().typeError("Industry Name must contain characters only").required("Name is required"),
    act: yup.string().typeError("Act must contain characters only").required("Act is required"),
    is_active: yup.number().typeError("Active/Inactive must contain numbers only").min(0).max(1).required("Active/Inactive is required"),
  })
  .required();

export default function RegisteredIndustryForm({drawer, drawerHandler, refetch}:{drawer: DrawerProps; drawerHandler: (value:DrawerProps)=>void; refetch: ()=>void}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {data, isFetching, isLoading, isRefetching, refetch:refetchData, error } = useRegisteredIndustryQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));
    const axios = useAxios();
    const [isMobile] = useMediaQuery('(max-width: 700px)');

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
            act: (data && data.act)? data.act.toString() : "",
            is_active: data? (data.is_active ? 1: 0) : 0
        } : {
            name: "",
            act: "",
            is_active: 1
        }
     });
    

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await axios.post(drawer.type === "Edit" ? api_routes.admin.registered_industry.update(drawer.id) : api_routes.admin.registered_industry.create, getValues());
            toastSuccess("Saved Successfully");
            if(drawer.type==="Create"){
                reset({
                    name: "",
                    act: "",
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
        <Modal overflow={false} size={"sm"} open={drawer.status} onClose={()=>drawerHandler({status:false, type:'Create'})} className='info-modal'>
            <ErrorBoundaryLayout loading={(isFetching || isLoading || isRefetching)} error={error} refetch={refetchData}>
                <Panel header={drawer.type === "Edit" ? "Update Industry" : " Add Industry"} className='info-modal-panel' bordered>
                    <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                        <Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
                            <TextInput name="name" label="Industry Name" control={control} error={errors.name?.message} />
                            <SelectInput name="act" label="Act" data={[{label:'Labour', value:'1'}, {label:'Company', value:'2'}, {label:'Other', value:'3'}]} control={control} error={errors.act?.message} />
                        </Stack>
                        <ToggleInput name="is_active" checkedLabel="Active" uncheckedLabel="Inactive" control={control} error={errors.is_active?.message} />
                        <Modal.Footer className='info-modal-footer'>
                            <Button appearance="primary" type="submit" loading={loading} disabled={loading}>Save</Button>
                            <Button type='button' onClick={()=>drawerHandler({status:false, type:'Create'})} appearance="primary" color='red'>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Panel>
            </ErrorBoundaryLayout>
        </Modal>
    )
}