import { FC } from "react"
import { Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import SelectYear from "../../../components/Institute/SelectYear";
import { table } from "../../../utils/constants/table";
import SelectCityStatus from "../../../components/SelectCity";
import SelectTaluqStatus from "../../../components/SelectTaluq";
import SelectDateRangePicker from "../../../components/SelectDateRangePicker";
import { useContributionReportQuery } from "../../../hooks/data/report";
import { api_routes } from "../../../utils/routes/api";


const ContributionReportListPage:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useContributionReportQuery();

    return <PaginatedTableLayout title="Contribution Report">
        <PaginatedTableLayout.Header title="Contribution Report" addBtn={false} searchInput={false} excelLink={api_routes.admin.report.contribution.excel} excelName="contribution_report.xlsx">
            <SelectDateRangePicker />
            <SelectCityStatus />
            <SelectTaluqStatus />
            <SelectYear />
        </PaginatedTableLayout.Header>
        <PaginatedTableLayout.Content total={(data?.meta.total || 0)} error={error} refetch={refetch}>
            <Table
                loading={isLoading||isFetching||isRefetching}
                {...table}
                wordWrap="break-all"
                data={data?.data || []}
            >
                <Table.Column width={60} align="center" fixed verticalAlign="middle">
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.Cell fullText dataKey="year" />
                </Table.Column>

                <Table.Column align="center" flexGrow={1} verticalAlign="middle">
                    <Table.HeaderCell>Total No. of Male Employees</Table.HeaderCell>
                    <Table.Cell fullText dataKey="male_count" />
                </Table.Column>

                <Table.Column align="center" flexGrow={1} verticalAlign="middle">
                    <Table.HeaderCell>Total No. of Female Employees</Table.HeaderCell>
                    <Table.Cell fullText dataKey="female_count" />
                </Table.Column>

                <Table.Column align="center" flexGrow={1} verticalAlign="middle">
                    <Table.HeaderCell>Total No. of Contributions</Table.HeaderCell>
                    <Table.Cell fullText dataKey="total_countributions" />
                </Table.Column>

                <Table.Column flexGrow={1} verticalAlign="middle">
                    <Table.HeaderCell>Total Amount of Contributions</Table.HeaderCell>
                    <Table.Cell fullText dataKey="total_countribution_amount" />
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default ContributionReportListPage