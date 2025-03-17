import { FC, useState } from "react"
import { ButtonToolbar, IconButton, Table } from "rsuite"
import { useRequestIndustriesQuery } from "../../../hooks/data/request_industry";
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import RequestIndustryInfo from "../../../components/Admin/RequestIndustryInfo";
import VisibleIcon from '@rsuite/icons/Visible';
import { api_routes } from "../../../utils/routes/api";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import SelectCityStatus from "../../../components/SelectCity";
import SelectTaluqStatus from "../../../components/SelectTaluq";
import StatusBadge from "../../../components/Student/StatusBadge";
import SelectStatus from "../../../components/Institute/SelectStatus";
import { useAxios } from "../../../hooks/useAxios";
import { useToast } from "../../../hooks/useToast";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../../utils/types";
import DeleteBtn from "../../../components/Buttons/DeleteBtn";


const RequestIndustry:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useRequestIndustriesQuery();
    const [openModal, setOpenModal] = useState<{status:boolean, id?:number}>({status: false});
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const { toastError, toastSuccess } = useToast();
    const axios = useAxios();

    const onDeleteHandler = async (id: number) => {
        setDeleteLoading(true);
        try {
            await axios.delete(api_routes.admin.request_industry.delete(id), {});
            toastSuccess("Request Deleted Successfully");
            refetch();
        } catch (error) {
            if (isAxiosError<AxiosErrorResponseType>(error)) {
                if (error?.response?.data?.message) {
                    toastError(error.response.data.message);
                } else {
                    toastError("Something went wrong");
                }
            }
        } finally {
            setDeleteLoading(false);
        }
    };

    return <PaginatedTableLayout title="Industry Request List">
        <PaginatedTableLayout.Header title="Industry Request List" addBtn={false} excelLink={api_routes.admin.request_industry.excel} excelName="request_industry.xlsx">
            <SelectCityStatus />
            <SelectTaluqStatus />
            <SelectStatus disabledFields={["approved"]} />
        </PaginatedTableLayout.Header>
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

                <Table.Column  width={260} verticalAlign="middle">
                    <Table.HeaderCell>Company</Table.HeaderCell>
                    <Table.Cell fullText dataKey="company" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.Cell fullText dataKey="email" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Mobile</Table.HeaderCell>
                    <Table.Cell fullText dataKey="mobile" />
                </Table.Column>

                {/* <Table.Column width={260}>
                    <Table.HeaderCell>GST</Table.HeaderCell>
                    <Table.Cell fullText dataKey="gst_no" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>PAN</Table.HeaderCell>
                    <Table.Cell fullText dataKey="pan_no" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>ACT</Table.HeaderCell>
                    <Table.Cell fullText dataKey="act" />
                </Table.Column> */}

                <Table.Column  width={160} verticalAlign="middle">
                    <Table.HeaderCell>District</Table.HeaderCell>
                    <Table.Cell fullText dataKey="city.name" />
                </Table.Column>

                <Table.Column  width={160} verticalAlign="middle">
                    <Table.HeaderCell>Taluq</Table.HeaderCell>
                    <Table.Cell fullText dataKey="taluq.name" />
                </Table.Column>

                <Table.Column width={120} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <StatusBadge status={rowData.status} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column  width={160} verticalAlign="middle">
                    <Table.HeaderCell>Reject Reason</Table.HeaderCell>
                    <Table.Cell fullText dataKey="reject_reason" />
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Requested At</Table.HeaderCell>

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
                                <IconButton appearance="primary" color="orange" icon={<VisibleIcon />} onClick={() => setOpenModal({status:true, id:rowData.id})} />
                                {rowData.status===0 && <DeleteBtn clickHandler={() => onDeleteHandler(rowData.id)} deleteLoading={deleteLoading} />}
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
        <RequestIndustryInfo modal={openModal} modalHandler={(value)=>setOpenModal(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default RequestIndustry