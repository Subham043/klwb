import { Row, Col, Grid } from "rsuite";
import { StudentApplicationType } from "../../../utils/types";
import classes from "./index.module.css";
import Moment from "../../Moment";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import { VerificationEnum } from "../../../utils/constants/verified";
import Status from "../../Status";

type Props = {
  data: StudentApplicationType;
};

function StudentLoginInfo({ data }: Props) {
  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>Student Login Credentials</h5>
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Name" value={data?.student?.name || "N/A"} />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Email" value={data?.student?.email || "N/A"} />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Phone" value={data?.student?.phone || "N/A"} />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Verification"
                value={
                  <Status
                    status={data?.student?.verified === VerificationEnum.VERIFIED}
                    wrongLabel={VerificationEnum.VERIFICATION_PENDING}
                    correctLabel={VerificationEnum.VERIFIED}
                  />
                }
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Status"
                value={
                  <Status
                    status={!data?.student?.is_blocked}
                    wrongLabel="BLOCKED"
                    correctLabel="ACTIVE"
                  />
                }
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Registered On"
                value={<Moment datetime={data?.created_at || ""} />}
              />
            </Col>
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}

export default StudentLoginInfo;
