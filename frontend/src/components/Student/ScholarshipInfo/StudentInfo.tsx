import { Panel, Stack, HeadingGroup, Heading, Text, useMediaQuery } from "rsuite"
import { StudentApplicationType } from "../../../utils/types";
import classes from './index.module.css';
import Moment from "../../Moment";

type Props = {
	data: StudentApplicationType;
}

function StudentInfo({ data }: Props) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
		return (
			<div className="mb-1">
			<Panel header={
				<div className="text-center">
					<h5 className={classes.inner_main_heading}>Student Details</h5>
				</div>
			} className='info-modal-panel' bordered>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Application Number</Heading>
						<Text>{data?.id}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Name</Heading>
						<Text>{data?.basic_detail.name}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Father Name</Heading>
						<Text>{data?.basic_detail.father_name}</Text>
					</HeadingGroup>
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Mother Name</Heading>
						<Text>{data?.basic_detail.mother_name}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Mobile Number</Heading>
						<Text>{data?.basic_detail.parent_phone}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Gender</Heading>
						<Text>{data?.basic_detail.gender}</Text>
					</HeadingGroup>
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Amount</Heading>
						<Text>{data?.basic_detail.name}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Graduation</Heading>
						<Text>{data?.basic_detail.name}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Present class / Course</Heading>
						<Text>{data?.basic_detail.name}</Text>
					</HeadingGroup>
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Present School Name</Heading>
						<Text>{data?.present_institute_name}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Present School Address</Heading>
						<Text>{data?.present_institute_address}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Student Present Address</Heading>
						<Text>{data?.basic_detail.address}</Text>
					</HeadingGroup>
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Application Year</Heading>
						<Text>{data?.application_year}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Applied On</Heading>
						<Text><Moment datetime={data?.date} /></Text>
					</HeadingGroup>
					<div></div>
				</Stack>
			</Panel>
			</div>
		)
}

export default StudentInfo