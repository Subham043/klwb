import { FC } from "react";
import { Table } from "rsuite";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import SelectYear from "../../../components/Institute/SelectYear";
import { usePaymentOfficerNonContributionsQuery } from "../../../hooks/data/payment_officer_non_contribution";
import SelectNonContributionStatus from "../../../components/SelectNonContributionStatus";

const NonContribution: FC = () => {
  const { data, isLoading, isFetching, isRefetching, refetch, error } =
    usePaymentOfficerNonContributionsQuery();

  return (
    <PaginatedTableLayout title="Contribution Pending">
      <PaginatedTableLayout.Header
        title="Contribution Pending"
        addBtn={false}
        excelLink={api_routes.payment_officer.non_contribution.excel}
        excelName="non_contribution.xlsx"
      >
        <SelectNonContributionStatus />
        <SelectYear canClear={false} />
      </PaginatedTableLayout.Header>
      <PaginatedTableLayout.Content
        total={data?.meta.total || 0}
        error={error}
        refetch={refetch}
      >
        <Table
          loading={isLoading || isFetching || isRefetching}
          {...table}
          data={data?.data || []}
        >
          <Table.Column width={60} align="center" fixed>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.Cell fullText dataKey="id" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.Cell fullText dataKey="name" />
          </Table.Column>

          <Table.Column width={260}>
            <Table.HeaderCell>Act</Table.HeaderCell>
            <Table.Cell fullText dataKey="act_label" />
          </Table.Column>

          <Table.Column width={260}>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.Cell fullText dataKey="category" />
          </Table.Column>

          <Table.Column width={120} align="center" verticalAlign="middle">
            <Table.HeaderCell>Payment Attempted</Table.HeaderCell>

            <Table.Cell fullText style={{ padding: "6px" }}>
              {(rowData) => (
                <Status
                  status={
                    rowData.non_contributions_payments_pending_count > 0 ||
                    rowData.non_contributions_payments_failed_count > 0
                  }
                  correctLabel="Yes"
                  wrongLabel="No"
                />
              )}
            </Table.Cell>
          </Table.Column>

          <Table.Column width={60} align="center" verticalAlign="middle">
            <Table.HeaderCell>Status</Table.HeaderCell>

            <Table.Cell fullText style={{ padding: "6px" }}>
              {(rowData) => <Status status={rowData.is_active} />}
            </Table.Cell>
          </Table.Column>

          <Table.Column width={250} verticalAlign="middle">
            <Table.HeaderCell>Created At</Table.HeaderCell>

            <Table.Cell fullText style={{ padding: "6px" }}>
              {(rowData) => <Moment datetime={rowData.created_at} />}
            </Table.Cell>
          </Table.Column>
        </Table>
      </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
  );
};

export default NonContribution;
