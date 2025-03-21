import { FC, useState } from "react"
import { ButtonToolbar, Table } from "rsuite"
import { useApplicationDatesQuery } from "../../../hooks/data/application_date";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { DrawerProps } from "../../../utils/types";
import ApplicationDateForm from "../../../components/Admin/ApplicationDateForm";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import EditBtn from "../../../components/Buttons/EditBtn";
import BlockBtn from "../../../components/Buttons/BlockBtn";


const ApplicationDate:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useApplicationDatesQuery();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});


    return <PaginatedTableLayout title="Application Dates">
        <PaginatedTableLayout.Header title="Application Dates" addHandler={() => setOpenDrawer({status:true, type:'Create'})} excelLink={api_routes.admin.application_date.excel} excelName="application_date.xlsx" />
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

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Application Year</Table.HeaderCell>
                    <Table.Cell fullText dataKey="application_year" />
                </Table.Column>

                <Table.Column width={250} align="center" verticalAlign="middle">
                    <Table.HeaderCell>From Date</Table.HeaderCell>
                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.from_date} format="DD MMM, YYYY" />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} align="center" verticalAlign="middle">
                    <Table.HeaderCell>To Date</Table.HeaderCell>
                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.to_date} format="DD MMM, YYYY" />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Can Student Resubmit?</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={rowData.can_resubmit} correctLabel="Yes" wrongLabel="No" />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Can Industry/Institute Approve?</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={rowData.can_approve} correctLabel="Yes" wrongLabel="No" />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Can Official Verify?</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={rowData.can_verify} correctLabel="Yes" wrongLabel="No" />
                        )}
                    </Table.Cell>
                </Table.Column>
                
                <Table.Column width={250} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={rowData.is_active} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Has Expired?</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={!rowData.has_expired} correctLabel="No" wrongLabel="Yes" />
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
                                <BlockBtn route={api_routes.admin.application_date.status(rowData.id)} refetch={refetch} isBlocked={!rowData.is_active} />
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