import { Button, Col, Form, Grid, Modal, Row } from "rsuite";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAxiosError } from "axios";
import {
  AxiosErrorResponseType,
  RegisteredIndustryType,
} from "../../../../utils/types";
import { useToast } from "../../../../hooks/useToast";
import { useAxios } from "../../../../hooks/useAxios";
import { api_routes } from "../../../../utils/routes/api";
import ErrorBoundaryLayout from "../../../../layouts/ErrorBoundaryLayout";
import TextInput from "../../../FormInput/TextInput";
import SelectInput from "../../../FormInput/SelectInput";
import ModalCardContainer from "../../../MainCards/ModalCardContainer";
import { company_act, Contract_Labour_Act, Factory_Act, Shops_and_Commercial_Act, Society_Registration_Act } from "../../../../utils/constants/company_act";

type Props = {
  modal: boolean;
  setModal: (value: boolean) => void;
  loading?: boolean;
  error?: unknown;
  refetch?: () => void;
  data: RegisteredIndustryType | undefined;
};

type SchemaType = {
  gst_no: string;
  pan_no: string;
  address: string;
  pincode: string;
  act: string;
  category: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    gst_no: yup
      .string()
      .typeError("GST No. must contain characters only")
      .required("GST No. is required"),
    pan_no: yup
      .string()
      .typeError("PAN No. must contain characters only")
      .required("PAN No. is required"),
    address: yup
      .string()
      .typeError("Address must contain characters only")
      .required("Address is required"),
    pincode: yup
      .string()
      .typeError("Pincode must contain characters only")
      .required("Pincode is required"),
    act: yup
      .string()
      .typeError("Act must contain characters only")
      .required("Act is required"),
    category: yup
              .string()
              .typeError("Category must contain characters only")
              .required("Category is required"),
  })
  .required();

const AccountInfoUpdate = ({
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
    setValue,
    watch,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    values: {
      gst_no: data ? data.gst_no : "",
      pincode: data ? data.industry.pincode : "",
      pan_no: data ? data.pan_no : "",
      address: data ? data.address : "",
      act: data && data.industry.act ? data.industry.act.toString() : "",
      category: data && data.industry.category ? data.industry.category : "",
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
      await axios.post(api_routes.industry.account.info_update, getValues());
      toastSuccess("Updated Successfully");
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
            <ModalCardContainer header="Industry Information Update">
              <Grid fluid>
                <Row gutter={30}>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <TextInput
                      name="gst_no"
                      label="GST No."
                      control={control}
                      error={errors.gst_no?.message}
                    />
                  </Col>
                  <Col className="pb-1" md={12} sm={24} xs={24}>
                    <TextInput
                      name="pan_no"
                      label="PAN No."
                      control={control}
                      error={errors.pan_no?.message}
                    />
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col className="pb-1" md={8} sm={24} xs={24}>
                    <SelectInput
                      name="act"
                      label="Act"
                      data={company_act}
                      control={control}
                      error={errors.act?.message}
                      resetHandler={() => setValue("category", "")}
                    />
                  </Col>
                  <Col className="pb-1" md={8} sm={24} xs={24}>
                    <SelectInput
                      name="category"
                      label="Category"
                      virtualized={false}
                      data={categories}
                      control={control}
                      error={errors.category?.message}
                    />
                  </Col>
                  <Col className="pb-1" md={8} sm={24} xs={24}>
                    <TextInput
                      name="pincode"
                      label="Pincode"
                      control={control}
                      error={errors.pincode?.message}
                    />
                  </Col>
                </Row>
                <Row gutter={30}>
                  <Col className="pb-1" xs={24}>
                    <TextInput
                      name="address"
                      label="Address"
                      helpText="Do not use any special characters"
                      textarea={true}
                      control={control}
                      error={errors.address?.message}
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

export default AccountInfoUpdate;
