import { Button, ButtonToolbar, Col, Form, Row } from "rsuite";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../../Drawer";
import { useCityQuery } from "../../../hooks/data/city";
import { useAxios } from "../../../hooks/useAxios";
import TextInput from "../../FormInput/TextInput";
import { api_routes } from "../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import StateSelect from "../../StateSelect";

type SchemaType = {
  name: string;
  special_name?: string;
  state_id: number;
  state: { value: number; label: string };
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup
      .string()
      .typeError("Name must contain characters only")
      .required("Name is required"),
    special_name: yup
      .string()
      .typeError("Special Name must contain characters only")
      .optional(),
    state_id: yup
      .number()
      .typeError("State must contain characters only")
      .required("State is required"),
    state: yup
      .object({
        value: yup
          .number()
          .typeError("State must contain numbers only")
          .required("State is required")
          .test("notZero", "State is required", (value) => !(value === 0)),
        label: yup
          .string()
          .typeError("State must contain characters only")
          .required("State is required"),
      })
      .required("State is required"),
  })
  .required();

export default function CityForm({
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
  } = useCityQuery(
    drawer.type === "Edit" ? drawer.id : 0,
    drawer.type === "Edit" && drawer.status && drawer.id > 0
  );

  const axios = useAxios();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    values:
      drawer.type === "Edit"
        ? {
            name: data ? data.name : "",
            special_name: data && data.special_name ? data.special_name : undefined,
            state_id: data ? data.state.id : 0,
            state: data
              ? { value: data.state.id, label: data.state.name }
              : { value: 0, label: "" },
          }
        : {
            name: "",
            special_name: undefined,
            state_id: 0,
            state: { value: 0, label: "" },
          },
  });

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await axios.post(
        drawer.type === "Edit"
          ? api_routes.admin.city.update(drawer.id)
          : api_routes.admin.city.create,
        getValues()
      );
      toastSuccess("Saved Successfully");
      if (drawer.type === "Create") {
        reset({
          name: "",
          special_name: undefined,
          state_id: 0,
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
    <Drawer title="District" drawer={drawer} drawerHandler={drawerHandler}>
      <ErrorBoundaryLayout
        loading={isFetching || isLoading || isRefetching}
        error={error}
        refetch={refetchData}
      >
        <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
          <TextInput
            name="name"
            label="Name"
            focus={true}
            control={control}
            error={errors.name?.message}
          />
          <TextInput
            name="special_name"
            label="Special Name"
            control={control}
            error={errors.special_name?.message}
          />
          <Row className="show-grid mb-1">
            <Col xs={24}>
              <Form.ControlLabel>State</Form.ControlLabel>
              <Controller
                name={"state"}
                control={control}
                render={({ field }) => (
                  <>
                    <StateSelect
                      value={field.value}
                      setValue={(value) => {
                        field.onChange({
                          value: value.value,
                          label: value.label,
                        });
                        setValue("state_id", value.value);
                      }}
                    />
                  </>
                )}
              />
              <Form.ErrorMessage
                show={!!errors.state?.value?.message || !!errors.state_id?.message}
                placement="bottomStart"
              >
                {errors.state?.value?.message || errors.state_id?.message}
              </Form.ErrorMessage>
            </Col>
          </Row>
          <Form.Group>
            <ButtonToolbar
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <Button
                appearance="primary"
                active
                size="lg"
                type="submit"
                loading={loading}
                disabled={loading}
              >
                Save
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </ErrorBoundaryLayout>
    </Drawer>
  );
}
