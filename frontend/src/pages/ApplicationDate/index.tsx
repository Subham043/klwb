import { FC, useState } from "react"
import { ButtonToolbar, IconButton, Table } from "rsuite"
import { useApplicationDatesQuery } from "../../hooks/data/application_date";
import PaginatedTableLayout from "../../layouts/PaginatedTable";
import { DrawerProps } from "../../utils/types";
import ApplicationDateForm from "../../components/ApplicationDateForm";
import EditIcon from '@rsuite/icons/Edit';
import moment from "moment";
import { api_routes } from "../../utils/routes/api";
import Status from "../../components/Status";
import Moment from "../../components/Moment";


const ApplicationDate:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useApplicationDatesQuery();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});


    return <PaginatedTableLayout title="Application Dates">
        <PaginatedTableLayout.Header title="Application Dates" addHandler={() => setOpenDrawer({status:true, type:'Create'})} excelLink={api_routes.admin.application_date.excel} excelName="application_date.xlsx" />
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
                    <Table.HeaderCell>Application Year</Table.HeaderCell>
                    <Table.Cell dataKey="application_year" />
                </Table.Column>

                <Table.Column flexGrow={1} align="center">
                    <Table.HeaderCell>From Date</Table.HeaderCell>
                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.from_date} format="DD MMM, YYYY" />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column flexGrow={1} align="center">
                    <Table.HeaderCell>To Date</Table.HeaderCell>
                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.to_date} format="DD MMM, YYYY" />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column flexGrow={1} align="center">
                    <Table.HeaderCell>Approval End Date</Table.HeaderCell>
                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.approval_end_date} format="DD MMM, YYYY" />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column flexGrow={1} align="center">
                    <Table.HeaderCell>Verification End Date</Table.HeaderCell>
                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.verification_end_date} format="DD MMM, YYYY" />
                        )}
                    </Table.Cell>
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
        </PaginatedTableLayout.Content>
        <ApplicationDateForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default ApplicationDate