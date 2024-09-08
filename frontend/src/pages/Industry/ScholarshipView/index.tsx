import { Button, ButtonToolbar, Divider, Heading, Panel, Stack } from "rsuite";
import ScholarshipStatus from "../../../components/Student/ScholarshipStatus";
import ScholarshipInfo from "../../../components/Student/ScholarshipInfo";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { useParams } from "react-router-dom";
import { useIndustryScholarshipViewQuery } from "../../../hooks/data/industry_scholarship";
import { useState } from "react";
import IndustryScholarshipRejectForm from "../../../components/Industry/RejectModal";
import StatusBadge from "../../../components/Institute/StatusBadge";
import IndustryScholarshipApproveForm from "../../../components/Industry/ApproveModal";

export default function IndustryScholarshipViewPage() {
  const { id } = useParams<{ id: string }>();
  const [modal, setModal] = useState<boolean>(false);
  const [approveModal, setApproveModal] = useState<boolean>(false);
  const { data, isFetching, isLoading, isRefetching, refetch, error } =
    useIndustryScholarshipViewQuery(Number(id) || 0, true);


  return (
    <div className="data-table-container">
      <ErrorBoundaryLayout
        loading={isRefetching || isLoading || isFetching}
        error={error}
        refetch={refetch}
      >
        <div style={{ width: "100%", position: "relative" }}>
          {data && data.application && (
            <Panel
              bordered
              shaded
              className="mb-1"
              header={
                <Stack justifyContent="space-between">
                  <Heading level={6} className="text-brand">
                    Scholarship Application Status
                  </Heading>
                  {(data && data.application && data.can_approve) && (
                    <ButtonToolbar>
                      <Button appearance="primary" color="green" size="sm" onClick={() => setApproveModal(true)}>
                        Approve
                      </Button>
                      <Button appearance="primary" color="red" size="sm" onClick={() => setModal(true)}>
                        Reject
                      </Button>
                    </ButtonToolbar>
                  )}
                  {(data && data.application && !data.can_approve) && <StatusBadge status={data.application.status} application_state={data.application.application_state} current_application_state={2} />}
                </Stack>
              }
            >
              <Divider />
              <ScholarshipStatus data={data.application} />
            </Panel>
          )}
          <ScholarshipInfo data={data ? data.application : null} />
					{(data!==undefined && data.application!==null) && <IndustryScholarshipApproveForm modal={approveModal && data!==undefined && data.application!==null} setModal={setApproveModal} id={data!.application!.id} refetch={refetch} />}
					{(data!==undefined && data.application!==null) && <IndustryScholarshipRejectForm modal={modal && data!==undefined && data.application!==null} setModal={setModal} id={data!.application!.id} refetch={refetch} />}
        </div>
      </ErrorBoundaryLayout>
    </div>
  );
}
