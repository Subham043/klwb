import { Col, Form, Grid, Row } from "rsuite";
import TextInput from "../../FormInput/TextInput";
import SelectInput from "../../FormInput/SelectInput";
import classes from "./index.module.css";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ScholarshipFormSchemaType } from "./schema";
import { useGraduationCommonSelectQuery } from "../../../hooks/data/graduation";
import { useCourseCommonSelectQuery } from "../../../hooks/data/course";
import { useClassCommonSelectQuery } from "../../../hooks/data/class";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import DistrictSelect from "./Select/DistrictSelect";
import TaluqSelect from "./Select/TaluqSelect";
import InstituteSelect from "./Select/InstituteSelect";

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

  const {
    data: graduations,
    isFetching: isGraduationFetching,
    isLoading: isGraduationLoading,
  } = useGraduationCommonSelectQuery(true);
  const {
    data: courses,
    isFetching: isCourseFetching,
    isLoading: isCourseLoading,
  } = useCourseCommonSelectQuery(
    graduation_id !== 0 && graduation_id !== undefined,
    graduation_id === 0 ? undefined : graduation_id
  );
  const {
    data: clases,
    isFetching: isClassFetching,
    isLoading: isClassLoading,
  } = useClassCommonSelectQuery(
    course_id !== 0 && course_id !== undefined,
    course_id === 0 ? undefined : course_id
  );

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
            <Col className="pb-1" xs={12}>
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
            <Col className="pb-1" xs={12}>
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
            <Col className="pb-1" xs={12}>
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
            <Col className="pb-1" xs={12}>
              <TextInput
                name="ins_pin"
                label="Pincode"
                control={control}
                error={errors.ins_pin?.message}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" xs={8}>
              <SelectInput
                name="graduation_id"
                label="Graduation"
                resetHandler={() => {
                  setValue("course_id", 0);
                  setValue("class_id", 0);
                }}
                data={
                  graduations
                    ? graduations.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                    : []
                }
                loading={isGraduationFetching || isGraduationLoading}
                control={control}
                error={errors.graduation_id?.message}
              />
            </Col>
            {graduation_id !== 0 &&
              courses !== undefined &&
              courses.length !== 0 && (
                <Col className="pb-1" xs={8}>
                  <SelectInput
                    name="course_id"
                    label="Course"
                    resetHandler={() => {
                      setValue("class_id", 0);
                    }}
                    data={
                      courses
                        ? courses.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))
                        : []
                    }
                    disabled={
                      graduation_id === 0 ||
                      graduation_id === undefined ||
                      courses === undefined ||
                      courses.length === 0
                    }
                    loading={isCourseFetching || isCourseLoading}
                    control={control}
                    error={errors.course_id?.message}
                  />
                </Col>
              )}
            {course_id !== 0 && clases !== undefined && clases.length !== 0 && (
              <Col className="pb-1" xs={8}>
                <SelectInput
                  name="class_id"
                  label="Class"
                  data={
                    clases
                      ? clases.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                      : []
                  }
                  disabled={
                    course_id === 0 ||
                    course_id === undefined ||
                    clases === undefined ||
                    clases.length === 0
                  }
                  loading={isClassFetching || isClassLoading}
                  control={control}
                  error={errors.class_id?.message}
                />
              </Col>
            )}
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}
