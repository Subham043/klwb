import { FC, useState } from "react"
import { ButtonToolbar, IconButton, Table } from "rsuite"
import { useRequestInstitutesQuery } from "../../../hooks/data/request_institute";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import RequestInstituteInfo from "../../../components/Admin/RequestInstituteInfo";
import VisibleIcon from '@rsuite/icons/Visible';
import TrashIcon from '@rsuite/icons/Trash';
import { useDeleteQuery } from "../../../hooks/useDeleteQuery";
import ConfirmAlert from "../../../components/ConfirmAlert";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";


const RequestInstitute:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useRequestInstitutesQuery();
    const {deleteHandler, deleteLoading} = useDeleteQuery();
    const [openModal, setOpenModal] = useState<{status:boolean, id?:number}>({status: false});

    const onDeleteHandler = async (id:number) => {
        await deleteHandler(api_routes.admin.request_institute.delete(id));
        refetch();
    }

    return <PaginatedTableLayout title="Institute Request List">
        <PaginatedTableLayout.Header title="Institute Request List" addBtn={false} excelLink={api_routes.admin.request_institute.excel} excelName="request_institute.xlsx" />
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
                            <Status status={rowData.is_active} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Requested At</Table.HeaderCell>

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
                                <IconButton appearance="primary" color="orange" icon={<VisibleIcon />} onClick={() => setOpenModal({status:true, id:rowData.id})} />
                                <ConfirmAlert confirmHandler={() => onDeleteHandler(rowData.id)}>
                                    <IconButton appearance="primary" color="red" icon={<TrashIcon />} loading={deleteLoading} />
                                </ConfirmAlert>
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
        <RequestInstituteInfo modal={openModal} modalHandler={(value)=>setOpenModal(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default RequestInstitute