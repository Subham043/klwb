import { Button, ButtonToolbar, Divider, Form, Panel, Stack, useMediaQuery } from "rsuite";
import classes from './index.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from "react";
import { useToast } from "../../../hooks/useToast";
import { useAxios } from "../../../hooks/useAxios";
import { api_routes } from "../../../utils/routes/api";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../../utils/types";
import TextInput from "../../../components/FormInput/TextInput";
import SelectInput from "../../../components/FormInput/SelectInput";
import { Link } from "react-router-dom";
import { page_routes } from "../../../utils/routes/pages";
import { FileType } from "rsuite/esm/Uploader";
import FileInput from "../../../components/FormInput/FileInput";
import { useCityCommonSelectQuery } from "../../../hooks/data/city";
import { useTaluqCommonSelectQuery } from "../../../hooks/data/taluq";
import { useRegisteredInstituteCommonSelectQuery } from "../../../hooks/data/registered_institute";
import { useGraduationCommonSelectQuery } from "../../../hooks/data/graduation";
import { useCourseCommonSelectQuery } from "../../../hooks/data/course";
import { useClassCommonSelectQuery } from "../../../hooks/data/class";

type SchemaType = {
	name: string;
	father_name: string;
	mother_name: string;
	parent_phone: number;
	address: string;
	gender: string;
	ins_pin: string;
	ins_district_id: number;
	ins_taluq_id: number;
	school_id: number;
	graduation_id: number;
	course_id: number;
	class_id: number;
	type: string;
	bank_name: string;
	branch: string;
	ifsc: string;
	acc_no: number;
	holder: string;
	passbook?: FileType[] | undefined;
};

const schema: yup.ObjectSchema<SchemaType> = yup
	.object({
		name: yup.string().typeError("Name must contain characters only").required("Name is required"),
		father_name: yup.string().typeError("Father\'s Name must contain characters only").required("Father\'s Name is required"),
		mother_name: yup.string().typeError("Mother\'s Name must contain characters only").required("Mother\'s Name is required"),
		parent_phone: yup.number().typeError("Mobile Number must contain numbers only").positive().required("Mobile Number is required"),
		address: yup.string().typeError("Address must contain characters only").required("Address is required"),
		gender: yup.string().typeError("Gender must contain characters only").required("Gender is required"),
		ins_pin: yup.string().typeError("Pincode must contain characters only").required("Pincode is required"),
		ins_district_id: yup.number().typeError("District must contain numbers only").required("District is required"),
		ins_taluq_id: yup.number().typeError("Taluq must contain numbers only").required("Taluq is required"),
		school_id: yup.number().typeError("Present institution must contain numbers only").required("Present institution is required"),
		graduation_id: yup.number().typeError("Graduation must contain numbers only").required("Graduation is required"),
		course_id: yup.number().typeError("Course must contain numbers only").required("Course is required"),
		class_id: yup.number().typeError("Class must contain numbers only").required("Class is required"),
		type: yup.string().typeError("Account Belongs To must contain characters only").required("Account Belongs To is required"),
		bank_name: yup.string().typeError("Bank Name must contain characters only").required("Bank Name is required"),
		branch: yup.string().typeError("Branch Name must contain characters only").required("Branch Name is required"),
		ifsc: yup.string().typeError("IFSC code must contain characters only").required("IFSC code is required"),
		acc_no: yup.number().typeError("Account Number must contain numbers only").positive().required("Account Number is required"),
		holder: yup.string().typeError("Account Holder Name must contain characters only").required("Account Holder Name is required"),
		passbook: yup
      .mixed<FileType[]>()
      .test("fileRequired", "Passbook is required", (value) => {
        if (value === undefined || value.length === 0) return false;
        return true;
      })
      .test("fileFormat", "Please select a valid passbook", (value) => {
        if (value === undefined || value.length === 0) {
          return false;
        } else {
          return ["image/jpeg", "image/jpg", "image/png"].includes(
            value[0].blobFile!.type
          );
        }
      })
      .transform((value) => (((value !== undefined && value.length > 0) && (value[0].blobFile instanceof File)) ? value : undefined))
      .required("Passbook is required"),
	})
	.required();

