import {
  Grid,
  Row,
		Col,
    Button,
} from "rsuite";
import { AuthType, StudentApplicationType } from "../../../utils/types";
import classes from "./index.module.css";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import { usePdfExport } from "../../../hooks/usePdfExport";
import { api_routes } from "../../../utils/routes/api";
import { useUser } from "../../../hooks/useUser";
import { RolesEnum } from "../../../utils/constants/role";

type Props = {
	data: StudentApplicationType;
}

const InstituteConfirmationReportDownload = ({id, user}: {id: number, user: AuthType | null}) => {
  const {pdfLoading, exportPdf} = usePdfExport();

	const exportPdfHandler = async () => {
    if(user && user.role === RolesEnum.VERIFICATION_OFFICER){
      await exportPdf(api_routes.govt.scholarship.institute_confirmation_pdf(id || ""), "InstituteConfirmationReport.pdf")
    }else if(user && user.role === RolesEnum.FINANCIAL_OFFICER){
      await exportPdf(api_routes.finance.scholarship.institute_confirmation_pdf(id || ""), "InstituteConfirmationReport.pdf")
    }else{
      await exportPdf(api_routes.user.scholarship.institute_confirmation_pdf(id || ""), "InstituteConfirmationReport.pdf")
    }
	}

  return <Button appearance="primary" size="sm" className="mt-1" loading={pdfLoading} disabled={pdfLoading} onClick={exportPdfHandler}>Download</Button>
}

const IndustryConfirmationReportDownload = ({id, user}: {id: number, user: AuthType | null}) => {
  const {pdfLoading, exportPdf} = usePdfExport();

	const exportPdfHandler = async () => {
    if(user && user.role === RolesEnum.VERIFICATION_OFFICER){
      await exportPdf(api_routes.govt.scholarship.industry_confirmation_pdf(id || ""), "IndustryConfirmationReport.pdf")
    }else if(user && user.role === RolesEnum.FINANCIAL_OFFICER){
      await exportPdf(api_routes.finance.scholarship.industry_confirmation_pdf(id || ""), "IndustryConfirmationReport.pdf")
    }else{
      await exportPdf(api_routes.user.scholarship.industry_confirmation_pdf(id || ""), "IndustryConfirmationReport.pdf")
    }
	}

  return <Button appearance="primary" size="sm" className="mt-1" loading={pdfLoading} disabled={pdfLoading} onClick={exportPdfHandler}>Download</Button>
}

function ConfirmationReport(props: Props) {
  const {user} = useUser();
  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>Confirmation Report</h5>
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Institute Confirmation Report"
                value={props.data.institute_confirmation_report ? <InstituteConfirmationReportDownload id={props.data.id} user={user} /> : '---------N/A--------'}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Industry Confirmation Report"
                value={props.data.industry_confirmation_report ? <IndustryConfirmationReportDownload id={props.data.id} user={user} /> : '---------N/A--------'}
              />
            </Col>
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}

export default ConfirmationReport;
