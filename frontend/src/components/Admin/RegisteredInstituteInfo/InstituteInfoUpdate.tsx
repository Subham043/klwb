import { Button, Col, Form, Grid, Modal, Row } from "rsuite";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { isAxiosError } from "axios";
import { useTaluqSelectQuery } from "../../../hooks/data/taluq";
import { useAxios } from "../../../hooks/useAxios";
import TextInput from "../../FormInput/TextInput";
import ToggleInput from "../../FormInput/ToggleInput";
import SelectInput from "../../FormInput/SelectInput";
import { useCitySelectQuery } from "../../../hooks/data/city";
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
  principal: string;
  phone: number;
  management_type: string;
  category: string;
  type: string;
  urban_rural: string;
  pincode: string;
  address: string;
  is_active: number;
  city_id: number;
  taluq_id: number;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup
      .string()
      .typeError("Institute Name must contain characters only")
      .required("Institute Name is required"),
    principal: yup
      .string()
      .typeError("Principal Name must contain characters only")
      .required("Principal Name is required"),
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
    management_type: yup
      .string()
      .typeError("Management Type must contain characters only")
      .required("Management Type is required"),
    category: yup
      .string()
      .typeError("Institute Category must contain characters only")
      .required("Category is required"),
    type: yup
      .string()
      .typeError("Institute Type must contain characters only")
      .required("Type is required"),
    urban_rural: yup
      .string()
      .typeError("Urban/Rural must contain characters only")
      .required("Urban/Rural is required"),
    city_id: yup
      .number()
      .typeError("District must contain numbers only")
      .required("District is required")
      .test("notZero", "District is required", (value) => !(value === 0)),
    taluq_id: yup
      .number()
      .typeError("Taluq must contain numbers only")
      .required("Taluq is required")
      .test("notZero", "Taluq is required", (value) => !(value === 0)),
    pincode: yup
      .string()
      .typeError("Pincode must contain characters only")
      .required("Pincode is required"),
    address: yup
      .string()
      .typeError("Address must contain characters only")
      .required("Address is required"),
    is_active: yup
      .number()
      .typeError("Active/Inactive must contain numbers only")
      .min(0)
      .max(1)
      .required("Active/Inactive is required"),
  })
  .required();

const InstituteInfoUpdate = ({
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
    watch,
    setValue,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    values: {
      name: data ? data.institute.name : "",
      principal: data ? data.principal : "",
      email: data ? data.email : "",
      phone: data ? Number(data.phone) : 0,
      pincode: data ? data.address.pincode : "",
      address: data ? data.address.address : "",
      management_type: data ? data.institute.management_type : "",
      category: data ? data.institute.category : "",
      type: data ? data.institute.type : "",
      urban_rural: data ? data.institute.urban_rural : "",
      taluq_id: data ? data.address.taluq.id : 0,
      city_id: data ? data.address.city.id : 0,
      is_active: data ? (!data.profile.is_blocked ? 1 : 0) : 0,
    },
  });

  const city_id = watch("city_id");

  const {
    data: cities,
    isFetching: isCityFetching,
    isLoading: isCityLoading,
  } = useCitySelectQuery(modal);
  const {
    data: taluqs,
    isFetching: isTaluqFetching,
    isLoading: isTaluqLoading,
  } = useTaluqSelectQuery(
    modal && city_id !== 0,
    city_id === 0 ? undefined : city_id
  );

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      await axios.post(
        api_routes.admin.registered_institute.update(data!.id),
        getValues()
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
              header="Institute Information Update"
            >
              <Grid fluid>
                <Row gutter={30}>
                  <Col className="pb-1" xs={12}>
                    <TextInput
                      name="name"
                      label="Institute Name"
                      control={control}
                      error={errors.name?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={12}>
                    <TextInput
                      name="principal"
                      label="Principal Name"
                      control={control}
                      error={errors.principal?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={12}>
                    <TextInput
                      name="email"
                      type="email"
                      label="Email"
                      control={control}
                      error={errors.email?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={12}>
                    <TextInput
                      name="phone"
                      label="Phone"
                      control={control}
                      error={errors.phone?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={12}>
                    <TextInput
                      name="management_type"
                      label="Management Type"
                      control={control}
                      error={errors.management_type?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={12}>
                    <TextInput
                      name="category"
                      label="Institute Category"
                      control={control}
                      error={errors.category?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={12}>
                    <TextInput
                      name="type"
                      label="Institute Type"
                      control={control}
                      error={errors.type?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={12}>
                    <SelectInput
                      name="urban_rural"
                      label="Urban/Rural"
                      data={[
                        { label: "Urban", value: "Urban" },
                        { label: "Rural", value: "Rural" },
                      ]}
                      control={control}
                      error={errors.urban_rural?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={8}>
                    <TextInput
                      name="pincode"
                      label="Pincode"
                      control={control}
                      error={errors.pincode?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={8}>
                    <SelectInput
                      name="city_id"
                      label="District"
                      resetHandler={() => {
                        setValue("taluq_id", 0);
                      }}
                      data={
                        cities
                          ? cities.map((item) => ({
                              label: item.name,
                              value: item.id,
                            }))
                          : []
                      }
                      loading={isCityFetching || isCityLoading}
                      control={control}
                      error={errors.city_id?.message}
                    />
                  </Col>
                  <Col className="pb-1" xs={8}>
                    <SelectInput
                      name="taluq_id"
                      label="Taluq"
                      data={
                        taluqs
                          ? taluqs.map((item) => ({
                              label: item.name,
                              value: item.id,
                            }))
                          : []
                      }
                      disabled={city_id === 0}
                      loading={isTaluqFetching || isTaluqLoading}
                      control={control}
                      error={errors.taluq_id?.message}
                    />
                  </Col>
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
                  <Col className="pb-1" xs={24}>
                    <ToggleInput
                      name="is_active"
                      checkedLabel="Active"
                      uncheckedLabel="Inactive"
                      control={control}
                      error={errors.is_active?.message}
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

export default InstituteInfoUpdate;
