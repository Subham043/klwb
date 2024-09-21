import {
  Button,
  ButtonToolbar,
  Form,
  IconButton,
  Modal,
  Tooltip,
  Whisper,
} from "rsuite";
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
import ShieldIcon from '@rsuite/icons/Shield';

type SchemaType = {
  password: string;
  password_confirmation: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    password: yup
      .string()
      .typeError("Password must contain characters only")
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .typeError("Confirm Password must contain characters only")
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

type BlockBtnProps = {
  route: string;
};

export default function PasswordBtn({ route }: BlockBtnProps) {
  const [open, setOpen] = useState(false);
  const { toastError, toastSuccess } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const axios = useAxios();

  const {
    control,
    getValues,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SchemaType>({ resolver: yupResolver(schema) });

  const onBlockHandler = handleSubmit(async () => {
    setLoading(true);
    try {
      const response = await axios.post<{ message: string }>(
        route,
        getValues()
      );
      toastSuccess(response.data.message);
      setOpen(false);
      reset({
        password: "",
        password_confirmation: "",
      });
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
    <>
      <Whisper
        placement="bottomEnd"
        controlId="control-id-click"
        trigger="hover"
        speaker={<Tooltip>Update Password</Tooltip>}
      >
        <IconButton
          appearance="primary"
          color="violet"
          icon={<ShieldIcon />}
          loading={loading}
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
        <ModalCardContainer header={"Update Password"}>
          <Form onSubmit={() => onBlockHandler()} style={{ width: "100%" }}>
            <PasswordInput
              name="password"
              label="Password"
              control={control}
              error={errors.password?.message}
            />
            <PasswordInput
              name="password_confirmation"
              label="Confirm Password"
              control={control}
              error={errors.password_confirmation?.message}
            />
            <ButtonToolbar>
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
