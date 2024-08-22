import { Panel, Stack, useMediaQuery } from "rsuite";
import TextInput from "../../FormInput/TextInput";
import SelectInput from "../../FormInput/SelectInput";
import classes from "./index.module.css";
import { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import { ScholarshipFormSchemaType } from "./schema";
import FileInput from "../../FormInput/FileInput";
import FileViewer from "../../FileViewer";

type PropType = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<ScholarshipFormSchemaType, any>
	errors: FieldErrors<ScholarshipFormSchemaType>
	watch: UseFormWatch<ScholarshipFormSchemaType>
	type?: "apply" | "resubmit";
	prv_markcard?: string | null;
	prv_markcard2?: string | null;
};

export default function MarksInfo({ control, errors, watch, type = "apply", prv_markcard, prv_markcard2 }: PropType) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
	const marks_card_type = watch("marks_card_type");

	return (
		<div className="mb-1">
			<Panel header={
				<div className="text-center">
					<h5 className={classes.inner_main_heading}>Enter Your Previous year Class and Marks</h5>
					<h6 className={classes.inner_sub_heading}>ವಿದ್ಯಾರ್ಥಿಯು ಹಿಂದಿನ ಸಾಲಿನಲ್ಲಿ ತೇರ್ಗಡೆಯಾದ ತರಗತಿ ಮತ್ತು ಪರೀಕ್ಷಯಲ್ಲಿ ಪಡೆದಿರುವ ಅಂಕಗಳನ್ನು ನಮೂದಿಸುವುದು</h6>
				</div>
			} className='info-modal-panel' bordered>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
					<TextInput name="prv_class" label="Previous Standard" control={control} error={errors.prv_class?.message} />
					<TextInput name="prv_marks" label="Previous Marks" control={control} error={errors.prv_marks?.message} />
					<SelectInput name="marks_card_type" label="Marks Card Type" data={[{ label: 'Yearly', value: '1' }, { label: 'Semester Wise', value: '0' }]} control={control} error={errors.marks_card_type?.message} />
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
					<div>
						<FileInput name="prv_markcard" accept='image/png, image/jpeg, image/jpg' label="Attach Your Marks Card Copy" helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)" control={control} error={errors.prv_markcard?.message} />
						{(type === "resubmit" && prv_markcard) && <FileViewer src={prv_markcard} />}
					</div>
					{marks_card_type === '0' && 
					<div>
						<FileInput name="prv_markcard2" accept='image/png, image/jpeg, image/jpg' label="Attach Your Marks Card Copy" helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)" control={control} error={errors.prv_markcard2?.message} />
						{(type === "resubmit" && prv_markcard2) && <FileViewer src={prv_markcard2} />}
					</div>
					}
					<div></div>
				</Stack>
			</Panel>
		</div>
	)
}
