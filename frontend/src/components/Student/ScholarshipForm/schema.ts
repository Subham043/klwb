import * as yup from 'yup';
import { FileType } from "rsuite/esm/Uploader";

export type ScholarshipFormSchemaType = {
	name: string;
	father_name: string;
	mother_name: string;
	parent_phone: number;
	address: string;
	gender: string;
	is_scst: string;
	cast_no?: string;
	cast_certificate?: FileType[] | undefined;
	category: string;
	ins_pin: string;
	ins_district_id: number;
	ins_taluq_id: number;
	school_id: number;
	graduation_id: number;
	course_id?: number;
	class_id?: number;
	prv_class: string;
	prv_marks: number;
	marks_card_type: string;
	prv_markcard?: FileType[] | undefined;
	prv_markcard2?: FileType[] | undefined;
	type: string;
	bank_name: string;
	branch: string;
	ifsc: string;
	acc_no: number;
	holder: string;
	passbook?: FileType[] | undefined;
	who_working: string;
	parent_guardian_name: string;
	relationship: string;
	msalary: number;
	pincode: string;
	district_id: number;
	taluq_id: number;
	company_id: number;
	salaryslip?: FileType[] | undefined;
	adharcard_no: number;
	adharcard_file?: FileType[] | undefined;
	f_adhar?: number;
	f_adharfile?: FileType[] | undefined;
	m_adhar?: number;
	m_adharfile?: FileType[] | undefined;
	not_applicable?: string | undefined;
	deathcertificate?: FileType[] | undefined;
};

