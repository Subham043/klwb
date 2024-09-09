import {
		Col,
		Grid,
		Row,
} from "rsuite";
import { StudentApplicationType } from "../../../utils/types";
import classes from "./index.module.css";
import FileViewer from "../../FileViewer";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

type Props = {
  data: StudentApplicationType;
};

function IndustryInfo({ data }: Props) {
  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>Industry Detail</h5>
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" xs={8}>
              <DetailInfo title="Parent / Guardian Name" value={data?.company.parent_guardian_name} />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo title="Who is Working" value={data?.company.who_working.toString() === "1"
                ? "Father"
                : "Mother"} />
            </Col>
												<Col className="pb-1" xs={8}>
              <DetailInfo title="Relationship between student & parent" value={data?.company.relationship} />
            </Col>
												<Col className="pb-1" xs={8}>
              <DetailInfo title="Monthly Salary" value={data?.company.msalary} />
            </Col>
												<Col className="pb-1" xs={8}>
              <DetailInfo title="Industry Name" value={data?.industry_name} />
            </Col>
												<Col className="pb-1" xs={8}>
              <DetailInfo title="Pin Code" value={data?.company.pincode} />
            </Col>
												<Col className="pb-1" xs={8}>
              <DetailInfo title="Taluk" value={data?.company.taluq?.name} />
            </Col>
												<Col className="pb-1" xs={8}>
              <DetailInfo title="District" value={data?.company.district?.name} />
            </Col>
												{data?.company.salaryslip && (
													<Col className="pb-1" xs={8}>
														<DetailInfo title="Salary Slip" value={<FileViewer src={data?.company.salaryslip} />} />
												</Col>
          )}
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}

export default IndustryInfo;
