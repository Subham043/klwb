import { Button, ButtonToolbar, Divider, Heading, Stack } from "rsuite";
import { useScholarshipViewQuery } from "../../../hooks/data/scholarship_status";
import ScholarshipStatus from "../../../components/Student/ScholarshipStatus";
import ScholarshipInfo from "../../../components/Student/ScholarshipInfo";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { useParams } from "react-router-dom";
import PanelCardContainer from "../../../components/MainCards/PanelCardContainer";
import { usePdfExport } from "../../../hooks/usePdfExport";
import { api_routes } from "../../../utils/routes/api";


export default function StudentScholarshipViewPage() {
	const {id} = useParams<{ id: string }>();
	const {data, isFetching, isLoading, isRefetching, refetch, error} = useScholarshipViewQuery(Number(id)||0, true);
	const {pdfLoading, exportPdf} = usePdfExport();

	const exportPdfHandler = async () => {
		await exportPdf(api_routes.user.scholarship.pdf(id || ""), "ScholarshipForm.pdf")
	}

	return <div className="data-table-container">
		<ErrorBoundaryLayout loading={isRefetching || isLoading || isFetching} error={error} refetch={refetch}>
			<div style={{ width: "100%", position: "relative" }}>			
				{(data && data.application) && <PanelCardContainer
					class_name='mb-1'
					header={
						<Stack justifyContent="space-between">
							<Heading level={6} className="text-brand">Scholarship Application Status</Heading>
							<ButtonToolbar>
								<Button appearance="primary" size="sm" loading={pdfLoading} disabled={pdfLoading} onClick={exportPdfHandler}>Download</Button>
							</ButtonToolbar>
					</Stack>
					}
				>
					<Divider />
					<ScholarshipStatus data={data.application} can_resubmit={data.can_resubmit} />
				</PanelCardContainer>}
				<ScholarshipInfo data={data ? data.application : null} />
			</div>
		</ErrorBoundaryLayout>
</div>
}