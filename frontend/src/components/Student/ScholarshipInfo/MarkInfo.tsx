import { Grid, Row, Col } from "rsuite";
import { StudentApplicationType } from "../../../utils/types";
import classes from "./index.module.css";
import FileViewer from "../../FileViewer";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

type Props = {
  data: StudentApplicationType;
};

function MarkInfo({ data }: Props) {
  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>
              Previous Year Class and Marks
            </h5>
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" xs={8}>
              <DetailInfo title="Class Name" value={data?.mark.prv_class} />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo title="Marks" value={data?.mark.prv_marks} />
            </Col>
            <Col className="pb-1" xs={8}>
              <DetailInfo
                title="Marks Card Type"
                value={data?.mark.prv_markcard2 ? "Semester Wise" : "Yearly"}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            {data?.mark.prv_markcard && (
              <Col className="pb-1" xs={8}>
                <DetailInfo
                  title="Marks Card Copy"
                  value={<FileViewer src={data?.mark.prv_markcard} />}
                />
              </Col>
            )}
            {data?.mark.prv_markcard2 && (
              <Col className="pb-1" xs={8}>
                <DetailInfo
                  title="2nd Marks Card Copy"
                  value={<FileViewer src={data?.mark.prv_markcard2} />}
                />
              </Col>
            )}
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}

export default MarkInfo;
