import { Button, ButtonToolbar, Divider, Heading, Panel, Stack } from "rsuite";
import { useScholarshipStatusQuery } from "../../../hooks/data/scholarship_status";
import ScholarshipStatus from "../../../components/Student/ScholarshipStatus";
import ScholarshipInfo from "../../../components/Student/ScholarshipInfo";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";


export default function StudentScholarshipStatusPage() {
	const {data, isFetching, isLoading, isRefetching, refetch, error} = useScholarshipStatusQuery();

	return <div className="data-table-container">
		<ErrorBoundaryLayout loading={isRefetching || isLoading || isFetching} error={error} refetch={refetch}>
			<div style={{ width: "100%", position: "relative" }}>			
				{(data && data.application) && <Panel
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
					<ScholarshipStatus data={data.application} />
				</Panel>}
				<ScholarshipInfo data={data ? data.application : null} />
			</div>
		</ErrorBoundaryLayout>
</div>
}