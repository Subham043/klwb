import { Button, Divider, Form, Message, Stack } from "rsuite";
import PanelCardContainer from "../../../components/MainCards/PanelCardContainer";
import ModalCardContainer from "../../../components/MainCards/ModalCardContainer";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAxiosError } from "axios";
import { useToast } from "../../../hooks/useToast";
import { useAxios } from "../../../hooks/useAxios";
import TextInput from "../../../components/FormInput/TextInput";
import { api_routes } from "../../../utils/routes/api";
import { AxiosErrorResponseType } from "../../../utils/types";
import { useMediaQuery } from "rsuite/esm/useMediaQuery/useMediaQuery";

type SchemaType = {
  payment_id: string;
  amount: number;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    payment_id: yup
      .string()
      .typeError("Payment ID must contain characters only")
      .matches(
        /^KLWB-\d{8}\d*[A-Z0-9]*$/,
        'Please enter a valid payment ID in the format "KLWB-YYYYMMDDXXXXX"',
      )
      .required("Payment ID is required"),
    amount: yup
      .number()
      .typeError("Amount must contain numbers only")
      .required("Amount is required"),
  })
  .required();

function ContributionVerifyPayment() {
  const [loading, setLoading] = useState<boolean>(false);
  const { toastError, toastSuccess } = useToast();
  const axios = useAxios();
  const [result, setResult] = useState<string | undefined>();
  const [isMobile] = useMediaQuery("(max-width: 700px)");

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    defaultValues: {
      payment_id: "",
      amount: undefined,
    },
  });

  const onSubmit = handleSubmit(async (data: SchemaType) => {
    setResult(undefined);
    setLoading(true);
    try {
      const response = await axios.post<{ data: string; message: string }>(
        api_routes.admin.contribution.verify_payment,
        data,
      );
      setResult(response.data.data);
      toastSuccess(response.data.message);
    } catch (error) {
      if (isAxiosError<AxiosErrorResponseType>(error)) {
        if (error?.response?.data?.errors) {
          for (const [key, value] of Object.entries(
            error?.response?.data?.errors,
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
    <div className="data-table-container">
      <PanelCardContainer
        header={
          <Stack justifyContent="center">
            <div>
              <h1 className="brand-text-color">SBI Payment Information</h1>
            </div>
          </Stack>
        }
      >
        <Divider />
        <div className="mb-1">
          <ModalCardContainer
            header={
              <div className="text-center">
                <h5
                  style={{ color: "white", fontSize: "1rem", fontWeight: 600 }}
                >
                  Contribution Details
                </h5>
              </div>
            }
          >
            <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
              <Form.Group>
                <Stack
                  direction={isMobile ? "column" : "row"}
                  justifyContent="space-between"
                  alignItems="flex-end"
                  spacing={10}
                >
                  <Stack.Item grow={1}>
                    <TextInput
                      name="payment_id"
                      label="Payment ID"
                      focus={true}
                      control={control}
                      error={errors.payment_id?.message}
                    />
                  </Stack.Item>
                  <Stack.Item grow={1}>
                    <TextInput
                      name="amount"
                      label="Amount"
                      control={control}
                      error={errors.amount?.message}
                    />
                  </Stack.Item>
                  <Stack.Item style={{ width: "auto" }}>
                    <Button
                      appearance="primary"
                      type="submit"
                      loading={loading}
                      disabled={loading}
                      style={{ marginRight: "10px" }}
                    >
                      Verify
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        reset();
                        setResult(undefined);
                      }}
                      appearance="primary"
                      color="red"
                    >
                      Reset
                    </Button>
                  </Stack.Item>
                </Stack>
              </Form.Group>
            </Form>
          </ModalCardContainer>
        </div>
        {result && (
          <>
            <Message
              showIcon
              type="success"
              header="Payment Fetched Successfully"
            >
              <p>{result}</p>
            </Message>
          </>
        )}
      </PanelCardContainer>
    </div>
  );
}

export default ContributionVerifyPayment;
