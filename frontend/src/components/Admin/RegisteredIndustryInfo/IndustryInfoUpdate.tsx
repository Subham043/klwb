import { Button, Form, Modal, Panel, Stack } from "rsuite"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from "../../../hooks/useToast";
import { isAxiosError } from "axios";
import { useTaluqSelectQuery } from '../../../hooks/data/taluq';
import { useAxios } from '../../../hooks/useAxios';
import TextInput from '../../FormInput/TextInput';
import ToggleInput from '../../FormInput/ToggleInput';
import SelectInput from '../../FormInput/SelectInput';
import { useCitySelectQuery } from '../../../hooks/data/city';
import { api_routes } from '../../../utils/routes/api';
import ErrorBoundaryLayout from '../../../layouts/ErrorBoundaryLayout';
import { AxiosErrorResponseType, RegisteredIndustryType } from "../../../utils/types";
import { useMediaQuery } from "rsuite/esm/useMediaQuery/useMediaQuery";

type Props = {
	modal: boolean,
	setModal: (value: boolean) => void;
	loading?: boolean;
	error?: unknown;
 refetch?: () => void;
	data: RegisteredIndustryType | undefined
}

type SchemaType = {
	name: string;
	act: string;
 address: string;
	is_active: number;
	city_id: number;
	taluq_id: number;
};

const schema: yup.ObjectSchema<SchemaType> = yup
	.object({
		name: yup.string().typeError("Industry Name must contain characters only").required("Industry Name is required"),
		act: yup.string().typeError("Act must contain characters only").required("Act is required"),
		city_id: yup.number().typeError("District must contain numbers only").required("District is required").test("notZero", "District is required", (value) => !(value === 0)),
		taluq_id: yup.number().typeError("Taluq must contain numbers only").required("Taluq is required").test("notZero", "Taluq is required", (value) => !(value === 0)),
  address: yup.string().typeError("Address must contain characters only").required("Address is required"),
		is_active: yup.number().typeError("Active/Inactive must contain numbers only").min(0).max(1).required("Active/Inactive is required"),
	})
	.required();

const IndustryInfoUpdate = ({ modal, setModal, data, refetch, error, loading:dataLoading }: Props) => {

	const [loading, setLoading] = useState<boolean>(false);
	const { toastError, toastSuccess } = useToast();
	const axios = useAxios();
	const [isMobile] = useMediaQuery('(max-width: 700px)');

	const {
		control,
		handleSubmit,
		getValues,
		setError,
		watch,
		setValue,
		formState: { errors }
	} = useForm<SchemaType>({
		resolver: yupResolver(schema),
		values: {
			name: data ? data.industry.name : "",
			act: (data && data.industry.act) ? data.industry.act.toString() : "",
			address: data ? data.address : "",
			taluq_id: data ? data.taluq.id : 0,
			city_id: data ? data.city.id : 0,
			is_active: data ? (!data.is_blocked ? 1 : 0) : 0
		}
	});

	const city_id = watch("city_id");

	const { data: cities, isFetching: isCityFetching, isLoading: isCityLoading } = useCitySelectQuery(modal);
	const { data: taluqs, isFetching: isTaluqFetching, isLoading: isTaluqLoading } = useTaluqSelectQuery((modal && city_id !== 0), (city_id === 0 ? undefined : city_id));

		const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await axios.post(api_routes.admin.registered_industry.update(data!.id), getValues());
            toastSuccess("Saved Successfully");
            setModal(false)
            refetch && refetch();
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
		<Modal size={'md'} open={modal} onClose={() => setModal(false)} className='info-modal'>
			<Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
				<ErrorBoundaryLayout loading={dataLoading} error={error} refetch={refetch}>
								<>
												<Panel header="Industry Information Update" className='info-modal-panel' bordered>
																<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
																				<TextInput name="name" label="Industry Name" control={control} error={errors.name?.message} />
																				<SelectInput name="act" label="Act" data={[{label:'Labour', value:'1'}, {label:'Company', value:'2'}, {label:'Other', value:'3'}]} control={control} error={errors.act?.message} />
																</Stack>
																<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
																					<SelectInput name="city_id" label="District" resetHandler={() => {setValue("taluq_id", 0)}} data={cities ? cities.map(item => ({ label: item.name, value: item.id })) : []} loading={isCityFetching || isCityLoading} control={control} error={errors.city_id?.message} />
																					<SelectInput name="taluq_id" label="Taluq" data={taluqs ? taluqs.map(item => ({ label: item.name, value: item.id })) : []} disabled={city_id===0} loading={isTaluqFetching || isTaluqLoading} control={control} error={errors.taluq_id?.message} />
																</Stack>
																<TextInput name="address" label="Address" helpText="Do not use any special characters" textarea={true} control={control} error={errors.address?.message} />
																<ToggleInput name="is_active" checkedLabel="Active" uncheckedLabel="Inactive" control={control} error={errors.is_active?.message} />
												</Panel>
								</>
								{data!==undefined && <Modal.Footer className='mb-1 info-modal-footer'>
												<Button type="submit" loading={loading} disabled={loading} appearance="primary">
																Update
												</Button>
												<Button type="button" onClick={()=>setModal(false)} appearance="primary" color='red'>
																Cancel
												</Button>
								</Modal.Footer>}
				</ErrorBoundaryLayout>
			</Form>
		</Modal>
	)
}

export default IndustryInfoUpdate