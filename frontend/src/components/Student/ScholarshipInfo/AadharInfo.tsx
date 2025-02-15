import { Grid, Row, Col } from "rsuite";
import { StudentApplicationType } from "../../../utils/types";
import classes from "./index.module.css";
import FileViewer from "../../FileViewer";
import DetailInfo from "../../DetailInfo";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

type Props = {
  data: StudentApplicationType;
};

function AadharInfo({ data }: Props) {
  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>Aadhar Card Details</h5>
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Aadhar"
                value={data?.basic_detail.adharcard_no}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Father's Aadhar"
                value={
                  data?.basic_detail.not_applicable &&
                  data?.basic_detail.not_applicable === "father"
                    ? "Not Applicable"
                    : data?.basic_detail.f_adhar
                }
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <DetailInfo
                title="Mother's Aadhar"
                value={
                  data?.basic_detail.not_applicable &&
                  data?.basic_detail.not_applicable === "mother"
                    ? "Not Applicable"
                    : data?.basic_detail.m_adhar
                }
              />
            </Col>
          </Row>
          <Row gutter={30}>
            {data?.basic_detail.adharcard_file && (
              <Col className="pb-1" md={8} sm={24} xs={24}>
                <DetailInfo
                  title="Aadhar File"
                  value={<FileViewer src={data?.basic_detail.adharcard_file} />}
                />
              </Col>
            )}
            {data?.basic_detail.not_applicable &&
            data?.basic_detail.not_applicable === "father"
              ? data?.basic_detail.deathcertificate && (
                  <Col className="pb-1" md={8} sm={24} xs={24}>
                    <DetailInfo
                      title="Father's Death Certificate"
                      value={
                        <FileViewer src={data?.basic_detail.deathcertificate} />
                      }
                    />
                  </Col>
                )
              : data?.basic_detail.f_adharfile && (
                  <Col className="pb-1" md={8} sm={24} xs={24}>
                    <DetailInfo
                      title="Father's Aadhar File"
                      value={
                        <FileViewer src={data?.basic_detail.f_adharfile} />
                      }
                    />
                  </Col>
                )}
            {data?.basic_detail.not_applicable &&
            data?.basic_detail.not_applicable === "mother"
              ? data?.basic_detail.deathcertificate && (
                  <Col className="pb-1" md={8} sm={24} xs={24}>
                    <DetailInfo
                      title="Mother's Death Certificate"
                      value={
                        <FileViewer src={data?.basic_detail.deathcertificate} />
                      }
                    />
                  </Col>
                )
              : data?.basic_detail.m_adharfile && (
                  <Col className="pb-1" md={8} sm={24} xs={24}>
                    <DetailInfo
                      title="Mother's Aadhar File"
                      value={
                        <FileViewer src={data?.basic_detail.m_adharfile} />
                      }
                    />
                  </Col>
                )}
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}

export default AadharInfo;
