import { Divider, Loader, Message, Panel, Stack } from "rsuite";
import classes from './index.module.css';
import ScholarshipForm from "../../../components/Student/ScholarshipForm";
import { useScholarshipStatusQuery } from "../../../hooks/data/scholarship_status";
import { Link } from "react-router-dom";
import { page_routes } from "../../../utils/routes/pages";
import Moment from "../../../components/Moment";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";

export default function StudentApplyScholarshipPage() {
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
					{(isFetching || isLoading || isRefetching) ? <div>
								<Message type="info" centered showIcon header="Checking eligibility!">
								<Loader speed="fast" content="Please wait..." />
							</Message>
						</div>
						: ((data && data.can_apply) ? <ScholarshipForm data={data && data.application ? data.application : null} /> : <Message type="error" centered showIcon header={data?.message || "Oops! You are not eligible to apply for scholarship."}>
								<p>
										Your application has been successfully submitted on <Moment datetime={data!.application!.date} />
								</p>
								<p>
										You can check the application status in the <Link to={page_routes.student.dashboard}>status section</Link>.
								</p>
						</Message>)}
				</div>
			</ErrorBoundaryLayout>
		</Panel>
	</div>
}