import { FC, useState } from "react"
import { Badge, ButtonToolbar, IconButton, Table } from "rsuite"
import { useApplicationDatesQuery } from "../../hooks/data/application_date";
import PaginatedTableLayout from "../../layouts/PaginatedTable";
import { DrawerProps } from "../../utils/types";
import ApplicationDateForm from "../../components/ApplicationDateForm";
import EditIcon from '@rsuite/icons/Edit';
import { api_routes } from "../../utils/api_routes";
import moment from "moment";
import { useExcelExport } from "../../hooks/useExcelExport";


const ApplicationDate:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch} = useApplicationDatesQuery();
    const {excelLoading, exportExcel} = useExcelExport();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});

    const excelHandler = async () => {
        await exportExcel(api_routes.admin.application_date.excel, 'application_date.xlsx');
    }

    return <PaginatedTableLayout title="Application Dates" addHandler={() => setOpenDrawer({status:true, type:'Create'})} total={(data?.meta.total ?? 0)} excelHandler={excelHandler} excelLoading={excelLoading}>
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
                <Table.HeaderCell>Application Year</Table.HeaderCell>
                <Table.Cell dataKey="application_year" />
            </Table.Column>

            <Table.Column flexGrow={1}>
                <Table.HeaderCell>From Date</Table.HeaderCell>
                <Table.Cell style={{ padding: '6px' }}>
                    {rowData => (
                        <span>{moment(rowData.from_date).format("DD MMM, YYYY")}</span>
                    )}
                </Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1}>
                <Table.HeaderCell>To Date</Table.HeaderCell>
                <Table.Cell style={{ padding: '6px' }}>
                    {rowData => (
                        <span>{moment(rowData.to_date).format("DD MMM, YYYY")}</span>
                    )}
                </Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1}>
                <Table.HeaderCell>Approval End Date</Table.HeaderCell>
                <Table.Cell style={{ padding: '6px' }}>
                    {rowData => (
                        <span>{moment(rowData.approval_end_date).format("DD MMM, YYYY")}</span>
                    )}
                </Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1}>
                <Table.HeaderCell>Verification End Date</Table.HeaderCell>
                <Table.Cell style={{ padding: '6px' }}>
                    {rowData => (
                        <span>{moment(rowData.verification_end_date).format("DD MMM, YYYY")}</span>
                    )}
                </Table.Cell>
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

            <Table.Column width={70} fixed="right">
                <Table.HeaderCell>Action</Table.HeaderCell>

                <Table.Cell style={{ padding: '6px' }}>
                    {rowData => (
                        <ButtonToolbar>
                            <IconButton appearance="primary" color="orange" disabled={!moment().isBetween(rowData.from_date, rowData.to_date)} icon={<EditIcon />} onClick={() => setOpenDrawer({status:true, type:'Edit', id:rowData.id})} />
                        </ButtonToolbar>
                    )}
                </Table.Cell>
            </Table.Column>
        </Table>
        <ApplicationDateForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default ApplicationDate