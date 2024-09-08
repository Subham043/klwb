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
import FileInput from "../../FormInput/FileInput";
import { useIndustryUserCommonSelectQuery } from "../../../hooks/data/industry";
import FileViewer from "../../FileViewer";

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ScholarshipFormSchemaType, any>;
  errors: FieldErrors<ScholarshipFormSchemaType>;
  watch: UseFormWatch<ScholarshipFormSchemaType>;
  setValue: UseFormSetValue<ScholarshipFormSchemaType>;
  type?: "apply" | "resubmit";
  salaryslip?: string | null;
};

export default function IndustryInfo({
  control,
  errors,
  watch,
  setValue,
  type = "apply",
  salaryslip,
}: PropType) {
  const district_id = watch("district_id");
  const taluq_id = watch("taluq_id");

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
    district_id !== 0 && district_id !== undefined,
    district_id === 0 ? undefined : district_id
  );
  const {
    data: industries,
    isFetching: isIndustryFetching,
    isLoading: isIndustryLoading,
  } = useIndustryUserCommonSelectQuery(
    taluq_id !== 0 && taluq_id !== undefined,
    taluq_id === 0 ? undefined : taluq_id
  );

  return (
    <div className="mb-1">
      <Panel
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>Industry Details</h5>
            <h6 className={classes.inner_sub_heading}>ಉದ್ಯಮದ ವಿವರಗಳು</h6>
          </div>
        }
        className="info-modal-panel"
        bordered
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" xs={12}>
              <SelectInput
                name="who_working"
                label="Who's Working"
                data={[
                  { label: "Father", value: "1" },
                  { label: "Mother", value: "2" },
                ]}
                control={control}
                error={errors.who_working?.message}
              />
            </Col>
            <Col className="pb-1" xs={12}>
              <TextInput
                name="parent_guardian_name"
                label="Parent/Guardian Name"
                control={control}
                error={errors.parent_guardian_name?.message}
              />
            </Col>
            <Col className="pb-1" xs={12}>
              <TextInput
                name="relationship"
                label="Relation between Student & Parent"
                control={control}
                error={errors.relationship?.message}
              />
            </Col>
            <Col className="pb-1" xs={12}>
              <TextInput
                name="msalary"
                label="Monthly Salary"
                control={control}
                error={errors.msalary?.message}
              />
            </Col>
            <Col className="pb-1" xs={12}>
              <SelectInput
                name="district_id"
                label="District"
                resetHandler={() => {
                  setValue("taluq_id", 0);
                  setValue("company_id", 0);
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
                error={errors.district_id?.message}
              />
            </Col>
            <Col className="pb-1" xs={12}>
              <SelectInput
                name="taluq_id"
                label="Taluq"
                resetHandler={() => {
                  setValue("company_id", 0);
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
                  district_id === 0 ||
                  district_id === undefined ||
                  taluqs === undefined ||
                  taluqs.length === 0
                }
                loading={isTaluqFetching || isTaluqLoading}
                control={control}
                error={errors.taluq_id?.message}
              />
            </Col>
            <Col className="pb-1" xs={12}>
              <div className="institute-select-register">
                <SelectInput
                  name="company_id"
                  label="Parent Industry Name"
                  data={
                    industries
                      ? industries.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))
                      : []
                  }
                  disabled={
                    taluq_id === 0 ||
                    taluq_id === undefined ||
                    industries === undefined ||
                    industries.length === 0
                  }
                  loading={isIndustryFetching || isIndustryLoading}
                  control={control}
                  error={errors.company_id?.message}
                />
                <p>
                  <b>Note: </b>Select your parent industry correctly b'coz they
                  will approve / reject your application
                </p>
              </div>
            </Col>
            <Col className="pb-1" xs={12}>
              <TextInput
                name="pincode"
                label="Pincode"
                control={control}
                error={errors.pincode?.message}
              />
            </Col>
            <Col className="pb-1" xs={12}>
              <FileInput
                name="salaryslip"
                accept="image/png, image/jpeg, image/jpg"
                label="Attach Your Parent Employee Certification / Salary-Slip of Last Month"
                helpText=" Last month salary slips are only accepted. Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)"
                control={control}
                error={errors.salaryslip?.message}
              />
              {type === "resubmit" && salaryslip && (
                <FileViewer src={salaryslip} />
              )}
            </Col>
            <Col className="pb-1" xs={12}></Col>
          </Row>
        </Grid>
      </Panel>
    </div>
  );
}
