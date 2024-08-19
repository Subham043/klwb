import { Divider, Panel, Stack } from "rsuite";
import classes from './index.module.css';
import ScholarshipForm from "../../../components/Student/ScholarshipForm";
import { useScholarshipStatusQuery } from "../../../hooks/data/scholarship_status";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import CheckingEligibility from "../../../components/Student/Eligibility/CheckingEligibility";
import ApplicationApplied from "../../../components/Student/Eligibility/ApplicationApplied";
import ApplicationClosed from "../../../components/Student/Eligibility/ApplicationClosed";

export default function StudentResubmitScholarshipPage() {
	const {data, isFetching, isLoading, isRefetching, refetch, error} = useScholarshipStatusQuery();
	return <div className="data-table-container">
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
			<ErrorBoundaryLayout loading={isRefetching} error={error} refetch={refetch}>
				<div style={{ width: "100%", position: "relative" }}>
					{(isFetching || isLoading || isRefetching) ? <CheckingEligibility />
						: 
						((data && !data.is_scholarship_open) ? <ApplicationClosed message={data?.message} date={data?.application?.date} />
						: 
						((data && data.can_resubmit) ? <ScholarshipForm data={data && data.application ? data.application : null} type="resubmit" />  : <ApplicationApplied message={data?.message} date={data?.application?.date} />))}
				</div>
			</ErrorBoundaryLayout>
		</Panel>
	</div>
}