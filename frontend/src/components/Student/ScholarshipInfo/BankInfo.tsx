import { Grid, Row, Col } from "rsuite";
import { StudentApplicationType } from "../../../utils/types";
import classes from "./index.module.css";
import FileViewer from "../../FileViewer";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

type Props = {
  data: StudentApplicationType;
};

function BankInfo({ data }: Props) {
  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>Bank Details</h5>
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Bank name" value={data?.account.bank_name} />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Branch name" value={data?.account.branch} />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Account Type"
                value={
                  data?.account.type.toString() === "1" ? "Parent" : "Student"
                }
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Account Holder Name"
                value={data?.account.holder}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Account Number" value={data?.account.acc_no} />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="IFSC Code No" value={data?.account.ifsc} />
            </Col>
          </Row>
          {data?.account.passbook && (
            <Row gutter={30}>
              <Col className="pb-1" md={8} sm={24} xs={24}>
                <DetailInfo
                  title="Passbook Front Page Copy"
                  value={<FileViewer src={data?.account.passbook} />}
                />
              </Col>
            </Row>
          )}
        </Grid>
      </ModalCardContainer>
    </div>
  );
}

export default BankInfo;
