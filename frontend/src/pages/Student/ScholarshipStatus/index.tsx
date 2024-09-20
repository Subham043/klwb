import { Button, ButtonToolbar, Divider, Heading, Stack } from "rsuite";
import { useScholarshipStatusQuery } from "../../../hooks/data/scholarship_status";
import ScholarshipStatus from "../../../components/Student/ScholarshipStatus";
import ScholarshipInfo from "../../../components/Student/ScholarshipInfo";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { page_routes } from "../../../utils/routes/pages";
import DashboardMessageCard from "../../../components/Student/DashboardMessage/DashboardMessageCard";
import PanelCardContainer from "../../../components/MainCards/PanelCardContainer";
import { usePdfExport } from "../../../hooks/usePdfExport";
import { api_routes } from "../../../utils/routes/api";


export default function StudentScholarshipStatusPage() {
	const {data, isFetching, isLoading, isRefetching, refetch, error} = useScholarshipStatusQuery();
	const {pdfLoading, exportPdf} = usePdfExport();

	const exportPdfHandler = async () => {
		await exportPdf(api_routes.user.scholarship.pdf((data && data.application) ? data.application.id : ""), "ScholarshipForm.pdf")
	}

	return <div className="data-table-container">
		<ErrorBoundaryLayout loading={isRefetching || isLoading || isFetching} error={error} refetch={refetch}>
			{(data && data.application) && <div style={{ width: "100%", position: "relative" }}>		
				<PanelCardContainer
					class_name='mb-1'
					header={
						<Stack justifyContent="space-between">
							<Heading level={6} className="text-brand">Scholarship Application Status</Heading>
							<ButtonToolbar>
								{(data && data.application) && <Button appearance="primary" size="sm" loading={pdfLoading} disabled={pdfLoading} onClick={exportPdfHandler}>Download</Button>}
							</ButtonToolbar>
					</Stack>
					}
				>
					<Divider />
					<ScholarshipStatus data={data.application} can_resubmit={data.can_resubmit} />
				</PanelCardContainer>
				<ScholarshipInfo data={data ? data.application : null} />
			</div>}
			{(data && data.application===null) && <DashboardMessageCard message="You have not applied for any scholarship till date." link={page_routes.student.scholarship.apply} type="error" color="red" button_title="APPLY" />}
		</ErrorBoundaryLayout>
</div>
}