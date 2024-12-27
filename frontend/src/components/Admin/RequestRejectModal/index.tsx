import { Button, Form, Modal } from "rsuite";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAxiosError } from "axios";
import { useAxios } from "../../../hooks/useAxios";
import { useToast } from "../../../hooks/useToast";
import { AxiosErrorResponseType } from "../../../utils/types";
import TextInput from "../../FormInput/TextInput";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

type SchemaType = {
  reason: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    reason: yup
      .string()
      .typeError("Reason must contain characters only")
      .required("Reason is required"),
  })
  .required();

export default function RequestRejectForm({
  modal,
  setModal,
  link,
  refetch,
}: {
  modal: boolean;
  link: string;
  setModal: (value: boolean) => void;
  refetch: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { toastError, toastSuccess } = useToast();
  const axios = useAxios();

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await axios.post(
        link,
        getValues()
      );
      toastSuccess("Rejected Successfully");
      reset({
        reason: "",
      });
      setModal(false);
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
      open={modal}
      onClose={() => setModal(false)}
      className="info-modal"
    >
      <ModalCardContainer header={"Reason for Rejection"}>
        <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
          <TextInput
            name="reason"
            textarea={true}
            focus={true}
            label="Reason"
            helpText="Eg.Document is missing"
            control={control}
            error={errors.reason?.message}
          />
          <Modal.Footer className="info-modal-footer">
            <Button
              appearance="primary"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Reject
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
        </Form>
      </ModalCardContainer>
    </Modal>
  );
}
