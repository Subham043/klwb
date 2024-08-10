import { FC } from "react"
import { ButtonToolbar, IconButton, Table } from "rsuite"
import PaginatedTableLayout from "../../layouts/PaginatedTable";
import { useInstitutesRegisteredQuery } from "../../hooks/data/institute_registered";
import { Link } from "react-router-dom";
import VisibleIcon from '@rsuite/icons/Visible';
import { api_routes } from "../../utils/routes/api";
import { page_routes } from "../../utils/routes/pages";
import Moment from "../../components/Moment";
import Status from "../../components/Status";


const InstituteRegistered:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useInstitutesRegisteredQuery();

    return <PaginatedTableLayout title="Institutes Registered">
        <PaginatedTableLayout.Header title="Institutes Registered" addBtn={false} excelLink={api_routes.admin.institute.registered.excel} excelName="registered_institute.xlsx" />
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
                    <Table.Cell dataKey="registered_institute.name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Principal Name</Table.HeaderCell>
                    <Table.Cell dataKey="principal" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.Cell dataKey="email" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.Cell dataKey="phone" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Management Type</Table.HeaderCell>
                    <Table.Cell dataKey="registered_institute.management_type" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>District</Table.HeaderCell>
                    <Table.Cell dataKey="address.city.name" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>Taluq</Table.HeaderCell>
                    <Table.Cell dataKey="address.taluq.name" />
                </Table.Column>

                <Table.Column width={60} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={!rowData.profile.is_blocked} wrongLabel="Blocked" />
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
                                <IconButton as={Link} appearance="primary" color="orange" icon={<VisibleIcon />} to={page_routes.admin.institute.registered_info(rowData.id)} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default InstituteRegistered