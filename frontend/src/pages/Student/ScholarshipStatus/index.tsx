import { Button, ButtonToolbar, Divider, Heading, Panel, Stack } from "rsuite";
import { useScholarshipStatusQuery } from "../../../hooks/data/scholarship_status";
import ScholarshipStatus from "../../../components/Student/ScholarshipStatus";
import ScholarshipInfo from "../../../components/Student/ScholarshipInfo";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { page_routes } from "../../../utils/routes/pages";
import DashboardMessageCard from "../../../components/Student/DashboardMessage/DashboardMessageCard";


export default function StudentScholarshipStatusPage() {
	const {data, isFetching, isLoading, isRefetching, refetch, error} = useScholarshipStatusQuery();

	return <div className="data-table-container">
		<ErrorBoundaryLayout loading={isRefetching || isLoading || isFetching} error={error} refetch={refetch}>
			{(data && data.application) && <div style={{ width: "100%", position: "relative" }}>		
				<Panel
					bordered
					shaded
					className='mb-1'
					header={
						<Stack justifyContent="space-between">
							<Heading level={6} className="text-brand">Scholarship Application Status</Heading>
							<ButtonToolbar>
								{(data && data.application) && <Button appearance="primary" color="green" size="sm">Download</Button>}
							</ButtonToolbar>
					</Stack>
					}
				>
					<Divider />
					<ScholarshipStatus data={data.application} can_resubmit={data.can_resubmit} />
				</Panel>
				<ScholarshipInfo data={data ? data.application : null} />
			</div>}
			{(data && data.application===null) && <DashboardMessageCard message="You have not applied for any scholarship till date." link={page_routes.student.scholarship.apply} type="error" color="red" button_title="APPLY" />}
		</ErrorBoundaryLayout>
</div>
}