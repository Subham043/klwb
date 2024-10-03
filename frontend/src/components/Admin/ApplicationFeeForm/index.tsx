import { Button, ButtonToolbar, Col, Form, Row } from "rsuite";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../../Drawer";
import { useApplicationFeeQuery } from "../../../hooks/data/application_fee";
import { useAxios } from "../../../hooks/useAxios";
import TextInput from "../../FormInput/TextInput";
import { api_routes } from "../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import moment from "moment";
import GraduationSelect from "../../GraduationSelect";

type SchemaType = {
  amount: number;
  graduation_id: number;
  graduation: { value: number; label: string };
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    amount: yup
      .number()
      .typeError("Amount must contain numbers only")
      .positive("Amount must contain positive numbers only")
      .required("Amount is required"),
    graduation_id: yup
      .number()
      .typeError("Graduation must contain numbers only")
      .required("Graduation is required")
      .test("notZero", "Graduation is required", (value) => !(value === 0)),
    graduation: yup
      .object({
        value: yup
          .number()
          .typeError("Graduation must contain numbers only")
          .required("Graduation is required")
          .test("notZero", "Graduation is required", (value) => !(value === 0)),
        label: yup
          .string()
          .typeError("Graduation must contain characters only")
          .required("Graduation is required"),
      })
      .required("Graduation is required"),
  })
  .required();

export default function ApplicationFeeForm({
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
  } = useApplicationFeeQuery(
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
            amount: data ? data.amount : 0,
            graduation_id: data ? data.graduation.id : 0,
            graduation: data
              ? { value: data.graduation.id, label: data.graduation.name }
              : { value: 0, label: "" },
          }
        : {
            amount: 0,
            graduation_id: 0,
            graduation: { value: 0, label: "" },
          },
  });

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await axios.post(
        drawer.type === "Edit"
          ? api_routes.admin.application_fee.update(drawer.id)
          : api_routes.admin.application_fee.create,
        getValues()
      );
      toastSuccess("Saved Successfully");
      if (drawer.type === "Create") {
        reset({
          amount: 0,
          graduation_id: 0,
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
    <Drawer
      title={
        drawer.type === "Edit"
          ? "Amount"
          : "Amount for the year " + moment().format("YYYY")
      }
      drawer={drawer}
      drawerHandler={drawerHandler}
    >
      <ErrorBoundaryLayout
        loading={isFetching || isLoading || isRefetching}
        error={error}
        refetch={refetchData}
      >
        <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
          <TextInput
            name="amount"
            label="Amount"
            type="number"
            focus={true}
            control={control}
            error={errors.amount?.message}
          />
          <Row className="show-grid mb-1">
            <Col xs={24}>
              <Form.ControlLabel>Graduation</Form.ControlLabel>
              <Controller
                name={"graduation"}
                control={control}
                render={({ field }) => (
                  <>
                    <GraduationSelect
                      value={field.value}
                      setValue={(value) => {
                        field.onChange({
                          value: value.value,
                          label: value.label,
                        });
                        setValue("graduation_id", value.value);
                      }}
                    />
                  </>
                )}
              />
              <Form.ErrorMessage
                show={
                  !!errors.graduation?.value?.message ||
                  !!errors.graduation_id?.message
                }
                placement="bottomStart"
              >
                {errors.graduation?.value?.message ||
                  errors.graduation_id?.message}
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
