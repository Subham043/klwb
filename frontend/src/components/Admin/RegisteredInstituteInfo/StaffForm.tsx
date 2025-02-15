import { Button, Col, Form, Grid, Modal, Row } from "rsuite";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { isAxiosError } from "axios";
import { useAxios } from "../../../hooks/useAxios";
import TextInput from "../../FormInput/TextInput";
import { api_routes } from "../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import {
  AxiosErrorResponseType,
  InstituteAuthType,
} from "../../../utils/types";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

type Props = {
  modal: {
			status: false
		} | {
			status: true
			data: InstituteAuthType | undefined;
		};
  closeModal: () => void;
  refetch?: () => void;
		id: number
};

type SchemaType = {
  name: string;
  email: string;
  phone: number;
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
  })
  .required();

const StaffForm = ({
  modal,
  closeModal,
		refetch,
		id
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
      name: modal.status && modal.data ? modal.data.name : "",
      email: modal.status && modal.data ? modal.data.email : "",
      phone: modal.status && modal.data ? Number(modal.data.phone) : 0,
    },
  });

  const onSubmit = handleSubmit(async () => {
			if(!modal.status) return;
    setLoading(true);
    try {
      const { ...rest } = getValues();
      await axios.post(
        api_routes.admin.registered_institute.staff.account(id, modal.data!.id),
        { ...rest }
      );
      toastSuccess("Saved Successfully");
      closeModal();
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
      open={modal.status}
      className="info-modal"
    >
      <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
        <ErrorBoundaryLayout>
          <>
            <ModalCardContainer header="Staff Credential Update">
              <Grid fluid>
                <Row gutter={30}>
                  <Col className="pb-1" md={8} sm={24} xs={24}>
                    <TextInput
                      name="name"
                      label="Name"
                      control={control}
                      error={errors.name?.message}
                    />
                  </Col>
                  <Col className="pb-1" md={8} sm={24} xs={24}>
                    <TextInput
                      name="email"
                      type="email"
                      label="Email"
                      control={control}
                      error={errors.email?.message}
                    />
                  </Col>
                  <Col className="pb-1" md={8} sm={24} xs={24}>
                    <TextInput
                      name="phone"
                      label="Phone"
                      control={control}
                      error={errors.phone?.message}
                    />
                  </Col>
                </Row>
              </Grid>
            </ModalCardContainer>
          </>
          {modal.status && modal.data !== undefined && (
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
                onClick={closeModal}
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

export default StaffForm;
