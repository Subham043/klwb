import { FC, useState } from "react"
import { ButtonToolbar, Table } from "rsuite"
import { useCitiesQuery } from "../../../hooks/data/city";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { DrawerProps } from "../../../utils/types";
import CityForm from "../../../components/Admin/CityForm";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import EditBtn from "../../../components/Buttons/EditBtn";
import BlockBtn from "../../../components/Buttons/BlockBtn";
import SelectActiveStatus from "../../../components/SelectActiveStatus";


const City:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useCitiesQuery();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});

    return <PaginatedTableLayout title="Districts">
        <PaginatedTableLayout.Header title="Districts" addHandler={() => setOpenDrawer({status:true, type:'Create'})} excelLink={api_routes.admin.city.excel} excelName="district.xlsx">
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

                <Table.Column flexGrow={1} verticalAlign="middle">
                    <Table.HeaderCell>Special Name</Table.HeaderCell>
                    <Table.Cell fullText dataKey="special_name" />
                </Table.Column>

                <Table.Column flexGrow={1} verticalAlign="middle">
                    <Table.HeaderCell>State</Table.HeaderCell>
                    <Table.Cell fullText dataKey="state.name" />
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

                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.created_at} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={100} fixed="right" verticalAlign="middle">
                    <Table.HeaderCell>Action</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <ButtonToolbar>
                                <EditBtn clickHandler={() => setOpenDrawer({status:true, type:'Edit', id:rowData.id})} />
                                <BlockBtn route={api_routes.admin.city.status(rowData.id)} refetch={refetch} isBlocked={!rowData.is_active} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
        <CityForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default City