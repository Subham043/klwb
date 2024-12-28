import { Button, ButtonToolbar, Divider, Heading, Stack } from "rsuite";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { useParams } from "react-router-dom";
import { useIndustryPaymentStatusQuery } from "../../../hooks/data/industry_payment";
import PanelCardContainer from "../../../components/MainCards/PanelCardContainer";
import { usePdfExport } from "../../../hooks/usePdfExport";
import { api_routes } from "../../../utils/routes/api";
import classes from "./index.module.css";
import moment from "moment";

export default function PaymentStatusPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching, isLoading, isRefetching, refetch, error } =
    useIndustryPaymentStatusQuery(Number(id) || 0, true);
  const { pdfLoading, exportPdf } = usePdfExport();

  const exportPdfHandler = async () => {
    await exportPdf(api_routes.industry.payment.reciept(id || ""), "Reciept.pdf")
  }


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
                <Stack justifyContent="space-between">
                  <Heading level={6} className="text-brand">
                    Payment Receipt
                  </Heading>
                  <ButtonToolbar>
                    <Button appearance="primary" size="sm" loading={pdfLoading} disabled={pdfLoading} onClick={exportPdfHandler}>Download</Button>
                  </ButtonToolbar>
                </Stack>
              }
            >
              <Divider />
              <div>
                <div className={classes.reciept_header}>
                  <h5 className={classes.reciept_main_heading}>K.A.S Letter(60606)</h5>
                  <h6 className={classes.reciept_sub_heading}>Payment Receipt</h6>
                </div>
                <div className={classes.reciept_right_content}>
                  <p>Karnataka Labour Welfare Board Office</p>
                  <p><b>Place </b>: Bangalore</p>
                  <p><b>Date </b>: {moment(data.payed_on).format("DD MMM, YYYY")}</p>
                </div>
                <div className={classes.reciept_left_content}>
                  <p>Recieved From <u>{data.industry?.name}</u></p>
                  <p>Karnataka Labour Welfare Board contribution fund for the Calender year <u>{data.year}</u></p>
                  <p>Amount Rs: <u>{data.price}</u></p>
                  <p>Rs in Words <u>{data.price_word}</u></p>
                  <p><b>Note : This is computer generated reciept signature is not required.</b></p>
                </div>
              </div>
            </PanelCardContainer>
          )}
        </div>
      </ErrorBoundaryLayout>
    </div>
  );
}
