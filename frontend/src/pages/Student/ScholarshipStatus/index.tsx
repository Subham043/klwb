import { Button, ButtonToolbar, Divider, Heading, Message, Panel, Stack } from "rsuite";
import { useScholarshipStatusQuery } from "../../../hooks/data/scholarship_status";
import ScholarshipStatus from "../../../components/Student/ScholarshipStatus";
import ScholarshipInfo from "../../../components/Student/ScholarshipInfo";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { page_routes } from "../../../utils/routes/pages";
import { Link } from "react-router-dom";


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
			{(data && data.application===null) && <Message type="error" bordered showIcon className="mt-1" style={{ gap: 10 }}>
							<Stack justifyContent="space-between" className='w-100'>
											<div><strong>You have not applied for any scholarship till date.</strong></div>
											<Button as={Link} to={page_routes.student.scholarship.apply} size="sm" appearance="primary" color='red'>APPLY</Button>
							</Stack>
			</Message>}
		</ErrorBoundaryLayout>
</div>
}