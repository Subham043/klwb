import { FC } from "react"
import { ButtonToolbar, Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import { page_routes } from "../../../utils/routes/pages";
import { useGovtScholarshipListQuery } from "../../../hooks/data/govt_scholarship";
import { table } from "../../../utils/constants/table";
import { ViewLink } from "../../../components/Buttons/ViewBtn";
import SelectStatus from "../../../components/Institute/SelectStatus";
import SelectYear from "../../../components/Institute/SelectYear";
import StatusBadge from "../../../components/Institute/StatusBadge";
import SelectCityStatus from "../../../components/SelectCity";
import SelectTaluqStatus from "../../../components/SelectTaluq";


const GovtScholarshipListPage: FC = () => {
    const { data, isLoading, isFetching, isRefetching, refetch, error } = useGovtScholarshipListQuery();

    return <PaginatedTableLayout title="Scholarship List">
        <PaginatedTableLayout.Header title="Scholarship List" addBtn={false}>
            <SelectCityStatus />
            <SelectTaluqStatus />
            <SelectStatus />
            <SelectYear />
        </PaginatedTableLayout.Header>
        <PaginatedTableLayout.Content total={(data?.meta.total || 0)} error={error} refetch={refetch}>
            <Table
                loading={isLoading || isFetching || isRefetching}
                {...table}
                data={data?.data || []}
            >
                <Table.Column width={60} align="center" fixed>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.Cell dataKey="id" />
                </Table.Column>

                <Table.Column width={260}>
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

                <Table.Column width={160}>
                    <Table.HeaderCell>Course</Table.HeaderCell>
                    <Table.Cell dataKey="mark.course.name" />
                </Table.Column>

                <Table.Column width={160}>
                    <Table.HeaderCell>Class</Table.HeaderCell>
                    <Table.Cell dataKey="mark.class.name" />
                </Table.Column>

                <Table.Column width={160}>
                    <Table.HeaderCell>Aadhar Card No.</Table.HeaderCell>
                    <Table.Cell dataKey="basic_detail.adharcard_no" />
                </Table.Column>

                <Table.Column width={160}>
                    <Table.HeaderCell>Father's Aadhar</Table.HeaderCell>
                    <Table.Cell>
                        {rowData => (
                            <span>{rowData?.basic_detail.not_applicable &&
                                rowData?.basic_detail.not_applicable === "father"
                                ? "Not Applicable"
                                : rowData?.basic_detail.f_adhar}</span>
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={160}>
                    <Table.HeaderCell>Mother's Aadhar</Table.HeaderCell>
                    <Table.Cell>
                        {rowData => (
                            <span>{rowData?.basic_detail.not_applicable &&
                                rowData?.basic_detail.not_applicable === "mother"
                                ? "Not Applicable"
                                : rowData?.basic_detail.m_adhar}</span>
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={160}>
                    <Table.HeaderCell>District</Table.HeaderCell>
                    <Table.Cell dataKey="mark.district.name" />
                </Table.Column>

                <Table.Column width={160}>
                    <Table.HeaderCell>Taluq</Table.HeaderCell>
                    <Table.Cell dataKey="mark.taluq.name" />
                </Table.Column>

                <Table.Column width={160} verticalAlign="middle">
                    <Table.HeaderCell>Amount</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <span>{rowData?.scholarship_fee?.amount || 0}</span>
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={160}>
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.Cell dataKey="application_year" />
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <StatusBadge status={rowData.status} application_state={rowData.application_state} current_application_state={3} />
                        )}
                    </Table.Cell>
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
                                <ViewLink to={page_routes.govt.scholarship.view(rowData.id)} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default GovtScholarshipListPage