export const scholarshipFormSchema: yup.ObjectSchema<ScholarshipFormSchemaType> = yup
	.object().shape({
		name: yup.string().typeError("Name must contain characters only").max(250).required("Name is required"),
		father_name: yup.string().typeError("Father\'s Name must contain characters only").max(250).required("Father\'s Name is required"),
		mother_name: yup.string().typeError("Mother\'s Name must contain characters only").max(250).required("Mother\'s Name is required"),
		parent_phone: yup.number().typeError("Mobile Number must contain numbers only").positive().required("Mobile Number is required"),
		address: yup.string().typeError("Address must contain characters only").required("Address is required"),
		gender: yup.string().typeError("Gender must contain characters only").required("Gender is required"),
		is_scst: yup.string().typeError("Is  Scheduled Castes / Scheduled Tribes must contain characters only").required("Is  Scheduled Castes / Scheduled Tribes is required"),
		cast_no: yup.string().typeError("Cast Certificate Number must contain characters only").max(250).when("is_scst", {
			is: "1",
			then: (schema) => schema.required("Cast Certificate Number is required"),
			otherwise: (schema) => schema.notRequired(),
		}),
		cast_certificate: yup
			.mixed<FileType[]>().when("is_scst", {
				is: "1",
				then: (schema) => schema.test("fileRequired", "Cast Certificate is required", (value) => {
					if (value === undefined || value.length === 0) return false;
					return true;
				})
					.test("fileFormat", "Please select a valid cast certificate", (value) => {
						if (value === undefined || value.length === 0) {
							return false;
						} else {
							return ["image/jpeg", "image/jpg", "image/png"].includes(
								value[value.length - 1].blobFile!.type
							);
						}
					})
					.transform((value) => (((value !== undefined && value.length > 0) && (value[value.length - 1].blobFile instanceof File)) ? value : undefined))
					.required("Cast Certificate is required"),
				otherwise: (schema) => schema.notRequired(),
			}),
		category: yup.string().typeError("Cast Category must contain characters only").required("Cast Category is required"),
		ins_pin: yup.string().typeError("Pincode must contain characters only").required("Pincode is required"),
		ins_district_id: yup.number().typeError("District must contain numbers only").required("District is required").test("notZero", "District is required", (value) => !(value === 0)),
		ins_taluq_id: yup.number().typeError("Taluq must contain numbers only").required("Taluq is required").test("notZero", "Taluq is required", (value) => !(value === 0)),
		school_id: yup.number().typeError("Present institution must contain numbers only").required("Present institution is required").test("notZero", "Present institution is required", (value) => !(value === 0)),
		graduation_id: yup.number().typeError("Graduation must contain numbers only").required("Graduation is required").test("notZero", "Graduation is required", (value) => !(value === 0)),
		course_id: yup.number().typeError("Course must contain numbers only").optional(),
		class_id: yup.number().typeError("Class must contain numbers only").optional(),
		prv_class: yup.string().typeError("Previous Class must contain characters only").max(250).required("Previous Class is required"),
		prv_marks: yup.number().typeError("Previous Marks must contain numbers only").positive().required("Previous Marks is required"),
		marks_card_type: yup.string().typeError("Marks Card type must contain characters only").required("Marks Card type is required"),
		prv_markcard: yup
			.mixed<FileType[]>()
			.test("fileRequired", "Previous year marks card is required", (value) => {
				if (value === undefined || value.length === 0) return false;
				return true;
			})
			.test("fileFormat", "Please select a valid previous year marks card", (value) => {
				if (value === undefined || value.length === 0) {
					return false;
				} else {
					return ["image/jpeg", "image/jpg", "image/png"].includes(
						value[value.length - 1].blobFile!.type
					);
				}
			})
			.transform((value) => (((value !== undefined && value.length > 0) && (value[value.length - 1].blobFile instanceof File)) ? value : undefined))
			.required("Previous year marks card is required"),
		prv_markcard2: yup
			.mixed<FileType[]>().when("marks_card_type", {
				is: "0",
				then: (schema) => schema.test("fileRequired", "Previous year marks card is required", (value) => {
					if (value === undefined || value.length === 0) return false;
					return true;
				})
					.test("fileFormat", "Please select a valid previous year marks card", (value) => {
						if (value === undefined || value.length === 0) {
							return false;
						} else {
							return ["image/jpeg", "image/jpg", "image/png"].includes(
								value[value.length - 1].blobFile!.type
							);
						}
					})
					.transform((value) => (((value !== undefined && value.length > 0) && (value[value.length - 1].blobFile instanceof File)) ? value : undefined))
					.required("Previous year marks card is required"),
				otherwise: (schema) => schema.notRequired(),
			}),
		type: yup.string().typeError("Account Belongs To must contain characters only").required("Account Belongs To is required"),
		bank_name: yup.string().typeError("Bank Name must contain characters only").max(250).required("Bank Name is required"),
		branch: yup.string().typeError("Branch Name must contain characters only").max(250).required("Branch Name is required"),
		ifsc: yup.string().typeError("IFSC code must contain characters only").max(250).required("IFSC code is required"),
		acc_no: yup.number().typeError("Account Number must contain numbers only").positive().required("Account Number is required"),
		holder: yup.string().typeError("Account Holder Name must contain characters only").max(250).required("Account Holder Name is required"),
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
						value[value.length - 1].blobFile!.type
					);
				}
			})
			.transform((value) => (((value !== undefined && value.length > 0) && (value[value.length - 1].blobFile instanceof File)) ? value : undefined))
			.required("Passbook is required"),
		who_working: yup.string().typeError("Who's Working type must contain characters only").required("Who's Working type is required"),
		parent_guardian_name: yup.string().typeError("Parent/Guardian Name type must contain characters only").max(250).required("Parent/Guardian Name type is required"),
		relationship: yup.string().typeError("Relationship type must contain characters only").max(250).required("Relationship type is required"),
		msalary: yup.number().typeError("Monthly Salary must contain numbers only").positive().lessThan(30001, "Monthly Salary should be less than or equal to 30,000").required("Monthly Salary is required"),
		pincode: yup.string().typeError("Pincode must contain characters only").required("Pincode is required"),
		district_id: yup.number().typeError("District must contain numbers only").required("District is required").test("notZero", "District is required", (value) => !(value === 0)),
		taluq_id: yup.number().typeError("Taluq must contain numbers only").required("Taluq is required").test("notZero", "Taluq is required", (value) => !(value === 0)),
		company_id: yup.number().typeError("Parent Industry name must contain numbers only").required("Parent Industry name is required").test("notZero", "Parent Industry name is required", (value) => !(value === 0)),
		salaryslip: yup
			.mixed<FileType[]>()
			.test("fileRequired", "Salary Slip is required", (value) => {
				if (value === undefined || value.length === 0) return false;
				return true;
			})
			.test("fileFormat", "Please select a valid salary slip", (value) => {
				if (value === undefined || value.length === 0) {
					return false;
				} else {
					return ["image/jpeg", "image/jpg", "image/png"].includes(
						value[value.length - 1].blobFile!.type
					);
				}
			})
			.transform((value) => (((value !== undefined && value.length > 0) && (value[value.length - 1].blobFile instanceof File)) ? value : undefined))
			.required("Salary Slip is required"),
		not_applicable: yup.string().typeError("Not Applicable must contain characters only").optional(),
		adharcard_no: yup.number().typeError("Aadhar Card Number must contain numbers only").required("Aadhar Card Number is required"),
		adharcard_file: yup
			.mixed<FileType[]>()
			.test("fileRequired", "Aadhar Card is required", (value) => {
				if (value === undefined || value.length === 0) return false;
				return true;
			})
			.test("fileFormat", "Please select a valid aadhar card", (value) => {
				if (value === undefined || value.length === 0) {
					return false;
				} else {
					return ["image/jpeg", "image/jpg", "image/png"].includes(
						value[value.length - 1].blobFile!.type
					);
				}
			})
			.transform((value) => (((value !== undefined && value.length > 0) && (value[value.length - 1].blobFile instanceof File)) ? value : undefined))
			.required("Aadhar Card is required"),
		f_adhar: yup.number().typeError("Faher's Aadhar Card Number must contain numbers only").when("not_applicable", {
			is: (value: string | undefined) => (value === undefined) || (value === 'mother'),
			then: (schema) => schema.required("Faher's Aadhar Card Number is required"),
			otherwise: (schema) => schema.notRequired(),
		}),
		f_adharfile: yup
			.mixed<FileType[]>().when("not_applicable", {
				is: (value: string | undefined) => (value === undefined) || (value === 'mother'),
				then: (schema) => schema.test("fileRequired", "Faher's Aadhar Card is required", (value) => {
					if (value === undefined || value.length === 0) return false;
					return true;
				})
					.test("fileFormat", "Please select a valid father's aadhar card", (value) => {
						if (value === undefined || value.length === 0) {
							return false;
						} else {
							return ["image/jpeg", "image/jpg", "image/png"].includes(
								value[value.length - 1].blobFile!.type
							);
						}
					})
					.transform((value) => (((value !== undefined && value.length > 0) && (value[value.length - 1].blobFile instanceof File)) ? value : undefined))
					.required("Faher's Aadhar Card is required"),
				otherwise: (schema) => schema.notRequired(),
			}),
		m_adhar: yup.number().typeError("Mother's Aadhar Card Number must contain numbers only").when("not_applicable", {
			is: (value: string | undefined) => (value === undefined) || (value === 'father'),
			then: (schema) => schema.required("Mother's Aadhar Card Number is required"),
			otherwise: (schema) => schema.notRequired(),
		}),
		m_adharfile: yup
			.mixed<FileType[]>().when("not_applicable", {
				is: (value: string | undefined) => (value === undefined) || (value === 'father'),
				then: (schema) => schema.test("fileRequired", "Mother's Aadhar Card is required", (value) => {
					if (value === undefined || value.length === 0) return false;
					return true;
				})
					.test("fileFormat", "Please select a valid mother's aadhar card", (value) => {
						if (value === undefined || value.length === 0) {
							return false;
						} else {
							return ["image/jpeg", "image/jpg", "image/png"].includes(
								value[value.length - 1].blobFile!.type
							);
						}
					})
					.transform((value) => (((value !== undefined && value.length > 0) && (value[value.length - 1].blobFile instanceof File)) ? value : undefined))
					.required("Mother's Aadhar Card is required"),
				otherwise: (schema) => schema.notRequired(),
			}),
		deathcertificate: yup
			.mixed<FileType[]>().when("not_applicable", {
				is: (value: string | undefined) => (value === 'father') || (value === 'mother'),
				then: (schema) => schema.test("fileRequired", "Death Certificate is required", (value) => {
					if (value === undefined || value.length === 0) return false;
					return true;
				})
				.test("fileFormat", "Please select a valid death certificate", (value) => {
					if (value === undefined || value.length === 0) {
						return false;
					} else {
						return ["image/jpeg", "image/jpg", "image/png"].includes(
							value[value.length - 1].blobFile!.type
						);
					}
				})
				.transform((value) => (((value !== undefined && value.length > 0) && (value[value.length - 1].blobFile instanceof File)) ? value : undefined))
				.required("Death Certificate is required"),
				otherwise: (schema) => schema.notRequired(),
			}),
	})
	.required();

	export const scholarshipFormInitialValues = {
		name: '',
		father_name: '',
		mother_name: '',
		parent_phone: 0,
		address: '',
		gender: '',
		is_scst: '',
		cast_no: '',
		cast_certificate: undefined,
		category: '',
		ins_pin: '',
		ins_district_id: 0,
		ins_taluq_id: 0,
		school_id: 0,
		graduation_id: 0,
		course_id: undefined,
		class_id: undefined,
		prv_class: '',
		prv_marks: 0,
		marks_card_type: '',
		prv_markcard: undefined,
		prv_markcard2: undefined,
		type: '',
		bank_name: '',
		branch: '',
		ifsc: '',
		acc_no: 0,
		holder: '',
		passbook: undefined,
		who_working: '',
		parent_guardian_name: '',
		relationship: '',
		msalary: 0,
		pincode: '',
		district_id: 0,
		taluq_id: 0,
		company_id: 0,
		salaryslip: undefined,
		adharcard_no: 0,
		adharcard_file: undefined,
		f_adhar: undefined,
		f_adharfile: undefined,
		m_adhar: undefined,
		m_adharfile: undefined,
		not_applicable: undefined,
		deathcertificate: undefined,
	};

	export const scholarshipResubmitFormSchema: yup.ObjectSchema<ScholarshipFormSchemaType> = yup
	.object().shape({
		name: yup.string().typeError("Name must contain characters only").max(250).required("Name is required"),
		father_name: yup.string().typeError("Father\'s Name must contain characters only").max(250).required("Father\'s Name is required"),
		mother_name: yup.string().typeError("Mother\'s Name must contain characters only").max(250).required("Mother\'s Name is required"),
		parent_phone: yup.number().typeError("Mobile Number must contain numbers only").positive().required("Mobile Number is required"),
		address: yup.string().typeError("Address must contain characters only").required("Address is required"),
		gender: yup.string().typeError("Gender must contain characters only").required("Gender is required"),
		is_scst: yup.string().typeError("Is  Scheduled Castes / Scheduled Tribes must contain characters only").required("Is  Scheduled Castes / Scheduled Tribes is required"),
		cast_no: yup.string().typeError("Cast Certificate Number must contain characters only").max(250).when("is_scst", {
			is: "1",
			then: (schema) => schema.required("Cast Certificate Number is required"),
			otherwise: (schema) => schema.notRequired(),
		}),
		cast_certificate: yup.mixed<FileType[]>().optional(),
		category: yup.string().typeError("Cast Category must contain characters only").required("Cast Category is required"),
		ins_pin: yup.string().typeError("Pincode must contain characters only").required("Pincode is required"),
		ins_district_id: yup.number().typeError("District must contain numbers only").required("District is required").test("notZero", "District is required", (value) => !(value === 0)),
		ins_taluq_id: yup.number().typeError("Taluq must contain numbers only").required("Taluq is required").test("notZero", "Taluq is required", (value) => !(value === 0)),
		school_id: yup.number().typeError("Present institution must contain numbers only").required("Present institution is required").test("notZero", "Present institution is required", (value) => !(value === 0)),
		graduation_id: yup.number().typeError("Graduation must contain numbers only").required("Graduation is required").test("notZero", "Graduation is required", (value) => !(value === 0)),
		course_id: yup.number().typeError("Course must contain numbers only").optional(),
		class_id: yup.number().typeError("Class must contain numbers only").optional(),
		prv_class: yup.string().typeError("Previous Class must contain characters only").max(250).required("Previous Class is required"),
		prv_marks: yup.number().typeError("Previous Marks must contain numbers only").positive().required("Previous Marks is required"),
		marks_card_type: yup.string().typeError("Marks Card type must contain characters only").required("Marks Card type is required"),
		prv_markcard: yup.mixed<FileType[]>().optional(),
		prv_markcard2: yup.mixed<FileType[]>().optional(),
		type: yup.string().typeError("Account Belongs To must contain characters only").required("Account Belongs To is required"),
		bank_name: yup.string().typeError("Bank Name must contain characters only").max(250).required("Bank Name is required"),
		branch: yup.string().typeError("Branch Name must contain characters only").max(250).required("Branch Name is required"),
		ifsc: yup.string().typeError("IFSC code must contain characters only").max(250).required("IFSC code is required"),
		acc_no: yup.number().typeError("Account Number must contain numbers only").positive().required("Account Number is required"),
		holder: yup.string().typeError("Account Holder Name must contain characters only").max(250).required("Account Holder Name is required"),
		passbook: yup.mixed<FileType[]>().optional(),
		who_working: yup.string().typeError("Who's Working type must contain characters only").required("Who's Working type is required"),
		parent_guardian_name: yup.string().typeError("Parent/Guardian Name type must contain characters only").max(250).required("Parent/Guardian Name type is required"),
		relationship: yup.string().typeError("Relationship type must contain characters only").max(250).required("Relationship type is required"),
		msalary: yup.number().typeError("Monthly Salary must contain numbers only").positive().lessThan(30001, "Monthly Salary should be less than or equal to 30,000").required("Monthly Salary is required"),
		pincode: yup.string().typeError("Pincode must contain characters only").required("Pincode is required"),
		district_id: yup.number().typeError("District must contain numbers only").required("District is required").test("notZero", "District is required", (value) => !(value === 0)),
		taluq_id: yup.number().typeError("Taluq must contain numbers only").required("Taluq is required").test("notZero", "Taluq is required", (value) => !(value === 0)),
		company_id: yup.number().typeError("Parent Industry name must contain numbers only").required("Parent Industry name is required").test("notZero", "Parent Industry name is required", (value) => !(value === 0)),
		salaryslip: yup.mixed<FileType[]>().optional(),
		not_applicable: yup.string().typeError("Not Applicable must contain characters only").optional(),
		adharcard_no: yup.number().typeError("Aadhar Card Number must contain numbers only").required("Aadhar Card Number is required"),
		adharcard_file: yup.mixed<FileType[]>().optional(),
		f_adhar: yup.number().typeError("Faher's Aadhar Card Number must contain numbers only").when("not_applicable", {
			is: (value: string | undefined) => (value === undefined) || (value === 'mother'),
			then: (schema) => schema.required("Faher's Aadhar Card Number is required"),
			otherwise: (schema) => schema.notRequired(),
		}),
		f_adharfile: yup.mixed<FileType[]>().optional(),
		m_adhar: yup.number().typeError("Mother's Aadhar Card Number must contain numbers only").when("not_applicable", {
			is: (value: string | undefined) => (value === undefined) || (value === 'father'),
			then: (schema) => schema.required("Mother's Aadhar Card Number is required"),
			otherwise: (schema) => schema.notRequired(),
		}),
		m_adharfile: yup.mixed<FileType[]>().optional(),
		deathcertificate: yup.mixed<FileType[]>().optional(),
	})
	.required();