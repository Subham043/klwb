import { Button, ButtonToolbar, Col, Grid, Heading, Row, Stack } from "rsuite";
import { useInstituteAccountQuery } from "../../../../hooks/data/profile";
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

export default function InstituteDashboardAccountInfo() {
  const [instituteUpdateModal, setInstituteUpdateModal] =
    useState<boolean>(false);
  const { user } = useUser();
  const {
    data: account_info,
    isLoading: isAccountLoading,
    isFetching: isAccountFetching,
    isRefetching: isAccountRefetching,
    refetch: accountRefetch,
    error: accountError,
  } = useInstituteAccountQuery(true);

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
                  user && user.role === RolesEnum.INSTITUTE
                    ? "space-between"
                    : "center"
                }
              >
                <Heading level={6} style={{ color: "white" }}>
                  Institute Information
                </Heading>
                {user && user.role === RolesEnum.INSTITUTE && (
                  <ButtonToolbar>
                    <Button
                      appearance="primary"
                      color="green"
                      size="sm"
                      onClick={() => setInstituteUpdateModal(true)}
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
                <Col className="pb-1" xs={8}>
                  <DetailInfo
                    title="Institute Name"
                    value={account_info?.institute.name}
                  />
                </Col>
                <Col className="pb-1" xs={8}>
                  <DetailInfo
                    title="Institute Reg. No."
                    value={account_info?.reg_no}
                  />
                </Col>
                <Col className="pb-1" xs={8}>
                  <DetailInfo
                    title="Prinicpal Name"
                    value={account_info?.principal}
                  />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" xs={8}>
                  <DetailInfo title="Email" value={account_info?.email} />
                </Col>
                <Col className="pb-1" xs={8}>
                  <DetailInfo title="Phone" value={account_info?.phone} />
                </Col>
                <Col className="pb-1" xs={8}>
                  <DetailInfo
                    title="Pincode"
                    value={account_info?.address.pincode}
                  />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" xs={8}>
                  <DetailInfo
                    title="District"
                    value={account_info?.address.city.name}
                  />
                </Col>
                <Col className="pb-1" xs={8}>
                  <DetailInfo
                    title="Taluq"
                    value={account_info?.address.taluq.name}
                  />
                </Col>
                <Col className="pb-1" xs={8}>
                  <DetailInfo
                    title="Address"
                    value={account_info?.address.address}
                  />
                </Col>
              </Row>
            </Grid>
          </MainCardContainer>
        </div>
        <div className="mt-1">
          <Row gutter={30}>
            <Col xs={8}>
              <Uploader title="Registration Certificate">
                <FileUploader
                  src={account_info?.reg_certification}
                  name="reg_certification"
                  apiRoute={api_routes.institute.account.doc_update}
                  refetch={accountRefetch}
                  allowed={
                    user && user.role === RolesEnum.INSTITUTE ? true : false
                  }
                />
              </Uploader>
            </Col>
            <Col xs={8}>
              <Uploader title=" Principal Signature">
                <FileUploader
                  src={account_info?.principal_signature}
                  name="principal_signature"
                  apiRoute={api_routes.institute.account.doc_update}
                  refetch={accountRefetch}
                  allowed={
                    user && user.role === RolesEnum.INSTITUTE ? true : false
                  }
                />
              </Uploader>
            </Col>
            <Col xs={8}>
              <Uploader title="Institute Seal">
                <FileUploader
                  src={account_info?.seal}
                  name="seal"
                  apiRoute={api_routes.institute.account.doc_update}
                  refetch={accountRefetch}
                  allowed={
                    user && user.role === RolesEnum.INSTITUTE ? true : false
                  }
                />
              </Uploader>
            </Col>
          </Row>
        </div>
        {user && user.role === RolesEnum.INSTITUTE && (
          <AccountInfoUpdate
            modal={instituteUpdateModal}
            setModal={setInstituteUpdateModal}
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
