import { FC } from "react"
import { ButtonToolbar, Table } from "rsuite"
import { useScholarshipListQuery } from "../../../hooks/data/scholarship_status";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import { page_routes } from "../../../utils/routes/pages";
import { table } from "../../../utils/constants/table";
import { ViewLink } from "../../../components/Buttons/ViewBtn";
import StudentApplicationStatusBadge from "../../../components/StudentApplicationStatusBadge";


const StudentScholarshipListPage:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useScholarshipListQuery();

    return <PaginatedTableLayout title="Scholarship List">
        <PaginatedTableLayout.Header title="Scholarship List" addBtn={false} />
        <PaginatedTableLayout.Content total={(data?.meta.total || 0)} error={error} refetch={refetch}>
            <Table
                loading={isLoading||isFetching||isRefetching}
                {...table}
                wordWrap="break-all"
                data={data?.data || []}
            >
                <Table.Column width={60} align="center" fixed verticalAlign="middle">
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.Cell fullText dataKey="id" />
                </Table.Column>

                <Table.Column  width={260} verticalAlign="middle">
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.Cell fullText dataKey="basic_detail.name" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Institute</Table.HeaderCell>
                    <Table.Cell fullText dataKey="present_institute_name" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Industry</Table.HeaderCell>
                    <Table.Cell fullText dataKey="industry_name" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Graduation</Table.HeaderCell>
                    <Table.Cell fullText dataKey="mark.graduation.name" />
                </Table.Column>

                <Table.Column  width={160} verticalAlign="middle">
                    <Table.HeaderCell>Course</Table.HeaderCell>
                    <Table.Cell fullText dataKey="mark.course.name" />
                </Table.Column>

                <Table.Column  width={160} verticalAlign="middle">
                    <Table.HeaderCell>Class</Table.HeaderCell>
                    <Table.Cell fullText dataKey="mark.class.name" />
                </Table.Column>

                <Table.Column width={220} verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>
    
                    <Table.Cell style={{ padding: "6px" }}>
                    {(rowData) => <StudentApplicationStatusBadge status={rowData?.status} application_state={rowData?.application_state} />}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={160} verticalAlign="middle">
                    <Table.HeaderCell>Amount</Table.HeaderCell>

                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <span>{rowData?.scholarship_fee?.amount || 0}</span>
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column  width={160} verticalAlign="middle">
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.Cell fullText dataKey="application_year" />
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Applied On</Table.HeaderCell>

                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.date} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={100} fixed="right" verticalAlign="middle">
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