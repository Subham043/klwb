import { ButtonToolbar, IconButton, Table } from "rsuite";
import { table } from "../../../utils/constants/table";
import VisibleIcon from "@rsuite/icons/Visible";
import { useState } from "react";
import { ActivityLogType } from "../../../utils/types";
import { usePaymentFullContributionsActivityLogsQuery } from "../../../hooks/data/payment_full_contribution";
import Moment from "../../../components/Moment";
import ActivityLogInfo from "../../../components/Admin/ActivityLogInfo";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import PaymentStatusBadge from "../../../components/PaymentStatusBadge";
import SelectDateRangePicker from "../../../components/SelectDateRangePicker";
import SelectYear from "../../../components/Institute/SelectYear";
import SelectPaymentStatus from "../../../components/SelectPaymentStatus";

export default function PaymentFullContributionActivityLog() {
  const {
    data: activity_logss,
    isFetching: isActivityLogFetching,
    isLoading: isActivityLogLoading,
    isRefetching: isActivityLogRefetching,
    error,
    refetch: refetchData,
  } = usePaymentFullContributionsActivityLogsQuery({ enabled: true });
  const [modal, setModal] = useState<{
    status: boolean;
    data: ActivityLogType | null;
  }>({ status: false, data: null });

  return (
    <div className="mb-1">
      <PaginatedTableLayout title="Payment Full Contribution Activity Log Information">
        <PaginatedTableLayout.Header
          title="Payment Full Contribution Activity Log Information"
          addBtn={false}
        >
          <SelectDateRangePicker />
          <SelectYear />
          <SelectPaymentStatus />
        </PaginatedTableLayout.Header>
        <PaginatedTableLayout.Content
          total={activity_logss?.meta.total || 0}
          error={error}
          refetch={refetchData}
        >
          <Table
            loading={
              isActivityLogLoading ||
              isActivityLogFetching ||
              isActivityLogRefetching
            }
            {...table}
            wordWrap="break-all"
            data={activity_logss?.data || []}
          >
            <Table.Column
              width={60}
              align="center"
              fixed
              verticalAlign="middle"
            >
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.Cell fullText dataKey="id" />
            </Table.Column>

            <Table.Column width={160} verticalAlign="middle">
              <Table.HeaderCell>Log Name</Table.HeaderCell>
              <Table.Cell fullText dataKey="log_name" />
            </Table.Column>

            <Table.Column width={100} verticalAlign="middle">
              <Table.HeaderCell>Event</Table.HeaderCell>
              <Table.Cell fullText dataKey="event" />
            </Table.Column>

            <Table.Column width={250} verticalAlign="middle">
              <Table.HeaderCell>Changed By</Table.HeaderCell>

              <Table.Cell fullText style={{ padding: "6px" }}>
                {(rowData) => (
                  <span>
                    {rowData.causer.name} ({rowData.causer.email})
                  </span>
                )}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={250} verticalAlign="middle">
              <Table.HeaderCell>Industry Name</Table.HeaderCell>
              <Table.Cell fullText dataKey="payment.industry_name" />
            </Table.Column>

            <Table.Column width={100} verticalAlign="middle">
              <Table.HeaderCell>Industry ID</Table.HeaderCell>
              <Table.Cell fullText dataKey="payment.industry_id" />
            </Table.Column>

            <Table.Column width={100} verticalAlign="middle">
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.Cell fullText dataKey="payment.year" />
            </Table.Column>

            <Table.Column width={250} verticalAlign="middle">
              <Table.HeaderCell>Pay ID</Table.HeaderCell>
              <Table.Cell fullText dataKey="payment.pay_id" />
            </Table.Column>

            <Table.Column width={100} verticalAlign="middle">
              <Table.HeaderCell>Male</Table.HeaderCell>
              <Table.Cell fullText dataKey="payment.male" />
            </Table.Column>

            <Table.Column width={100} verticalAlign="middle">
              <Table.HeaderCell>Female</Table.HeaderCell>
              <Table.Cell fullText dataKey="payment.female" />
            </Table.Column>

            <Table.Column width={100} verticalAlign="middle">
              <Table.HeaderCell>Total Count</Table.HeaderCell>
              <Table.Cell fullText dataKey="payment.total_employees" />
            </Table.Column>

            <Table.Column width={100} verticalAlign="middle">
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.Cell fullText style={{ padding: "6px" }}>
                {(rowData) => (
                  <span>
                    {rowData.payment.total_employees *
                      (rowData.payment.year < 2025 ? 60 : 150)}
                  </span>
                )}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={100} verticalAlign="middle">
              <Table.HeaderCell>Interest</Table.HeaderCell>
              <Table.Cell fullText dataKey="payment.interest" />
            </Table.Column>

            <Table.Column width={100} verticalAlign="middle">
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.Cell fullText dataKey="payment.price" />
            </Table.Column>

            <Table.Column width={200} verticalAlign="middle">
              <Table.HeaderCell>Status</Table.HeaderCell>

              <Table.Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <PaymentStatusBadge pay_status={rowData.payment.status} />
                )}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={200} verticalAlign="middle">
              <Table.HeaderCell>Payed On</Table.HeaderCell>

              <Table.Cell fullText style={{ padding: "6px" }}>
                {(rowData) => <Moment datetime={rowData.payment.payed_on} />}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={200} verticalAlign="middle">
              <Table.HeaderCell>Updated On</Table.HeaderCell>

              <Table.Cell fullText style={{ padding: "6px" }}>
                {(rowData) => <Moment datetime={rowData.created_at} />}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={60} fixed="right" verticalAlign="middle">
              <Table.HeaderCell>Action</Table.HeaderCell>

              <Table.Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <ButtonToolbar>
                    <IconButton
                      appearance="primary"
                      color="orange"
                      size="sm"
                      icon={<VisibleIcon />}
                      onClick={() =>
                        setModal({
                          status: true,
                          data: rowData as ActivityLogType,
                        })
                      }
                    />
                  </ButtonToolbar>
                )}
              </Table.Cell>
            </Table.Column>
          </Table>
        </PaginatedTableLayout.Content>
      </PaginatedTableLayout>
      {/* <ErrorBoundaryLayout error={error} refetch={refetchData}>
        <ModalCardContainer header="Payment Full Contribution Activity Log Information">
          <div className="mb-1">
            <Stack justifyContent="space-between">
              <ButtonToolbar>
                <Button
                  appearance="default"
                  active
                  // loading={excelLoading}
                  // onClick={excelHandler}
                >
                  Export Excel
                </Button>
              </ButtonToolbar>
            </Stack>
          </div>
          
          <div className="mt-1">
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="sm"
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              total={activity_logss?.meta.total || 0}
              limitOptions={[10, 30, 50]}
              limit={Number(limit)}
              activePage={Number(page)}
              onChangePage={pageHandler}
              onChangeLimit={limitHandler}
            />
          </div>
        </ModalCardContainer>
      </ErrorBoundaryLayout> */}
      <ActivityLogInfo modal={modal} modalHandler={setModal} />
    </div>
  );
}
