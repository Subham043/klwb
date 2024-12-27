import { Col, Grid, Row } from "rsuite";
import TextInput from "../../FormInput/TextInput";
import SelectInput from "../../FormInput/SelectInput";
import classes from "./index.module.css";
import { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import { ScholarshipFormSchemaType } from "./schema";
import FileInput from "../../FormInput/FileInput";
import FileViewer from "../../FileViewer";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ScholarshipFormSchemaType, any>;
  errors: FieldErrors<ScholarshipFormSchemaType>;
  watch: UseFormWatch<ScholarshipFormSchemaType>;
  type?: "apply" | "resubmit";
  prv_markcard?: string | null;
  prv_markcard2?: string | null;
};

export default function MarksInfo({
  control,
  errors,
  watch,
  type = "apply",
  prv_markcard,
  prv_markcard2,
}: PropType) {
  const marks_card_type = watch("marks_card_type");

  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>
              Enter Your Previous year Class and Marks
            </h5>
            <h6 className={classes.inner_sub_heading}>
              ವಿದ್ಯಾರ್ಥಿಯು ಹಿಂದಿನ ಸಾಲಿನಲ್ಲಿ ತೇರ್ಗಡೆಯಾದ ತರಗತಿ ಮತ್ತು ಪರೀಕ್ಷಯಲ್ಲಿ
              ಪಡೆದಿರುವ ಅಂಕಗಳನ್ನು ನಮೂದಿಸುವುದು
            </h6>
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" xs={8}>
              <TextInput
                name="prv_class"
                label="Previous Standard"
                control={control}
                error={errors.prv_class?.message}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <TextInput
                name="prv_marks"
                label="Previous Marks"
                control={control}
                error={errors.prv_marks?.message}
              />
            </Col>
            <Col className="pb-1" xs={8}>
              <SelectInput
                name="marks_card_type"
                label="Marks Card Type"
                data={[
                  { label: "Yearly", value: "1" },
                  { label: "Semester Wise", value: "0" },
                ]}
                control={control}
                error={errors.marks_card_type?.message}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" xs={8}>
              <div>
                <FileInput
                  name="prv_markcard"
                  accept="image/png, image/jpeg, image/jpg, application/pdf"
                  label="Attach Your Marks Card Copy"
                  helpText=" Only JPG, JPEG, PNG, PDF are allowed (It should be less than 515kb)"
                  control={control}
                  error={errors.prv_markcard?.message}
                />
                {type === "resubmit" && prv_markcard && (
                  <FileViewer src={prv_markcard} />
                )}
              </div>
            </Col>
            <Col className="pb-1" xs={8}>
              {marks_card_type === "0" && (
                <div>
                  <FileInput
                    name="prv_markcard2"
                    accept="image/png, image/jpeg, image/jpg, application/pdf"
                    label="Attach Your Marks Card Copy"
                    helpText=" Only JPG, JPEG, PNG, PDF are allowed (It should be less than 515kb)"
                    control={control}
                    error={errors.prv_markcard2?.message}
                  />
                  {type === "resubmit" && prv_markcard2 && (
                    <FileViewer src={prv_markcard2} />
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
