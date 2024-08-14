import { FC } from "react"
import { ButtonToolbar, IconButton, Table } from "rsuite"
import PaginatedTableLayout from "../../layouts/PaginatedTable";
import { useIndustriesRegisteredQuery } from "../../hooks/data/industry_registered";
import { Link } from "react-router-dom";
import VisibleIcon from '@rsuite/icons/Visible';
import { api_routes } from "../../utils/routes/api";
import { page_routes } from "../../utils/routes/pages";
import Moment from "../../components/Moment";
import Status from "../../components/Status";


const IndustryRegistered:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useIndustriesRegisteredQuery();

    return <PaginatedTableLayout title="Industries Registered">
        <PaginatedTableLayout.Header title="Industries Registered" addBtn={false} excelLink={api_routes.admin.industry.registered.excel} excelName="registered_industry.xlsx" />
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
                    <Table.Cell dataKey="registered_industry.name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Director Name</Table.HeaderCell>
                    <Table.Cell dataKey="name" />
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
                    <Table.HeaderCell>Act</Table.HeaderCell>
                    <Table.Cell dataKey="registered_industry.act_label" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>District</Table.HeaderCell>
                    <Table.Cell dataKey="city.name" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>Taluq</Table.HeaderCell>
                    <Table.Cell dataKey="taluq.name" />
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
                                <IconButton as={Link} appearance="primary" color="orange" icon={<VisibleIcon />} to={page_routes.admin.industry.registered_info(rowData.id)} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default IndustryRegistered