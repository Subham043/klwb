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
import FileInput from "../../FormInput/FileInput";
import FileViewer from "../../FileViewer";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import DistrictSelect from "./Select/DistrictSelect";
import TaluqSelect from "./Select/TaluqSelect";
import IndustrySelect from "./Select/IndustrySelect";

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

  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>Industry Details</h5>
            <h6 className={classes.inner_sub_heading}>ಉದ್ಯಮದ ವಿವರಗಳು</h6>
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" md={12} sm={24} xs={24}>
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
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <TextInput
                name="parent_guardian_name"
                label="Parent/Guardian Name"
                control={control}
                error={errors.parent_guardian_name?.message}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <TextInput
                name="relationship"
                label="Relation between Student & Parent"
                control={control}
                error={errors.relationship?.message}
              />
            </Col>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <TextInput
                name="msalary"
                label="Monthly Salary"
                control={control}
                error={errors.msalary?.message}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <Form.ControlLabel>District</Form.ControlLabel>
              <Controller
                name={"district"}
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
                        setValue("district_id", value.value);
                        setValue("taluq_id", 0);
                        setValue("taluq", { value: 0, label: "" });
                        setValue("company_id", 0);
                        setValue("company", { value: 0, label: "" });
                      }}
                    />
                  </>
                )}
              />
              <Form.ErrorMessage
                show={
                  !!errors.district?.value?.message ||
                  !!errors.district_id?.message
                }
                placement="bottomStart"
              >
                {errors.district?.value?.message || errors.district_id?.message}
              </Form.ErrorMessage>
            </Col>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <Form.ControlLabel>Taluq</Form.ControlLabel>
              <Controller
                name={"taluq"}
                control={control}
                render={({ field }) => (
                  <>
                    <TaluqSelect
                      value={field.value}
                      district={district_id}
                      isDisabled={district_id === 0}
                      setValue={(value) => {
                        field.onChange({
                          value: value.value,
                          label: value.label,
                        });
                        setValue("taluq_id", value.value);
                        setValue("company_id", 0);
                        setValue("company", { value: 0, label: "" });
                      }}
                    />
                  </>
                )}
              />
              <Form.ErrorMessage
                show={
                  !!errors.taluq?.value?.message ||
                  !!errors.taluq_id?.message
                }
                placement="bottomStart"
              >
                {errors.taluq?.value?.message || errors.taluq_id?.message}
              </Form.ErrorMessage>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <Form.ControlLabel>Parent Industry Name</Form.ControlLabel>
              <Controller
                name={"company"}
                control={control}
                render={({ field }) => (
                  <>
                    <IndustrySelect
                      value={field.value}
                      taluq={taluq_id}
                      isDisabled={taluq_id === 0}
                      setValue={(value) => {
                        field.onChange({
                          value: value.value,
                          label: value.label,
                        });
                        setValue("company_id", value.value);
                      }}
                    />
                    <p>
                      <b>Note: </b>Select your parent industry correctly b'coz they
                      will approve / reject your application
                    </p>
                  </>
                )}
              />
              <Form.ErrorMessage
                show={
                  !!errors.company?.value?.message ||
                  !!errors.company_id?.message
                }
                placement="bottomStart"
              >
                {errors.company?.value?.message || errors.company_id?.message}
              </Form.ErrorMessage>
            </Col>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <TextInput
                name="pincode"
                label="Pincode"
                control={control}
                error={errors.pincode?.message}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <FileInput
                name="salaryslip"
                accept="image/png, image/jpeg, image/jpg, application/pdf"
                label="Attach Your Parent Employee Certification / Salary-Slip of Last Month"
                helpText=" Last month salary slips are only accepted. Only JPG, JPEG, PNG, PDF are allowed (It should be less than 515kb)"
                control={control}
                error={errors.salaryslip?.message}
              />
              {type === "resubmit" && salaryslip && (
                <FileViewer src={salaryslip} />
              )}
            </Col>
            <Col className="pb-1" md={12} sm={24} xs={24}></Col>
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}
