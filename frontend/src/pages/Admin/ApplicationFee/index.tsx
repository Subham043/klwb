import { FC, useState } from "react"
import { ButtonToolbar, Table } from "rsuite"
import { useApplicationFeesQuery } from "../../../hooks/data/application_fee";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { DrawerProps } from "../../../utils/types";
import ApplicationFeeForm from "../../../components/Admin/ApplicationFeeForm";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import EditBtn from "../../../components/Buttons/EditBtn";
import BlockBtn from "../../../components/Buttons/BlockBtn";
import SelectYear from "../../../components/Institute/SelectYear";
import SelectGraduationStatus from "../../../components/SelectGraduation";
import SelectActiveStatus from "../../../components/SelectActiveStatus";


const ApplicationFee:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch,error} = useApplicationFeesQuery();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});

    return <PaginatedTableLayout title="Educational Assistance Amount">
        <PaginatedTableLayout.Header title="Amount" addHandler={() => setOpenDrawer({status:true, type:'Create'})} excelLink={api_routes.admin.application_fee.excel} excelName="application_fee.xlsx">
            <SelectGraduationStatus />
            <SelectActiveStatus />
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
                    <Table.Cell fullText dataKey="id" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.Cell fullText dataKey="amount" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.Cell fullText dataKey="year" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Graduation</Table.HeaderCell>
                    <Table.Cell fullText dataKey="graduation.name" />
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

                <Table.Column width={100} fixed="right">
                    <Table.HeaderCell>Action</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <ButtonToolbar>
                                <EditBtn clickHandler={() => setOpenDrawer({status:true, type:'Edit', id:rowData.id})} />
                                <BlockBtn route={api_routes.admin.application_fee.status(rowData.id)} refetch={refetch} isBlocked={!rowData.is_active} />
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