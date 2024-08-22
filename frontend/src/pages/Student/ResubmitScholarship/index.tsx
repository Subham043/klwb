import { Button, Divider, Message, Panel, Stack } from "rsuite";
import classes from "./index.module.css";
import ScholarshipForm from "../../../components/Student/ScholarshipForm";
import { useScholarshipStatusQuery } from "../../../hooks/data/scholarship_status";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import CheckingEligibility from "../../../components/Student/Eligibility/CheckingEligibility";
import { Link } from "react-router-dom";
import { page_routes } from "../../../utils/routes/pages";

export default function StudentResubmitScholarshipPage() {
  const { data, isFetching, isLoading, isRefetching, refetch, error } =
    useScholarshipStatusQuery();
  return (
    <div className="data-table-container">
      <Panel
        bordered
        shaded
        header={
          <Stack justifyContent="center" alignItems="center">
            <div className="text-center">
              <h1 className={classes.main_heading}>
                Online Scholarship Application Form
              </h1>
              <h6 className={classes.main_sub_heading}>
                ಸಂಘಟಿತ ಕಾರ್ಮಿಕ ಮಕ್ಕಳಿಂದ ಶೈಕ್ಷಣಿಕ ಪ್ರೋತ್ಸಾಹ ಧನ ಸಹಾಯಕ್ಕಾಗಿ ಅರ್ಜಿ
              </h6>
            </div>
          </Stack>
        }
      >
        <Divider />
        <ErrorBoundaryLayout
          loading={isRefetching}
          error={error}
          refetch={refetch}
        >
          <div style={{ width: "100%", position: "relative" }}>
            {isFetching || isLoading || isRefetching ? (
              <CheckingEligibility />
            ) : data && data.can_resubmit ? (
              <ScholarshipForm
                data={data && data.application ? data.application : null}
                type="resubmit"
              />
            ) : (
              <Message
                type="error"
                bordered
                showIcon
                className="mt-1"
                style={{ gap: 10 }}
              >
                <Stack justifyContent="space-between" className="w-100">
                  <div>
                    <strong>
                      Oops! The page you requested is not available.
                    </strong>
                  </div>
                  <Button
                    as={Link}
                    to={page_routes.student.scholarship.status}
                    size="sm"
                    appearance="primary"
                    color="red"
                  >
                    Go Back
                  </Button>
                </Stack>
              </Message>
            )}
          </div>
        </ErrorBoundaryLayout>
      </Panel>
    </div>
  );
}
