import { FC } from "react"
import { Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { useNonRegisteredInstitutesQuery } from "../../../hooks/data/non_registered_institute";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import SelectCityStatus from "../../../components/SelectCity";
import SelectTaluqStatus from "../../../components/SelectTaluq";
import SelectActiveStatus from "../../../components/SelectActiveStatus";


const NonRegisteredInstitute:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useNonRegisteredInstitutesQuery();

    return <PaginatedTableLayout title="Institutes Non Registered">
        <PaginatedTableLayout.Header title="Institutes Non Registered" addBtn={false} excelLink={api_routes.admin.non_registered_institute.excel} excelName="non_registered_institute.xlsx">
            <SelectCityStatus />
            <SelectTaluqStatus />
            <SelectActiveStatus />
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
                    <Table.Cell fullText dataKey="name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Reg. No.</Table.HeaderCell>
                    <Table.Cell fullText dataKey="reg_no" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Management Type</Table.HeaderCell>
                    <Table.Cell fullText dataKey="management_type" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.Cell fullText dataKey="category" />
                </Table.Column>

                <Table.Column width={160}>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.Cell fullText dataKey="type" />
                </Table.Column>

                <Table.Column width={160}>
                    <Table.HeaderCell>Urban/Rural</Table.HeaderCell>
                    <Table.Cell fullText dataKey="urban_rural" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>District</Table.HeaderCell>
                    <Table.Cell fullText dataKey="taluq.city.name" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>Taluq</Table.HeaderCell>
                    <Table.Cell fullText dataKey="taluq.name" />
                </Table.Column>

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

export default NonRegisteredInstitute