import { Button, ButtonToolbar, Divider, Heading, Stack } from "rsuite";
import ScholarshipStatus from "../../../components/Student/ScholarshipStatus";
import ScholarshipInfo from "../../../components/Student/ScholarshipInfo";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { useParams } from "react-router-dom";
import { useAdminScholarshipViewQuery } from "../../../hooks/data/admin_scholarship";
import { useAxios } from "../../../hooks/useAxios";
import { useState } from "react";
import { useToast } from "../../../hooks/useToast";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../../utils/types";
import { api_routes } from "../../../utils/routes/api";
import AdminScholarshipRejectForm from "../../../components/Admin/RejectModal";
import PanelCardContainer from "../../../components/MainCards/PanelCardContainer";
import { usePdfExport } from "../../../hooks/usePdfExport";
import StatusBadge from "../../../components/Institute/StatusBadge";
import BlockBtn from "../../../components/Buttons/BlockBtn";

export default function AdminScholarshipViewPage() {
  const { id } = useParams<{ id: string }>();
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const { toastError, toastSuccess } = useToast();
  const { data, isFetching, isLoading, isRefetching, refetch, error } =
    useAdminScholarshipViewQuery(Number(id) || 0, true);
  const axios = useAxios();
  const {pdfLoading, exportPdf} = usePdfExport();

	const exportPdfHandler = async () => {
		await exportPdf(api_routes.admin.scholarship.pdf(id || ""), "ScholarshipForm.pdf")
	}

  const onApproveHandler = async (id: number) => {
    setApproveLoading(true);
    try {
      await axios.post(api_routes.admin.scholarship.approve(id), {});
      toastSuccess("Approved Successfully");
      refetch();
    } catch (error) {
      if (isAxiosError<AxiosErrorResponseType>(error)) {
        if (error?.response?.data?.message) {
          toastError(error.response.data.message);
        } else {
          toastError("Something went wrong");
        }
      }
    } finally {
      setApproveLoading(false);
    }
  };

  return (
    <div className="data-table-container">
      <ErrorBoundaryLayout
        loading={isRefetching || isLoading || isFetching}
        error={error}
        refetch={refetch}
      >
        <div style={{ width: "100%", position: "relative" }}>
          {data && data.application && (
            <PanelCardContainer
              class_name="mb-1"
              header={
                <Stack justifyContent="space-between">
                  <Heading level={6} className="text-brand">
                    Scholarship Application Status
                  </Heading>
                  <ButtonToolbar>
                    <Button appearance="primary" size="sm" loading={pdfLoading} disabled={pdfLoading} onClick={exportPdfHandler}>Download</Button>
                    <BlockBtn route={api_routes.admin.scholarship.toggle(data.application!.id)} refetch={refetch} isBlocked={data.application!.inactive} />
                    {
                      (data && data.application && data.can_approve) && <>
                        {
                          data.application.status !== 1 &&
                          <Button appearance="primary" color="green" size="sm" loading={approveLoading} disabled={approveLoading} onClick={() => onApproveHandler(data.application!.id)}>
                            Approve
                          </Button>
                        }
                        {
                          data.application.status !== 2 &&
                          <Button appearance="primary" color="red" size="sm" onClick={() => setModal(true)}>
                            Reject
                          </Button>
                        }
                      </>
                    }
                    <StatusBadge status={data.application.status} application_state={data.application.application_state} current_application_state={4} />
                  </ButtonToolbar>
                </Stack>
              }
            >
              <Divider />
              <ScholarshipStatus data={data.application} />
            </PanelCardContainer>
          )}
          <ScholarshipInfo data={data ? data.application : null} refetch={refetch} />
					{(data!==undefined && data.application!==null) && <AdminScholarshipRejectForm modal={modal && data!==undefined && data.application!==null} setModal={setModal} id={data!.application!.id} refetch={refetch} />}
        </div>
      </ErrorBoundaryLayout>
    </div>
  );
}
