import { Button, ButtonToolbar, Form, IconButton, Modal, Tooltip, Whisper } from "rsuite";
import { useState } from "react";
import ModalCardContainer from "../MainCards/ModalCardContainer";
import { useToast } from "../../hooks/useToast";
import { useAxios } from "../../hooks/useAxios";
import PasswordInput from "../FormInput/PasswordInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../utils/types";
import ViewsAuthorizeIcon from '@rsuite/icons/ViewsAuthorize';

type SchemaType = {
  password: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    password: yup
      .string()
      .typeError("Password must contain characters only")
      .required("Password is required"),
  })
  .required();

type VerifyBtnProps = {
  isVerified: boolean;
  route: string;
  refetch?: () => void;
};

export default function VerifyBtn({ refetch, route, isVerified }: VerifyBtnProps) {
  const [open, setOpen] = useState(false);
  const { toastError, toastSuccess } = useToast();
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
  const axios = useAxios();

  const {
    control,
    getValues,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SchemaType>({ resolver: yupResolver(schema) });

  const onVerifyHandler = handleSubmit(async () => {
    setVerifyLoading(true);
    try {
      const response = await axios.post<{ message: string }>(route, {
        password: getValues().password,
      });
      toastSuccess(response.data.message);
      setOpen(false);
      reset({
        password: "",
      });
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
      setVerifyLoading(false);
    }
  });

  if(isVerified) return null;

  return (
    <>
      <Whisper
        placement="bottomEnd"
        controlId="control-id-click"
        trigger="hover"
        speaker={<Tooltip>Verify</Tooltip>}
      >
        <IconButton
          appearance="primary"
          color="cyan"
          icon={<ViewsAuthorizeIcon />}
          loading={verifyLoading}
          onClick={() => setOpen(true)}
          size="sm"
        />
      </Whisper>
      <Modal
        size="xs"
        open={open}
        onClose={() => {
          setOpen(false);
          reset({
            password: "",
          });
        }}
        className="info-modal"
      >
        <ModalCardContainer
          header="Please enter password to complete verification"
        >
          <Form onSubmit={() => onVerifyHandler()} style={{ width: "100%" }}>
            <PasswordInput
              name="password"
              label="Password"
              control={control}
              error={errors.password?.message}
            />
            <ButtonToolbar>
              <Button
                type="submit"
                loading={verifyLoading}
                disabled={verifyLoading}
                appearance="primary"
              >
                {isVerified ? "Unverify" : "Verify"}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setOpen(false);
                  reset({
                    password: "",
                  });
                }}
                appearance="primary"
                color="red"
              >
                Cancel
              </Button>
            </ButtonToolbar>
          </Form>
        </ModalCardContainer>
      </Modal>
    </>
  );
}
