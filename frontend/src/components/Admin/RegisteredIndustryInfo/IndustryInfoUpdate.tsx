import { Button, Col, Form, Grid, Modal, Row } from "rsuite";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { isAxiosError } from "axios";
import { useAxios } from "../../../hooks/useAxios";
import TextInput from "../../FormInput/TextInput";
import SelectInput from "../../FormInput/SelectInput";
import { api_routes } from "../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import {
  AxiosErrorResponseType,
  RegisteredIndustryType,
} from "../../../utils/types";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import DistrictSelect from "../Select/DistrictSelect";
import TaluqSelect from "../Select/TaluqSelect";
import { company_act, Contract_Labour_Act, Factory_Act, Shops_and_Commercial_Act, Society_Registration_Act } from "../../../utils/constants/company_act";

type Props = {
  modal: boolean;
  setModal: (value: boolean) => void;
  loading?: boolean;
  error?: unknown;
  refetch?: () => void;
  data: RegisteredIndustryType | undefined;
};

type SchemaType = {
  name: string;
  act: string;
  category: string;
  address: string;
  city_id: number;
  city: { value: number; label: string };
  taluq_id: number;
  taluq: { value: number; label: string };
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup
      .string()
      .typeError("Industry Name must contain characters only")
      .required("Industry Name is required"),
    act: yup
      .string()
      .typeError("Act must contain characters only")
      .required("Act is required"),
    category: yup
          .string()
          .typeError("Category must contain characters only")
          .required("Category is required"),
    city_id: yup
      .number()
      .typeError("District must contain numbers only")
      .required("District is required")
      .test("notZero", "District is required", (value) => !(value === 0)),
    city: yup
      .object({
        value: yup
          .number()
          .typeError("City must contain numbers only")
          .required("City is required")
          .test("notZero", "City is required", (value) => !(value === 0)),
        label: yup
          .string()
          .typeError("City must contain characters only")
          .required("City is required"),
      })
      .required("City is required"),
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
    address: yup
      .string()
      .typeError("Address must contain characters only")
      .required("Address is required"),
  })
  .required();

const IndustryInfoUpdate = ({
  modal,
  setModal,
  data,
  refetch,
  error,
  loading: dataLoading,
}: Props) => {
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
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    values: {
      name: data ? data.industry.name : "",
      act: data && data.industry.act ? data.industry.act.toString() : "",
      category: data && data.industry.category ? data.industry.category : "",
      address: data ? data.address : "",
      taluq_id: data ? data.taluq.id : 0,
      taluq: data && data.taluq ? { value: data.taluq.id, label: data.taluq.name } : { value: 0, label: "" },
      city_id: data ? data.city.id : 0,
      city: data && data.city ? { value: data.city.id, label: data.city.name } : { value: 0, label: "" },
    },
  });

  const city_id = watch("city_id");
  const act = watch("act");
  
    const categories = useMemo(() => {
      if (act === "1") {
        return Shops_and_Commercial_Act;
      } else if (act === "2") {
        return Factory_Act;
      } else if (act === "3") {
        return Society_Registration_Act;
      } else if (act === "4") {
        return Contract_Labour_Act;
      }
      return [];
    }, [act]);

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await axios.post(
        api_routes.admin.registered_industry.update(data!.id),
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
        <ErrorBoundaryLayout
          loading={dataLoading}
          error={error}
          refetch={refetch}
        >
          <>
            <ModalCardContainer header="Industry Information Update">
              <Grid fluid>
                <Row gutter={30}>
                  <Col className="pb-1" xs={24}>
                    <TextInput
                      name="name"
                      label="Industry Name"
                      control={control}
                      error={errors.name?.message}
                    />
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col className="pb-1" xs={12}>
                    <SelectInput
                      name="act"
                      label="Act"
                      data={company_act}
                      control={control}
                      error={errors.act?.message}
                      resetHandler={() => setValue("category", "")}
                    />
                  </Col>
                  <Col className="pb-1" xs={12}>
                    <SelectInput
                      name="category"
                      label="Category"
                      virtualized={false}
                      data={categories}
                      control={control}
                      error={errors.category?.message}
                    />
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col className="pb-1" xs={12}>
                    <Form.ControlLabel>District</Form.ControlLabel>
                    <Controller
                      name={"city"}
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
                              setValue("city_id", value.value);
                              setValue("taluq_id", 0);
                              setValue("taluq", { value: 0, label: "" });
                            }}
                          />
                        </>
                      )}
                    />
                    <Form.ErrorMessage
                      show={
                        !!errors.city?.value?.message ||
                        !!errors.city_id?.message
                      }
                      placement="bottomStart"
                    >
                      {errors.city?.value?.message || errors.city_id?.message}
                    </Form.ErrorMessage>
                  </Col>
                  <Col className="pb-1" xs={12}>
                    <Form.ControlLabel>Taluq</Form.ControlLabel>
                    <Controller
                      name={"taluq"}
                      control={control}
                      render={({ field }) => (
                        <>
                          <TaluqSelect
                            value={field.value}
                            district={city_id}
                            isDisabled={city_id === 0}
                            setValue={(value) => {
                              field.onChange({
                                value: value.value,
                                label: value.label,
                              });
                              setValue("taluq_id", value.value);
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
                onClick={() => setModal(false)}
                appearance="primary"
                color="red"
              >
                Cancel
              </Button>
            </Modal.Footer>
          )}
        </ErrorBoundaryLayout>
      </Form>
    </Modal>
  );
};

export default IndustryInfoUpdate;
