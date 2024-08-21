import { Panel, Stack, HeadingGroup, Heading, Text, useMediaQuery } from "rsuite"
import { StudentApplicationType } from "../../../utils/types";
import classes from './index.module.css';
import FileViewer from "../../FileViewer";

type Props = {
	data: StudentApplicationType;
}

function IndustryInfo({ data }: Props) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
	return (
		<div className="mb-1">
			<Panel header={
				<div className="text-center">
					<h5 className={classes.inner_main_heading}>Industry Detail</h5>
				</div>
			} className='info-modal-panel' bordered>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Parent / Guardian Name</Heading>
						<Text>{data?.company.parent_guardian_name}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Who is Working</Heading>
						<Text>{data?.company.who_working.toString()==='1' ? "Father" : "Mother"}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Relationship between student & parent</Heading>
						<Text>{data?.company.relationship}</Text>
					</HeadingGroup>
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Monthly Salary</Heading>
						<Text>{data?.company.msalary}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Industry Name</Heading>
						<Text>{data?.industry_name}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Pin Code</Heading>
						<Text>{data?.company.pincode}</Text>
					</HeadingGroup>
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Taluk</Heading>
						<Text>{data?.company.taluq?.name}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>District</Heading>
						<Text>{data?.company.district?.name}</Text>
					</HeadingGroup>
					{data?.company.salaryslip && <HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Salary Slip</Heading>
						<FileViewer src={data?.company.salaryslip} />
					</HeadingGroup>}
				</Stack>
			</Panel>
		</div>
	)
}

export default IndustryInfo