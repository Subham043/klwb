import { Button, Form, Modal, Panel, Stack } from "rsuite"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isAxiosError } from "axios";
import { useMediaQuery } from "rsuite/esm/useMediaQuery/useMediaQuery";
import { AxiosErrorResponseType, IndustryRegisteredType } from "../../../../utils/types";
import { useToast } from "../../../../hooks/useToast";
import { useAxios } from "../../../../hooks/useAxios";
import { api_routes } from "../../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../../layouts/ErrorBoundaryLayout";
import TextInput from "../../../FormInput/TextInput";
import SelectInput from "../../../FormInput/SelectInput";

type Props = {
	modal: boolean,
	setModal: (value: boolean) => void;
	loading?: boolean;
	error?: unknown;
	refetch?: () => void;
	data: IndustryRegisteredType | undefined
}

type SchemaType = {
	gst_no: string;
	pan_no: string;
	address: string;
	pincode: string;
	act: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
	.object({
		gst_no: yup.string().typeError("GST No. must contain characters only").required("GST No. is required"),
		pan_no: yup.string().typeError("PAN No. must contain characters only").required("PAN No. is required"),
		address: yup.string().typeError("Address must contain characters only").required("Address is required"),
		pincode: yup.string().typeError("Pincode must contain characters only").required("Pincode is required"),
		act: yup.string().typeError("Act must contain characters only").required("Act is required"),
	})
	.required();

const AccountInfoUpdate = ({ modal, setModal, data, refetch, error, loading: dataLoading }: Props) => {

	const [loading, setLoading] = useState<boolean>(false);
	const { toastError, toastSuccess } = useToast();
	const axios = useAxios();
	const [isMobile] = useMediaQuery('(max-width: 700px)');

	const {
		control,
		handleSubmit,
		getValues,
		setError,
		formState: { errors }
	} = useForm<SchemaType>({
		resolver: yupResolver(schema),
		values: {
			gst_no: data ? data.gst_no : "",
			pincode: data ? data.registered_industry.pincode : "",
			pan_no: data ? data.pan_no : "",
			address: data ? data.address : "",
			act: (data && data.registered_industry.act) ? data.registered_industry.act.toString() : "",
		}
	});

	const onSubmit = handleSubmit(async () => {
		setLoading(true);
		try {
			await axios.post(api_routes.industry.account.info_update, getValues());
			toastSuccess("Updated Successfully");
			setModal(false)
			refetch && refetch();
		} catch (error) {
			if (isAxiosError<AxiosErrorResponseType>(error)) {
				if (error?.response?.data?.errors) {
					for (const [key, value] of Object.entries(error?.response?.data?.errors)) {
						setError(key as keyof SchemaType, {
							type: "server",
							message: value[0],
						});
					}
				} else if (error?.response?.data?.message) {
					toastError(error.response.data.message);
				}
			}
		} finally {
			setLoading(false);
		}
	});

	return (
		<Modal size={'md'} open={modal} onClose={() => setModal(false)} className='info-modal'>
			<Form onSubmit={() => onSubmit()} style={{ width: '100%' }}>
				<ErrorBoundaryLayout loading={dataLoading} error={error} refetch={refetch}>
					<>
						<Panel header="Industry Information Update" className='info-modal-panel' bordered>
							<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
								<TextInput name="gst_no" label="GST No." control={control} error={errors.gst_no?.message} />
								<TextInput name="pan_no" label="PAN No." control={control} error={errors.pan_no?.message} />
							</Stack>
							<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
								<SelectInput name="act" label="Act" data={[{ label: 'Labour', value: '1' }, { label: 'Company', value: '2' }, { label: 'Other', value: '3' }]} control={control} error={errors.act?.message} />
								<TextInput name="pincode" label="Pincode" control={control} error={errors.pincode?.message} />
							</Stack>
							<TextInput name="address" label="Address" helpText="Do not use any special characters" textarea={true} control={control} error={errors.address?.message} />
						</Panel>
					</>
					{data !== undefined && <Modal.Footer className='mb-1 info-modal-footer'>
						<Button type="submit" loading={loading} disabled={loading} appearance="primary">
							Update
						</Button>
						<Button type="button" onClick={() => setModal(false)} appearance="primary" color='red'>
							Cancel
						</Button>
					</Modal.Footer>}
				</ErrorBoundaryLayout>
			</Form>
		</Modal>
	)
}

export default AccountInfoUpdate