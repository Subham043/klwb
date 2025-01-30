import { FC } from "react"
import { Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import { useNonContributionsQuery } from "../../../hooks/data/non_contribution";
import SelectYear from "../../../components/Institute/SelectYear";


const NonContribution:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useNonContributionsQuery();

    return <PaginatedTableLayout title="Contribution Pending">
        <PaginatedTableLayout.Header title="Contribution Pending" addBtn={false} excelLink={api_routes.admin.non_contribution.excel} excelName="non_contribution.xlsx">
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
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.Cell dataKey="category" />
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

export default NonContribution