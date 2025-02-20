import { Button, ButtonToolbar, Col, Grid, Heading, Row, Stack } from "rsuite";
import { useIndustryAccountQuery } from "../../../../hooks/data/profile";
import ErrorBoundaryLayout from "../../../../layouts/ErrorBoundaryLayout";
import FileUploader from "../../../FileUploader";
import { api_routes } from "../../../../utils/routes/api";
import { useState } from "react";
import AccountInfoUpdate from "./AccountInfoUpdate";
import { useUser } from "../../../../hooks/useUser";
import { RolesEnum } from "../../../../utils/constants/role";
import DetailInfo from "../../../DetailInfo";
import MainCardContainer from "../../../MainCards/MainCardContainer";

const Uploader = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <MainCardContainer
      header={
        <Stack justifyContent="center">
          <Heading level={6} style={{ color: "white" }}>
            {title}
          </Heading>
        </Stack>
      }
      shaded={false}
      style={{ backgroundColor: "white" }}
    >
      {children}
    </MainCardContainer>
  );
};

export default function IndustryDashboardAccountInfo() {
  const [instituteUpdateModal, setIndustryUpdateModal] =
    useState<boolean>(false);
  const { user } = useUser();
  const {
    data: account_info,
    isLoading: isAccountLoading,
    isFetching: isAccountFetching,
    isRefetching: isAccountRefetching,
    refetch: accountRefetch,
    error: accountError,
  } = useIndustryAccountQuery(true);

  return (
    <div>
      <ErrorBoundaryLayout
        loading={isAccountRefetching || isAccountLoading || isAccountFetching}
        error={accountError}
        refetch={accountRefetch}
      >
        <div className="mt-1">
          <MainCardContainer
            header={
              <Stack
                justifyContent={
                  user && user.role === RolesEnum.INDUSTRY
                    ? "space-between"
                    : "center"
                }
              >
                <Heading level={6} style={{ color: "white" }}>
                  Industry Information
                </Heading>
                {user && user.role === RolesEnum.INDUSTRY && (
                  <ButtonToolbar>
                    <Button
                      appearance="primary"
                      color="green"
                      size="sm"
                      onClick={() => setIndustryUpdateModal(true)}
                    >
                      Edit
                    </Button>
                  </ButtonToolbar>
                )}
              </Stack>
            }
            shaded={false}
            style={{ backgroundColor: "white" }}
          >
            <Grid fluid>
              <Row gutter={30}>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo
                    title="Industry Name"
                    value={account_info?.industry.name}
                  />
                </Col>
                {/* <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo
                    title="Industry Reg. No."
                    value={account_info?.industry.reg_id}
                  />
                </Col> */}
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo
                    title="Director Name"
                    value={account_info?.name}
                  />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Email" value={account_info?.email} />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Phone" value={account_info?.phone} />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo
                    title="Pincode"
                    value={account_info?.industry.pincode}
                  />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="GST No." value={account_info?.gst_no} />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="PAN No." value={account_info?.pan_no} />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo
                    title="District"
                    value={account_info?.city.name}
                  />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Taluq" value={account_info?.taluq.name} />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Address" value={account_info?.address} />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Act" value={account_info?.industry.act_label} />
                </Col>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Category" value={account_info?.industry.category} />
                </Col>
              </Row>
              {/* <Row gutter={30}>
                <Col className="pb-1" md={8} sm={24} xs={24}>
                  <DetailInfo title="Address" value={account_info?.address} />
                </Col>
              </Row> */}
            </Grid>
          </MainCardContainer>
        </div>
        <div className="mt-1">
          <Row gutter={30}>
            <Col md={8} sm={24} xs={24}>
              <Uploader title="Industry Registration File">
                <FileUploader
                  src={account_info?.reg_doc}
                  name="reg_doc"
                  apiRoute={api_routes.industry.account.doc_update}
                  refetch={accountRefetch}
                  allowed={
                    user && user.role === RolesEnum.INDUSTRY ? true : false
                  }
                />
              </Uploader>
            </Col>
            <Col md={8} sm={24} xs={24}>
              <Uploader title="Director Signature">
                <FileUploader
                  src={account_info?.sign}
                  name="sign"
                  apiRoute={api_routes.industry.account.doc_update}
                  refetch={accountRefetch}
                  allowed={
                    user && user.role === RolesEnum.INDUSTRY ? true : false
                  }
                />
              </Uploader>
            </Col>
            <Col md={8} sm={24} xs={24}>
              <Uploader title="Industry Seal">
                <FileUploader
                  src={account_info?.seal}
                  name="seal"
                  apiRoute={api_routes.industry.account.doc_update}
                  refetch={accountRefetch}
                  allowed={
                    user && user.role === RolesEnum.INDUSTRY ? true : false
                  }
                />
              </Uploader>
            </Col>
          </Row>
        </div>
        <div className="mt-1">
          <Row gutter={30}>
            <Col md={8} sm={24} xs={24}>
              <Uploader title="GSTIN Certificate">
                <FileUploader
                  src={account_info?.gst}
                  name="gst"
                  apiRoute={api_routes.industry.account.doc_update}
                  refetch={accountRefetch}
                  allowed={
                    user && user.role === RolesEnum.INDUSTRY ? true : false
                  }
                />
              </Uploader>
            </Col>
            <Col md={8} sm={24} xs={24}>
              <Uploader title="PAN Card">
                <FileUploader
                  src={account_info?.pan}
                  name="pan"
                  apiRoute={api_routes.industry.account.doc_update}
                  refetch={accountRefetch}
                  allowed={
                    user && user.role === RolesEnum.INDUSTRY ? true : false
                  }
                />
              </Uploader>
            </Col>
          </Row>
        </div>
        {user && user.role === RolesEnum.INDUSTRY && (
          <AccountInfoUpdate
            modal={instituteUpdateModal}
            setModal={setIndustryUpdateModal}
            data={account_info}
            refetch={accountRefetch}
            error={accountError}
            loading={
              isAccountRefetching || isAccountLoading || isAccountFetching
            }
          />
        )}
      </ErrorBoundaryLayout>
    </div>
  );
}
