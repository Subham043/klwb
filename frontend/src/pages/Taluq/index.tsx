import { FC, useState } from "react"
import { ButtonToolbar, IconButton, Table } from "rsuite"
import { useTaluqsQuery } from "../../hooks/data/taluq";
import PaginatedTableLayout from "../../layouts/PaginatedTable";
import { DrawerProps } from "../../utils/types";
import TaluqForm from "../../components/TaluqForm";
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import { useDeleteQuery } from "../../hooks/useDeleteQuery";
import ConfirmAlert from "../../components/ConfirmAlert";
import { api_routes } from "../../utils/routes/api";
import Status from "../../components/Status";
import Moment from "../../components/Moment";


const Taluq:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useTaluqsQuery();
    const {deleteHandler, deleteLoading} = useDeleteQuery();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});

    const onDeleteHandler = async (id:number) => {
        await deleteHandler(api_routes.admin.taluq.delete(id));
        refetch();
    }

    return <PaginatedTableLayout title="Taluqs">
        <PaginatedTableLayout.Header title="Taluqs" addHandler={() => setOpenDrawer({status:true, type:'Create'})} excelLink={api_routes.admin.taluq.excel} excelName="taluq.xlsx" />
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

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>District</Table.HeaderCell>
                    <Table.Cell dataKey="city.name" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>State</Table.HeaderCell>
                    <Table.Cell dataKey="city.state.name" />
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

                <Table.Column width={100} fixed="right">
                    <Table.HeaderCell>Action</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <ButtonToolbar>
                                <IconButton appearance="primary" color="orange" icon={<EditIcon />} onClick={() => setOpenDrawer({status:true, type:'Edit', id:rowData.id})} />
                                <ConfirmAlert confirmHandler={() => onDeleteHandler(rowData.id)}>
                                    <IconButton appearance="primary" color="red" icon={<TrashIcon />} loading={deleteLoading} />
                                </ConfirmAlert>
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
        <TaluqForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default Taluq