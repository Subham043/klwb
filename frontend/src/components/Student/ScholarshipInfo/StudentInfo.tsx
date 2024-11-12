import { Row, Col, Grid } from "rsuite";
import { StudentApplicationType } from "../../../utils/types";
import classes from "./index.module.css";
import Moment from "../../Moment";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

type Props = {
  data: StudentApplicationType;
};

function StudentInfo({ data }: Props) {
  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>Student Details</h5>
          </div>
        }
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
          </Row>
          <Row gutter={30}>
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
          </Row>
          <Row gutter={30}>
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
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Institute District"
                value={data?.mark.district?.name}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Institute Taluq"
                value={data?.mark.taluq?.name}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Application Year"
                value={data?.application_year}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Applied On"
                value={<Moment datetime={data?.date} />}
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
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}

export default StudentInfo;
