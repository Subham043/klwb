import { ButtonToolbar, Col, Grid, Row } from "rsuite";
import { StudentApplicationType } from "../../../utils/types";
import classes from "./index.module.css";
import FileViewer from "../../FileViewer";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import { useState } from "react";
import IndustryInfoUpdate from "./IndustryInfoUpdate";
import EditBtn from "../../Buttons/EditBtn";
import { useUser } from "../../../hooks/useUser";
import { RolesEnum } from "../../../utils/constants/role";

type Props = {
  data: StudentApplicationType;
  refetch?: () => void;
};

function IndustryInfo({ data, refetch }: Props) {
  const {user} = useUser();
  const [industryUpdateModal, setIndustryUpdateModal] = useState<boolean>(false);
  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className={(user && (user.role == RolesEnum.ADMIN || user.role === RolesEnum.SUPER_ADMIN)) ? "industry-info-update-scholarship-admin" : "text-center"}>
            <h5 className={classes.inner_main_heading}>Industry Detail</h5>
            {(user && (user.role == RolesEnum.ADMIN || user.role === RolesEnum.SUPER_ADMIN)) && <ButtonToolbar>
              <EditBtn clickHandler={() => setIndustryUpdateModal(true)} />
            </ButtonToolbar>}
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Parent / Guardian Name"
                value={data?.company.parent_guardian_name}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Who is Working"
                value={
                  data?.company.who_working.toString() === "1"
                    ? "Father"
                    : "Mother"
                }
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Relationship between student & parent"
                value={data?.company.relationship}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Monthly Salary"
                value={data?.company.msalary}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Industry Name" value={data?.industry_name} />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Industry Act" value={data?.industry_act_label} />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Industry Category" value={data?.industry_category} />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Pin Code" value={data?.company.pincode} />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="District"
                value={data?.company.district?.name}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo title="Taluk" value={data?.company.taluq?.name} />
            </Col>
            {data?.company.salaryslip && (
              <Col className="pb-1" md={8} sm={24} xs={24}>
                <DetailInfo
                  title="Salary Slip"
                  value={<FileViewer src={data?.company.salaryslip} />}
                />
              </Col>
            )}
          </Row>
        </Grid>
      </ModalCardContainer>
      {(user && (user.role == RolesEnum.ADMIN || user.role === RolesEnum.SUPER_ADMIN)) && <IndustryInfoUpdate
        modal={industryUpdateModal}
        setModal={setIndustryUpdateModal}
        data={data}
        refetch={refetch}
      />}
    </div>
  );
}

export default IndustryInfo;
