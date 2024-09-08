import {
  Panel,
  Grid,
  Row,
		Col,
} from "rsuite";
// import { StudentApplicationType } from "../../../utils/types";
import classes from "./index.module.css";
import DetailInfo from "../../DetailInfo";

// type Props = {
// 	data: StudentApplicationType;
// }

function ConfirmationReport() {
  return (
    <div className="mb-1">
      <Panel
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>Confirmation Report</h5>
          </div>
        }
        className="info-modal-panel"
        bordered
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
      </Panel>
    </div>
  );
}

export default ConfirmationReport;
