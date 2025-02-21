import { Button, Col, Form, Grid, Modal, Row } from "rsuite";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { isAxiosError } from "axios";
import { useAxios } from "../../../hooks/useAxios";
import { api_routes } from "../../../utils/routes/api";
import {
  AxiosErrorResponseType,
  StudentApplicationType,
} from "../../../utils/types";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import DistrictSelect from "../ScholarshipForm/Select/DistrictSelect";
import TaluqSelect from "../ScholarshipForm/Select/TaluqSelect";
import InstituteSelect from "../ScholarshipForm/Select/InstituteSelect";

type Props = {
  modal: boolean;
  setModal: (value: boolean) => void;
  refetch?: () => void;
  data: StudentApplicationType;
};

type SchemaType = {
  ins_district_id: number;
  ins_district: { value: number; label: string };
  ins_taluq_id: number;
  ins_taluq: { value: number; label: string };
  school_id: number;
  school: { value: number; label: string };
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    ins_district_id: yup
      .number()
      .typeError("District must contain numbers only")
      .required("District is required")
      .test("notZero", "District is required", (value) => !(value === 0)),
    ins_district: yup
      .object({
        value: yup
          .number()
          .typeError("District must contain numbers only")
          .required("District is required")
          .test("notZero", "District is required", (value) => !(value === 0)),
        label: yup
          .string()
          .typeError("District must contain characters only")
          .required("District is required"),
      })
      .required("District is required"),
    ins_taluq_id: yup
      .number()
      .typeError("Taluq must contain numbers only")
      .required("Taluq is required")
      .test("notZero", "Taluq is required", (value) => !(value === 0)),
    ins_taluq: yup
      .object({
        value: yup
          .number()
          .typeError("Taluq must contain numbers only")
          .required("Taluq is required")
          .test("notZero", "Taluq is required", (value) => !(value === 0)),
        label: yup
          .string()
          .typeError("Taluq must contain characters only")
          .required("Taluq is required"),
      })
      .required("Taluq is required"),
    school_id: yup
      .number()
      .typeError("Present institution must contain numbers only")
      .required("Present institution is required")
      .test(
        "notZero",
        "Present institution is required",
        (value) => !(value === 0)
      ),
    school: yup
      .object({
        value: yup
          .number()
          .typeError("Present institution must contain numbers only")
          .required("Present institution is required")
          .test(
            "notZero",
            "Present institution is required",
            (value) => !(value === 0)
          ),
        label: yup
          .string()
          .typeError("Present institution must contain characters only")
          .required("Present institution is required"),
      })
      .required("Present institution is required"),
  })
  .required();

const InstituteInfoUpdate = ({ modal, setModal, data, refetch }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toastError, toastSuccess } = useToast();
  const axios = useAxios();

  const {
    control,
    handleSubmit,
    getValues,
    setError,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    values: {
      ins_district_id: data ? data.mark.ins_district_id : 0,
      ins_district:
        data && data.mark.district
          ? { value: data.mark.district.id, label: data.mark.district.name }
          : { value: 0, label: "" },
      ins_taluq_id: data ? data.mark.ins_taluq_id : 0,
      ins_taluq:
        data && data.mark.taluq
          ? { value: data.mark.taluq.id, label: data.mark.taluq.name }
          : { value: 0, label: "" },
      school_id: data ? data.school_id : 0,
      school:
        data && data.present_institute_name
          ? { value: data.school_id, label: data.present_institute_name }
          : { value: 0, label: "" },
    },
  });

  const ins_district_id = watch("ins_district_id");
  const ins_taluq_id = watch("ins_taluq_id");

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await axios.post(
        api_routes.admin.scholarship.institute_update(data!.id),
        getValues()
      );
      toastSuccess("Saved Successfully");
      setModal(false);
      refetch && refetch();
    } catch (error) {
      if (isAxiosError<AxiosErrorResponseType>(error)) {
        if (error?.response?.data?.errors) {
          for (const [key, value] of Object.entries(
            error?.response?.data?.errors
          )) {
            setError(key as keyof SchemaType, {
              type: "server",
              message: value[0],
            });
          }
        } else if (error?.response?.data?.message) {
          toastError(error.response.data.message);
        }
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <Modal
      size={"md"}
      open={modal}
      onClose={() => setModal(false)}
      className="info-modal"
    >
      <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
        <>
          <ModalCardContainer header="Institute Information Update">
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
                    {errors.ins_district?.value?.message ||
                      errors.ins_district_id?.message}
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
                    {errors.ins_taluq?.value?.message ||
                      errors.ins_taluq_id?.message}
                  </Form.ErrorMessage>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" xs={24}>
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
              </Row>
            </Grid>
          </ModalCardContainer>
        </>
        {data !== undefined && (
          <Modal.Footer className="mb-1 info-modal-footer">
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              appearance="primary"
            >
              Update
            </Button>
            <Button
              type="button"
              onClick={() => {
                setModal(false);
                reset();
              }}
              appearance="primary"
              color="red"
            >
              Cancel
            </Button>
          </Modal.Footer>
        )}
      </Form>
    </Modal>
  );
};

export default InstituteInfoUpdate;
