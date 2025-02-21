import { Row, Col, Grid, ButtonToolbar } from "rsuite";
import { StudentApplicationType } from "../../../utils/types";
import classes from "./index.module.css";
import Moment from "../../Moment";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import { useUser } from "../../../hooks/useUser";
import { useState } from "react";
import { RolesEnum } from "../../../utils/constants/role";
import EditBtn from "../../Buttons/EditBtn";
import InstituteInfoUpdate from "./InstituteInfoUpdate";

type Props = {
  data: StudentApplicationType;
  refetch?: () => void;
};

function StudentInfo({ data, refetch }: Props) {
  const {user} = useUser();
  const [instituteUpdateModal, setInstituteUpdateModal] = useState<boolean>(false);
  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className={(user && (user.role == RolesEnum.ADMIN || user.role === RolesEnum.SUPER_ADMIN)) ? "industry-info-update-scholarship-admin" : "text-center"}>
            <h5 className={classes.inner_main_heading}>Student Details</h5>
            {(user && (user.role == RolesEnum.ADMIN || user.role === RolesEnum.SUPER_ADMIN)) && <ButtonToolbar>
              <EditBtn clickHandler={() => setInstituteUpdateModal(true)} />
            </ButtonToolbar>}
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Application Number" value={data?.id} />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Name" value={data?.basic_detail.name} />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Father Name"
                value={data?.basic_detail.father_name}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Mother Name"
                value={data?.basic_detail.mother_name}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Mobile Number"
                value={data?.basic_detail.parent_phone}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Gender" value={data?.basic_detail.gender} />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Graduation"
                value={data?.mark.graduation?.name}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Present Class / Course"
                value={`${data?.mark?.class?.name ?? 'N/A'}${
                  data?.mark?.course?.name
                    ? (" / " + data?.mark?.course?.name)
                    : ''
                }`}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Present School Name"
                value={data?.present_institute_name}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Institute District"
                value={data?.mark.district?.name}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Institute Taluq"
                value={data?.mark.taluq?.name}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Application Year"
                value={data?.application_year}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Present School Address"
                value={data?.present_institute_address}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Student Present Address"
                value={data?.basic_detail.address}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Amount"
                value={data?.scholarship_fee?.amount || 0}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Applied On"
                value={<Moment datetime={data?.date} />}
              />
            </Col>
          </Row>
        </Grid>
      </ModalCardContainer>
      {(user && (user.role == RolesEnum.ADMIN || user.role === RolesEnum.SUPER_ADMIN)) && <InstituteInfoUpdate
        modal={instituteUpdateModal}
        setModal={setInstituteUpdateModal}
        data={data}
        refetch={refetch}
      />}
    </div>
  );
}

export default StudentInfo;
