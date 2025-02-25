import { FC } from "react";
import { Table } from "rsuite";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import SelectYear from "../../../components/Institute/SelectYear";
import { table } from "../../../utils/constants/table";
import { useContributionComparisonReportQuery } from "../../../hooks/data/report";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";

const ContributionComparisonReportListPage: FC = () => {
  const { data, isLoading, isFetching, isRefetching, refetch, error } =
    useContributionComparisonReportQuery();

  return (
    <PaginatedTableLayout title="Contribution Comparison Report">
      <PaginatedTableLayout.Header
        title="Contribution Comparison Report"
        addBtn={false}
        searchInput={false}
        excelLink={api_routes.admin.report.contribution_comparison.excel}
        excelName="contribution_comparison_report.xlsx"
      >
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
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.Cell fullText dataKey="id" />
          </Table.Column>

          <Table.Column width={260}>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
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

          <Table.Column width={120}>
            <Table.HeaderCell>Selected Year</Table.HeaderCell>
            <Table.Cell fullText dataKey="selected_year" />
          </Table.Column>

          <Table.Column width={110}>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.Cell fullText dataKey="price_selected_year" />
          </Table.Column>

          <Table.Column width={260}>
            <Table.HeaderCell>Pay ID</Table.HeaderCell>
            <Table.Cell fullText dataKey="pay_id_selected_year" />
          </Table.Column>

          <Table.Column width={120}>
            <Table.HeaderCell>Previous Year</Table.HeaderCell>
            <Table.Cell fullText dataKey="previous_selected_year" />
          </Table.Column>

          <Table.Column width={110}>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.Cell fullText dataKey="price_previous_selected_year" />
          </Table.Column>

          <Table.Column width={260}>
            <Table.HeaderCell>Pay ID</Table.HeaderCell>
            <Table.Cell fullText dataKey="pay_id_previous_year" />
          </Table.Column>

          <Table.Column width={60} align="center" verticalAlign="middle">
            <Table.HeaderCell>Status</Table.HeaderCell>

            <Table.Cell fullText style={{ padding: "6px" }}>
              {(rowData) => <Status status={rowData.is_active} />}
            </Table.Cell>
          </Table.Column>
        </Table>
      </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
  );
};

export default ContributionComparisonReportListPage;
