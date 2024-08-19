import { FC } from "react"
import { ButtonToolbar, IconButton, Table } from "rsuite"
import VisibleIcon from '@rsuite/icons/Visible';
import { useScholarshipListQuery } from "../../../hooks/data/scholarship_status";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import { Link } from "react-router-dom";
import { page_routes } from "../../../utils/routes/pages";


const ScholarshipList:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useScholarshipListQuery();

    return <PaginatedTableLayout title="Scholarship List">
        <PaginatedTableLayout.Header title="Scholarship List" addBtn={false} />
        <PaginatedTableLayout.Content total={(data?.meta.total ?? 0)} error={error} refetch={refetch}>
            <Table
                loading={isLoading||isFetching||isRefetching}
                bordered={true}
                cellBordered={true}
                autoHeight={true}
                height={200}
                data={data?.data ?? []}
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
                                <IconButton as={Link} appearance="primary" color="orange" icon={<VisibleIcon />} to={page_routes.student.scholarship.view(rowData.id)} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default ScholarshipList