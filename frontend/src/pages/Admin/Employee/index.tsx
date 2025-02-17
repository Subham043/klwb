import { FC, useState } from "react"
import { ButtonToolbar, Table } from "rsuite"
import { useEmployeesQuery } from "../../../hooks/data/employee";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { DrawerProps } from "../../../utils/types";
import EmployeeForm from "../../../components/Admin/EmployeeForm";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import EditBtn from "../../../components/Buttons/EditBtn";
import BlockBtn from "../../../components/Buttons/BlockBtn";
import PasswordBtn from "../../../components/Buttons/PasswordBtn";
import { VerificationEnum } from "../../../utils/constants/verified";
import VerifyBtn from "../../../components/Buttons/VerifyBtn";


const Employee:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error } = useEmployeesQuery();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});

    return <PaginatedTableLayout title="Staff / Officer">
        <PaginatedTableLayout.Header title="Staff / Officer" addHandler={() => setOpenDrawer({status:true, type:'Create'})} excelLink={api_routes.admin.employee.excel} excelName="staffs.xlsx" />
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
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.Cell fullText dataKey="name" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.Cell fullText dataKey="email" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.Cell fullText dataKey="phone" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.Cell fullText dataKey="role" />
                </Table.Column>

                <Table.Column width={60} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={!rowData.is_blocked} wrongLabel="Blocked" />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={160} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Verification Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status
                                status={
                                    rowData.verified === VerificationEnum.VERIFIED
                                }
                                wrongLabel={VerificationEnum.VERIFICATION_PENDING}
                                correctLabel={VerificationEnum.VERIFIED}
                            />
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

                <Table.Column width={190} fixed="right">
                    <Table.HeaderCell>Action</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <ButtonToolbar>
                                <EditBtn clickHandler={() => setOpenDrawer({status:true, type:'Edit', id:rowData.id})} />
                                <PasswordBtn route={api_routes.admin.employee.password(rowData.id)} />
                                <VerifyBtn route={api_routes.admin.employee.verify(rowData.id)} refetch={refetch} isVerified={rowData.verified === VerificationEnum.VERIFIED} />
                                <BlockBtn route={api_routes.admin.employee.status(rowData.id)} refetch={refetch} isBlocked={rowData.is_blocked} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
        <EmployeeForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default Employee