export default function StudentApplyScholarshipPage() {

	const [loading, setLoading] = useState<boolean>(false);
	const { toastError, toastSuccess } = useToast();
	const axios = useAxios();
	const [isMobile] = useMediaQuery('(max-width: 700px)');

	const {
		control,
		handleSubmit,
		reset,
		watch,
		getValues,
		setValue,
		setError,
		formState: { errors }
	} = useForm<SchemaType>({ resolver: yupResolver(schema) });

	const ins_district_id = watch("ins_district_id");
	const ins_taluq_id = watch("ins_taluq_id");

	const { data: cities, isFetching: isCityFetching, isLoading: isCityLoading } = useCityCommonSelectQuery(true);
	const { data: taluqs, isFetching: isTaluqFetching, isLoading: isTaluqLoading } = useTaluqCommonSelectQuery((ins_district_id !== 0 && ins_district_id !== undefined), (ins_district_id === 0 ? undefined : ins_district_id));
	const { data: institutes, isFetching: isInstituteFetching, isLoading: isInstituteLoading } = useRegisteredInstituteCommonSelectQuery((ins_taluq_id !== 0 && ins_taluq_id !== undefined), (ins_taluq_id === 0 ? undefined : ins_taluq_id));

	useEffect(() => {
		setValue("ins_taluq_id", 0)
		setValue("school_id", 0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
}, [ins_district_id]);

useEffect(() => {
		setValue("school_id", 0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
}, [ins_taluq_id]);

const graduation_id = watch("graduation_id");
const course_id = watch("course_id");

const { data: graduations, isFetching: isGraduationFetching, isLoading: isGraduationLoading } = useGraduationCommonSelectQuery(true);
const { data: courses, isFetching: isCourseFetching, isLoading: isCourseLoading } = useCourseCommonSelectQuery((graduation_id !== 0 && graduation_id !== undefined), (graduation_id === 0 ? undefined : graduation_id));
const { data: clases, isFetching: isClassFetching, isLoading: isClassLoading } = useClassCommonSelectQuery((course_id !== 0 && course_id !== undefined), (course_id === 0 ? undefined : course_id));

useEffect(() => {
	setValue("course_id", 0)
	setValue("class_id", 0)
	// eslint-disable-next-line react-hooks/exhaustive-deps
}, [graduation_id]);

useEffect(() => {
	setValue("class_id", 0)
	// eslint-disable-next-line react-hooks/exhaustive-deps
}, [course_id]);

	const onSubmit = handleSubmit(async () => {
		setLoading(true);
		try {
			await axios.post(api_routes.user.auth.register.student, getValues());
			toastSuccess("Registration Successful");
			// reset({
			// 	name: "",
			// 	email: "",
			// 	parent_phone: undefined,
			// });
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

	return <div className="data-table-container">
		<Panel
			bordered
			shaded
			header={
				<Stack justifyContent="center" alignItems="center">
					<div className="text-center">
						<h1 className={classes.main_heading}>Online Scholarship Application Form</h1>
						<h6 className={classes.main_sub_heading}>ಸಂಘಟಿತ ಕಾರ್ಮಿಕ ಮಕ್ಕಳಿಂದ ಶೈಕ್ಷಣಿಕ ಪ್ರೋತ್ಸಾಹ ಧನ ಸಹಾಯಕ್ಕಾಗಿ ಅರ್ಜಿ</h6>
					</div>
				</Stack>
			}
		>
			<Divider />
			<Form onSubmit={()=>onSubmit()} style={{ width: '100%' }}>
				<div className="mb-1">
					<Panel header={
						<div className="text-center">
							<h5 className={classes.inner_main_heading}>Student Details</h5>
							<h6 className={classes.inner_sub_heading}>ವಿದ್ಯಾರ್ಥಿ ವಿವರಗಳು</h6>
						</div>
					} className='info-modal-panel' bordered>
						<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
							<TextInput name="name" label="Name" focus={true} control={control} error={errors.name?.message} />
							<TextInput name="parent_phone" label="Mobile Number" control={control} error={errors.parent_phone?.message} />
							<SelectInput name="gender" label="Gender" data={[{label:'Male', value:'male'}, {label:'Female', value:'female'}, {label:'Other', value:'others'}]} control={control} error={errors.gender?.message} />
						</Stack>
						<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
							<TextInput name="father_name" label="Father's Name" control={control} error={errors.father_name?.message} />
							<TextInput name="mother_name" label="Mother's Name" control={control} error={errors.mother_name?.message} />
						</Stack>
						<TextInput name="address" label="Address" helpText="Do not use any special characters" textarea={true} control={control} error={errors.address?.message} />
					</Panel>
				</div>
				<div className="mb-1">
					<Panel header={
						<div className="text-center">
							<h5 className={classes.inner_main_heading}>Present Institution Details</h5>
							<h6 className={classes.inner_sub_heading}>ಪ್ರಸ್ತುತ ಸಂಸ್ಥೆಯ ವಿವರಗಳು</h6>
						</div>
					} className='info-modal-panel' bordered>
						<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
							<SelectInput name="ins_district_id" label="District" data={cities ? cities.map(item => ({ label: item.name, value: item.id })) : []} loading={isCityFetching || isCityLoading} control={control} error={errors.ins_district_id?.message} />
							<SelectInput name="ins_taluq_id" label="Taluq" data={taluqs ? taluqs.map(item => ({ label: item.name, value: item.id })) : []} disabled={ins_district_id === 0 || ins_district_id === undefined || taluqs === undefined || taluqs.length === 0} loading={isTaluqFetching || isTaluqLoading} control={control} error={errors.ins_taluq_id?.message} />
						</Stack>
						<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
							<div className='institute-select-register'>
								<SelectInput name="school_id" label="Present Institution" data={institutes ? institutes.map(item => ({ label: item.name, value: item.id })) : []} disabled={ins_taluq_id === 0 || ins_taluq_id === undefined || institutes === undefined || institutes.length === 0} loading={isInstituteFetching || isInstituteLoading} control={control} error={errors.school_id?.message} />
								<p><b>Note: </b>Select your institution correctly b'coz they will approve / reject your application</p>
							</div>
							<TextInput name="ins_pin" label="Pincode" control={control} error={errors.ins_pin?.message} />
						</Stack>
						<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
							<SelectInput name="graduation_id" label="Graduation" data={graduations ? graduations.map(item => ({ label: item.name, value: item.id })) : []} loading={isGraduationFetching || isGraduationLoading} control={control} error={errors.graduation_id?.message} />
							<SelectInput name="course_id" label="Course" data={courses ? courses.map(item => ({ label: item.name, value: item.id })) : []} disabled={graduation_id === 0 || graduation_id === undefined || courses === undefined || courses.length === 0} loading={isCourseFetching || isCourseLoading} control={control} error={errors.course_id?.message} />
							<SelectInput name="class_id" label="Present Institution" data={clases ? clases.map(item => ({ label: item.name, value: item.id })) : []} disabled={course_id === 0 || course_id === undefined || clases === undefined || clases.length === 0} loading={isClassFetching || isClassLoading} control={control} error={errors.class_id?.message} />
						</Stack>
					</Panel>
				</div>
				<div className="mb-1">
					<Panel header={
						<div className="text-center">
							<h5 className={classes.inner_main_heading}>Enter Your Previous year Class and Marks</h5>
							<h6 className={classes.inner_sub_heading}>ವಿದ್ಯಾರ್ಥಿಯು ಹಿಂದಿನ ಸಾಲಿನಲ್ಲಿ ತೇರ್ಗಡೆಯಾದ ತರಗತಿ ಮತ್ತು ಪರೀಕ್ಷಯಲ್ಲಿ ಪಡೆದಿರುವ ಅಂಕಗಳನ್ನು ನಮೂದಿಸುವುದು</h6>
						</div>
					} className='info-modal-panel' bordered>
						<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
							<SelectInput name="type" label="Account Belongs To" data={[{label:'Parent', value:'1'}, {label:'Student', value:'2'}]} control={control} error={errors.type?.message} />
							<TextInput name="holder" label="Account Holder Name" control={control} error={errors.holder?.message} />
						</Stack>
						<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
							<TextInput name="bank_name" label="Bank's Name" control={control} error={errors.bank_name?.message} />
							<TextInput name="branch" label="Branch Name" control={control} error={errors.branch?.message} />
						</Stack>
						<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
							<TextInput name="ifsc" label="IFSC code" helpText='Please check zero and letter "O" and input correctly.' control={control} error={errors.ifsc?.message} />
							<TextInput name="acc_no" label="Account Number" control={control} error={errors.acc_no?.message} />
						</Stack>
						<FileInput name="passbook" accept='image/png, image/jpeg, image/jpg' label="Upload Passbook Front Page" helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)" control={control} error={errors.passbook?.message} />
					</Panel>
				</div>
				<div className="mb-1">
					<Panel header={
						<div className="text-center">
							<h5 className={classes.inner_main_heading}>Student Bank Details</h5>
							<h6 className={classes.inner_sub_heading}>ವಿದ್ಯಾರ್ಥಿ ಬ್ಯಾಂಕ್ ವಿವರಗಳು</h6>
						</div>
					} className='info-modal-panel' bordered>
						<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
							<SelectInput name="type" label="Account Belongs To" data={[{label:'Parent', value:'1'}, {label:'Student', value:'2'}]} control={control} error={errors.type?.message} />
							<TextInput name="holder" label="Account Holder Name" control={control} error={errors.holder?.message} />
						</Stack>
						<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
							<TextInput name="bank_name" label="Bank's Name" control={control} error={errors.bank_name?.message} />
							<TextInput name="branch" label="Branch Name" control={control} error={errors.branch?.message} />
						</Stack>
						<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
							<TextInput name="ifsc" label="IFSC code" helpText='Please check zero and letter "O" and input correctly.' control={control} error={errors.ifsc?.message} />
							<TextInput name="acc_no" label="Account Number" control={control} error={errors.acc_no?.message} />
						</Stack>
						<FileInput name="passbook" accept='image/png, image/jpeg, image/jpg' label="Upload Passbook Front Page" helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)" control={control} error={errors.passbook?.message} />
					</Panel>
				</div>
				<Form.Group>
					<ButtonToolbar style={{ width: '100%', justifyContent: 'flex-start', gap: '0px' }}>
							<Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Submit</Button>
							<Link to={page_routes.student.dashboard} style={{ marginLeft: '10px' }}><Button appearance="primary" size='lg' color="red" type='button'>Cancel</Button></Link>
					</ButtonToolbar>
				</Form.Group>
			</Form>
		</Panel>
	</div>
}