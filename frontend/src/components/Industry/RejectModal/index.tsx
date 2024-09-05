import { Button, Form, Modal, Panel } from 'rsuite'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isAxiosError } from "axios";
import { useAxios } from '../../../hooks/useAxios';
import { useToast } from '../../../hooks/useToast';
import { api_routes } from '../../../utils/routes/api';
import { AxiosErrorResponseType } from '../../../utils/types';
import TextInput from '../../FormInput/TextInput';

type SchemaType = {
  reason: string;
  comment: string;
};


const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    reason: yup.string().typeError("Reason must contain characters only").required("Reason is required"),
    comment: yup.string().typeError("Comment must contain characters only").required("Comment is required"),
  })
  .required();

export default function IndustryScholarshipRejectForm({modal, setModal, id, refetch}:{modal: boolean; id:number; setModal: (value:boolean)=>void; refetch: ()=>void}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
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
     }); 

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        try {
            await axios.post(api_routes.industry.scholarship.reject(id), getValues());
            toastSuccess("Rejected Successfully");
												reset({
																reason: "",
																comment: "",
												});
            setModal(false);
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
        <Modal overflow={false} size={"sm"} open={modal} onClose={()=>setModal(false)} className='info-modal'>
									<Panel header={"Reason for Rejection"} className='info-modal-panel' bordered>
													<Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
																	<TextInput name="reason" textarea={true} focus={true} label="Reason" helpText='Eg.Document is missing' control={control} error={errors.reason?.message} />
																	<TextInput name="comment" textarea={true} label="Comment" helpText='Eg.Document is missing' control={control} error={errors.comment?.message} />
																	<Modal.Footer className='info-modal-footer'>
																					<Button appearance="primary" type="submit" loading={loading} disabled={loading}>Reject</Button>
																					<Button type='button' onClick={()=>setModal(false)} appearance="primary" color='red'>
																									Cancel
																					</Button>
																	</Modal.Footer>
													</Form>
									</Panel>
        </Modal>
    )
}