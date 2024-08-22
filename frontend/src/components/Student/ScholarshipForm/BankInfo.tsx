import { Panel, Stack, useMediaQuery } from "rsuite";
import TextInput from "../../FormInput/TextInput";
import classes from "./index.module.css";
import { Control, FieldErrors } from "react-hook-form";
import { ScholarshipFormSchemaType } from "./schema";
import FileInput from "../../FormInput/FileInput";
import SelectInput from "../../FormInput/SelectInput";
import FileViewer from "../../FileViewer";

type PropType = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<ScholarshipFormSchemaType, any>
	errors: FieldErrors<ScholarshipFormSchemaType>
	type?: "apply" | "resubmit";
	passbook?: string | null
};

export default function BankInfo({ control, errors, type="apply", passbook }: PropType) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');

	return (
		<div className="mb-1">
			<Panel header={
				<div className="text-center">
					<h5 className={classes.inner_main_heading}>Student Bank Details</h5>
					<h6 className={classes.inner_sub_heading}>ವಿದ್ಯಾರ್ಥಿ ಬ್ಯಾಂಕ್ ವಿವರಗಳು</h6>
				</div>
			} className='info-modal-panel' bordered>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
					<SelectInput name="type" label="Account Belongs To" data={[{ label: 'Parent', value: '1' }, { label: 'Student', value: '2' }]} control={control} error={errors.type?.message} />
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
				{(type === "resubmit" && passbook) && <FileViewer src={passbook} />}
			</Panel>
		</div>
	)
}
