import { FC } from "react"
import { ButtonToolbar, Table } from "rsuite"
import { useScholarshipListQuery } from "../../../hooks/data/scholarship_status";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import { page_routes } from "../../../utils/routes/pages";
import ApplicationStateBadge from "../../../components/Student/ApplicationStateBadge";
import StatusBadge from "../../../components/Student/StatusBadge";
import { table } from "../../../utils/constants/table";
import { ViewLink } from "../../../components/Buttons/ViewBtn";


const StudentScholarshipListPage:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useScholarshipListQuery();

    return <PaginatedTableLayout title="Scholarship List">
        <PaginatedTableLayout.Header title="Scholarship List" addBtn={false} />
        <PaginatedTableLayout.Content total={(data?.meta.total || 0)} error={error} refetch={refetch}>
            <Table
                {...table}
                loading={isLoading||isFetching||isRefetching}
                data={data?.data || []}
            >
                <Table.Column width={60} align="center" fixed>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.Cell dataKey="id" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.Cell dataKey="basic_detail.name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Institute</Table.HeaderCell>
                    <Table.Cell dataKey="present_institute_name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Industry</Table.HeaderCell>
                    <Table.Cell dataKey="industry_name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Graduation</Table.HeaderCell>
                    <Table.Cell dataKey="mark.graduation.name" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>Course</Table.HeaderCell>
                    <Table.Cell dataKey="mark.course.name" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>Class</Table.HeaderCell>
                    <Table.Cell dataKey="mark.class.name" />
                </Table.Column>

                <Table.Column width={160} verticalAlign="middle">
                    <Table.HeaderCell>Application State</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <ApplicationStateBadge application_state={rowData?.application_state} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={160} verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <StatusBadge status={rowData?.status} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={160} verticalAlign="middle">
                    <Table.HeaderCell>Amount</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <span>{rowData?.scholarship_fee?.amount || 0}</span>
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.Cell dataKey="application_year" />
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Applied On</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.date} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={100} fixed="right">
                    <Table.HeaderCell>Action</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <ButtonToolbar>
                                <ViewLink to={page_routes.student.scholarship.view(rowData.id)} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default StudentScholarshipListPage