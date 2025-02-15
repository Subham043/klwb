import { Button, Col, Form, Grid, Modal, Row } from "rsuite";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../../utils/types";
import { isAxiosError } from "axios";
import { useInstituteQuery } from "../../../hooks/data/institute";
import { useAxios } from "../../../hooks/useAxios";
import TextInput from "../../FormInput/TextInput";
import SelectInput from "../../FormInput/SelectInput";
import { api_routes } from "../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import DistrictSelect from "../Select/DistrictSelect";
import TaluqSelect from "../Select/TaluqSelect";

type SchemaType = {
  name: string;
  management_type: string;
  category: string;
  type: string;
  urban_rural: string;
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
      .required("Name is required"),
    management_type: yup
      .string()
      .typeError("Management Type must contain characters only")
      .required("Management Type is required"),
    category: yup
      .string()
      .typeError("Institute Category must contain characters only")
      .required("Category is required"),
    type: yup
      .string()
      .typeError("Institute Type must contain characters only")
      .required("Type is required"),
    urban_rural: yup
      .string()
      .typeError("Urban/Rural must contain characters only")
      .required("Urban/Rural is required"),
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
  })
  .required();

export default function InstituteForm({
  drawer,
  drawerHandler,
  refetch,
}: {
  drawer: DrawerProps;
  drawerHandler: (value: DrawerProps) => void;
  refetch: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { toastError, toastSuccess } = useToast();
  const {
    data,
    isFetching,
    isLoading,
    isRefetching,
    refetch: refetchData,
    error,
  } = useInstituteQuery(
    drawer.type === "Edit" ? drawer.id : 0,
    drawer.type === "Edit" && drawer.status && drawer.id > 0
  );
  const axios = useAxios();

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    setError,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    values:
      drawer.type === "Edit"
        ? {
          name: data ? data.name : "",
          management_type: data ? data.management_type : "",
          category: data ? data.category : "",
          type: data ? data.type : "",
          urban_rural: data ? data.urban_rural : "",
          taluq_id: data ? data.taluq.id : 0,
          taluq: data && data.taluq ? { value: data.taluq.id, label: data.taluq.name } : { value: 0, label: "" },
          city_id: data ? data.taluq.city.id : 0,
          city: data && data.taluq.city ? { value: data.taluq.city.id, label: data.taluq.city.name } : { value: 0, label: "" },
        }
        : {
          name: "",
          management_type: "",
          category: "",
          type: "",
          urban_rural: "",
          city_id: 0,
          city: { value: 0, label: "" },
          taluq_id: 0,
          taluq: { value: 0, label: "" },
        },
  });

  const city_id = watch("city_id");

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await axios.post(
        drawer.type === "Edit"
          ? api_routes.admin.institute.update(drawer.id)
          : api_routes.admin.institute.create,
        getValues()
      );
      toastSuccess("Saved Successfully");
      if (drawer.type === "Create") {
        reset({
          name: "",
          management_type: "",
          category: "",
          type: "",
          urban_rural: "",
          city_id: 0,
          taluq_id: 0,
        });
      }
      drawerHandler({ status: false, type: "Create" });
      refetch();
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
      overflow={false}
      size={"md"}
      open={drawer.status}
      onClose={() => drawerHandler({ status: false, type: "Create" })}
      className="info-modal"
    >
      <ErrorBoundaryLayout
        loading={isFetching || isLoading || isRefetching}
        error={error}
        refetch={refetchData}
      >
        <ModalCardContainer
          header={
            drawer.type === "Edit" ? "Update Institute" : " Add Institute"
          }
        >
          <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
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
                    name="management_type"
                    label="Management Type"
                    control={control}
                    error={errors.management_type?.message}
                  />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" md={12} sm={24} xs={24}>
                  <TextInput
                    name="category"
                    label="Institute Category"
                    control={control}
                    error={errors.category?.message}
                  />
                </Col>
                <Col className="pb-1" md={12} sm={24} xs={24}>
                  <TextInput
                    name="type"
                    label="Institute Type"
                    control={control}
                    error={errors.type?.message}
                  />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col className="pb-1" md={8} sm={24} xs={24}>
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
            </Grid>

            <Modal.Footer className="info-modal-footer">
              <Button
                appearance="primary"
                type="submit"
                loading={loading}
                disabled={loading}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={() => drawerHandler({ status: false, type: "Create" })}
                appearance="primary"
                color="red"
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </ModalCardContainer>
      </ErrorBoundaryLayout>
    </Modal>
  );
}
