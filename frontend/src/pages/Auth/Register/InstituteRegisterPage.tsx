import classes from "../InstituteRequestPage/index.module.css";
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
import PasswordInput from "../../../components/FormInput/PasswordInput";
import { api_routes } from "../../../utils/routes/api";
import { page_routes } from "../../../utils/routes/pages";
import DistrictSelect from "../../../components/DistrictSelect";
import TaluqSelect from "../../../components/TaluqSelect";
import InstituteSelect from "../../../components/InstituteSelect";

type SchemaType = {
  email: string;
  name: string;
  phone: number;
  password: string;
  confirm_password: string;
  pincode: string;
  address: string;
  city_id: number;
  taluq_id: number;
  reg_institute_id: number;
  reg_certification?: FileType[] | undefined;
  principal_signature?: FileType[] | undefined;
  seal?: FileType[] | undefined;
  captcha: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup
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
    password: yup
      .string()
      .typeError("Password must contain characters only")
      .required("Password is required"),
    confirm_password: yup
      .string()
      .typeError("Confirm Password must contain characters only")
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    pincode: yup
      .string()
      .typeError("Pincode must contain characters only")
      .required("Pincode is required"),
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
    reg_institute_id: yup
      .number()
      .typeError("Institute must contain numbers only")
      .required("Institute is required"),
    captcha: yup
      .string()
      .typeError("Captcha must contain characters only")
      .required("Captcha is required"),
    reg_certification: yup
      .mixed<FileType[]>()
      .test("fileRequired", "Institute Reg. File is required", (value) => {
        if (value === undefined || value.length === 0) return false;
        return true;
      })
      .test(
        "fileFormat",
        "Please select a valid institute registration file",
        (value) => {
          if (value === undefined || value.length === 0) {
            return false;
          } else {
            return ["image/jpeg", "image/jpg", "image/png"].includes(
              value[value.length - 1].blobFile!.type
            );
          }
        }
      )
      .transform((value) =>
        value !== undefined &&
        value.length > 0 &&
        value[value.length - 1].blobFile instanceof File
          ? value
          : undefined
      )
      .required("Institute Reg. File is required"),
    principal_signature: yup
      .mixed<FileType[]>()
      .test("fileRequired", "Principal Signature is required", (value) => {
        if (value === undefined || value.length === 0) return false;
        return true;
      })
      .test(
        "fileFormat",
        "Please select a valid principal signature",
        (value) => {
          if (value === undefined || value.length === 0) {
            return false;
          } else {
            return ["image/jpeg", "image/jpg", "image/png"].includes(
              value[value.length - 1].blobFile!.type
            );
          }
        }
      )
      .transform((value) =>
        value !== undefined &&
        value.length > 0 &&
        value[value.length - 1].blobFile instanceof File
          ? value
          : undefined
      )
      .required("Principal Signature is required"),
    seal: yup
      .mixed<FileType[]>()
      .test("fileRequired", "Seal is required", (value) => {
        if (value === undefined || value.length === 0) return false;
        return true;
      })
      .test("fileFormat", "Please select a valid seal", (value) => {
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
      .required("Seal is required"),
  })
  .required();

function InstituteRegisterPage() {
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
  const taluq_id = watch("taluq_id");

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", getValues().name);
      formData.append("email", getValues().email);
      formData.append("phone", getValues().phone.toString());
      formData.append("password", getValues().password.toString());
      formData.append(
        "confirm_password",
        getValues().confirm_password.toString()
      );
      formData.append("pincode", getValues().pincode);
      formData.append("address", getValues().address);
      formData.append("city_id", getValues().city_id.toString());
      formData.append("taluq_id", getValues().taluq_id.toString());
      formData.append(
        "reg_institute_id",
        getValues().reg_institute_id.toString()
      );
      formData.append("captcha", getValues().captcha);
      formData.append(
        "reg_certification",
        getValues().reg_certification![
          getValues().reg_certification!.length - 1 || 0
        ].blobFile!
      );
      formData.append(
        "principal_signature",
        getValues().principal_signature![
          getValues().principal_signature!.length - 1 || 0
        ].blobFile!
      );
      formData.append(
        "seal",
        getValues().seal![getValues().seal!.length - 1 || 0].blobFile!
      );
      await axios.post(api_routes.institute.auth.register.institute, formData);
      toastSuccess("Registration Successful");
      reset({
        name: "",
        email: "",
        phone: undefined,
        password: "",
        confirm_password: "",
        pincode: "",
        address: "",
        city_id: 0,
        taluq_id: 0,
        reg_institute_id: 0,
        captcha: "",
        reg_certification: undefined,
        principal_signature: undefined,
        seal: undefined,
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
          <div className={classes.formTitle}>Institute Registration</div>
          <div className={classes.formFields}>
            <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
              <Row className="show-grid mb-1">
                <Col md={12} sm={24} xs={24}>
                  <Form.ControlLabel>District</Form.ControlLabel>
                  <DistrictSelect
                    setValue={(value) => {
                      setValue("city_id", value.value);
                      setValue("taluq_id", 0);
                      setValue("reg_institute_id", 0);
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
                      setValue("reg_institute_id", 0);
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
              <Row className="show-grid mb-1">
                <Col xs={24}>
                  <Form.ControlLabel>Institute</Form.ControlLabel>
                  <InstituteSelect
                    setValue={(value) => {
                      setValue("reg_institute_id", value.value);
                    }}
                    taluq_id={taluq_id}
                    isDisabled={taluq_id === 0 || taluq_id === undefined}
                  />
                  <Form.ErrorMessage
                    show={!!errors.reg_institute_id?.message}
                    placement="bottomStart"
                  >
                    {errors.reg_institute_id?.message}
                  </Form.ErrorMessage>
                  <p>
                    <b>
                    Incase Institute not in above list -{" "}
                    <Link to={page_routes.institute.auth.request}>
                      Request Institute
                    </Link>
                    </b>
                  </p>
                </Col>
              </Row>
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
                    name="phone"
                    label="Phone"
                    control={control}
                    error={errors.phone?.message}
                  />
                </Col>
              </Row>
              <Row className="show-grid mb-1">
                <Col md={12} sm={24} xs={24}>
                  <PasswordInput
                    name="password"
                    label="Password"
                    control={control}
                    error={errors.password?.message}
                  />
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <PasswordInput
                    name="confirm_password"
                    label="Confirm Password"
                    control={control}
                    error={errors.confirm_password?.message}
                  />
                </Col>
              </Row>
              <Row className="show-grid mb-1">
                <Col md={12} sm={24} xs={24}>
                  <TextInput
                    name="name"
                    label="Principal Name"
                    control={control}
                    error={errors.name?.message}
                  />
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <TextInput
                    name="pincode"
                    label="Pincode"
                    control={control}
                    error={errors.pincode?.message}
                  />
                </Col>
              </Row>
              <TextInput
                name="address"
                label="Address"
                helpText="Do not use any special characters"
                textarea={true}
                control={control}
                error={errors.address?.message}
              />
              <Row className="show-grid mb-1">
                <Col md={12} sm={24} xs={24}>
                  <FileInput
                    name="reg_certification"
                    accept="image/png, image/jpeg, image/jpg"
                    label="Upload Institute Reg. File"
                    helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)"
                    control={control}
                    error={errors.reg_certification?.message}
                  />
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <FileInput
                    name="principal_signature"
                    accept="image/png, image/jpeg, image/jpg"
                    label="Upload Principal Signature"
                    helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)"
                    control={control}
                    error={errors.principal_signature?.message}
                  />
                </Col>
              </Row>
              <FileInput
                name="seal"
                accept="image/png, image/jpeg, image/jpg"
                label="Upload Seal"
                helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)"
                control={control}
                error={errors.seal?.message}
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
                    to={page_routes.institute.auth.login}
                    style={{ marginLeft: "10px" }}
                  >
                    <Button appearance="link" type="button">
                      Already have an account?
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

export default InstituteRegisterPage;
