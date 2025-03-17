import { FC } from "react"
import { Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import SelectYear from "../../../components/Institute/SelectYear";
import { table } from "../../../utils/constants/table";
import { api_routes } from "../../../utils/routes/api";
import SelectCityStatus from "../../../components/SelectCity";
import SelectTaluqStatus from "../../../components/SelectTaluq";
import { useScholarshipReportListQuery } from "../../../hooks/data/report";
import SelectGraduationStatus from "../../../components/SelectGraduation";
import SelectCourseStatus from "../../../components/SelectCourse";
import SelectClassStatus from "../../../components/SelectClass";


const ScholarshipReportListPage:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useScholarshipReportListQuery();

    return <PaginatedTableLayout title="Scholarship Report">
        <PaginatedTableLayout.Header title="Scholarship Report" addBtn={false} searchInput={false} excelLink={api_routes.admin.report.scholarship.excel} excelName="scholarship_report.xlsx">
            <SelectCityStatus />
            <SelectTaluqStatus />
            <SelectGraduationStatus />
            <SelectCourseStatus />
            <SelectClassStatus />
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
                    <Table.Cell fullText dataKey="application_year" />
                </Table.Column>

                <Table.Column  width={200} verticalAlign="middle">
                    <Table.HeaderCell>SC</Table.HeaderCell>
                    <Table.Cell fullText dataKey="sc_count" />
                </Table.Column>

                <Table.Column  width={200} verticalAlign="middle">
                    <Table.HeaderCell>ST</Table.HeaderCell>
                    <Table.Cell fullText dataKey="st_count" />
                </Table.Column>

                <Table.Column  width={200} verticalAlign="middle">
                    <Table.HeaderCell>OBC</Table.HeaderCell>
                    <Table.Cell fullText dataKey="obc_count" />
                </Table.Column>

                <Table.Column width={200} verticalAlign="middle">
                    <Table.HeaderCell>General</Table.HeaderCell>
                    <Table.Cell fullText dataKey="general_count" />
                </Table.Column>

                <Table.Column width={200} verticalAlign="middle">
                    <Table.HeaderCell>Male</Table.HeaderCell>
                    <Table.Cell fullText dataKey="male_count" />
                </Table.Column>

                <Table.Column width={200} verticalAlign="middle">
                    <Table.HeaderCell>Female Count</Table.HeaderCell>
                    <Table.Cell fullText dataKey="female_count" />
                </Table.Column>

                <Table.Column width={200} verticalAlign="middle">
                    <Table.HeaderCell>Pending Applications</Table.HeaderCell>
                    <Table.Cell fullText dataKey="pending_count" />
                </Table.Column>

                <Table.Column width={200} verticalAlign="middle">
                    <Table.HeaderCell>Rejected Applications</Table.HeaderCell>
                    <Table.Cell fullText dataKey="rejected_count" />
                </Table.Column>

                <Table.Column width={200} verticalAlign="middle">
                    <Table.HeaderCell>Approved Applications</Table.HeaderCell>
                    <Table.Cell fullText dataKey="approved_count" />
                </Table.Column>
                <Table.Column width={200} fixed="right" verticalAlign="middle">
                    <Table.HeaderCell>Total Applications</Table.HeaderCell>
                    <Table.Cell fullText dataKey="total_count" />
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default ScholarshipReportListPage