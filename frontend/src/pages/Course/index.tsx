import { FC, useState } from "react"
import { Badge, ButtonToolbar, IconButton, Table } from "rsuite"
import { useCoursesQuery } from "../../hooks/data/course";
import PaginatedTableLayout from "../../layouts/PaginatedTable";
import { DrawerProps } from "../../utils/types";
import CourseForm from "../../components/CourseForm";
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import { useDeleteQuery } from "../../hooks/useDeleteQuery";
import { api_routes } from "../../utils/api_routes";
import moment from "moment";
import { useExcelExport } from "../../hooks/useExcelExport";


const Course:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch} = useCoursesQuery();
    const {deleteHandler, deleteLoading} = useDeleteQuery();
    const {excelLoading, exportExcel} = useExcelExport();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});

    const excelHandler = async () => {
        await exportExcel(api_routes.admin.course.excel, 'course.xlsx');
    }

    const onDeleteHandler = async (id:number) => {
        await deleteHandler(api_routes.admin.course.delete(id));
        refetch();
    }

    return <PaginatedTableLayout title="Courses" addHandler={() => setOpenDrawer({status:true, type:'Create'})} total={(data?.meta.total ?? 0)} excelHandler={excelHandler} excelLoading={excelLoading}>
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
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.Cell dataKey="name" />
            </Table.Column>

            <Table.Column flexGrow={1}>
                <Table.HeaderCell>Graduation</Table.HeaderCell>
                <Table.Cell dataKey="graduation.name" />
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
        <CourseForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default Course