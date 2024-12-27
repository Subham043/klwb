import { FC } from "react"
import { Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import SelectYear from "../../../components/Institute/SelectYear";
import { table } from "../../../utils/constants/table";
import { api_routes } from "../../../utils/routes/api";
import SelectCityStatus from "../../../components/SelectCity";
import SelectTaluqStatus from "../../../components/SelectTaluq";
import SelectGraduationStatus from "../../../components/SelectGraduation";
import SelectCourseStatus from "../../../components/SelectCourse";
import SelectClassStatus from "../../../components/SelectClass";
import { useGovtScholarshipReportListQuery } from "../../../hooks/data/govt_report";


const GovtScholarshipReportListPage:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useGovtScholarshipReportListQuery();

    return <PaginatedTableLayout title="Scholarship Report">
        <PaginatedTableLayout.Header title="Scholarship Report" addBtn={false} searchInput={false} excelLink={api_routes.govt.report.scholarship.excel} excelName="scholarship_report.xlsx">
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
                data={data?.data || []}
            >
                <Table.Column width={60} align="center" fixed>
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.Cell dataKey="application_year" />
                </Table.Column>

                <Table.Column  width={200}>
                    <Table.HeaderCell>SC</Table.HeaderCell>
                    <Table.Cell dataKey="sc_count" />
                </Table.Column>

                <Table.Column  width={200}>
                    <Table.HeaderCell>ST</Table.HeaderCell>
                    <Table.Cell dataKey="st_count" />
                </Table.Column>

                <Table.Column  width={200}>
                    <Table.HeaderCell>OBC</Table.HeaderCell>
                    <Table.Cell dataKey="obc_count" />
                </Table.Column>

                <Table.Column width={200}>
                    <Table.HeaderCell>General</Table.HeaderCell>
                    <Table.Cell dataKey="general_count" />
                </Table.Column>

                <Table.Column width={200}>
                    <Table.HeaderCell>Male</Table.HeaderCell>
                    <Table.Cell dataKey="male_count" />
                </Table.Column>

                <Table.Column width={200}>
                    <Table.HeaderCell>Female Count</Table.HeaderCell>
                    <Table.Cell dataKey="female_count" />
                </Table.Column>

                <Table.Column width={200}>
                    <Table.HeaderCell>Pending Applications</Table.HeaderCell>
                    <Table.Cell dataKey="pending_count" />
                </Table.Column>

                <Table.Column width={200}>
                    <Table.HeaderCell>Rejected Applications</Table.HeaderCell>
                    <Table.Cell dataKey="rejected_count" />
                </Table.Column>

                <Table.Column width={200}>
                    <Table.HeaderCell>Approved Applications</Table.HeaderCell>
                    <Table.Cell dataKey="approved_count" />
                </Table.Column>
                <Table.Column width={200} fixed="right">
                    <Table.HeaderCell>Total Applications</Table.HeaderCell>
                    <Table.Cell dataKey="total_count" />
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default GovtScholarshipReportListPage