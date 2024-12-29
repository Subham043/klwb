import { ButtonToolbar, Divider, Heading, IconButton, Message, Stack, Table, Tooltip, Whisper } from "rsuite";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { useParams } from "react-router-dom";
import { useIndustryPaymentStatusQuery } from "../../../hooks/data/industry_payment";
import PanelCardContainer from "../../../components/MainCards/PanelCardContainer";
import { usePdfExport } from "../../../hooks/usePdfExport";
import { api_routes } from "../../../utils/routes/api";
import { table } from "../../../utils/constants/table";
import Moment from "../../../components/Moment";
import { ViewLink } from "../../../components/Buttons/ViewBtn";
import { page_routes } from "../../../utils/routes/pages";
import IndustryPaymentStatusBadge from "../../../components/IndustryPaymentStatusBadge";
import { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { useToast } from "../../../hooks/useToast";
import ReloadIcon from '@rsuite/icons/Reload';
import ChangeListIcon from '@rsuite/icons/ChangeList';

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

export default function PaymentStatusPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching, isLoading, isRefetching, refetch, error } =
    useIndustryPaymentStatusQuery(Number(id) || 0, true);


  return (
    <div className="data-table-container">
      <ErrorBoundaryLayout
        loading={isRefetching || isLoading || isFetching}
        error={error}
        refetch={refetch}
      >
        <div style={{ width: "100%", position: "relative" }}>
          {data && (
            <PanelCardContainer
              class_name="mb-1"
              header={
                <Stack justifyContent="center">
                  <Heading level={6} className="text-brand">
                    Payment Status
                  </Heading>
                </Stack>
              }
            >
              <Divider />
              {data?.status === 1 && <Message type="success" bordered showIcon className="mb-1">
                <strong>Success!</strong> Your payment has been successfully received.
              </Message>}
              {data?.status === 2 && <Message type="error" bordered showIcon className="mb-1">
                <strong>Failed!</strong> Your payment has failed. Please re-verify your payment in case of any discrepancy.
              </Message>}
              {data?.status === 0 && <Message type="warning" bordered showIcon className="mb-1">
                <strong>Pending!</strong> Your payment is pending. Please wait for the payment to be processed.
              </Message>}
              <Table
                loading={isLoading||isFetching||isRefetching}
                {...table}
                data={data ? [{...data}] : []}
            >
                <Table.Column width={60} align="center" fixed>
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.Cell dataKey="year" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Company Name</Table.HeaderCell>
                    <Table.Cell dataKey="industry.name" />
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

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.payed_on} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={100} fixed="right">
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
            </PanelCardContainer>
          )}
        </div>
      </ErrorBoundaryLayout>
    </div>
  );
}
