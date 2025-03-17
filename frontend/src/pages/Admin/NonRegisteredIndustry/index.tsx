import { FC } from "react"
import { Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { useNonRegisteredIndustriesQuery } from "../../../hooks/data/non_registered_industry";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import SelectActiveStatus from "../../../components/SelectActiveStatus";


const NonRegisteredIndustry:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useNonRegisteredIndustriesQuery();

    return <PaginatedTableLayout title="Non Registered Industries ">
        <PaginatedTableLayout.Header title="Non Registered Industries " addBtn={false} excelLink={api_routes.admin.non_registered_industry.excel} excelName="non_registered_industry.xlsx">
            <SelectActiveStatus />
        </PaginatedTableLayout.Header>
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

                <Table.Column flexGrow={1} verticalAlign="middle">
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.Cell fullText dataKey="name" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Act</Table.HeaderCell>
                    <Table.Cell fullText dataKey="act_label" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.Cell fullText dataKey="category" />
                </Table.Column>

                {/* <Table.Column width={260}>
                    <Table.HeaderCell>Reg No.</Table.HeaderCell>
                    <Table.Cell fullText dataKey="reg_id" />
                </Table.Column> */}

                <Table.Column width={60} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={rowData.is_active} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Created At</Table.HeaderCell>

                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.created_at} />
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default NonRegisteredIndustry