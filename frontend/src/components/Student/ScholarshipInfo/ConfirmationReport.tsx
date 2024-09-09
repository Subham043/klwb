import {
  Grid,
  Row,
		Col,
} from "rsuite";
// import { StudentApplicationType } from "../../../utils/types";
import classes from "./index.module.css";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

// type Props = {
// 	data: StudentApplicationType;
// }

function ConfirmationReport() {
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
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Institute Confirmation Report"
                value={'-----------------'}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Industry Confirmation Report"
                value={'-----------------'}
              />
            </Col>
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}

export default ConfirmationReport;
