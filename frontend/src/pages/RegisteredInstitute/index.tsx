import { FC, useState } from "react"
import { ButtonToolbar, IconButton, Table } from "rsuite"
import { useRegisteredInstitutesQuery } from "../../hooks/data/registered_institute";
import PaginatedTableLayout from "../../layouts/PaginatedTable";
import { DrawerProps } from "../../utils/types";
import RegisteredInstituteForm from "../../components/RegisteredInstituteForm";
import EditIcon from '@rsuite/icons/Edit';
import { api_routes } from "../../utils/routes/api";
import Status from "../../components/Status";
import Moment from "../../components/Moment";


const RegisteredInstitute:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useRegisteredInstitutesQuery();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});

    return <PaginatedTableLayout title="All Institutes">
        <PaginatedTableLayout.Header title="All Institutes" buttonName="Institute" addHandler={() => setOpenDrawer({status:true, type:'Create'})} excelLink={api_routes.admin.registered_institute.excel} excelName="registered_institute.xlsx" />
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

                <Table.Column width={70} fixed="right">
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
        </PaginatedTableLayout.Content>
        <RegisteredInstituteForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
    </PaginatedTableLayout>
}

export default RegisteredInstitute