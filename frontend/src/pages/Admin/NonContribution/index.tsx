import { FC, useState } from "react"
import { ButtonToolbar, IconButton, Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { api_routes } from "../../../utils/routes/api";
import Status from "../../../components/Status";
import Moment from "../../../components/Moment";
import { table } from "../../../utils/constants/table";
import { useNonContributionsQuery } from "../../../hooks/data/non_contribution";
import SelectYear from "../../../components/Institute/SelectYear";
import SelectNonContributionStatus from "../../../components/SelectNonContributionStatus";
import NonContributionPayment from "../../../components/Admin/NonContributionPayment";
import EventDetailIcon from '@rsuite/icons/EventDetail';
import { useSearchParams } from "react-router-dom";


const NonContribution:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useNonContributionsQuery();
    const [modal, setModal] = useState<{ status: boolean; data: number|null }>({ status: false, data: null });
    const [searchParams] = useSearchParams();

    return <PaginatedTableLayout title="Contribution Pending">
        <PaginatedTableLayout.Header title="Contribution Pending" addBtn={false} excelLink={api_routes.admin.non_contribution.excel} excelName="non_contribution.xlsx">
            <SelectNonContributionStatus />
            <SelectYear canClear={false} />
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

                <Table.Column flexGrow={1} minWidth={300} verticalAlign="middle">
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.Cell fullText dataKey="name" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Act</Table.HeaderCell>
                    <Table.Cell fullText dataKey="act_label" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.Cell fullText dataKey="category" />
                </Table.Column>

                {/* <Table.Column width={260}>
                    <Table.HeaderCell>Reg No.</Table.HeaderCell>
                    <Table.Cell fullText dataKey="reg_id" />
                </Table.Column> */}

                <Table.Column width={150} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Payment Attempted</Table.HeaderCell>

                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={(rowData.non_contributions_payments_pending_count > 0 || rowData.non_contributions_payments_failed_count > 0)} correctLabel="Yes" wrongLabel="No" />
                        )}
                    </Table.Cell>
                </Table.Column>
                
                <Table.Column width={60} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={rowData.is_active} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Created At</Table.HeaderCell>

                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.created_at} />
                        )}
                    </Table.Cell>
                </Table.Column>
                <Table.Column width={70} fixed="right" verticalAlign="middle">
                    <Table.HeaderCell>Action</Table.HeaderCell>
    
                    <Table.Cell style={{ padding: "6px" }}>
                    {(rowData) => (
                        <ButtonToolbar>
                            {(searchParams.get('year') !== null && (rowData.non_contributions_payments_pending_count > 0 || rowData.non_contributions_payments_failed_count > 0)) && <IconButton appearance="primary" color="cyan" size="sm" icon={<EventDetailIcon />} onClick={() => setModal({ status: true, data: rowData.id })} />}
                        </ButtonToolbar>
                    )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
        <NonContributionPayment modal={modal} modalHandler={setModal} refetch={refetch} />
    </PaginatedTableLayout>
}

export default NonContribution