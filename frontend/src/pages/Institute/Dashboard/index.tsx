import {
  Button,
  ButtonToolbar,
  Col,
  Heading,
  HeadingGroup,
  Panel,
  Row,
  Stack,
  Text,
  Uploader,
  useMediaQuery,
} from "rsuite";
import { useInstituteDashboardQuery } from "../../../hooks/data/dashboard";
import ViewsAuthorizeIcon from "@rsuite/icons/ViewsAuthorize";
import ViewsUnauthorizeIcon from "@rsuite/icons/ViewsUnauthorize";
import CreditCardPlusIcon from "@rsuite/icons/CreditCardPlus";
import SiteIcon from "@rsuite/icons/Site";
import classes from "./index.module.css";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { useInstituteAccountQuery } from "../../../hooks/data/profile";
import FileViewer from "../../../components/FileViewer";

export default function InstituteDashboardPage() {
  const [isMobile] = useMediaQuery("(max-width: 700px)");
  const { data, isLoading, isFetching, isRefetching, refetch, error } =
    useInstituteDashboardQuery();
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
        loading={isRefetching || isLoading || isFetching}
        error={error}
        refetch={refetch}
      >
        {data && (
          <Row gutter={30}>
            <Col xs={6}>
              <Panel className={`${classes.trend_box_red}`}>
                <div className={classes.trend_box}>
                  <SiteIcon className={classes.chart_img} />
                  <div className={classes.info}>
                    <div className={classes.title}>Total Application</div>
                    <div className={classes.value}>
                      {data.total_application}
                    </div>
                  </div>
                </div>
              </Panel>
            </Col>
            <Col xs={6}>
              <Panel className={`${classes.trend_box_green}`}>
                <div className={classes.trend_box}>
                  <ViewsAuthorizeIcon className={classes.chart_img} />
                  <div className={classes.info}>
                    <div className={classes.title}>Approved Application</div>
                    <div className={classes.value}>
                      {data.total_approved_application}
                    </div>
                  </div>
                </div>
              </Panel>
            </Col>
            <Col xs={6}>
              <Panel className={`${classes.trend_box_blue}`}>
                <div className={classes.trend_box}>
                  <ViewsUnauthorizeIcon className={classes.chart_img} />
                  <div className={classes.info}>
                    <div className={classes.title}>Rejected Application</div>
                    <div className={classes.value}>
                      {data.total_rejected_application}
                    </div>
                  </div>
                </div>
              </Panel>
            </Col>
            <Col xs={6}>
              <Panel className={`${classes.trend_box_blue}`}>
                <div className={classes.trend_box}>
                  <CreditCardPlusIcon className={classes.chart_img} />
                  <div className={classes.info}>
                    <div className={classes.title}>Pending Application</div>
                    <div className={classes.value}>
                      {data.total_pending_application}
                    </div>
                  </div>
                </div>
              </Panel>
            </Col>
          </Row>
        )}
      </ErrorBoundaryLayout>
      <ErrorBoundaryLayout
        loading={isAccountRefetching || isAccountLoading || isAccountFetching}
        error={accountError}
        refetch={accountRefetch}
      >
        <div className="mt-1">
          <Panel
            header={
              <Stack justifyContent="space-between">
                <Heading level={6} style={{ color: "white" }}>
                  Industry Information
                </Heading>
                <ButtonToolbar>
                  <Button appearance="primary" color="green" size="sm">
                    Edit
                  </Button>
                </ButtonToolbar>
              </Stack>
            }
            className="info-modal-panel"
            bordered
            style={{ backgroundColor: "white" }}
          >
            <Stack
              alignItems="flex-start"
              direction={isMobile ? "column" : "row"}
              spacing={10}
              className="info-modal-stack"
            >
              <HeadingGroup className="mb-1">
                <Heading level={6} className="info-heading">
                  Institute Name
                </Heading>
                <Text>{account_info?.registered_institute.name}</Text>
              </HeadingGroup>
              <HeadingGroup className="mb-1">
                <Heading level={6} className="info-heading">
                  Institute Reg. No.
                </Heading>
                <Text>{account_info?.reg_no}</Text>
              </HeadingGroup>
              <HeadingGroup className="mb-1">
                <Heading level={6} className="info-heading">
                  Prinicpal Name
                </Heading>
                <Text>{account_info?.principal}</Text>
              </HeadingGroup>
            </Stack>
            <Stack
              alignItems="flex-start"
              direction={isMobile ? "column" : "row"}
              spacing={10}
              className="info-modal-stack"
            >
              <HeadingGroup className="mb-1">
                <Heading level={6} className="info-heading">
                  Email
                </Heading>
                <Text>{account_info?.email}</Text>
              </HeadingGroup>
              <HeadingGroup className="mb-1">
                <Heading level={6} className="info-heading">
                  Phone
                </Heading>
                <Text>{account_info?.phone}</Text>
              </HeadingGroup>
              <HeadingGroup className="mb-1">
                <Heading level={6} className="info-heading">
                  Pincode
                </Heading>
                <Text>{account_info?.address.pincode}</Text>
              </HeadingGroup>
            </Stack>
            <Stack
              alignItems="flex-start"
              direction={isMobile ? "column" : "row"}
              spacing={10}
              className="info-modal-stack"
            >
              <HeadingGroup className="mb-1">
                <Heading level={6} className="info-heading">
                  District
                </Heading>
                <Text>{account_info?.address.city.name}</Text>
              </HeadingGroup>
              <HeadingGroup className="mb-1">
                <Heading level={6} className="info-heading">
                  Taluq
                </Heading>
                <Text>{account_info?.address.taluq.name}</Text>
              </HeadingGroup>
              <HeadingGroup className="mb-1">
                <Heading level={6} className="info-heading">
                  Address
                </Heading>
                <Text>{account_info?.address.address}</Text>
              </HeadingGroup>
            </Stack>
          </Panel>
        </div>
        <div className="mt-1">
          <Row gutter={30}>
            <Col xs={8}>
              <Panel
                header={
                  <Stack justifyContent="center">
                    <Heading level={6} style={{ color: "white" }}>
                      Registration Certificate
                    </Heading>
                  </Stack>
                }
                className="info-modal-panel"
                bordered
                style={{ backgroundColor: "white" }}
              >
																<div>
																		<FileViewer src={account_info?.principal_signature} />
																		<Uploader 
																			action=""
																			autoUpload={false}
																			multiple={false}
																			maxPreviewFileSize={1}
																			accept="image/*"
																			onChange={file => console.log(file)}
																			draggable>
																			<div style={{ height: 70, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
																					<span>Click or Drag files to this area to upload</span>
																			</div>
																		</Uploader>
																</div>
              </Panel>
            </Col>
          </Row>
        </div>
      </ErrorBoundaryLayout>
    </div>
  );
}
