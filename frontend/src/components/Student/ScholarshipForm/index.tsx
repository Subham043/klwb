import { useState } from "react";
import { useToast } from "../../../hooks/useToast";
import { useAxios } from "../../../hooks/useAxios";
import { Button, ButtonToolbar, Form } from "rsuite";
import { useForm } from "react-hook-form";
import { scholarshipFormInitialValues, scholarshipFormSchema, ScholarshipFormSchemaType } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { api_routes } from "../../../utils/routes/api";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType, StudentApplicationType } from "../../../utils/types";
import { Link } from "react-router-dom";
import { page_routes } from "../../../utils/routes/pages";
import StudentInfo from "./StudentInfo";
import InstitutionInfo from "./InstitutionInfo";
import CastInfo from "./CasteInfo";
import MarksInfo from "./MarksInfo";
import AadharInfo from "./AadharInfo";
import BankInfo from "./BankInfo";
import IndustryInfo from "./IndustryInfo";

type Props = {
	type?: "apply" | "resubmit";
	data?: StudentApplicationType | null;
}


export default function ScholarshipForm({ data }: Props) {
	const [loading, setLoading] = useState<boolean>(false);
	const { toastError, toastSuccess } = useToast();
	const axios = useAxios();

	const {
		control,
		handleSubmit,
		reset,
		watch,
		getValues,
		setValue,
		setError,
		formState: { errors },
	} = useForm<ScholarshipFormSchemaType>({ 
		resolver: yupResolver(scholarshipFormSchema), 
		shouldFocusError: true,
		values: {
			...scholarshipFormInitialValues,
			name: data ? data.basic_detail.name : '',
			father_name: data ? data.basic_detail.father_name : '',
			mother_name: data ? data.basic_detail.mother_name : '',
			parent_phone: data ? data.basic_detail.parent_phone : 0,
			address: data ? data.basic_detail.address : '',
			gender: data ? data.basic_detail.gender : '',
			is_scst: data ? (data.basic_detail.is_scst==='true' ? '1' : '0') : '',
			cast_no: data ? data.basic_detail.cast_no : '',
			category: data ? data.basic_detail.category : '',
			prv_class: data ? data.mark.prv_class : '',
			prv_marks: data ? data.mark.prv_marks : 0,
			ins_district_id: data ? data.mark.ins_district_id : 0,
			ins_taluq_id: data ? data.mark.ins_taluq_id : 0,
			ins_pin: data ? data.mark.ins_pin.toString() : '',
			graduation_id: data ? data.mark.graduation_id : 0,
			school_id: data ? data.school_id : 0,
			course_id: data ? data.mark.course_id : 0,
			class_id: data ? data.mark.class_id : 0,
			type: data ? data.account.type.toString() : '',
			bank_name: data ? data.account.bank_name : '',
			branch: data ? data.account.branch : '',
			ifsc: data ? data.account.ifsc : '',
			acc_no: data ? data.account.acc_no : 0,
			holder: data ? data.account.holder : '',
			who_working: data ? data.company.who_working.toString() : '',
			parent_guardian_name: data ? data.company.parent_guardian_name : '',
			relationship: data ? data.company.relationship : '',
			msalary: data ? data.company.msalary : 0,
			adharcard_no: data ? data.basic_detail.adharcard_no : 0,
			f_adhar: data ? data.basic_detail.f_adhar : undefined,
			m_adhar: data ? data.basic_detail.m_adhar : undefined,
			not_applicable: data ? data.basic_detail.not_applicable : undefined,
			district_id: data ? data.company.district_id : 0,
			taluq_id: data ? data.company.taluq_id : 0,
			pincode: data ? data.company.pincode : '',
			company_id: data ? data.company_id : 0,
		}
	});

	const onSubmit = handleSubmit(async () => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("name", getValues().name);
			formData.append("father_name", getValues().father_name);
			formData.append("mother_name", getValues().mother_name);
			formData.append("parent_phone", getValues().parent_phone.toString()); 
			formData.append("address", getValues().address.toString()); 
			formData.append("gender", getValues().gender);
			formData.append("graduation_id", getValues().graduation_id.toString());
			if(getValues().course_id!==undefined && getValues().course_id !== 0){
				formData.append("course_id", getValues().course_id!.toString());
			}
			if(getValues().class_id!==undefined && getValues().class_id !== 0){
				formData.append("class_id", getValues().class_id!.toString());
			}
			formData.append("ins_pin", getValues().ins_pin);
			formData.append("ins_district_id", getValues().ins_district_id.toString());
			formData.append("ins_taluq_id", getValues().ins_taluq_id.toString());
			formData.append("school_id", getValues().school_id.toString());
			formData.append("prv_class", getValues().prv_class);
			formData.append("prv_marks", getValues().prv_marks.toString());
			formData.append("marks_card_type", getValues().marks_card_type);
			formData.append("prv_markcard", getValues().prv_markcard![0].blobFile!);
			if(getValues().marks_card_type === "0"){
				formData.append("prv_markcard2", getValues().prv_markcard2![0].blobFile!);
			}
			formData.append("is_scst", getValues().is_scst);
			formData.append("category", getValues().category);
			if(getValues().is_scst === "1"){
				formData.append("cast_no", getValues().cast_no!);
				formData.append("cast_certificate", getValues().cast_certificate![0].blobFile!);
			}
			formData.append("adharcard_no", getValues().adharcard_no.toString());
			formData.append("adharcard_file", getValues().adharcard_file![0].blobFile!);
			if(getValues().not_applicable!==undefined){
				formData.append("not_applicable", getValues().not_applicable!);
				formData.append("deathcertificate", getValues().deathcertificate![0].blobFile!);
				if(getValues().not_applicable==="father"){
					formData.append("m_adhar", getValues().m_adhar!.toString());
					formData.append("m_adharfile", getValues().m_adharfile![0].blobFile!);
				}
				if(getValues().not_applicable==="mother"){
					formData.append("f_adhar", getValues().f_adhar!!.toString());
					formData.append("f_adharfile", getValues().f_adharfile![0].blobFile!);
				}
			}else{
				formData.append("f_adhar", getValues().f_adhar!!.toString());
				formData.append("f_adharfile", getValues().f_adharfile![0].blobFile!);
				formData.append("m_adhar", getValues().m_adhar!.toString());
				formData.append("m_adharfile", getValues().m_adharfile![0].blobFile!);
			}
			formData.append("type", getValues().type);
			formData.append("bank_name", getValues().bank_name);
			formData.append("branch", getValues().branch);
			formData.append("ifsc", getValues().ifsc);
			formData.append("acc_no", getValues().acc_no.toString());
			formData.append("holder", getValues().holder);
			formData.append("passbook", getValues().passbook![0].blobFile!);
			formData.append("who_working", getValues().who_working);
			formData.append("parent_guardian_name", getValues().parent_guardian_name);
			formData.append("relationship", getValues().relationship);
			formData.append("msalary", getValues().msalary.toString());
			formData.append("pincode", getValues().pincode);
			formData.append("district_id", getValues().district_id.toString());
			formData.append("taluq_id", getValues().taluq_id.toString());
			formData.append("company_id", getValues().company_id.toString());
			formData.append("salaryslip", getValues().salaryslip![0].blobFile!);
			await axios.post(api_routes.user.scholarship.apply, formData);
			toastSuccess("Scholarship Applied Successfully");
			reset(scholarshipFormInitialValues);
		} catch (error) {
			if (isAxiosError<AxiosErrorResponseType>(error)) {
				if (error?.response?.data?.errors) {
					for (const [key, value] of Object.entries(error?.response?.data?.errors)) {
						setError(key as keyof ScholarshipFormSchemaType, {
							type: "server",
							message: value[0],
						});
					}
				} 
				if (error?.response?.data?.message) {
					toastError(error.response.data.message);
				}
			}
		} finally {
			setLoading(false);
		}
	});

		return (
			<Form onSubmit={() => onSubmit()} style={{ width: '100%' }}>
				<Form.Group>
					<StudentInfo control={control} errors={errors} />
					<InstitutionInfo control={control} errors={errors} watch={watch} setValue={setValue} />
					<CastInfo control={control} errors={errors} watch={watch} />
					<MarksInfo control={control} errors={errors} watch={watch} />
					<AadharInfo control={control} errors={errors} watch={watch} setValue={setValue} />
					<BankInfo control={control} errors={errors} />
					<IndustryInfo control={control} errors={errors} watch={watch} setValue={setValue} />
					<ButtonToolbar style={{ width: '100%', justifyContent: 'flex-start', gap: '5px' }}>
						<Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Submit</Button>
						<Button appearance="primary" color="orange" size='lg' type="button" onClick={() => reset(scholarshipFormInitialValues)}>Reset</Button>
						<Link to={page_routes.student.dashboard}><Button appearance="primary" size='lg' color="red" type='button'>Cancel</Button></Link>
					</ButtonToolbar>
				</Form.Group>
			</Form>
		)
}
