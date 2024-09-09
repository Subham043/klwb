import { Col, Grid, Row } from "rsuite";
import TextInput from "../../FormInput/TextInput";
import SelectInput from "../../FormInput/SelectInput";
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
  type?: "apply" | "resubmit";
  cast_certificate?: string | null;
  setValue: UseFormSetValue<ScholarshipFormSchemaType>;
};

export default function CastInfo({
  control,
  errors,
  watch,
  setValue,
  type = "apply",
  cast_certificate,
}: PropType) {
  const is_scst = watch("is_scst");

  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>
              Does the student belong to the Scheduled Castes / Scheduled
              Tribes? If so Xerox copy of the caste certificate obtained from
              the Tahsildar To be Attached
            </h5>
            <h6 className={classes.inner_sub_heading}>
              ವಿದ್ಯಾರ್ಥಿಯು ಪರಿಶಿಷ್ಠ ಜಾತಿ/ಪರಿಶಿಷ್ಠ ಪಂಗಡಗಳಿಗೆ ಸೇರಿದವರೇ ? ಹಾಗಿದ್ದರೆ
              ತಹಶೀಲ್ದಾರರಿಂದ ಪಡೆದ ಜಾತಿ ಪ್ರಮಾಣ ಪತ್ರದ ಜೆರಾಕ್ಸ್ ಪ್ರತಿಯನ್ನು
              ಲಗತ್ತಿಸಬೇಕು
            </h6>
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" xs={12}>
              <SelectInput
                name="is_scst"
                label="Scheduled Castes / Scheduled Tribes?"
                resetHandler={() => {
                  setValue("category", "");
                }}
                data={[
                  { label: "Yes", value: "1" },
                  { label: "No", value: "0" },
                ]}
                control={control}
                error={errors.is_scst?.message}
              />
            </Col>
            <Col className="pb-1" xs={12}>
              {is_scst === "1" && (
                <SelectInput
                  name="category"
                  label="Category"
                  data={[
                    { label: "SC", value: "sc" },
                    { label: "ST", value: "st" },
                  ]}
                  control={control}
                  error={errors.category?.message}
                />
              )}
              {is_scst === "0" && (
                <SelectInput
                  name="category"
                  label="Category"
                  data={[
                    { label: "General", value: "general" },
                    { label: "OBC", value: "obc" },
                  ]}
                  control={control}
                  error={errors.category?.message}
                />
              )}
            </Col>
            {is_scst === "1" && (
              <>
                <Col className="pb-1" xs={12}>
                  <div>
                    <FileInput
                      name="cast_certificate"
                      accept="image/png, image/jpeg, image/jpg"
                      label="Attach Cast Certificate"
                      helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)"
                      control={control}
                      error={errors.cast_certificate?.message}
                    />
                    {type === "resubmit" && cast_certificate && (
                      <FileViewer src={cast_certificate} />
                    )}
                  </div>
                </Col>
                <Col className="pb-1" xs={12}>
                  <TextInput
                    name="cast_no"
                    label="Caste certificate number"
                    control={control}
                    error={errors.cast_no?.message}
                  />
                </Col>
              </>
            )}
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}
