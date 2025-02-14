import { FC, useState } from "react"
import { ButtonToolbar, IconButton, Table } from "rsuite"
import { useStudentsQuery } from "../../../hooks/data/student";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { DrawerProps } from "../../../utils/types";
import StudentForm from "../../../components/Admin/StudentForm";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import EditBtn from "../../../components/Buttons/EditBtn";
import BlockBtn from "../../../components/Buttons/BlockBtn";
import PasswordBtn from "../../../components/Buttons/PasswordBtn";
import { VerificationEnum } from "../../../utils/constants/verified";
import VerifyBtn from "../../../components/Buttons/VerifyBtn";
import SelectYear from "../../../components/Institute/SelectYear";
import SelectVerificationStatus from "../../../components/SelectVerificationStatus";
import SelectAccountStatus from "../../../components/SelectAccountStatus";
import StudentActivityLog from "../../../components/Admin/StudentActivityLog";
import EventDetailIcon from '@rsuite/icons/EventDetail';


const Student:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error } = useStudentsQuery();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});
    const [modal, setModal] = useState<{ status: boolean; data: number|null }>({ status: false, data: null });

    return <PaginatedTableLayout title="Students">
        <PaginatedTableLayout.Header title="Students"  addHandler={() => setOpenDrawer({status:true, type:'Create'})} excelLink={api_routes.admin.student.excel} excelName="students.xlsx">
            <SelectAccountStatus />
            <SelectVerificationStatus />
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
                    <Table.Cell dataKey="id" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.Cell dataKey="name" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.Cell dataKey="email" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.Cell dataKey="phone" />
                </Table.Column>

                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.Cell dataKey="role" />
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

                    <Table.Cell style={{ padding: '6px' }}>
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
                                <IconButton appearance="primary" color="cyan" size="sm" icon={<EventDetailIcon />} onClick={() => setModal({ status: true, data: rowData.id })} />
                                <PasswordBtn route={api_routes.admin.student.password(rowData.id)} />
                                <VerifyBtn route={api_routes.admin.student.verify(rowData.id)} refetch={refetch} isVerified={rowData.verified === VerificationEnum.VERIFIED} />
                                <BlockBtn route={api_routes.admin.student.status(rowData.id)} refetch={refetch} isBlocked={rowData.is_blocked} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
        <StudentForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
        <StudentActivityLog modal={modal} modalHandler={setModal} />
    </PaginatedTableLayout>
}

export default Student