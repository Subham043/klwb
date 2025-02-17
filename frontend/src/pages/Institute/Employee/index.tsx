import { FC, useState } from "react"
import { ButtonToolbar, Table } from "rsuite"
import { DrawerProps } from "../../../utils/types";
import { api_routes } from "../../../utils/routes/api";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { useInstituteEmployeesQuery } from "../../../hooks/data/institute_employee";
import InstituteEmployeeForm from "../../../components/Institute/EmployeeForm";
import { table } from "../../../utils/constants/table";
import EditBtn from "../../../components/Buttons/EditBtn";


const InstituteEmployeePage:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error } = useInstituteEmployeesQuery();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});

    return <PaginatedTableLayout title="Employees">
        <PaginatedTableLayout.Header title="Employees" addHandler={() => setOpenDrawer({status:true, type:'Create'})} excelLink={api_routes.institute.employee.excel} excelName="employee.xlsx" />
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

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Created At</Table.HeaderCell>

                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.created_at} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={90} fixed="right">
                    <Table.HeaderCell>Action</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <ButtonToolbar>
                                <EditBtn clickHandler={() => setOpenDrawer({status:true, type:'Edit', id:rowData.id})} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
        <InstituteEmployeeForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default InstituteEmployeePage