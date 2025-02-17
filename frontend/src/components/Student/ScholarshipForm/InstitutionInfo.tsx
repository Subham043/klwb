import { Col, Form, Grid, Row } from "rsuite";
import TextInput from "../../FormInput/TextInput";
import classes from "./index.module.css";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ScholarshipFormSchemaType } from "./schema";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import DistrictSelect from "./Select/DistrictSelect";
import TaluqSelect from "./Select/TaluqSelect";
import InstituteSelect from "./Select/InstituteSelect";
import GraduationSelect from "./Select/GraduationSelect";
import CourseSelect from "./Select/CourseSelect";
import ClassSelect from "./Select/ClassSelect";

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ScholarshipFormSchemaType, any>;
  errors: FieldErrors<ScholarshipFormSchemaType>;
  watch: UseFormWatch<ScholarshipFormSchemaType>;
  setValue: UseFormSetValue<ScholarshipFormSchemaType>;
};

export default function InstitutionInfo({
  control,
  errors,
  watch,
  setValue,
}: PropType) {
  const ins_district_id = watch("ins_district_id");
  const ins_taluq_id = watch("ins_taluq_id");
  const graduation_id = watch("graduation_id");
  const course_id = watch("course_id");

  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>
              Present Institution Details
            </h5>
            <h6 className={classes.inner_sub_heading}>
              ಪ್ರಸ್ತುತ ಸಂಸ್ಥೆಯ ವಿವರಗಳು
            </h6>
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <Form.ControlLabel>District</Form.ControlLabel>
              <Controller
                name={"ins_district"}
                control={control}
                render={({ field }) => (
                  <>
                    <DistrictSelect
                      value={field.value}
                      setValue={(value) => {
                        field.onChange({
                          value: value.value,
                          label: value.label,
                        });
                        setValue("ins_district_id", value.value);
                        setValue("ins_taluq_id", 0);
                        setValue("ins_taluq", { value: 0, label: "" });
                        setValue("school_id", 0);
                        setValue("school", { value: 0, label: "" });
                      }}
                    />
                  </>
                )}
              />
              <Form.ErrorMessage
                show={
                  !!errors.ins_district?.value?.message ||
                  !!errors.ins_district_id?.message
                }
                placement="bottomStart"
              >
                {errors.ins_district?.value?.message || errors.ins_district_id?.message}
              </Form.ErrorMessage>
            </Col>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <Form.ControlLabel>Taluq</Form.ControlLabel>
              <Controller
                name={"ins_taluq"}
                control={control}
                render={({ field }) => (
                  <>
                    <TaluqSelect
                      value={field.value}
                      district={ins_district_id}
                      isDisabled={ins_district_id === 0}
                      setValue={(value) => {
                        field.onChange({
                          value: value.value,
                          label: value.label,
                        });
                        setValue("ins_taluq_id", value.value);
                        setValue("school_id", 0);
                        setValue("school", { value: 0, label: "" });
                      }}
                    />
                  </>
                )}
              />
              <Form.ErrorMessage
                show={
                  !!errors.ins_taluq?.value?.message ||
                  !!errors.ins_taluq_id?.message
                }
                placement="bottomStart"
              >
                {errors.ins_taluq?.value?.message || errors.ins_taluq_id?.message}
              </Form.ErrorMessage>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <Form.ControlLabel>Present Institution</Form.ControlLabel>
              <Controller
                name={"school"}
                control={control}
                render={({ field }) => (
                  <>
                    <InstituteSelect
                      value={field.value}
                      taluq={ins_taluq_id}
                      isDisabled={ins_taluq_id === 0}
                      setValue={(value) => {
                        field.onChange({
                          value: value.value,
                          label: value.label,
                        });
                        setValue("school_id", value.value);
                      }}
                    />
                    <p>
                      <b>Note: </b>Select your institution correctly b'coz they
                      will approve / reject your application
                    </p>
                  </>
                )}
              />
              <Form.ErrorMessage
                show={
                  !!errors.school?.value?.message ||
                  !!errors.school_id?.message
                }
                placement="bottomStart"
              >
                {errors.school?.value?.message || errors.school_id?.message}
              </Form.ErrorMessage>
            </Col>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <TextInput
                name="ins_pin"
                label="Pincode"
                control={control}
                error={errors.ins_pin?.message}
              />
            </Col>
          </Row>
          <Row gutter={30}>
          <Col className="pb-1" md={8} sm={24} xs={24}>
              <Form.ControlLabel>Graduation</Form.ControlLabel>
              <Controller
                name={"graduation"}
                control={control}
                render={({ field }) => (
                  <>
                    <GraduationSelect
                      value={field.value}
                      setValue={(value) => {
                        field.onChange({
                          value: value.value,
                          label: value.label,
                        });
                        setValue("graduation_id", value.value);
                        setValue("course_id", undefined);
                        setValue("course", { value: undefined, label: undefined });
                        setValue("class_id", undefined);
                        setValue("class", { value: undefined, label: undefined });
                      }}
                    />
                  </>
                )}
              />
              <Form.ErrorMessage
                show={
                  !!errors.graduation?.value?.message ||
                  !!errors.graduation_id?.message
                }
                placement="bottomStart"
              >
                {errors.graduation?.value?.message || errors.graduation_id?.message}
              </Form.ErrorMessage>
            </Col>
            {
              graduation_id !== 0 &&
              <Col className="pb-1" md={8} sm={24} xs={24}>
                <Controller
                  name={"course"}
                  control={control}
                  render={({ field }) => (
                    <>
                      <CourseSelect
                        value={field.value}
                        graduation={graduation_id}
                        isDisabled={graduation_id === 0}
                        setValue={(value) => {
                          field.onChange({
                            value: value.value ? value.value : undefined,
                            label: value.label ? value.label : undefined,
                          });
                          setValue("course_id", value.value ? value.value : undefined);
                          setValue("class_id", undefined);
                          setValue("class", { value: undefined, label: undefined });
                        }}
                      />
                    </>
                  )}
                />
                <Form.ErrorMessage
                  show={
                    !!errors.course?.value?.message ||
                    !!errors.course_id?.message
                  }
                  placement="bottomStart"
                >
                  {errors.course?.value?.message || errors.course_id?.message}
                </Form.ErrorMessage>
              </Col>
            }
            {
              course_id !== 0 && course_id !== undefined &&
              <Col className="pb-1" md={8} sm={24} xs={24}>
                <Controller
                  name={"class"}
                  control={control}
                  render={({ field }) => (
                    <>
                      <ClassSelect
                        value={field.value}
                        course={course_id}
                        isDisabled={course_id === 0}
                        setValue={(value) => {
                          field.onChange({
                            value: value.value ? value.value : undefined,
                            label: value.label ? value.label : undefined,
                          });
                          setValue("class_id", value.value ? value.value : undefined);
                        }}
                      />
                    </>
                  )}
                />
                <Form.ErrorMessage
                  show={
                    !!errors.class?.value?.message ||
                    !!errors.class_id?.message
                  }
                  placement="bottomStart"
                >
                  {errors.class?.value?.message || errors.class_id?.message}
                </Form.ErrorMessage>
              </Col>
            }
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}
