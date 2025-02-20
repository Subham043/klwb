import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { useState } from "react";
import { useRegisteredIndustryQuery } from "../../../hooks/data/registered_industry";
import { api_routes } from "../../../utils/routes/api";
import { ButtonToolbar, Col, Grid, Heading, Row, Stack } from "rsuite";
import Status from "../../Status";
import Moment from "../../Moment";
import { VerificationEnum } from "../../../utils/constants/verified";
import IndustryInfoUpdate from "./IndustryInfoUpdate";
import IndustryAuthUpdate from "./IndustryAuthUpdate";
import FileViewer from "../../FileViewer";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import EditBtn from "../../Buttons/EditBtn";
import BlockBtn from "../../Buttons/BlockBtn";
import PasswordBtn from "../../Buttons/PasswordBtn";
import VerifyBtn from "../../Buttons/VerifyBtn";
import Contribution from "./Contribution";
import ActivityLog from "./ActivityLog";

type Props = {
  id: number;
};

export default function IndustryInfo({ id }: Props) {
  const {
    data,
    isFetching,
    isLoading,
    isRefetching,
    refetch: refetchData,
    error,
  } = useRegisteredIndustryQuery(Number(id) || 0, true);
  const [industryUpdateModal, setIndustryUpdateModal] =
    useState<boolean>(false);
  const [industryAuthModal, setIndustryAuthModal] = useState<boolean>(false);

  return (
    <>
      <ErrorBoundaryLayout
        loading={isFetching || isLoading || isRefetching}
        error={error}
        refetch={refetchData}
      >
        <div className="mb-1">
          <ModalCardContainer
            header={
              <Stack justifyContent="space-between">
                <Heading level={6} style={{ color: "white" }}>
                  Industry Information
                </Heading>
                <ButtonToolbar>
                  <EditBtn clickHandler={() => setIndustryUpdateModal(true)} />
                </ButtonToolbar>
              </Stack>
            }
          >
            <Grid fluid>
              <Row gutter={30}>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Name" value={data?.industry.name} />
                </Col>
                {/* <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Reg. ID" value={data?.industry.reg_id} />
                </Col> */}
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Act" value={data?.industry.act_label} />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Category" value={data?.industry.category} />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Address" value={data?.address} />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="District" value={data?.city.name} />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Taluq" value={data?.taluq.name} />
                </Col>
              </Row>
              {/* <Row gutter={30}>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Address" value={data?.address} />
                </Col>
              </Row> */}
              <Row gutter={30}>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo
                    title="Industry Reg. File"
                    value={<FileViewer src={data?.reg_doc} />}
                  />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo
                    title="Director Signature"
                    value={<FileViewer src={data?.sign} />}
                  />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo
                    title="Industry Seal"
                    value={<FileViewer src={data?.seal} />}
                  />
                </Col>
              </Row>
            </Grid>
          </ModalCardContainer>
        </div>
        <div className="mb-1">
          <ModalCardContainer
            header={
              <Stack justifyContent="space-between">
                <Heading level={6} style={{ color: "white" }}>
                  Login Information
                </Heading>
                <ButtonToolbar>
                  <EditBtn clickHandler={() => setIndustryAuthModal(true)} />
                  {data && <PasswordBtn route={api_routes.admin.registered_industry.update_password(Number(id) || 0)} />}
                  {data && <VerifyBtn route={api_routes.admin.registered_industry.verify(Number(id) || 0)} refetch={refetchData} isVerified={data.verified === VerificationEnum.VERIFIED} />}
                  {data && <BlockBtn route={api_routes.admin.registered_industry.toggle(Number(id) || 0)} refetch={refetchData} isBlocked={data.is_blocked!} />}
                </ButtonToolbar>
              </Stack>
            }
          >
            <Grid fluid>
              <Row gutter={30}>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Director Name" value={data?.name} />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Email" value={data?.email} />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Phone" value={data?.phone} />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo
                    title="Verification"
                    value={
                      <Status
                        status={data?.verified === VerificationEnum.VERIFIED}
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
                        status={!data?.is_blocked} 
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
        <IndustryInfoUpdate
          modal={industryUpdateModal}
          setModal={setIndustryUpdateModal}
          data={data}
          refetch={refetchData}
          error={error}
          loading={isFetching || isLoading || isRefetching}
        />
        <IndustryAuthUpdate
          modal={industryAuthModal}
          setModal={setIndustryAuthModal}
          data={data}
          refetch={refetchData}
          error={error}
          loading={isFetching || isLoading || isRefetching}
        />
      </ErrorBoundaryLayout>
      {data && <Contribution id={data?.reg_industry_id || 0} />}
      {data && <ActivityLog id={data?.reg_industry_id || 0} />}
    </>
  );
}
