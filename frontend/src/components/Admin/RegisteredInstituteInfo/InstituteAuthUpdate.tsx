import { Button, Col, Form, Grid, Modal, Row } from "rsuite";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { isAxiosError } from "axios";
import { useAxios } from "../../../hooks/useAxios";
import TextInput from "../../FormInput/TextInput";
import ToggleInput from "../../FormInput/ToggleInput";
import { api_routes } from "../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import {
  AxiosErrorResponseType,
  RegisteredInstituteType,
} from "../../../utils/types";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

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
  phone: number;
  is_blocked: number;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup
      .string()
      .typeError("Name must contain characters only")
      .required("Name is required"),
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
    is_blocked: yup
      .number()
      .typeError("Active/Blocked must contain numbers only")
      .min(0)
      .max(1)
      .required("Active/Blocked is required"),
  })
  .required();

const InstituteAuthUpdate = ({
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
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    values: {
      name: data ? data.profile.name : "",
      email: data ? data.profile.email : "",
      phone: data ? Number(data.profile.phone) : 0,
      is_blocked: data ? (!data.profile.is_blocked ? 1 : 0) : 0,
    },
  });

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      const { is_blocked, ...rest } = getValues();
      await axios.post(
        api_routes.admin.registered_institute.update_auth(data!.id),
        { ...rest, is_blocked: is_blocked === 1 ? 0 : 1 }
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
            <ModalCardContainer
              header="Institute Credential Update"
            >
              <Grid fluid>
                <Row gutter={30}>
                  <Col className="pb-1" xs={8}>
                    <TextInput
                      name="name"
                      label="Name"
                      control={control}
                      error={errors.name?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={8}>
                    <TextInput
                      name="email"
                      type="email"
                      label="Email"
                      control={control}
                      error={errors.email?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={8}>
                    <TextInput
                      name="phone"
                      label="Phone"
                      control={control}
                      error={errors.phone?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={24}>
                    <ToggleInput
                      name="is_blocked"
                      checkedLabel="Active"
                      uncheckedLabel="Blocked"
                      control={control}
                      error={errors.is_blocked?.message}
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

export default InstituteAuthUpdate;
