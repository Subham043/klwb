import { Checkbox, Col, Grid, Row } from "rsuite";
import TextInput from "../../FormInput/TextInput";
import classes from "./index.module.css";
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ScholarshipFormSchemaType } from "./schema";
import FileInput from "../../FormInput/FileInput";
import FileViewer from "../../FileViewer";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ScholarshipFormSchemaType, any>;
  errors: FieldErrors<ScholarshipFormSchemaType>;
  watch: UseFormWatch<ScholarshipFormSchemaType>;
  setValue: UseFormSetValue<ScholarshipFormSchemaType>;
  type?: "apply" | "resubmit";
  adharcard_file?: string | null;
  f_adharfile?: string | null;
  m_adharfile?: string | null;
  deathcertificate?: string | null;
};

export default function AadharInfo({
  control,
  errors,
  watch,
  setValue,
  type = "apply",
  adharcard_file,
  f_adharfile,
  m_adharfile,
  deathcertificate,
}: PropType) {
  const not_applicable = watch("not_applicable");

  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>
              Enter Student Aadhar Card Number and Attach the Xerox copy
            </h5>
            <h6 className={classes.inner_sub_heading}>
              ವಿದ್ಯಾರ್ಥಿಯು ಆಧಾರ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ (ಜೆರಾಕ್ಸ್ ಪ್ರತಿಯನ್ನು ಲಗತ್ತಿಸುವುದು)
            </h6>
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" xs={12}>
              <TextInput
                name="adharcard_no"
                label="Aadhar Card Number"
                control={control}
                error={errors.adharcard_no?.message}
              />
            </Col>
            <Col className="pb-1" xs={12}>
              <div>
                <FileInput
                  name="adharcard_file"
                  accept="image/png, image/jpeg, image/jpg"
                  label="Attach Your Aadhar Card"
                  helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)"
                  control={control}
                  error={errors.adharcard_file?.message}
                />
                {type === "resubmit" && adharcard_file && (
                  <FileViewer src={adharcard_file} />
                )}
              </div>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" xs={12}>
              <div className="scholarship-no-mb">
                <TextInput
                  name="f_adhar"
                  label="Father's Aadhar Card Number"
                  disabled={
                    not_applicable !== undefined && not_applicable === "father"
                  }
                  control={control}
                  error={errors.f_adhar?.message}
                />
                <Checkbox
                  checked={
                    not_applicable !== undefined && not_applicable === "father"
                  }
                  onChange={(_, checked) =>
                    checked
                      ? setValue("not_applicable", "father")
                      : setValue("not_applicable", undefined)
                  }
                >
                  Not Applicable
                </Checkbox>
              </div>
            </Col>
            <Col className="pb-1" xs={12}>
              {not_applicable !== undefined && not_applicable === "father" ? (
                <div>
                  <FileInput
                    name="deathcertificate"
                    accept="image/png, image/jpeg, image/jpg"
                    label="Attach Your Father's Death Certificate"
                    helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)"
                    control={control}
                    error={errors.deathcertificate?.message}
                  />
                  {type === "resubmit" && deathcertificate && (
                    <FileViewer src={deathcertificate} />
                  )}
                </div>
              ) : (
                <div>
                  <FileInput
                    name="f_adharfile"
                    accept="image/png, image/jpeg, image/jpg"
                    label="Attach Your Father's Aadhar Card"
                    helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)"
                    control={control}
                    error={errors.f_adharfile?.message}
                  />
                  {type === "resubmit" && f_adharfile && (
                    <FileViewer src={f_adharfile} />
                  )}
                </div>
              )}
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" xs={12}>
              <div className="scholarship-no-mb">
                <TextInput
                  name="m_adhar"
                  label="Mother's Aadhar Card Number"
                  disabled={
                    not_applicable !== undefined && not_applicable === "mother"
                  }
                  control={control}
                  error={errors.m_adhar?.message}
                />
                <Checkbox
                  checked={
                    not_applicable !== undefined && not_applicable === "mother"
                  }
                  onChange={(_, checked) =>
                    checked
                      ? setValue("not_applicable", "mother")
                      : setValue("not_applicable", undefined)
                  }
                >
                  Not Applicable
                </Checkbox>
              </div>
            </Col>
            <Col className="pb-1" xs={12}>
              {not_applicable !== undefined && not_applicable === "mother" ? (
                <div>
                  <FileInput
                    name="deathcertificate"
                    accept="image/png, image/jpeg, image/jpg"
                    label="Attach Your Mother's Death Certificate"
                    helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)"
                    control={control}
                    error={errors.deathcertificate?.message}
                  />
                  {type === "resubmit" && deathcertificate && (
                    <FileViewer src={deathcertificate} />
                  )}
                </div>
              ) : (
                <div>
                  <FileInput
                    name="m_adharfile"
                    accept="image/png, image/jpeg, image/jpg"
                    label="Attach Your Mother's Aadhar Card"
                    helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)"
                    control={control}
                    error={errors.m_adharfile?.message}
                  />
                  {type === "resubmit" && m_adharfile && (
                    <FileViewer src={m_adharfile} />
                  )}
                </div>
              )}
            </Col>
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}
