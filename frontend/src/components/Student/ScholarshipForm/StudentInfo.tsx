import { Panel, Stack, useMediaQuery } from "rsuite";
import TextInput from "../../FormInput/TextInput";
import SelectInput from "../../FormInput/SelectInput";
import classes from "./index.module.css";
import { Control, FieldErrors } from "react-hook-form";
import { ScholarshipFormSchemaType } from "./schema";

type PropType = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<ScholarshipFormSchemaType, any>
	errors: FieldErrors<ScholarshipFormSchemaType>
};

export default function StudentInfo({ control, errors }: PropType) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
	return (
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
					<SelectInput name="gender" label="Gender" data={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'Other', value: 'others' }]} control={control} error={errors.gender?.message} />
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
					<TextInput name="father_name" label="Father's Name" control={control} error={errors.father_name?.message} />
					<TextInput name="mother_name" label="Mother's Name" control={control} error={errors.mother_name?.message} />
				</Stack>
				<TextInput name="address" label="Address" helpText="Do not use any special characters" textarea={true} control={control} error={errors.address?.message} />
			</Panel>
		</div>
	)
}
