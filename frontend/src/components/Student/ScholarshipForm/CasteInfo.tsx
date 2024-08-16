import { Panel, Stack, useMediaQuery } from "rsuite";
import TextInput from "../../FormInput/TextInput";
import SelectInput from "../../FormInput/SelectInput";
import classes from "./index.module.css";
import { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import { ScholarshipFormSchemaType } from "./schema";
import FileInput from "../../FormInput/FileInput";

type PropType = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<ScholarshipFormSchemaType, any>
	errors: FieldErrors<ScholarshipFormSchemaType>
	watch: UseFormWatch<ScholarshipFormSchemaType>
};

export default function CastInfo({ control, errors, watch }: PropType) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
	const is_scst = watch("is_scst");

	return (
		<div className="mb-1">
			<Panel header={
				<div className="text-center">
					<h5 className={classes.inner_main_heading}>Does the student belong to the Scheduled Castes / Scheduled Tribes? If so Xerox copy of the caste certificate obtained from the Tahsildar To be Attached</h5>
					<h6 className={classes.inner_sub_heading}>ವಿದ್ಯಾರ್ಥಿಯು ಪರಿಶಿಷ್ಠ ಜಾತಿ/ಪರಿಶಿಷ್ಠ ಪಂಗಡಗಳಿಗೆ ಸೇರಿದವರೇ ? ಹಾಗಿದ್ದರೆ ತಹಶೀಲ್ದಾರರಿಂದ ಪಡೆದ ಜಾತಿ ಪ್ರಮಾಣ ಪತ್ರದ ಜೆರಾಕ್ಸ್ ಪ್ರತಿಯನ್ನು ಲಗತ್ತಿಸಬೇಕು</h6>
				</div>
			} className='info-modal-panel' bordered>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
					<SelectInput name="is_scst" label="Scheduled Castes / Scheduled Tribes?" data={[{ label: 'Yes', value: '1' }, { label: 'No', value: '0' }]} control={control} error={errors.is_scst?.message} />
					{is_scst === '1' && <SelectInput name="category" label="Category" data={[{ label: 'SC', value: 'sc' }, { label: 'ST', value: 'st' }]} control={control} error={errors.category?.message} />}
					{is_scst === '0' && <SelectInput name="category" label="Category" data={[{ label: 'General', value: 'general' }, { label: 'OBC', value: 'obc' }]} control={control} error={errors.category?.message} />}
				</Stack>
				{is_scst === '1' && <Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
					<FileInput name="cast_certificate" accept='image/png, image/jpeg, image/jpg' label="Attach Cast Certificate" helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)" control={control} error={errors.cast_certificate?.message} />
					<TextInput name="cast_no" label="Caste certificate number" control={control} error={errors.cast_no?.message} />
				</Stack>}
			</Panel>
		</div>
	)
}
