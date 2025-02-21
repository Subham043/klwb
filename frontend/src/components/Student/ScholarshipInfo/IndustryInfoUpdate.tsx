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
import IndustrySelect from "../ScholarshipForm/Select/IndustrySelect";

type Props = {
  modal: boolean;
  setModal: (value: boolean) => void;
  refetch?: () => void;
  data: StudentApplicationType;
};

type SchemaType = {
  company_id: number,
	company:	{ value: number, label: string },
  district_id: number;
  district: { value: number; label: string };
  taluq_id: number;
  taluq: { value: number; label: string };
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    company_id: yup.number().typeError("Industry must contain numbers only").required("Industry is required").test("notZero", "Industry is required", (value) => !(value === 0)),
    company: yup
      .object({
          value: yup
              .number()
              .typeError("Industry must contain numbers only")
              .required("Industry is required")
              .test("notZero", "Industry is required", (value) => !(value === 0)),
          label: yup
              .string()
              .typeError("Industry must contain characters only")
              .required("Industry is required"),
      })
      .required("Industry is required"),
    district_id: yup
      .number()
      .typeError("District must contain numbers only")
      .required("District is required")
      .test("notZero", "District is required", (value) => !(value === 0)),
    district: yup
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
    taluq_id: yup
      .number()
      .typeError("Taluq must contain numbers only")
      .required("Taluq is required")
      .test("notZero", "Taluq is required", (value) => !(value === 0)),
    taluq: yup
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
  })
  .required();

const IndustryInfoUpdate = ({ modal, setModal, data, refetch }: Props) => {
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
      company_id: data && data.company_id ? data.company_id : 0,
      company: data && data.industry_name ? { value: data.company_id, label: data.industry_name } : { value: 0, label: '' },
      taluq_id: data && data.company.taluq ? data.company.taluq.id : 0,
      taluq:
        data && data.company.taluq
          ? { value: data.company.taluq.id, label: data.company.taluq.name }
          : { value: 0, label: "" },
      district_id: data && data.company.district ? data.company.district.id : 0,
      district:
        data && data.company.district
          ? {
              value: data.company.district.id,
              label: data.company.district.name,
            }
          : { value: 0, label: "" },
    },
  });

  const district_id = watch("district_id");
  const taluq_id = watch("taluq_id");

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await axios.post(
        api_routes.admin.scholarship.industry_update(data!.id),
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
          <ModalCardContainer header="Industry Information Update">
            <Grid fluid>
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
                    {errors.district?.value?.message ||
                      errors.district_id?.message}
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
                <Col className="pb-1" xs={24}>
                  <Form.ControlLabel>Industry Name</Form.ControlLabel>
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
                    {errors.company?.value?.message ||
                      errors.company_id?.message}
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
                setModal(false)
                reset()
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

export default IndustryInfoUpdate;
