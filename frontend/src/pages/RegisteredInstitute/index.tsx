import { FC, useState } from "react"
import { Badge, ButtonToolbar, IconButton, Table } from "rsuite"
import { useRegisteredInstitutesQuery } from "../../hooks/data/registered_institute";
import PaginatedTableLayout from "../../layouts/PaginatedTable";
import { DrawerProps } from "../../utils/types";
import RegisteredInstituteForm from "../../components/RegisteredInstituteForm";
import EditIcon from '@rsuite/icons/Edit';
import { api_routes } from "../../utils/api_routes";
import moment from "moment";
import { useExcelExport } from "../../hooks/useExcelExport";


const RegisteredInstitute:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch} = useRegisteredInstitutesQuery();
    const {excelLoading, exportExcel} = useExcelExport();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});

    const excelHandler = async () => {
        await exportExcel(api_routes.admin.registered_institute.excel, 'registered_institute.xlsx');
    }

    return <PaginatedTableLayout title="All Institutes" buttonName="Institute" addHandler={() => setOpenDrawer({status:true, type:'Create'})} total={(data?.meta.total ?? 0)} excelHandler={excelHandler} excelLoading={excelLoading}>
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
                <Table.HeaderCell>Reg. No.</Table.HeaderCell>
                <Table.Cell dataKey="reg_no" />
            </Table.Column>

            <Table.Column width={260}>
                <Table.HeaderCell>Management Type</Table.HeaderCell>
                <Table.Cell dataKey="management_type" />
            </Table.Column>

            <Table.Column width={260}>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.Cell dataKey="category" />
            </Table.Column>

            <Table.Column width={160}>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.Cell dataKey="type" />
            </Table.Column>

            <Table.Column width={160}>
                <Table.HeaderCell>Urban/Rural</Table.HeaderCell>
                <Table.Cell dataKey="urban_rural" />
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
                        </ButtonToolbar>
                    )}
                </Table.Cell>
            </Table.Column>
        </Table>
        <RegisteredInstituteForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default RegisteredInstitute