import { Button, ButtonToolbar, Form } from 'rsuite'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from "../../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../../Drawer";
import { useContributionQuery } from '../../../hooks/data/contribution';
import { useAxios } from '../../../hooks/useAxios';
import TextInput from '../../FormInput/TextInput';
import { api_routes } from '../../../utils/routes/api';
import ErrorBoundaryLayout from '../../../layouts/ErrorBoundaryLayout';

type SchemaType = {
  male: number;
  female: number;
  price: number;
  interest: number;
};


const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    male: yup.number().typeError("Male must contain numbers only").required("Male is required"),
    female: yup.number().typeError("Female must contain numbers only").required("Female is required"),
    price: yup.number().typeError("Price must contain numbers only").required("Price is required"),
    interest: yup.number().typeError("Interest must contain numbers only").required("Interest is required"),
  })
  .required();

export default function ContributionForm({drawer, drawerHandler, refetch}:{drawer: DrawerProps; drawerHandler: (value:DrawerProps)=>void; refetch: ()=>void}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {data, isFetching, isLoading, isRefetching, error, refetch: refetchData } = useContributionQuery(drawer.type === "Edit" ? drawer.id : 0, (drawer.type === "Edit" && drawer.status && drawer.id>0));
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
            male: data? data.male : 0,
            female: data? data.female : 0,
            price: data? data.price : 0,
            interest: data? data.interest : 0,
        } : {
            male: 0,
            female: 0,
            price: 0,
            interest: 0,
        }
     });

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await axios.post(drawer.type === "Edit" ? api_routes.admin.contribution.update(drawer.id) : api_routes.admin.contribution.update(0), getValues());
            toastSuccess("Saved Successfully");
            if(drawer.type==="Create"){
                reset({
                    male: 0,
                    female: 0,
                    price: 0,
                    interest: 0,
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
        <Drawer title="Contribution" drawer={drawer} drawerHandler={drawerHandler}>
            <ErrorBoundaryLayout loading={(isFetching || isLoading || isRefetching)} error={error} refetch={refetchData}>
                <Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
                    <TextInput name="male" label="Male Count" focus={true} control={control} error={errors.male?.message} />
                    <TextInput name="female" label="Female Count" control={control} error={errors.female?.message} />
                    <TextInput name="interest" label="Interest Amount" control={control} error={errors.interest?.message} />
                    <TextInput name="price" label="Total Amount" control={control} error={errors.price?.message} />
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