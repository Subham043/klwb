import { Button, Col, Message, Panel, Row, Stack } from "rsuite";
import classes from "./index.module.css";
import ViewsAuthorizeIcon from '@rsuite/icons/ViewsAuthorize';
import ViewsUnauthorizeIcon from '@rsuite/icons/ViewsUnauthorize';
import SiteIcon from '@rsuite/icons/Site';
import ModelIcon from '@rsuite/icons/Model';
import { Link } from "react-router-dom";
import { page_routes } from "../../../utils/routes/pages";
import { useStudentDashboardQuery } from "../../../hooks/data/dashboard";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";

export default function StudentDashboardPage() {
  const {data, isLoading, isFetching, isRefetching, refetch, error} = useStudentDashboardQuery()
  return (
    <div>
      <ErrorBoundaryLayout
          loading={isRefetching || isLoading || isFetching}
          error={error}
          refetch={refetch}
      >
        {(data) && <>
          <Row gutter={30}>
            <Col xs={6}>
              <Panel className={`${classes.trend_box_red}`}>
                <div className={classes.trend_box}>
                  <SiteIcon className={classes.chart_img} />
                  <div className={classes.info}>
                    <div className={classes.title}>Total Application</div>
                    <div className={classes.value}>{data.total_application}</div>
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
                    <div className={classes.value}>{data.total_approved_application}</div>
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
                    <div className={classes.value}>{data.total_rejected_application}</div>
                  </div>
                </div>
              </Panel>
            </Col>
            <Col xs={6}>
              <Panel className={`${classes.trend_box_blue}`}>
                <div className={classes.trend_box}>
                  <ModelIcon className={classes.chart_img} />
                  <div className={classes.info}>
                    <div className={classes.title}>Total Scholarship Amount</div>
                    <div className={classes.value}>{data.total_scholarship_amount}</div>
                  </div>
                </div>
              </Panel>
            </Col>
          </Row>
          {
            data.is_scholarship_open ? (data.is_eligible_to_apply ? <Message type="success" bordered showIcon className="mt-1" style={{ gap: 10 }}>
                  <Stack justifyContent="space-between" className='w-100'>
                      <div><strong>{data.message}</strong></div>
                      <Button as={Link} to={page_routes.student.scholarship.apply} size="sm" appearance="primary" color='green'>APPLY NOW</Button>
                  </Stack>
              </Message> : (data.can_resubmit ? <Message type="error" bordered showIcon className="mt-1" style={{ gap: 10 }}>
                  <Stack justifyContent="space-between" className='w-100'>
                      <div><strong>{data.message}</strong></div>
                      <Button as={Link} to={page_routes.student.scholarship.resubmit} size="sm" appearance="primary" color='red'>RESUBMIT</Button>
                  </Stack>
              </Message>: <Message type="info" bordered showIcon className="mt-1" style={{ gap: 10 }}>
                  <Stack justifyContent="space-between" className='w-100'>
                      <div><strong>{data.message}</strong></div>
                      <Button as={Link} to={page_routes.student.scholarship.status} size="sm" appearance="primary" color='blue'>CHECK STATUS</Button>
                  </Stack>
              </Message>)) : <Message type="error" bordered showIcon className="mt-1" style={{ gap: 10 }}>
              <Stack justifyContent="space-between" className='w-100'>
                  <div><strong>{data.message}</strong></div>
                  <Button as={Link} to={page_routes.student.scholarship.status} size="sm" appearance="primary" color='red'>CHECK STATUS</Button>
              </Stack>
          </Message>
          }
        </>}
      </ErrorBoundaryLayout>
    </div>
  );
}
