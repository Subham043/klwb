import classes from "./index.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../../utils/types";
import { useAxios } from "../../../hooks/useAxios";
import CaptchaInput from "../../../components/FormInput/CaptchaInput";
import TextInput from "../../../components/FormInput/TextInput";
import { Link } from "react-router-dom";
import { Button, ButtonToolbar, Col, Form, Row } from "rsuite";
import FileInput from "../../../components/FormInput/FileInput";
import { FileType } from "rsuite/esm/Uploader";
import { api_routes } from "../../../utils/routes/api";
import { page_routes } from "../../../utils/routes/pages";
import DistrictSelect from "../../../components/DistrictSelect";
import TaluqSelect from "../../../components/TaluqSelect";

type SchemaType = {
  email: string;
  company: string;
  mobile: number;
  address: string;
  city_id: number;
  taluq_id: number;
  register_doc?: FileType[] | undefined;
  captcha: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    company: yup
      .string()
      .typeError("Industry Name must contain characters only")
      .required("Industry Name is required"),
    email: yup
      .string()
      .typeError("Email must contain characters only")
      .email()
      .required("Email is required"),
    mobile: yup
      .number()
      .typeError("Mobile must contain numbers only")
      .positive()
      .required("Mobile is required"),
    address: yup
      .string()
      .typeError("Address must contain characters only")
      .required("Address is required"),
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
    captcha: yup
      .string()
      .typeError("Captcha must contain characters only")
      .required("Captcha is required"),
    register_doc: yup
      .mixed<FileType[]>()
      .test("fileRequired", "Document is required", (value) => {
        if (value === undefined || value.length === 0) return false;
        return true;
      })
      .test("fileFormat", "Please select a valid document file", (value) => {
        if (value === undefined || value.length === 0) {
          return false;
        } else {
          return ["image/jpeg", "image/jpg", "image/png"].includes(
            value[value.length - 1].blobFile!.type
          );
        }
      })
      .transform((value) =>
        value !== undefined &&
        value.length > 0 &&
        value[value.length - 1].blobFile instanceof File
          ? value
          : undefined
      )
      .required("Document is required"),
  })
  .required();

function IndustryRequestPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { toastError, toastSuccess } = useToast();
  const captchaRef = useRef<ReCAPTCHA>(null);
  const axios = useAxios();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setError,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SchemaType>({ resolver: yupResolver(schema) });

  const city_id = watch("city_id");

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("company", getValues().company);
      formData.append("email", getValues().email);
      formData.append("mobile", getValues().mobile.toString());
      formData.append("address", getValues().address);
      formData.append("city_id", getValues().city_id.toString());
      formData.append("taluq_id", getValues().taluq_id.toString());
      formData.append("captcha", getValues().captcha);
      formData.append(
        "register_doc",
        getValues().register_doc![getValues().register_doc!.length - 1 || 0]
          .blobFile!
      );
      await axios.post(api_routes.industry.auth.register.request, formData);
      toastSuccess("Industry Request sent successfully");
      reset({
        company: "",
        email: "",
        mobile: undefined,
        address: "",
        city_id: 0,
        taluq_id: 0,
        captcha: "",
        register_doc: undefined,
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
      captchaRef.current?.reset();
    }
  });

  return (
    <div className="row justify-center">
      <div className={classes.form_col}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>Request Industry</div>
          <div className={classes.formFields}>
            <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
              <Row className="show-grid mb-1">
                <Col md={12} sm={24} xs={24}>
                  <TextInput
                    name="email"
                    type="email"
                    focus={true}
                    label="Email"
                    control={control}
                    error={errors.email?.message}
                  />
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <TextInput
                    name="mobile"
                    label="Mobile"
                    control={control}
                    error={errors.mobile?.message}
                  />
                </Col>
              </Row>
              <Row className="show-grid mb-1">
                <Col md={12} sm={24} xs={24}>
                  <Form.ControlLabel>District</Form.ControlLabel>
                  <DistrictSelect
                    setValue={(value) => {
                      setValue("city_id", value.value);
                      setValue("taluq_id", 0);
                    }}
                  />
                  <Form.ErrorMessage
                    show={!!errors.city_id?.message}
                    placement="bottomStart"
                  >
                    {errors.city_id?.message}
                  </Form.ErrorMessage>
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <Form.ControlLabel>Taluq</Form.ControlLabel>
                  <TaluqSelect
                    setValue={(value) => {
                      setValue("taluq_id", value.value);
                    }}
                    city_id={city_id}
                    isDisabled={city_id === 0 || city_id === undefined}
                  />
                  <Form.ErrorMessage
                    show={!!errors.taluq_id?.message}
                    placement="bottomStart"
                  >
                    {errors.taluq_id?.message}
                  </Form.ErrorMessage>
                </Col>
              </Row>
              <TextInput
                name="company"
                label="Industry Name"
                control={control}
                error={errors.company?.message}
              />
              <TextInput
                name="address"
                label="Address"
                helpText="Do not use any special characters"
                textarea={true}
                control={control}
                error={errors.address?.message}
              />
              <FileInput
                name="register_doc"
                accept="image/png, image/jpeg, image/jpg"
                label="Upload Industry Reg. Document"
                helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)"
                control={control}
                error={errors.register_doc?.message}
              />
              <CaptchaInput
                control={control}
                error={errors.captcha?.message}
                ref={captchaRef}
              />
              <Form.Group>
                <ButtonToolbar
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Button
                    appearance="primary"
                    size="lg"
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Submit
                  </Button>
                  <Link
                    to={page_routes.industry.auth.register}
                    style={{ marginLeft: "10px" }}
                  >
                    <Button appearance="link" type="button">
                      Industry Already Exist?
                    </Button>
                  </Link>
                </ButtonToolbar>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndustryRequestPage;
