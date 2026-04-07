import { FC } from "react";
import {
  Badge,
  ButtonToolbar,
  IconButton,
  Table,
  Tooltip,
  Whisper,
} from "rsuite";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import SelectYear from "../../../components/Institute/SelectYear";
import { table } from "../../../utils/constants/table";
import ChangeListIcon from "@rsuite/icons/ChangeList";
import PaymentStatusBadge from "../../../components/PaymentStatusBadge";
import SelectDateRangePicker from "../../../components/SelectDateRangePicker";
import { usePaymentFullContributionsQuery } from "../../../hooks/data/payment_full_contribution";
import SelectPaymentStatus from "../../../components/SelectPaymentStatus";

const Excel = ({ link }: { link: string }) => {
  return (
    <ButtonToolbar>
      <Whisper
        placement="bottomEnd"
        controlId="control-id-click"
        trigger="hover"
        speaker={<Tooltip>Download</Tooltip>}
      >
        <IconButton
          appearance="primary"
          color={"green"}
          icon={<ChangeListIcon />}
          as={"a"}
          href={link}
          download={true}
          size="sm"
        />
      </Whisper>
    </ButtonToolbar>
  );
};

const PaymentFullContributionList: FC = () => {
  const { data, isLoading, isFetching, isRefetching, refetch, error } =
    usePaymentFullContributionsQuery();

  return (
    <PaginatedTableLayout title="Payment Full Contribution">
      <PaginatedTableLayout.Header
        title="Payment Full Contribution"
        addBtn={false}
      >
        <SelectDateRangePicker />
        <SelectYear />
        <SelectPaymentStatus />
      </PaginatedTableLayout.Header>
      <PaginatedTableLayout.Content
        total={data?.meta.total || 0}
        error={error}
        refetch={refetch}
      >
        <Table
          loading={isLoading || isFetching || isRefetching}
          {...table}
          wordWrap="break-all"
          data={data?.data || []}
        >
          <Table.Column width={60} align="center" fixed verticalAlign="middle">
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.Cell fullText dataKey="year" />
          </Table.Column>

          <Table.Column width={260} verticalAlign="middle">
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.Cell fullText dataKey="industry_name" />
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Company ID</Table.HeaderCell>
            <Table.Cell fullText dataKey="comp_regd_id" />
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Male Count</Table.HeaderCell>
            <Table.Cell fullText dataKey="male" />
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Female Count</Table.HeaderCell>
            <Table.Cell fullText dataKey="female" />
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Total Count</Table.HeaderCell>
            <Table.Cell fullText dataKey="total_employees" />
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.Cell fullText style={{ padding: "6px" }}>
              {(rowData) => (
                <span>
                  {rowData.total_employees * (rowData.year < 2025 ? 60 : 150)}
                </span>
              )}
            </Table.Cell>
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Interest</Table.HeaderCell>
            <Table.Cell fullText dataKey="interest" />
          </Table.Column>

          <Table.Column width={100} verticalAlign="middle">
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.Cell fullText dataKey="price" />
          </Table.Column>

          <Table.Column width={260} verticalAlign="middle">
            <Table.HeaderCell>Payment ID</Table.HeaderCell>
            <Table.Cell fullText dataKey="pay_id" />
          </Table.Column>

          <Table.Column width={200} verticalAlign="middle">
            <Table.HeaderCell>Status</Table.HeaderCell>

            <Table.Cell style={{ padding: "6px" }}>
              {(rowData) => <PaymentStatusBadge pay_status={rowData.status} />}
            </Table.Cell>
          </Table.Column>

          <Table.Column width={130} verticalAlign="middle">
            <Table.HeaderCell>Manual Verification</Table.HeaderCell>

            <Table.Cell style={{ padding: "6px" }}>
              {(rowData) =>
                rowData.resolved === 1 ? (
                  <Badge
                    style={{ background: "#4caf50", padding: "7px 9px" }}
                    content={"YES"}
                  />
                ) : (
                  <Badge
                    style={{ background: "#f44336", padding: "7px 9px" }}
                    content={"NO"}
                  />
                )
              }
            </Table.Cell>
          </Table.Column>

          <Table.Column width={80} verticalAlign="middle">
            <Table.HeaderCell>Edited</Table.HeaderCell>

            <Table.Cell style={{ padding: "6px" }}>
              {(rowData) =>
                rowData.is_edited ? (
                  <Badge
                    style={{ background: "#4caf50", padding: "7px 9px" }}
                    content={"YES"}
                  />
                ) : (
                  <Badge
                    style={{ background: "#f44336", padding: "7px 9px" }}
                    content={"NO"}
                  />
                )
              }
            </Table.Cell>
          </Table.Column>

          <Table.Column width={120} verticalAlign="middle">
            <Table.HeaderCell>Employee Excel</Table.HeaderCell>

            <Table.Cell style={{ padding: "6px" }}>
              {(rowData) =>
                (rowData.status === 0 || rowData.status === 2) &&
                rowData.employee_excel ? (
                  <Excel link={rowData.employee_excel} />
                ) : (
                  <></>
                )
              }
            </Table.Cell>
          </Table.Column>

          <Table.Column width={250} verticalAlign="middle">
            <Table.HeaderCell>Paid On</Table.HeaderCell>

            <Table.Cell fullText style={{ padding: "6px" }}>
              {(rowData) => <Moment datetime={rowData.payed_on} />}
            </Table.Cell>
          </Table.Column>
        </Table>
      </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
  );
};

export default PaymentFullContributionList;
