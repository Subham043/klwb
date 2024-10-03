import { Button, ButtonToolbar, Col, Form, Row } from "rsuite";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../../utils/types";
import { isAxiosError } from "axios";
import Drawer from "../../Drawer";
import { useClassQuery } from "../../../hooks/data/class";
import { useAxios } from "../../../hooks/useAxios";
import TextInput from "../../FormInput/TextInput";
import { api_routes } from "../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import CourseSelect from "../../CourseSelect";

type SchemaType = {
  name: string;
  course_id: number;
  course: { value: number; label: string };
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup
      .string()
      .typeError("Name must contain characters only")
      .required("Name is required"),
    course_id: yup
      .number()
      .typeError("Course must contain numbers only")
      .required("Course is required")
      .test("notZero", "Course is required", (value) => !(value === 0)),
    course: yup
      .object({
        value: yup
          .number()
          .typeError("Course must contain numbers only")
          .required("Course is required")
          .test("notZero", "Course is required", (value) => !(value === 0)),
        label: yup
          .string()
          .typeError("Course must contain characters only")
          .required("Course is required"),
      })
      .required("Course is required"),
  })
  .required();

export default function ClassForm({
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
  } = useClassQuery(
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
            course_id: data ? data.course.id : 0,
            course: data
              ? { value: data.course.id, label: data.course.name }
              : { value: 0, label: "" },
          }
        : {
            name: "",
            course_id: 0,
            course: { value: 0, label: "" },
          },
  });

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await axios.post(
        drawer.type === "Edit"
          ? api_routes.admin.class.update(drawer.id)
          : api_routes.admin.class.create,
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
    <Drawer title="Class" drawer={drawer} drawerHandler={drawerHandler}>
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
              <Form.ControlLabel>Course</Form.ControlLabel>
              <Controller
                name={"course"}
                control={control}
                render={({ field }) => (
                  <>
                    <CourseSelect
                      value={field.value}
                      setValue={(value) => {
                        field.onChange({
                          value: value.value,
                          label: value.label,
                        });
                        setValue("course_id", value.value);
                      }}
                    />
                  </>
                )}
              />
              <Form.ErrorMessage
                show={
                  !!errors.course?.value?.message || !!errors.course_id?.message
                }
                placement="bottomStart"
              >
                {errors.course?.value?.message || errors.course_id?.message}
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
