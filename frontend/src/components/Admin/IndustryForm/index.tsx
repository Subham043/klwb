import { Button, Col, Form, Grid, Modal, Row } from "rsuite";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { AxiosErrorResponseType, DrawerProps } from "../../../utils/types";
import { isAxiosError } from "axios";
import { useIndustryQuery } from "../../../hooks/data/industry";
import { useAxios } from "../../../hooks/useAxios";
import TextInput from "../../FormInput/TextInput";
import SelectInput from "../../FormInput/SelectInput";
import { api_routes } from "../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import { company_act, Contract_Labour_Act, Factory_Act, Shops_and_Commercial_Act, Society_Registration_Act } from "../../../utils/constants/company_act";

type SchemaType = {
  name: string;
  act?: string;
  category?: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup
      .string()
      .typeError("Industry Name must contain characters only")
      .required("Name is required"),
    act: yup
      .string()
      .typeError("Act must contain characters only")
      .optional(),
    category: yup
      .string()
      .typeError("Category must contain characters only")
      .optional(),
  })
  .required();

export default function IndustryForm({
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
  } = useIndustryQuery(
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
    setValue,
    watch,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    values:
      drawer.type === "Edit"
        ? {
            name: data ? data.name : "",
            act: data && data.act ? data.act.toString() : undefined,
            category: data && data.category ? data.category : undefined,
          }
        : {
            name: "",
            act: undefined,
            category: undefined,
          },
  });

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
        drawer.type === "Edit"
          ? api_routes.admin.industry.update(drawer.id)
          : api_routes.admin.industry.create,
        {
          name: getValues("name"),
          act: getValues("act") ? getValues("act") : null,
          category: getValues("category") ? getValues("category") : null,
        }
      );
      toastSuccess("Saved Successfully");
      if (drawer.type === "Create") {
        reset({
          name: "",
          act: "",
          category: "",
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
      size={"sm"}
      open={drawer.status}
      onClose={() => drawerHandler({ status: false, type: "Create" })}
      className="info-modal"
    >
      <ErrorBoundaryLayout
        loading={isFetching || isLoading || isRefetching}
        error={error}
        refetch={refetchData}
      >
        <ModalCardContainer header={drawer.type === "Edit" ? "Update Industry" : " Add Industry"}>
          <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
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
                <Col className="pb-1" md={12} sm={24} xs={24}>
                  <SelectInput
                    name="act"
                    label="Act"
                    data={company_act}
                    control={control}
                    error={errors.act?.message}
                    resetHandler={() => setValue("category", "")}
                  />
                </Col>
                <Col className="pb-1" md={12} sm={24} xs={24}>
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
