import { FC, useState } from "react"
import { Button, ButtonToolbar, Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import { page_routes } from "../../../utils/routes/pages";
import { useGovtScholarshipListQuery } from "../../../hooks/data/govt_scholarship";
import { table } from "../../../utils/constants/table";
import { ViewLink } from "../../../components/Buttons/ViewBtn";
import StatusBadge from "../../../components/Institute/StatusBadge";
import ApplicationFilter from "../../../components/ApplicationFilter";
import { api_routes } from "../../../utils/routes/api";
import { useSearchParams } from "react-router-dom";


const GovtScholarshipListPage: FC = () => {
    const { data, isLoading, isFetching, isRefetching, refetch, error } = useGovtScholarshipListQuery();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    return <>
        <PaginatedTableLayout title="Scholarship List">
            <PaginatedTableLayout.Header title="Scholarship List" addBtn={false} excelLink={api_routes.govt.scholarship.excel} excelName="applications.xlsx">
                <Button appearance="primary" type="button" active onClick={() => setOpenDrawer(true)}>
                    Filter
                </Button>
            </PaginatedTableLayout.Header>
            <PaginatedTableLayout.Content total={(data?.meta.total || 0)} error={error} refetch={refetch}>
                <Table
                    loading={isLoading || isFetching || isRefetching}
                    {...table}
                    wordWrap="break-all"
                    data={data?.data || []}
                >
                    <Table.Column width={60} align="center" fixed verticalAlign="middle">
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.Cell fullText dataKey="id" />
                    </Table.Column>

                    <Table.Column width={260} verticalAlign="middle">
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.Cell fullText dataKey="basic_detail.name" />
                    </Table.Column>

                    <Table.Column width={260} verticalAlign="middle">
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.Cell fullText dataKey="basic_detail.parent_phone" />
                    </Table.Column>

                    <Table.Column width={260} verticalAlign="middle">
                        <Table.HeaderCell>Institute</Table.HeaderCell>
                        <Table.Cell fullText dataKey="present_institute_name" />
                    </Table.Column>

                    <Table.Column width={260} verticalAlign="middle">
                        <Table.HeaderCell>Industry</Table.HeaderCell>
                        <Table.Cell fullText dataKey="industry_name" />
                    </Table.Column>

                    <Table.Column width={200} verticalAlign="middle">
                        <Table.HeaderCell>Industry Act</Table.HeaderCell>
                        <Table.Cell fullText dataKey="industry_act_label" />
                    </Table.Column>

                    <Table.Column width={260} verticalAlign="middle">
                        <Table.HeaderCell>Industry Category</Table.HeaderCell>
                        <Table.Cell fullText dataKey="industry_category" />
                    </Table.Column>

                    <Table.Column width={260} verticalAlign="middle">
                        <Table.HeaderCell>Graduation</Table.HeaderCell>
                        <Table.Cell fullText dataKey="mark.graduation.name" />
                    </Table.Column>

                    <Table.Column width={160} verticalAlign="middle">
                        <Table.HeaderCell>Course</Table.HeaderCell>
                        <Table.Cell fullText dataKey="mark.course.name" />
                    </Table.Column>

                    <Table.Column width={160} verticalAlign="middle">
                        <Table.HeaderCell>Class</Table.HeaderCell>
                        <Table.Cell fullText dataKey="mark.class.name" />
                    </Table.Column>

                    <Table.Column width={160} verticalAlign="middle">
                        <Table.HeaderCell>Aadhar Card No.</Table.HeaderCell>
                        <Table.Cell fullText dataKey="basic_detail.adharcard_no" />
                    </Table.Column>

                    <Table.Column width={160} verticalAlign="middle">
                        <Table.HeaderCell>Father's Aadhar</Table.HeaderCell>
                        <Table.Cell fullText>
                            {rowData => (
                                <span>{rowData?.basic_detail.not_applicable &&
                                    rowData?.basic_detail.not_applicable === "father"
                                    ? "Not Applicable"
                                    : rowData?.basic_detail.f_adhar}</span>
                            )}
                        </Table.Cell>
                    </Table.Column>

                    <Table.Column width={160} verticalAlign="middle">
                        <Table.HeaderCell>Mother's Aadhar</Table.HeaderCell>
                        <Table.Cell fullText>
                            {rowData => (
                                <span>{rowData?.basic_detail.not_applicable &&
                                    rowData?.basic_detail.not_applicable === "mother"
                                    ? "Not Applicable"
                                    : rowData?.basic_detail.m_adhar}</span>
                            )}
                        </Table.Cell>
                    </Table.Column>

                    <Table.Column width={160} verticalAlign="middle">
                        <Table.HeaderCell>District</Table.HeaderCell>
                        <Table.Cell fullText dataKey="company.district.name" />
                    </Table.Column>

                    <Table.Column width={160} verticalAlign="middle">
                        <Table.HeaderCell>Taluq</Table.HeaderCell>
                        <Table.Cell fullText dataKey="company.taluq.name" />
                    </Table.Column>

                    <Table.Column width={160} verticalAlign="middle">
                        <Table.HeaderCell>Amount</Table.HeaderCell>

                        <Table.Cell fullText style={{ padding: '6px' }}>
                            {rowData => (
                                <span>{rowData?.scholarship_fee?.amount || 0}</span>
                            )}
                        </Table.Cell>
                    </Table.Column>

                    <Table.Column width={160} verticalAlign="middle">
                        <Table.HeaderCell>Year</Table.HeaderCell>
                        <Table.Cell fullText dataKey="application_year" />
                    </Table.Column>

                    <Table.Column width={270} verticalAlign="middle">
                        <Table.HeaderCell>Status</Table.HeaderCell>

                        <Table.Cell style={{ padding: '6px' }}>
                            {rowData => (
                                <StatusBadge status={rowData.status} application_state={rowData.application_state} current_application_state={3} current_application_state_name="VERIFICATION OFFICER" />
                            )}
                        </Table.Cell>
                    </Table.Column>

                    {searchParams.get("status")==="rejected" && <Table.Column width={250} verticalAlign="middle">
                        <Table.HeaderCell>Reject Reason</Table.HeaderCell>
                        <Table.Cell fullText dataKey="reject_reason" />
                    </Table.Column>}

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
                                    <ViewLink to={page_routes.govt.scholarship.view(rowData.id)} />
                                </ButtonToolbar>
                            )}
                        </Table.Cell>
                    </Table.Column>
                </Table>
            </PaginatedTableLayout.Content>
        </PaginatedTableLayout>
        <ApplicationFilter drawer={openDrawer} drawerHandler={setOpenDrawer} />
    </>
}

export default GovtScholarshipListPage