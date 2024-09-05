import { Button, Form, Modal, Panel, Stack } from "rsuite"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isAxiosError } from "axios";
import { useMediaQuery } from "rsuite/esm/useMediaQuery/useMediaQuery";
import { AxiosErrorResponseType, RegisteredInstituteType } from "../../../../utils/types";
import { useToast } from "../../../../hooks/useToast";
import { useAxios } from "../../../../hooks/useAxios";
import { api_routes } from "../../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../../layouts/ErrorBoundaryLayout";
import TextInput from "../../../FormInput/TextInput";

type Props = {
	modal: boolean,
	setModal: (value: boolean) => void;
	loading?: boolean;
	error?: unknown;
 refetch?: () => void;
	data: RegisteredInstituteType | undefined
}

type SchemaType = {
	email: string;
	principal: string;
	phone: number;
 address: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
	.object({
		principal: yup.string().typeError("Principal Name must contain characters only").required("Principal Name is required"),
		email: yup.string().typeError("Email must contain characters only").email().required("Email is required"),
  phone: yup.number().typeError("Phone must contain numbers only").positive().required("Phone is required"),
  address: yup.string().typeError("Address must contain characters only").required("Address is required"),
	})
	.required();

const AccountInfoUpdate = ({ modal, setModal, data, refetch, error, loading:dataLoading }: Props) => {

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
			principal: data ? data.principal : "",
			email: data ? data.email : "",
			phone: data ? Number(data.phone) : 0,
			address: data ? data.address.address : "",
		}
	});

		const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await axios.post(api_routes.institute.account.info_update, getValues());
            toastSuccess("Updated Successfully");
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
												<Panel header="Institute Information Update" className='info-modal-panel' bordered>
																<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
																				<TextInput name="principal" label="Principal Name" control={control} error={errors.principal?.message} />
																				<TextInput name="email" type='email' label="Email" control={control} error={errors.email?.message} />
																				<TextInput name="phone" label="Phone" control={control} error={errors.phone?.message} />
																</Stack>
																<TextInput name="address" label="Address" helpText="Do not use any special characters" textarea={true} control={control} error={errors.address?.message} />
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

export default AccountInfoUpdate