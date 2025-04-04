import { Col, Grid, Row } from "rsuite";
import TextInput from "../../FormInput/TextInput";
import SelectInput from "../../FormInput/SelectInput";
import classes from "./index.module.css";
import { Control, FieldErrors } from "react-hook-form";
import { ScholarshipFormSchemaType } from "./schema";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ScholarshipFormSchemaType, any>;
  errors: FieldErrors<ScholarshipFormSchemaType>;
};

export default function StudentInfo({ control, errors }: PropType) {
  return (
    <div className="mb-1">
      <ModalCardContainer
        header={
          <div className="text-center">
            <h5 className={classes.inner_main_heading}>Student Details</h5>
            <h6 className={classes.inner_sub_heading}>ವಿದ್ಯಾರ್ಥಿ ವಿವರಗಳು</h6>
          </div>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <TextInput
                name="name"
                label="Name"
                focus={true}
                control={control}
                error={errors.name?.message}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <TextInput
                name="parent_phone"
                label="Mobile Number"
                control={control}
                error={errors.parent_phone?.message}
              />
            </Col>
            <Col className="pb-1" md={8} sm={24} xs={24}>
              <SelectInput
                name="gender"
                label="Gender"
                data={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "others" },
                ]}
                control={control}
                error={errors.gender?.message}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <TextInput
                name="father_name"
                label="Father's Name"
                control={control}
                error={errors.father_name?.message}
              />
            </Col>
            <Col className="pb-1" md={12} sm={24} xs={24}>
              <TextInput
                name="mother_name"
                label="Mother's Name"
                control={control}
                error={errors.mother_name?.message}
              />
            </Col>
          </Row>
          <Row gutter={30}>
            <Col className="pb-1" xs={24}>
              <TextInput
                name="address"
                label="Address"
                helpText="Do not use any special characters"
                textarea={true}
                control={control}
                error={errors.address?.message}
              />
            </Col>
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}
