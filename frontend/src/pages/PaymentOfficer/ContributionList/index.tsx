import { FC } from "react"
import { ButtonToolbar, IconButton, Table, Tooltip, Whisper } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import SelectYear from "../../../components/Institute/SelectYear";
import { table } from "../../../utils/constants/table";
import { api_routes } from "../../../utils/routes/api";
import ChangeListIcon from '@rsuite/icons/ChangeList';
import { usePdfExport } from "../../../hooks/usePdfExport";
import PaymentStatusBadge from "../../../components/PaymentStatusBadge";
import SelectCityStatus from "../../../components/SelectCity";
import SelectTaluqStatus from "../../../components/SelectTaluq";
import { usePaymentOfficerContributionsQuery } from "../../../hooks/data/payment_officer_contribution";

const Receipt = ({id}:{id: number}) => {
    const {pdfLoading, exportPdf} = usePdfExport();

    const exportPdfHandler = async () => {
        await exportPdf(api_routes.payment_officer.contribution.reciept(id || ""), "Reciept.pdf")
    }
    return (
        <ButtonToolbar>
            <Whisper
                placement="bottomEnd"
                controlId="control-id-click"
                trigger="hover"
                speaker={<Tooltip>Download</Tooltip>}
            >
            <IconButton
                appearance="primary"
                color={"green"}
                icon={<ChangeListIcon />}
                loading={pdfLoading}
                onClick={exportPdfHandler}
                size="sm"
            />
            </Whisper>
        </ButtonToolbar>
    )
}

const Excel = ({link}:{link: string}) => {

    return (
        <ButtonToolbar>
            <Whisper
                placement="bottomEnd"
                controlId="control-id-click"
                trigger="hover"
                speaker={<Tooltip>Download</Tooltip>}
            >
            <IconButton
                appearance="primary"
                color={"green"}
                icon={<ChangeListIcon />}
                as={"a"}
                href={link}
                download={true}
                size="sm"
            />
            </Whisper>
        </ButtonToolbar>
    )
}


const ContributionListPage:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = usePaymentOfficerContributionsQuery();

    return <PaginatedTableLayout title="Contribution Comleted">
        <PaginatedTableLayout.Header title="Contribution Comleted" addBtn={false} excelLink={api_routes.payment_officer.contribution.excel} excelName="contribution.xlsx">
            <SelectCityStatus />
            <SelectTaluqStatus />
            <SelectYear />
        </PaginatedTableLayout.Header>
        <PaginatedTableLayout.Content total={(data?.meta.total || 0)} error={error} refetch={refetch}>
            <Table
                loading={isLoading||isFetching||isRefetching}
                {...table}
                data={data?.data || []}
            >
                <Table.Column width={60} align="center" fixed>
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.Cell dataKey="year" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Company Name</Table.HeaderCell>
                    <Table.Cell dataKey="industry.name" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>District</Table.HeaderCell>
                    <Table.Cell dataKey="industry.city.name" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Taluq</Table.HeaderCell>
                    <Table.Cell dataKey="industry.taluq.name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Male Count</Table.HeaderCell>
                    <Table.Cell dataKey="male" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Female Count</Table.HeaderCell>
                    <Table.Cell dataKey="female" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Total Count</Table.HeaderCell>
                    <Table.Cell dataKey="total_employees" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.Cell dataKey="price" />
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <PaymentStatusBadge pay_status={rowData.status} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={80} verticalAlign="middle">
                    <Table.HeaderCell>Reciept</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => rowData.status === 1 ? (
                            <Receipt id={rowData.id} />
                        ): (
                            <></>
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={110} verticalAlign="middle">
                    <Table.HeaderCell>Employee Excel</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (rowData.status === 1 && rowData.employee_excel) ? (
                            <Excel link={rowData.employee_excel} />
                        ): (
                            <></>
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Paid On</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.payed_on} />
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default ContributionListPage