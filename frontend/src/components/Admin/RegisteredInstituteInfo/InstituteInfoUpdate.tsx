import { Button, Col, Form, Grid, Modal, Row } from "rsuite";
import { useState } from "react";
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
  RegisteredInstituteType,
} from "../../../utils/types";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import DistrictSelect from "../Select/DistrictSelect";
import TaluqSelect from "../Select/TaluqSelect";

type Props = {
  modal: boolean;
  setModal: (value: boolean) => void;
  loading?: boolean;
  error?: unknown;
  refetch?: () => void;
  data: RegisteredInstituteType | undefined;
};

type SchemaType = {
  name: string;
  email: string;
  principal: string;
  phone: number;
  management_type?: string;
  category?: string;
  type?: string;
  urban_rural?: string;
  pincode: string;
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
      .typeError("Institute Name must contain characters only")
      .required("Institute Name is required"),
    principal: yup
      .string()
      .typeError("Principal Name must contain characters only")
      .required("Principal Name is required"),
    email: yup
      .string()
      .typeError("Email must contain characters only")
      .email()
      .required("Email is required"),
    phone: yup
      .number()
      .typeError("Phone must contain numbers only")
      .positive()
      .required("Phone is required"),
    management_type: yup
      .string()
      .typeError("Management Type must contain characters only")
      .optional(),
    category: yup
      .string()
      .typeError("Institute Category must contain characters only")
      .optional(),
    type: yup
      .string()
      .typeError("Institute Type must contain characters only")
      .optional(),
    urban_rural: yup
      .string()
      .typeError("Urban/Rural must contain characters only")
      .optional(),
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
    pincode: yup
      .string()
      .typeError("Pincode must contain characters only")
      .required("Pincode is required"),
    address: yup
      .string()
      .typeError("Address must contain characters only")
      .required("Address is required"),
  })
  .required();

const InstituteInfoUpdate = ({
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
      name: data ? data.institute.name : "",
      principal: data ? data.principal : "",
      email: data ? data.email : "",
      phone: data ? Number(data.phone) : 0,
      pincode: data ? data.address.pincode : "",
      address: data ? data.address.address : "",
      management_type: data && data.institute.management_type ? data.institute.management_type : "",
      category: data && data.institute.category ? data.institute.category : "",
      type: data && data.institute.type ? data.institute.type : "",
      urban_rural: data && data.institute.urban_rural ? data.institute.urban_rural : "",
      taluq_id: data && data.address && data.address.taluq ? data.address.taluq.id : 0,
      taluq: data && data.address && data.address.taluq ? { value: data.address.taluq.id, label: data.address.taluq.name } : { value: 0, label: "" },
      city_id: data && data.address && data.address.city ? data.address.city.id : 0,
      city: data && data.address && data.address.city ? { value: data.address.city.id, label: data.address.city.name } : { value: 0, label: "" },
    },
  });

  const city_id = watch("city_id");

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await axios.post(
        api_routes.admin.registered_institute.update(data!.id),
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
            <ModalCardContainer header="Institute Information Update">
              <Grid fluid>
                <Row gutter={30}>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <TextInput
                      name="name"
                      label="Institute Name"
                      control={control}
                      error={errors.name?.message}
                    />
                  </Col>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <TextInput
                      name="principal"
                      label="Principal Name"
                      control={control}
                      error={errors.principal?.message}
                    />
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <TextInput
                      name="email"
                      type="email"
                      label="Email"
                      control={control}
                      error={errors.email?.message}
                    />
                  </Col>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <TextInput
                      name="phone"
                      label="Phone"
                      control={control}
                      error={errors.phone?.message}
                    />
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <TextInput
                      name="management_type"
                      label="Management Type"
                      control={control}
                      error={errors.management_type?.message}
                    />
                  </Col>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <TextInput
                      name="category"
                      label="Institute Category"
                      control={control}
                      error={errors.category?.message}
                    />
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <TextInput
                      name="type"
                      label="Institute Type"
                      control={control}
                      error={errors.type?.message}
                    />
                  </Col>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <SelectInput
                      name="urban_rural"
                      label="Urban/Rural"
                      data={[
                        { label: "Urban", value: "Urban" },
                        { label: "Rural", value: "Rural" },
                      ]}
                      control={control}
                      error={errors.urban_rural?.message}
                    />
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col className="pb-1" md={8} sm={24} xs={24}>
                    <TextInput
                      name="pincode"
                      label="Pincode"
                      control={control}
                      error={errors.pincode?.message}
                    />
                  </Col>
                  <Col className="pb-1" md={8} sm={24} xs={24}>
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
                  <Col className="pb-1" md={8} sm={24} xs={24}>
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
                <Row gutter={30}></Row>
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

export default InstituteInfoUpdate;
