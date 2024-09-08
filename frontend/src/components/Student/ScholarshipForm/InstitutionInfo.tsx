import { Col, Grid, Panel, Row } from "rsuite";
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
import { useCityCommonSelectQuery } from "../../../hooks/data/city";
import { useTaluqCommonSelectQuery } from "../../../hooks/data/taluq";
import { useInstituteCommonSelectQuery } from "../../../hooks/data/institute";
import { useGraduationCommonSelectQuery } from "../../../hooks/data/graduation";
import { useCourseCommonSelectQuery } from "../../../hooks/data/course";
import { useClassCommonSelectQuery } from "../../../hooks/data/class";

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
    data: cities,
    isFetching: isCityFetching,
    isLoading: isCityLoading,
  } = useCityCommonSelectQuery(true);
  const {
    data: taluqs,
    isFetching: isTaluqFetching,
    isLoading: isTaluqLoading,
  } = useTaluqCommonSelectQuery(
    ins_district_id !== 0 && ins_district_id !== undefined,
    ins_district_id === 0 ? undefined : ins_district_id
  );
  const {
    data: institutes,
    isFetching: isInstituteFetching,
    isLoading: isInstituteLoading,
  } = useInstituteCommonSelectQuery(
    ins_taluq_id !== 0 && ins_taluq_id !== undefined,
    ins_taluq_id === 0 ? undefined : ins_taluq_id
  );

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
      <Panel
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
        className="info-modal-panel"
        bordered
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" xs={12}>
              <SelectInput
                name="ins_district_id"
                label="District"
                resetHandler={() => {
                  setValue("ins_taluq_id", 0);
                  setValue("school_id", 0);
                }}
                data={
                  cities
                    ? cities.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
                loading={isCityFetching || isCityLoading}
                control={control}
                error={errors.ins_district_id?.message}
              />
            </Col>
            <Col className="pb-1" xs={12}>
              <SelectInput
                name="ins_taluq_id"
                label="Taluq"
                resetHandler={() => {
                  setValue("school_id", 0);
                }}
                data={
                  taluqs
                    ? taluqs.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
                disabled={
                  ins_district_id === 0 ||
                  ins_district_id === undefined ||
                  taluqs === undefined ||
                  taluqs.length === 0
                }
                loading={isTaluqFetching || isTaluqLoading}
                control={control}
                error={errors.ins_taluq_id?.message}
              />
            </Col>
            <Col className="pb-1" xs={12}>
              <div className="institute-select-register">
                <SelectInput
                  name="school_id"
                  label="Present Institution"
                  data={
                    institutes
                      ? institutes.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))
                      : []
                  }
                  disabled={
                    ins_taluq_id === 0 ||
                    ins_taluq_id === undefined ||
                    institutes === undefined ||
                    institutes.length === 0
                  }
                  loading={isInstituteFetching || isInstituteLoading}
                  control={control}
                  error={errors.school_id?.message}
                />
                <p>
                  <b>Note: </b>Select your institution correctly b'coz they will
                  approve / reject your application
                </p>
              </div>
            </Col>
            <Col className="pb-1" xs={12}>
              <TextInput
                name="ins_pin"
                label="Pincode"
                control={control}
                error={errors.ins_pin?.message}
              />
            </Col>
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
      </Panel>
    </div>
  );
}
