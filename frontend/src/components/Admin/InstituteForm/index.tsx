import { Button, Col, Form, Grid, Modal, Panel, Row } from "rsuite";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../../utils/types";
import { isAxiosError } from "axios";
import { useInstituteQuery } from "../../../hooks/data/institute";
import { useTaluqSelectQuery } from "../../../hooks/data/taluq";
import { useAxios } from "../../../hooks/useAxios";
import TextInput from "../../FormInput/TextInput";
import ToggleInput from "../../FormInput/ToggleInput";
import SelectInput from "../../FormInput/SelectInput";
import { useCitySelectQuery } from "../../../hooks/data/city";
import { api_routes } from "../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";

type SchemaType = {
  name: string;
  management_type: string;
  category: string;
  type: string;
  urban_rural: string;
  is_active: number;
  city_id: number;
  taluq_id: number;
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
    taluq_id: yup
      .number()
      .typeError("Taluq must contain numbers only")
      .required("Taluq is required")
      .test("notZero", "Taluq is required", (value) => !(value === 0)),
    is_active: yup
      .number()
      .typeError("Active/Inactive must contain numbers only")
      .min(0)
      .max(1)
      .required("Active/Inactive is required"),
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
            city_id: data ? data.taluq.city.id : 0,
            is_active: data ? (data.is_active ? 1 : 0) : 0,
          }
        : {
            name: "",
            management_type: "",
            category: "",
            type: "",
            urban_rural: "",
            city_id: 0,
            taluq_id: 0,
            is_active: 1,
          },
  });

  const city_id = watch("city_id");

  const {
    data: cities,
    isFetching: isCityFetching,
    isLoading: isCityLoading,
  } = useCitySelectQuery(drawer.status);
  const {
    data: taluqs,
    isFetching: isTaluqFetching,
    isLoading: isTaluqLoading,
  } = useTaluqSelectQuery(
    drawer.status && city_id !== 0,
    city_id === 0 ? undefined : city_id
  );

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
          is_active: 1,
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
        <Panel
          header={
            drawer.type === "Edit" ? "Update Institute" : " Add Institute"
          }
          className="info-modal-panel"
          bordered
        >
          <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
            <Grid fluid>
              <Row gutter={30}>
                <Col className="pb-1" xs={12}>
                  <TextInput
                    name="name"
                    label="Institute Name"
                    control={control}
                    error={errors.name?.message}
                  />
                </Col>
                <Col className="pb-1" xs={12}>
                  <TextInput
                    name="management_type"
                    label="Management Type"
                    control={control}
                    error={errors.management_type?.message}
                  />
                </Col>
                <Col className="pb-1" xs={12}>
                  <TextInput
                    name="category"
                    label="Institute Category"
                    control={control}
                    error={errors.category?.message}
                  />
                </Col>
                <Col className="pb-1" xs={12}>
                  <TextInput
                    name="type"
                    label="Institute Type"
                    control={control}
                    error={errors.type?.message}
                  />
                </Col>
                <Col className="pb-1" xs={8}>
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
                <Col className="pb-1" xs={8}>
                  <SelectInput
                    name="city_id"
                    label="District"
                    resetHandler={() => {
                      setValue("taluq_id", 0);
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
                    error={errors.city_id?.message}
                  />
                </Col>
                <Col className="pb-1" xs={8}>
                  <SelectInput
                    name="taluq_id"
                    label="Taluq"
                    data={
                      taluqs
                        ? taluqs.map((item) => ({
                            label: item.name,
                            value: item.id,
                          }))
                        : []
                    }
                    disabled={city_id === 0}
                    loading={isTaluqFetching || isTaluqLoading}
                    control={control}
                    error={errors.taluq_id?.message}
                  />
                </Col>
                <Col className="pb-1" xs={24}>
                  <ToggleInput
                    name="is_active"
                    checkedLabel="Active"
                    uncheckedLabel="Inactive"
                    control={control}
                    error={errors.is_active?.message}
                  />
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
        </Panel>
      </ErrorBoundaryLayout>
    </Modal>
  );
}
