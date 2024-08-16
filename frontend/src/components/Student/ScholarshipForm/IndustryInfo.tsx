import { Panel, Stack, useMediaQuery } from "rsuite";
import TextInput from "../../FormInput/TextInput";
import SelectInput from "../../FormInput/SelectInput";
import classes from "./index.module.css";
import { Control, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ScholarshipFormSchemaType } from "./schema";
import { useEffect } from "react";
import { useCityCommonSelectQuery } from "../../../hooks/data/city";
import { useTaluqCommonSelectQuery } from "../../../hooks/data/taluq";
import FileInput from "../../FormInput/FileInput";
import { useRegisteredIndustryUserCommonSelectQuery } from "../../../hooks/data/registered_industry";

type PropType = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<ScholarshipFormSchemaType, any>
	errors: FieldErrors<ScholarshipFormSchemaType>
	watch: UseFormWatch<ScholarshipFormSchemaType>
	setValue: UseFormSetValue<ScholarshipFormSchemaType>
};

export default function IndustryInfo({ control, errors, watch, setValue }: PropType) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
	const district_id = watch("district_id");
	const taluq_id = watch("taluq_id");

	const { data: cities2, isFetching: isCity2Fetching, isLoading: isCity2Loading } = useCityCommonSelectQuery(true);
	const { data: taluqs2, isFetching: isTaluq2Fetching, isLoading: isTaluq2Loading } = useTaluqCommonSelectQuery((district_id !== 0 && district_id !== undefined), (district_id === 0 ? undefined : district_id));
	const { data: industries, isFetching: isIndustryFetching, isLoading: isIndustryLoading } = useRegisteredIndustryUserCommonSelectQuery((taluq_id !== 0 && taluq_id !== undefined), (taluq_id === 0 ? undefined : taluq_id));

	useEffect(() => {
		setValue("taluq_id", 0)
		setValue("company_id", 0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [district_id]);

	useEffect(() => {
		setValue("company_id", 0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [taluq_id]);

	return (
		<div className="mb-1">
			<Panel header={
				<div className="text-center">
					<h5 className={classes.inner_main_heading}>Industry Details</h5>
					<h6 className={classes.inner_sub_heading}>ಉದ್ಯಮದ ವಿವರಗಳು</h6>
				</div>
			} className='info-modal-panel' bordered>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
					<SelectInput name="who_working" label="Who's Working" data={[{ label: 'Father', value: '1' }, { label: 'Mother', value: '2' }]} control={control} error={errors.who_working?.message} />
					<TextInput name="parent_guardian_name" label="Parent/Guardian Name" control={control} error={errors.parent_guardian_name?.message} />
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
					<TextInput name="relationship" label="Relation between Student & Parent" control={control} error={errors.relationship?.message} />
					<TextInput name="msalary" label="Monthly Salary" control={control} error={errors.msalary?.message} />
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
					<SelectInput name="district_id" label="District" data={cities2 ? cities2.map(item => ({ label: item.name, value: item.id })) : []} loading={isCity2Fetching || isCity2Loading} control={control} error={errors.district_id?.message} />
					<SelectInput name="taluq_id" label="Taluq" data={taluqs2 ? taluqs2.map(item => ({ label: item.name, value: item.id })) : []} disabled={district_id === 0 || district_id === undefined || taluqs2 === undefined || taluqs2.length === 0} loading={isTaluq2Fetching || isTaluq2Loading} control={control} error={errors.taluq_id?.message} />
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack mb-1'>
					<div className='institute-select-register'>
						<SelectInput name="company_id" label="Parent Industry Name" data={industries ? industries.map(item => ({ label: item.name, value: item.id })) : []} disabled={taluq_id === 0 || taluq_id === undefined || industries === undefined || industries.length === 0} loading={isIndustryFetching || isIndustryLoading} control={control} error={errors.company_id?.message} />
						<p><b>Note: </b>Select your parent industry correctly b'coz they will approve / reject your application</p>
					</div>
					<TextInput name="pincode" label="Pincode" control={control} error={errors.pincode?.message} />
				</Stack>
				<FileInput name="salaryslip" accept='image/png, image/jpeg, image/jpg' label="Attach Your Parent Employee Certification / Salary-Slip of Last Month" helpText=" Last month salary slips are only accepted. Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)" control={control} error={errors.salaryslip?.message} />
			</Panel>
		</div>
	)
}
