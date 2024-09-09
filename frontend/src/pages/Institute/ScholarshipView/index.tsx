import { Button, ButtonToolbar, Divider, Heading, Stack } from "rsuite";
import ScholarshipStatus from "../../../components/Student/ScholarshipStatus";
import ScholarshipInfo from "../../../components/Student/ScholarshipInfo";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { useParams } from "react-router-dom";
import { useInstituteScholarshipViewQuery } from "../../../hooks/data/institute_scholarship";
import { useAxios } from "../../../hooks/useAxios";
import { useState } from "react";
import { useToast } from "../../../hooks/useToast";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../../utils/types";
import { api_routes } from "../../../utils/routes/api";
import InstituteScholarshipRejectForm from "../../../components/Institute/RejectModal";
import StatusBadge from "../../../components/Institute/StatusBadge";
import PanelCardContainer from "../../../components/MainCards/PanelCardContainer";

export default function InstituteScholarshipViewPage() {
  const { id } = useParams<{ id: string }>();
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const { toastError, toastSuccess } = useToast();
  const { data, isFetching, isLoading, isRefetching, refetch, error } =
    useInstituteScholarshipViewQuery(Number(id) || 0, true);
  const axios = useAxios();

  const onApproveHandler = async (id: number) => {
    setApproveLoading(true);
    try {
      await axios.post(api_routes.institute.scholarship.approve(id), {});
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
                  {(data && data.application && data.can_approve) && (
                    <ButtonToolbar>
                      <Button appearance="primary" color="green" size="sm" loading={approveLoading} disabled={approveLoading} onClick={() => onApproveHandler(data.application!.id)}>
                        Approve
                      </Button>
                      <Button appearance="primary" color="red" size="sm" onClick={() => setModal(true)}>
                        Reject
                      </Button>
                    </ButtonToolbar>
                  )}
                  {(data && data.application && !data.can_approve) && <StatusBadge status={data.application.status} application_state={data.application.application_state} current_application_state={1} />}
                </Stack>
              }
            >
              <Divider />
              <ScholarshipStatus data={data.application} />
            </PanelCardContainer>
          )}
          <ScholarshipInfo data={data ? data.application : null} />
					{(data!==undefined && data.application!==null) && <InstituteScholarshipRejectForm modal={modal && data!==undefined && data.application!==null} setModal={setModal} id={data!.application!.id} refetch={refetch} />}
        </div>
      </ErrorBoundaryLayout>
    </div>
  );
}
