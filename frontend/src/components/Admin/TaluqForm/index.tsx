import { Button, ButtonToolbar, Col, Form, Row } from "rsuite";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../../Drawer";
import { useTaluqQuery } from "../../../hooks/data/taluq";
import { useAxios } from "../../../hooks/useAxios";
import TextInput from "../../FormInput/TextInput";
import { api_routes } from "../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import DistrictSelect from "../../DistrictSelect";

type SchemaType = {
  name: string;
  city_id: number;
  city: { value: number; label: string };
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup
      .string()
      .typeError("Name must contain characters only")
      .required("Name is required"),
    city_id: yup
      .number()
      .typeError("City must contain characters only")
      .required("City is required"),
    city: yup
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
  })
  .required();

export default function TaluqForm({
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
  } = useTaluqQuery(
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
            city_id: data ? data.city.id : 0,
            city: data
              ? { value: data.city.id, label: data.city.name }
              : { value: 0, label: "" },
          }
        : {
            name: "",
            city_id: 0,
            city: { value: 0, label: "" },
          },
  });

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await axios.post(
        drawer.type === "Edit"
          ? api_routes.admin.taluq.update(drawer.id)
          : api_routes.admin.taluq.create,
        getValues()
      );
      toastSuccess("Saved Successfully");
      if (drawer.type === "Create") {
        reset({
          name: "",
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
    <Drawer title="Taluq" drawer={drawer} drawerHandler={drawerHandler}>
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
          <Row className="show-grid mb-1">
            <Col xs={24}>
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
                      }}
                    />
                  </>
                )}
              />
              <Form.ErrorMessage
                show={!!errors.city?.value?.message || !!errors.city_id?.message}
                placement="bottomStart"
              >
                {errors.city?.value?.message || errors.city_id?.message}
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
