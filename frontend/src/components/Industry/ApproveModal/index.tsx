import { Button, Form, Modal } from "rsuite";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAxiosError } from "axios";
import { useAxios } from "../../../hooks/useAxios";
import { useToast } from "../../../hooks/useToast";
import { api_routes } from "../../../utils/routes/api";
import { AxiosErrorResponseType } from "../../../utils/types";
import TextInput from "../../FormInput/TextInput";
import SelectInput from "../../FormInput/SelectInput";
import DateInput from "../../FormInput/DateInput";
import moment from "moment";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

type SchemaType = {
  mode_industry: string;
  reference_industry?: string;
  dd_industry?: string;
  amount_industry?: string;
  date_offline_industry?: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    mode_industry: yup
      .string()
      .typeError("Is Mode Online must contain characters only")
      .required("Is Mode Online is required"),
    reference_industry: yup
      .string()
      .typeError("Reference Number must contain characters only")
      .matches(/^KLWB-\d{8}\d*$/ , 'Please enter a valid reference number in the format "KLWB-YYYYMMDDXXXXX"')
      .when("mode_industry", {
        is: "1",
        then: (schema) =>
          schema.required("Reference Number is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    dd_industry: yup
      .string()
      .typeError("Cheque/DD Number must contain characters only")
      .when("mode_industry", {
        is: "0",
        then: (schema) => schema.required("Cheque/DD Number is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    amount_industry: yup
      .string()
      .typeError("Amount must contain characters only")
      .when("mode_industry", {
        is: "0",
        then: (schema) => schema.required("Amount is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    date_offline_industry: yup
      .string()
      .typeError("Date must contain characters only")
      .when("mode_industry", {
        is: "0",
        then: (schema) => schema.required("Date is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
  })
  .required();

export default function IndustryScholarshipApproveForm({
  modal,
  setModal,
  id,
  refetch,
}: {
  modal: boolean;
  id: number;
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
    watch,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    values: {
      mode_industry: "1",
      reference_industry: undefined,
      dd_industry: undefined,
      amount_industry: undefined,
      date_offline_industry: moment().format("YYYY-MM-DD"),
    },
  });

  const watchModeIndustry = watch("mode_industry");

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await axios.post(
        api_routes.industry.scholarship.approve(id),
        getValues().mode_industry === "1"
          ? {
              mode_industry: getValues().mode_industry,
              reference_industry: getValues().reference_industry,
            }
          : {
              mode_industry: getValues().mode_industry,
              dd_industry: getValues().dd_industry,
              amount_industry: getValues().amount_industry,
              date_offline_industry: getValues().date_offline_industry,
            }
      );
      toastSuccess("Approveed Successfully");
      reset({
        mode_industry: "1",
        reference_industry: undefined,
        dd_industry: undefined,
        amount_industry: undefined,
        date_offline_industry: moment().format("YYYY-MM-DD"),
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
      <ModalCardContainer header={"Contribution Mode"}>
        <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
          <SelectInput
            name="mode_industry"
            label="Is Mode Online?"
            data={[
              { label: "Yes", value: "1" },
              { label: "No", value: "0" },
            ]}
            control={control}
            error={errors.mode_industry?.message}
          />
          {watchModeIndustry === "1" ? (
            <TextInput
              name="reference_industry"
              focus={true}
              label="Reference Number"
              helpText="Reference number is the KLWB payment transaction ID which starts with 'KLWB-' and contains 14 digits. Example: KLWB-20202110102059"
              control={control}
              error={errors.reference_industry?.message}
            />
          ) : (
            <>
              <TextInput
                name="dd_industry"
                focus={true}
                label="Cheque/DD Number"
                control={control}
                error={errors.dd_industry?.message}
              />
              <TextInput
                name="amount_industry"
                label="Amount"
                control={control}
                error={errors.amount_industry?.message}
              />
              <DateInput
                name="date_offline_industry"
                label="Paid On"
                control={control}
                error={errors.date_offline_industry?.message}
              />
            </>
          )}
          <Modal.Footer className="info-modal-footer">
            <Button
              appearance="primary"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Approve
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
