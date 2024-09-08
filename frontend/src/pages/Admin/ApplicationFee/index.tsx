import { FC, useState } from "react"
import { ButtonToolbar, Table } from "rsuite"
import { useApplicationFeesQuery } from "../../../hooks/data/application_fee";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { DrawerProps } from "../../../utils/types";
import ApplicationFeeForm from "../../../components/Admin/ApplicationFeeForm";
import { useDeleteQuery } from "../../../hooks/useDeleteQuery";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import DeleteBtn from "../../../components/Buttons/DeleteBtn";
import EditBtn from "../../../components/Buttons/EditBtn";


const ApplicationFee:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch,error} = useApplicationFeesQuery();
    const {deleteHandler, deleteLoading} = useDeleteQuery();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});
    
    const onDeleteHandler = async (id:number) => {
        await deleteHandler(api_routes.admin.application_fee.delete(id));
        refetch();
    }

    return <PaginatedTableLayout title="Scholarship Fees">
        <PaginatedTableLayout.Header title="Scholarship Fees" addHandler={() => setOpenDrawer({status:true, type:'Create'})} excelLink={api_routes.admin.application_fee.excel} excelName="application_fee.xlsx" />
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
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.Cell dataKey="amount" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.Cell dataKey="year" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Graduation</Table.HeaderCell>
                    <Table.Cell dataKey="graduation.name" />
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
                                <EditBtn clickHandler={() => setOpenDrawer({status:true, type:'Edit', id:rowData.id})} />
                                <DeleteBtn clickHandler={() => onDeleteHandler(rowData.id)} deleteLoading={deleteLoading} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
        <ApplicationFeeForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default ApplicationFee