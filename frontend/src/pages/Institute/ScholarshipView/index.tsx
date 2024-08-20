import { Button, ButtonToolbar, Divider, Heading, Panel, Stack } from "rsuite";
import ScholarshipStatus from "../../../components/Student/ScholarshipStatus";
import ScholarshipInfo from "../../../components/Student/ScholarshipInfo";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { useParams } from "react-router-dom";
import { useInstituteScholarshipViewQuery } from "../../../hooks/data/institute_scholarship";


export default function InstituteScholarshipViewPage() {
	const {id} = useParams<{ id: string }>();
	const {data, isFetching, isLoading, isRefetching, refetch, error} = useInstituteScholarshipViewQuery(Number(id)||0, true);

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
								<Button appearance="primary" color="green" size="sm">Approve</Button>
								<Button appearance="primary" color="red" size="sm">Reject</Button>
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