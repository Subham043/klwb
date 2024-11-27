import { FC } from "react"
import { ButtonToolbar, Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import { page_routes } from "../../../utils/routes/pages";
import { useIndustryPaymentsQuery } from "../../../hooks/data/industry_payment";
import SelectYear from "../../../components/Institute/SelectYear";
import { table } from "../../../utils/constants/table";
import { ViewLink } from "../../../components/Buttons/ViewBtn";
import IndustryPaymentStatusBadge from "../../../components/IndustryPaymentStatusBadge";
import { api_routes } from "../../../utils/routes/api";


const IndustryPaymentListPage:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useIndustryPaymentsQuery();

    return <PaginatedTableLayout title="Payment List">
        <PaginatedTableLayout.Header title="Payment List" addBtn={false} excelLink={api_routes.industry.payment.excel} excelName="payment.xlsx">
            <SelectYear />
        </PaginatedTableLayout.Header>
        <PaginatedTableLayout.Content total={(data?.meta.total || 0)} error={error} refetch={refetch}>
            <Table
                loading={isLoading||isFetching||isRefetching}
                {...table}
                data={data?.data || []}
            >
                <Table.Column width={60} align="center" fixed>
                    <Table.HeaderCell>Yaer</Table.HeaderCell>
                    <Table.Cell dataKey="year" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Company Name</Table.HeaderCell>
                    <Table.Cell dataKey="industry.name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Male Count</Table.HeaderCell>
                    <Table.Cell dataKey="male" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Female Count</Table.HeaderCell>
                    <Table.Cell dataKey="female" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Total Count</Table.HeaderCell>
                    <Table.Cell dataKey="total_employees" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.Cell dataKey="price" />
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <IndustryPaymentStatusBadge status={rowData.status} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Paid On</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.payed_on} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={100} fixed="right">
                    <Table.HeaderCell>Action</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <ButtonToolbar>
                                <ViewLink to={page_routes.industry.payment.view(rowData.id)} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default IndustryPaymentListPage