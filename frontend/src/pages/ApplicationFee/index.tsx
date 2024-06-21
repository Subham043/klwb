import { FC, useState } from "react"
import { Badge, ButtonToolbar, IconButton, Table } from "rsuite"
import { useApplicationFeesQuery } from "../../hooks/data/application_fee";
import PaginatedTableLayout from "../../layouts/PaginatedTable";
import { DrawerProps } from "../../utils/types";
import ApplicationFeeForm from "../../components/ApplicationFeeForm";
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import { useDeleteQuery } from "../../hooks/useDeleteQuery";
import { api_routes } from "../../utils/api_routes";
import moment from "moment";
import { useExcelExport } from "../../hooks/useExcelExport";


const ApplicationFee:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch} = useApplicationFeesQuery();
    const {deleteHandler, deleteLoading} = useDeleteQuery();
    const {excelLoading, exportExcel} = useExcelExport();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});

    const excelHandler = async () => {
        await exportExcel(api_routes.admin.application_fee.excel, 'application_fee.xlsx');
    }

    const onDeleteHandler = async (id:number) => {
        await deleteHandler(api_routes.admin.application_fee.delete(id));
        refetch();
    }

    return <PaginatedTableLayout title="Scholarship Fees" addHandler={() => setOpenDrawer({status:true, type:'Create'})} total={(data?.meta.total ?? 0)} excelHandler={excelHandler} excelLoading={excelLoading}>
        <Table
            loading={isLoading||isFetching||isRefetching}
            bordered={true}
            cellBordered={true}
            autoHeight={true}
            height={400}
            data={data?.data ?? []}
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
                <Table.HeaderCell>Class</Table.HeaderCell>
                <Table.Cell dataKey="classes.name" />
            </Table.Column>

            <Table.Column width={60} align="center" verticalAlign="middle">
                <Table.HeaderCell>Status</Table.HeaderCell>

                <Table.Cell style={{ padding: '6px' }}>
                    {rowData => (
                        <Badge style={{ background: rowData.is_active ? '#4caf50' : '#f44336' }} />
                    )}
                </Table.Cell>
            </Table.Column>

            <Table.Column width={250} verticalAlign="middle">
                <Table.HeaderCell>Created At</Table.HeaderCell>

                <Table.Cell style={{ padding: '6px' }}>
                    {rowData => (
                        <span>{moment(rowData.created_at).format("DD MMM, YYYY hh:mm a")}</span>
                    )}
                </Table.Cell>
            </Table.Column>

            <Table.Column width={100} fixed="right">
                <Table.HeaderCell>Action</Table.HeaderCell>

                <Table.Cell style={{ padding: '6px' }}>
                    {rowData => (
                        <ButtonToolbar>
                            <IconButton appearance="primary" color="orange" icon={<EditIcon />} onClick={() => setOpenDrawer({status:true, type:'Edit', id:rowData.id})} />
                            <IconButton appearance="primary" color="red" icon={<TrashIcon />} loading={deleteLoading} onClick={() => onDeleteHandler(rowData.id)} />
                        </ButtonToolbar>
                    )}
                </Table.Cell>
            </Table.Column>
        </Table>
        <ApplicationFeeForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default ApplicationFee