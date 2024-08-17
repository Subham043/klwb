import { Button, ButtonToolbar, Divider, Heading, HeadingGroup, Panel, Stack, Text, useMediaQuery } from "rsuite";
import classes from './index.module.css';
import { useScholarshipStatusQuery } from "../../../hooks/data/scholarship_status";
import ScholarshipStatus from "../../../components/Student/ScholarshipStatus";


export default function StudentScholarshipStatusPage() {
	const {data, isFetching, isLoading, isRefetching, refetch, error} = useScholarshipStatusQuery();
	const [isMobile] = useMediaQuery('(max-width: 700px)');

	return <div className="data-table-container">
	<Panel
		bordered
		shaded
		className='mb-1'
		header={
			<Stack justifyContent="space-between">
				<Heading level={6} className="text-brand">Scholarship Application Status</Heading>
				<ButtonToolbar>
					<Button appearance="primary" color="green" size="sm">Download</Button>
				</ButtonToolbar>
		</Stack>
		}
	>
		<Divider />
		<ScholarshipStatus />
		{/* <ErrorBoundaryLayout loading={isRefetching} error={error} refetch={refetch}>
			<div style={{ width: "100%", position: "relative" }}>
				
			</div>
		</ErrorBoundaryLayout> */}
	</Panel>
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
		{/* <ErrorBoundaryLayout loading={isRefetching} error={error} refetch={refetch}>
			<div style={{ width: "100%", position: "relative" }}>
				
			</div>
		</ErrorBoundaryLayout> */}
		<div className="mb-1">
		<Panel header={
			<div className="text-center">
				<h5 className={classes.inner_main_heading}>Student Details</h5>
			</div>
		} className='info-modal-panel' bordered>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Application Number</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Name</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Father Name</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Mother Name</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Mobile Number</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Gender</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Amount</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Graduation</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Present class / Course</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Present School Name</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Present School Address</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Student Present Address</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Application Year</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Applied On</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<div></div>
			</Stack>
		</Panel>
		</div>
		<div className="mb-1">
		<Panel header={
			<div className="text-center">
				<h5 className={classes.inner_main_heading}>Previous Year Class and Marks</h5>
			</div>
		} className='info-modal-panel' bordered>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Class Name</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Marks</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Marks Card Type</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Marks Card Copy</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>2nd Marks Card Copy</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<div></div>
			</Stack>
		</Panel>
		</div>
		<div className="mb-1">
		<Panel header={
			<div className="text-center">
				<h5 className={classes.inner_main_heading}>Scheduled Caste / Scheduled Tribes? Certificate</h5>
			</div>
		} className='info-modal-panel' bordered>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Scheduled Caste / Scheduled Tribes</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Category</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Caste Certificate Number</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Caste Certificate</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
		</Panel>
		</div>
		<div className="mb-1">
		<Panel header={
			<div className="text-center">
				<h5 className={classes.inner_main_heading}>Industry Detail</h5>
			</div>
		} className='info-modal-panel' bordered>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Parent / Guardian Name</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Who is Working</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Relationship between student & parent</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Monthly Salary</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Industry Name</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Pin Code</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Taluk</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>District</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Salary Slip</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
		</Panel>
		</div>
		<div className="mb-1">
		<Panel header={
			<div className="text-center">
				<h5 className={classes.inner_main_heading}>Aadhaar Card Details</h5>
			</div>
		} className='info-modal-panel' bordered>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Aadhaar</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Father's Aadhaar</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Mother's Aadhaar</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Aadhaar File</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Father's Aadhaar File</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Mother's Aadhaar File</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
		</Panel>
		</div>
		<div className="mb-1">
		<Panel header={
			<div className="text-center">
				<h5 className={classes.inner_main_heading}>Bank Details</h5>
			</div>
		} className='info-modal-panel' bordered>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Bank name</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Branch Name</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Account Type</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Account Holder name</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Account Number</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>IFSC Code No</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Passbook Front Page Copy</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
			</Stack>
		</Panel>
		</div>
		<div className="mb-1">
		<Panel header={
			<div className="text-center">
				<h5 className={classes.inner_main_heading}>Confirmation Report</h5>
			</div>
		} className='info-modal-panel' bordered>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Institute Confirmation Report</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Industry Confirmation Report</Heading>
					<Text>{data?.application?.basic_detail.name}</Text>
				</HeadingGroup>
				<div></div>
			</Stack>
		</Panel>
		</div>
	</Panel>
</div>
}