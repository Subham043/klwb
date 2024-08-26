import { FC } from "react"
import { Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { useIndustriesNonRegisteredQuery } from "../../../hooks/data/industry_non_registered";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";


const IndustryNonRegistered:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useIndustriesNonRegisteredQuery();

    return <PaginatedTableLayout title="Industries Non Registered">
        <PaginatedTableLayout.Header title="Industries Non Registered" addBtn={false} excelLink={api_routes.admin.industry.non_registered.excel} excelName="non_registered_industry.xlsx" />
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

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.Cell dataKey="name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Act</Table.HeaderCell>
                    <Table.Cell dataKey="act_label" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Reg No.</Table.HeaderCell>
                    <Table.Cell dataKey="reg_id" />
                </Table.Column>

                <Table.Column width={60} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={rowData.is_active} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Created At</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.created_at} />
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default IndustryNonRegistered