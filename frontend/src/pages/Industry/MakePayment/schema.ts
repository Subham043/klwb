import * as yup from 'yup';
import { FileType } from "rsuite/esm/Uploader";

export type PaymentFormSchemaType = {
	year: number;
	male: number;
	female: number;
	employee_excel?: FileType[] | undefined;
	term1: boolean;
	term2: boolean;
};

export const paymentFormSchema: yup.ObjectSchema<PaymentFormSchemaType> = yup
	.object().shape({
		year: yup.number().typeError("Year must contain numbers only").required("Year is required").test("notZero", "Year is required", (value) => !(value === 0)),
		male: yup.number().typeError("Male Employees must contain numbers only").required("Male Employees is required"),
		female: yup.number().typeError("Female Employees must contain numbers only").required("Female Employees is required"),
		term1: yup.boolean().required("Please accept terms and conditions").test("notFalse", "Please accept terms and conditions", (value) => !(value === false)),
		term2: yup.boolean().required("Please accept terms and conditions").test("notFalse", "Please accept terms and conditions", (value) => !(value === false)),
		employee_excel: yup
			.mixed<FileType[]>()
			.test("fileRequired", "Employee excel is required", (value) => {
				if (value === undefined || value.length === 0) return false;
				return true;
			})
			.test("fileFormat", "Please select a valid employee excel", (value) => {
				if (value === undefined || value.length === 0) {
					return false;
				} else {
					return ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(
						value[value.length - 1].blobFile!.type
					);
				}
			})
			.transform((value) => (((value !== undefined && value.length > 0) && (value[value.length - 1].blobFile instanceof File)) ? value : undefined))
			.required("Employee excel is required"),
	})
	.required();

	export const paymentFormInitialValues = {
		year: 0,
		male: 0,
		female: 0,
		employee_excel: undefined,
		term1: false,
		term2: false
	};