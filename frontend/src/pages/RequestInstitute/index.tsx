import { FC, useState } from "react"
import { Badge, ButtonToolbar, IconButton, Table } from "rsuite"
import { useRequestInstitutesQuery } from "../../hooks/data/request_institute";
import PaginatedTableLayout from "../../layouts/PaginatedTable";
import RequestInstituteInfo from "../../components/RequestInstituteInfo";
import VisibleIcon from '@rsuite/icons/Visible';
import TrashIcon from '@rsuite/icons/Trash';
import { api_routes } from "../../utils/api_routes";
import moment from "moment";
import { useExcelExport } from "../../hooks/useExcelExport";
import { useDeleteQuery } from "../../hooks/useDeleteQuery";
import ConfirmAlert from "../../components/ConfirmAlert";


const RequestInstitute:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch} = useRequestInstitutesQuery();
    const {deleteHandler, deleteLoading} = useDeleteQuery();
    const {excelLoading, exportExcel} = useExcelExport();
    const [openModal, setOpenModal] = useState<{status:boolean, id?:number}>({status: false});

    const excelHandler = async () => {
        await exportExcel(api_routes.admin.request_institute.excel, 'request_institute.xlsx');
    }

    const onDeleteHandler = async (id:number) => {
        await deleteHandler(api_routes.admin.request_institute.delete(id));
        refetch();
    }

    return <PaginatedTableLayout title="Institute Request List" addBtn={false} total={(data?.meta.total ?? 0)} excelHandler={excelHandler} excelLoading={excelLoading}>
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

            <Table.Column  width={260}>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.Cell dataKey="name" />
            </Table.Column>

            <Table.Column width={260}>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.Cell dataKey="email" />
            </Table.Column>

            <Table.Column width={260}>
                <Table.HeaderCell>Mobile</Table.HeaderCell>
                <Table.Cell dataKey="mobile" />
            </Table.Column>

            <Table.Column width={260}>
                <Table.HeaderCell>Pincode</Table.HeaderCell>
                <Table.Cell dataKey="pincode" />
            </Table.Column>

            <Table.Column  width={160}>
                <Table.HeaderCell>District</Table.HeaderCell>
                <Table.Cell dataKey="taluq.city.name" />
            </Table.Column>

            <Table.Column  width={160}>
                <Table.HeaderCell>Taluq</Table.HeaderCell>
                <Table.Cell dataKey="taluq.name" />
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
                <Table.HeaderCell>Requested At</Table.HeaderCell>

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
                            <IconButton appearance="primary" color="orange" icon={<VisibleIcon />} onClick={() => setOpenModal({status:true, id:rowData.id})} />
                            <ConfirmAlert confirmHandler={() => onDeleteHandler(rowData.id)}>
                                <IconButton appearance="primary" color="red" icon={<TrashIcon />} loading={deleteLoading} />
                            </ConfirmAlert>
                        </ButtonToolbar>
                    )}
                </Table.Cell>
            </Table.Column>
        </Table>
        <RequestInstituteInfo modal={openModal} modalHandler={(value)=>setOpenModal(value)} />
    </PaginatedTableLayout>
}

export default RequestInstitute