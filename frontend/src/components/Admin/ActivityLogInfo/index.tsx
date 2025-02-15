import { Button, Col, Grid, List, Modal, Row } from "rsuite";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import { ActivityLogType } from "../../../utils/types";
import { useMemo } from "react";

export default function ActivityLogInfo({
  modal,
  modalHandler,
}: {
  modal: { status: boolean; data: ActivityLogType|null };
  modalHandler: (value: { status: boolean; data: ActivityLogType|null }) => void;
}) {

  const changesMade = useMemo(() => {
    if (modal.data && !Array.isArray(modal.data.properties.attributes) && !Array.isArray(modal.data.properties.old)) {
      return Object.keys(modal.data.properties.attributes).map((key) => `The field named "${key.replace("_", " ")}" changed from ${modal.data?.properties.old[key]} to ${modal.data?.properties.attributes[key]}`)
    }
    return [];
  }, [modal.data]);

  return (
    <>
      <Modal
        overflow={false}
        size={"sm"}
        open={modal.status}
        onClose={() => modalHandler({ status: false, data: null })}
        className="info-modal"
      >
        <>
          <ModalCardContainer header="Activity Log">
            <Grid fluid>
              <Row gutter={30}>
                <Col className="pb-1" md={12} sm={24} xs={24}>
                  <DetailInfo title="ID" value={modal.data?.id} />
                </Col>
                <Col className="pb-1" md={12} sm={24} xs={24}>
                  <DetailInfo title="Event" value={modal.data?.event} />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" md={12} sm={24} xs={24}>
                  <DetailInfo title="Name" value={modal.data?.causer?.name} />
                </Col>
                <Col className="pb-1" md={12} sm={24} xs={24}>
                  <DetailInfo title="Email" value={modal.data?.causer?.email} />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" md={12} sm={24} xs={24}>
                  <DetailInfo title="Phone" value={modal.data?.causer?.phone} />
                </Col>
                <Col className="pb-1" md={12} sm={24} xs={24}>
                  <DetailInfo title="Role" value={modal.data?.causer?.role} />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" xs={24}>
                  <DetailInfo title="Description" value={modal.data?.description} />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" xs={24}>
                  <DetailInfo title="Changes Made" value={
                    changesMade.length > 0 ? 
                      <List bordered hover className="mt-1">
                        {changesMade.map((change, index) => <List.Item key={index}>{change}</List.Item>)}
                      </List> 
                    : "No changes made"
                  } />
                </Col>
              </Row>
            </Grid>
          </ModalCardContainer>
        </>
        <Modal.Footer className="mb-1 info-modal-footer">
          <Button
            onClick={() => modalHandler({ status: false, data: null })}
            appearance="subtle"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
