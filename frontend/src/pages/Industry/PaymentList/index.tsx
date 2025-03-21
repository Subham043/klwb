import { FC, useState } from "react"
import { ButtonToolbar, IconButton, Table, Tooltip, Whisper } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import { page_routes } from "../../../utils/routes/pages";
import { useIndustryPaymentsQuery } from "../../../hooks/data/industry_payment";
import SelectYear from "../../../components/Institute/SelectYear";
import { table } from "../../../utils/constants/table";
import { ViewLink } from "../../../components/Buttons/ViewBtn";
import IndustryPaymentStatusBadge from "../../../components/IndustryPaymentStatusBadge";
import { api_routes } from "../../../utils/routes/api";
import ChangeListIcon from '@rsuite/icons/ChangeList';
import { usePdfExport } from "../../../hooks/usePdfExport";
import ReloadIcon from '@rsuite/icons/Reload';
import { useAxios } from "../../../hooks/useAxios";
import { useToast } from "../../../hooks/useToast";

const Reverify = ({id, refetch}:{id: number, refetch: () => void}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const axios = useAxios();
    const {toastError} = useToast();

    const reVerifyHandler = async () => {
        setLoading(true);
        try {
            await axios.get(api_routes.industry.payment.re_verify(id || ""));
            refetch();
        } catch (error) {
            toastError("Failed to re-verify payment. Please try again later.")
        }finally {
            setLoading(false);
        }
    }
    return (
        <Whisper
            placement="bottomEnd"
            controlId="control-id-click"
            trigger="hover"
            speaker={<Tooltip>Re-Verify</Tooltip>}
        >
            <IconButton
                appearance="primary"
                color="violet"
                size="sm"
                icon={<ReloadIcon />}
                loading={loading}
                onClick={reVerifyHandler}
            />
        </Whisper>
    )
}

const Receipt = ({id}:{id: number}) => {
    const {pdfLoading, exportPdf} = usePdfExport();

    const exportPdfHandler = async () => {
        await exportPdf(api_routes.industry.payment.reciept(id || ""), "Reciept.pdf")
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

const FormD = ({id}:{id: number}) => {
    const {pdfLoading, exportPdf} = usePdfExport();

    const exportPdfHandler = async () => {
        await exportPdf(api_routes.industry.payment.form_d(id || ""), "FormD.pdf")
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


const IndustryPaymentListPage:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useIndustryPaymentsQuery();

    return <PaginatedTableLayout title="Payment List">
        <PaginatedTableLayout.Header title="Payment List" addBtn={false} excelLink={api_routes.industry.payment.excel} excelName="payment.xlsx">
            <SelectYear />
        </PaginatedTableLayout.Header>
        <PaginatedTableLayout.Content total={(data?.meta.total || 0)} error={error} refetch={refetch}>
            <Table
                loading={isLoading||isFetching||isRefetching}
                {...table}
                wordWrap="break-all"
                data={data?.data || []}
            >
                <Table.Column width={60} align="center" fixed verticalAlign="middle">
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.Cell fullText dataKey="year" />
                </Table.Column>

                <Table.Column  width={260} verticalAlign="middle">
                    <Table.HeaderCell>Company Name</Table.HeaderCell>
                    <Table.Cell fullText dataKey="industry.name" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Male Count</Table.HeaderCell>
                    <Table.Cell fullText dataKey="male" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Female Count</Table.HeaderCell>
                    <Table.Cell fullText dataKey="female" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Total Count</Table.HeaderCell>
                    <Table.Cell fullText dataKey="total_employees" />
                </Table.Column>

                <Table.Column width={260} verticalAlign="middle">
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <span>{rowData.total_employees * 60}</span>
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column  width={160} verticalAlign="middle">
                    <Table.HeaderCell>Interest</Table.HeaderCell>
                    <Table.Cell fullText dataKey="interest" />
                </Table.Column>

                <Table.Column  width={160} verticalAlign="middle">
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.Cell fullText dataKey="price" />
                </Table.Column>

                <Table.Column  width={160} verticalAlign="middle">
                    <Table.HeaderCell>Payment ID</Table.HeaderCell>
                    <Table.Cell fullText dataKey="pay_id" />
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <IndustryPaymentStatusBadge status={rowData.status} />
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

                <Table.Column width={80} verticalAlign="middle">
                    <Table.HeaderCell>FormD</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => rowData.status === 1 ? (
                            <FormD id={rowData.id} />
                        ): (
                            <></>
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Paid On</Table.HeaderCell>

                    <Table.Cell fullText style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.payed_on} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={100} fixed="right" verticalAlign="middle">
                    <Table.HeaderCell>Action</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <ButtonToolbar>
                                {rowData.status === 1 && <ViewLink to={page_routes.industry.payment.view(rowData.id)} />}
                                <Reverify id={rowData.id} refetch={refetch} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default IndustryPaymentListPage