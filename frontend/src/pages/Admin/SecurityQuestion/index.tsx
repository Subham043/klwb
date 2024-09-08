import { FC, useState } from "react"
import { ButtonToolbar, Table } from "rsuite"
import { useSecurityQuestionsQuery } from "../../../hooks/data/security_question";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { DrawerProps } from "../../../utils/types";
import SecurityQuestionForm from "../../../components/Admin/SecurityQuestionForm";
import { useDeleteQuery } from "../../../hooks/useDeleteQuery";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import DeleteBtn from "../../../components/Buttons/DeleteBtn";
import EditBtn from "../../../components/Buttons/EditBtn";


const SecurityQuestion:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useSecurityQuestionsQuery();
    const {deleteHandler, deleteLoading} = useDeleteQuery();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});

    const onDeleteHandler = async (id:number) => {
        await deleteHandler(api_routes.admin.security_question.delete(id));
        refetch();
    }

    return <PaginatedTableLayout title="Security Questions">
        <PaginatedTableLayout.Header title="Security Questions" addHandler={() => setOpenDrawer({status:true, type:'Create'})} excelLink={api_routes.admin.security_question.excel} excelName="security_question.xlsx" />
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
                    <Table.HeaderCell>Question</Table.HeaderCell>
                    <Table.Cell dataKey="question" />
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
        <SecurityQuestionForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default SecurityQuestion