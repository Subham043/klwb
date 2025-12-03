import { Button, Form, Modal } from "rsuite";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import {
  AxiosErrorResponseType,
  ExcelUploadModalProps,
} from "../../../utils/types";
import { isAxiosError } from "axios";
import { useAxios } from "../../../hooks/useAxios";
import { api_routes } from "../../../utils/routes/api";
import { FileType } from "rsuite/esm/Uploader";
import FileInput from "../../FormInput/FileInput";
import ModalCardContainer from "../../MainCards/ModalCardContainer";

type SchemaType = {
  employee_excel?: FileType[] | undefined;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    employee_excel: yup
      .mixed<FileType[]>()
      .test("fileRequired", "Employee excel is required", (value) => {
        if (value === undefined || value.length === 0) return false;
        return true;
      })
      .test("fileFormat", "Please select a valid employee excel", (value) => {
        if (value === undefined || value.length === 0) {
          return false;
        } else {
          return [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ].includes(value[value.length - 1].blobFile!.type);
        }
      })
      .transform((value) =>
        value !== undefined &&
        value.length > 0 &&
        value[value.length - 1].blobFile instanceof File
          ? value
          : undefined
      )
      .required("Employee excel is required"),
  })
  .required();

export default function AttemptedContributionExcelUploadForm({
  modal,
  modalHandler,
  refetch,
}: {
  modal: ExcelUploadModalProps;
  modalHandler: (value: ExcelUploadModalProps) => void;
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
    values: {
      employee_excel: undefined,
    },
  });

  const handleCloseModal = () => {
    modalHandler({ status: false });
    reset({
      employee_excel: undefined,
    });
  };

  const onSubmit = handleSubmit(async () => {
    if (modal.status === false) return;
    setLoading(true);
    try {
      const formData = new FormData();
      if (
        getValues().employee_excel &&
        getValues().employee_excel !== undefined &&
        getValues().employee_excel!.length > 0 &&
        getValues().employee_excel![getValues().employee_excel!.length - 1 || 0]
          .blobFile
      ) {
        formData.append(
          "employee_excel",
          getValues().employee_excel![
            getValues().employee_excel!.length - 1 || 0
          ].blobFile!
        );
      }
      await axios.post(
        api_routes.admin.attempted_contribution.excel_upload(modal.id),
        formData
      );
      toastSuccess("Excel uploaded Successfully");
      handleCloseModal();
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
      open={modal.status}
      onClose={() => handleCloseModal()}
      className="info-modal"
    >
      <ModalCardContainer header={"Upload Employee Excel"}>
        <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
          <FileInput
            name="employee_excel"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            label="Attach Your Employee Detail Excel Sheet"
            helpText={
              <span>
                Only XLSX files are allowed. Please{" "}
                <a href="/employee_excel_format.xlsx" download={true}>
                  click here
                </a>{" "}
                to download the excel template.
              </span>
            }
            control={control}
            error={errors.employee_excel?.message}
          />
          <Modal.Footer className="info-modal-footer">
            <Button
              appearance="primary"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Upload
            </Button>
            <Button
              type="button"
              onClick={() => handleCloseModal()}
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
