import { Button, Col, Grid, Modal, Row } from "rsuite";
import { useRequestIndustryQuery } from "../../../hooks/data/request_industry";
import { useToast } from "../../../hooks/useToast";
import { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { api_routes } from "../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import FileViewer from "../../FileViewer";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import RequestRejectForm from "../RequestRejectModal";
import StatusBadge from "../../Student/StatusBadge";

export default function RequestIndustryInfo({
  modal,
  modalHandler,
  refetch,
}: {
  modal: { status: boolean; id?: number };
  modalHandler: (value: { status: boolean; id?: number }) => void;
  refetch: () => void;
}) {
  const {
    data,
    isFetching,
    isLoading,
    isRefetching,
    refetch: refetchData,
    error,
  } = useRequestIndustryQuery(
    modal.id ? modal.id : 0,
    modal.status && modal.id !== undefined && modal.id > 0
  );
  const { toastError, toastSuccess } = useToast();
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [rejectModal, setRejectModal] = useState<boolean>(false);
  const axios = useAxios();

  const onApproveHandler = async (id: number) => {
    setApproveLoading(true);
    try {
      await axios.post(api_routes.admin.request_industry.approve(id), {});
      toastSuccess("Approved Successfully");
      modalHandler({ status: false });
      refetch();
    } catch (error) {
      toastError("Something went wrong. Please try again later.");
    } finally {
      setApproveLoading(false);
    }
  };

  return (
    <>
      <Modal
        overflow={false}
        size={"sm"}
        open={modal.status}
        onClose={() => modalHandler({ status: false })}
        className="info-modal"
      >
        <ErrorBoundaryLayout
          loading={isFetching || isLoading || isRefetching}
          error={error}
          refetch={refetchData}
        >
          <>
            <ModalCardContainer header="Industry Request">
              <Grid fluid>
                <Row gutter={30}>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <DetailInfo title="Company" value={data?.company} />
                  </Col>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <DetailInfo title="Email" value={data?.email} />
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <DetailInfo title="Mobile" value={data?.mobile} />
                  </Col>
                  {/* <Col className="pb-1" md={12} sm={24} xs={24}>
                    <DetailInfo title="Act" value={data?.act_label} />
                  </Col> */}
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <DetailInfo title="District" value={data?.city.name} />
                  </Col>
                </Row>
                {/* <Row gutter={30}>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <DetailInfo title="GST" value={data?.gst_no} />
                  </Col>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <DetailInfo title="PAN" value={data?.pan_no} />
                  </Col>
                </Row> */}
                <Row gutter={30}>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <DetailInfo title="Taluq" value={data?.taluq.name} />
                  </Col>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <DetailInfo
                      title="Status"
                      value={
                        <>
                          <StatusBadge status={data?.status || 0} />
                          {(data?.reject_reason && data?.status===2) && <span><br/><code>Reason: </code> {data?.reject_reason}</span>}
                        </>
                      }
                    />
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col className="pb-1" md={24} sm={24} xs={24}>
                    <DetailInfo title="Address" value={data?.address} />
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <DetailInfo
                      title="Register Doc"
                      value={<FileViewer src={data?.register_doc} />}
                    />
                  </Col>
                </Row>
              </Grid>
            </ModalCardContainer>
          </>
          {data !== undefined && data.status === 0 ? (
            <Modal.Footer className="mb-1 info-modal-footer">
              <Button
                onClick={() => onApproveHandler(data!.id)}
                loading={approveLoading}
                disabled={approveLoading}
                appearance="primary"
              >
                Approve
              </Button>
              <Button
                onClick={() => setRejectModal(true)}
                appearance="primary"
                color="red"
              >
                Reject
              </Button>
              <Button
                onClick={() => modalHandler({ status: false })}
                appearance="subtle"
              >
                Cancel
              </Button>
            </Modal.Footer>
          ) : (
            <Modal.Footer className="mb-1 info-modal-footer">
                <Button
                  onClick={() => modalHandler({ status: false })}
                  appearance="subtle"
                >
                  Close
                </Button>
              </Modal.Footer>
          )}
        </ErrorBoundaryLayout>
      </Modal>
      <RequestRejectForm modal={rejectModal} setModal={setRejectModal} refetch={() => {refetch(); setRejectModal(false); modalHandler({ status: false });}} link={api_routes.admin.request_industry.reject(data?.id || 0)} />
    </>
  );
}
