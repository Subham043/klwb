import { Panel, Row, Col, Grid } from "rsuite";
import { StudentApplicationType } from "../../../utils/types";
import classes from "./index.module.css";
import Moment from "../../Moment";
import DetailInfo from "../../DetailInfo";

type Props = {
  data: StudentApplicationType;
};

function StudentInfo({ data }: Props) {
  return (
    <div className="mb-1">
      <Panel
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>Student Details</h5>
          </div>
        }
        className="info-modal-panel"
        bordered
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" xs={8}>
              <DetailInfo title="Application Number" value={data?.id} />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo title="Name" value={data?.basic_detail.name} />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Father Name"
                value={data?.basic_detail.father_name}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Mobile Number"
                value={data?.basic_detail.parent_phone}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo title="Gender" value={data?.basic_detail.gender} />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Amount"
                value={data?.scholarship_fee?.amount || 0}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Graduation"
                value={data?.mark.graduation?.name}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Present Class / Course"
                value={`${data?.mark?.class?.name}${
                  data?.mark?.course?.name
                    ? " / " + data?.mark?.course?.name
                    : null
                }`}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Present School Name"
                value={data?.present_institute_name}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Present School Address"
                value={data?.present_institute_address}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Student Present Address"
                value={data?.basic_detail.address}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Application Year"
                value={data?.application_year}
              />
            </Col>
            <Col className="pb-1" xsPush={8}>
              <DetailInfo
                title="Applied On"
                value={<Moment datetime={data?.date} />}
              />
            </Col>
          </Row>
        </Grid>
      </Panel>
    </div>
  );
}

export default StudentInfo;
