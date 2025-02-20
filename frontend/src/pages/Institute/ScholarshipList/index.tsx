import { FC } from "react"
import { ButtonToolbar, Message, Stack, Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import { page_routes } from "../../../utils/routes/pages";
import { useInstituteScholarshipListQuery } from "../../../hooks/data/institute_scholarship";
import SelectStatus from "../../../components/Institute/SelectStatus";
import SelectYear from "../../../components/Institute/SelectYear";
import StatusBadge from "../../../components/Institute/StatusBadge";
import { table } from "../../../utils/constants/table";
import { ViewLink } from "../../../components/Buttons/ViewBtn";
import { api_routes } from "../../../utils/routes/api";


const InstituteScholarshipListPage:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useInstituteScholarshipListQuery();

    return <>
        <Message type="info" bordered showIcon className="mb-1 align-self-start-md" style={{ gap: 10 }}>
            <Stack justifyContent="space-between" className='w-100 wrap-sm'>
                    <div><strong>Please make sure that you have completed the documentation process by uploading all the required documents in order to approve or reject scholarship applications.</strong></div>
            </Stack>
        </Message>
        <PaginatedTableLayout title="Scholarship List">
            <PaginatedTableLayout.Header title="Scholarship List" addBtn={false} excelLink={api_routes.institute.scholarship.excel} excelName="applications.xlsx">
                <SelectStatus />
                <SelectYear />
            </PaginatedTableLayout.Header>
            <PaginatedTableLayout.Content total={(data?.meta.total || 0)} error={error} refetch={refetch}>
                <Table
                    loading={isLoading||isFetching||isRefetching}
                    {...table}
                    data={data?.data || []}
                >
                    <Table.Column width={60} align="center" fixed>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.Cell fullText dataKey="id" />
                    </Table.Column>

                    <Table.Column  width={260}>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.Cell fullText dataKey="basic_detail.name" />
                    </Table.Column>

                    <Table.Column width={260}>
                        <Table.HeaderCell>Institute</Table.HeaderCell>
                        <Table.Cell fullText dataKey="present_institute_name" />
                    </Table.Column>

                    <Table.Column width={260}>
                        <Table.HeaderCell>Industry</Table.HeaderCell>
                        <Table.Cell fullText dataKey="industry_name" />
                    </Table.Column>

                    <Table.Column width={260}>
                        <Table.HeaderCell>Graduation</Table.HeaderCell>
                        <Table.Cell fullText dataKey="mark.graduation.name" />
                    </Table.Column>

                    <Table.Column  width={160}>
                        <Table.HeaderCell>Course</Table.HeaderCell>
                        <Table.Cell fullText dataKey="mark.course.name" />
                    </Table.Column>

                    <Table.Column  width={160}>
                        <Table.HeaderCell>Class</Table.HeaderCell>
                        <Table.Cell fullText dataKey="mark.class.name" />
                    </Table.Column>

                    <Table.Column width={160} verticalAlign="middle">
                        <Table.HeaderCell>Amount</Table.HeaderCell>

                        <Table.Cell fullText style={{ padding: '6px' }}>
                            {rowData => (
                                <span>{rowData?.scholarship_fee?.amount || 0}</span>
                            )}
                        </Table.Cell>
                    </Table.Column>

                    <Table.Column  width={160}>
                        <Table.HeaderCell>Year</Table.HeaderCell>
                        <Table.Cell fullText dataKey="application_year" />
                    </Table.Column>

                    <Table.Column width={250} verticalAlign="middle">
                        <Table.HeaderCell>Status</Table.HeaderCell>

                        <Table.Cell style={{ padding: '6px' }}>
                            {rowData => (
                                <StatusBadge status={rowData.status} application_state={rowData.application_state} current_application_state={1} />
                            )}
                        </Table.Cell>
                    </Table.Column>

                    <Table.Column width={250} verticalAlign="middle">
                        <Table.HeaderCell>Applied On</Table.HeaderCell>

                        <Table.Cell fullText style={{ padding: '6px' }}>
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
                                    <ViewLink to={page_routes.institute.scholarship.view(rowData.id)} />
                                </ButtonToolbar>
                            )}
                        </Table.Cell>
                    </Table.Column>
                </Table>
            </PaginatedTableLayout.Content>
        </PaginatedTableLayout>
    </>
}

export default InstituteScholarshipListPage