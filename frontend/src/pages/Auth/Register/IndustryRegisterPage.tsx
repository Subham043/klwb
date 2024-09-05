import classes from '../IndustryRequestPage/index.module.css'
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from '../../../hooks/useToast';
import { isAxiosError } from 'axios';
import { AxiosErrorResponseType } from '../../../utils/types';
import { useAxios } from '../../../hooks/useAxios';
import CaptchaInput from '../../../components/FormInput/CaptchaInput';
import TextInput from '../../../components/FormInput/TextInput';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Col, Form, Row } from 'rsuite'
import { useCityCommonSelectQuery } from '../../../hooks/data/city';
import { useTaluqCommonSelectQuery } from '../../../hooks/data/taluq';
import SelectInput from '../../../components/FormInput/SelectInput';
import FileInput from '../../../components/FormInput/FileInput';
import { FileType } from 'rsuite/esm/Uploader';
import { useIndustryCommonSelectQuery } from '../../../hooks/data/industry';
import PasswordInput from '../../../components/FormInput/PasswordInput';
import { api_routes } from '../../../utils/routes/api';
import { page_routes } from '../../../utils/routes/pages';
import debounce from 'lodash.debounce';

type SchemaType = {
  email: string;
  name: string;
  phone: number;
  password: string;
  confirm_password: string;
  address: string;
  act: string;
  city_id: number;
  taluq_id: number;
  reg_industry_id: number;
  reg_doc?: FileType[] | undefined;
  sign?: FileType[] | undefined;
  seal?: FileType[] | undefined;
  captcha: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    name: yup.string().typeError("Director Name must contain characters only").required("Director Name is required"),
    email: yup.string().typeError("Email must contain characters only").email().required("Email is required"),
    phone: yup.number().typeError("Phone must contain numbers only").positive().required("Phone is required"),
    password: yup.string().typeError("Password must contain characters only").required("Password is required"),
    confirm_password: yup.string().typeError("Confirm Password must contain characters only").required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
    address: yup.string().typeError("Address must contain characters only").required("Address is required"),
    act: yup.string().typeError("Act must contain characters only").required("Act is required"),
    city_id: yup.number().typeError("District must contain numbers only").required("District is required").test("notZero", "District is required", (value) => !(value === 0)),
    taluq_id: yup.number().typeError("Taluq must contain numbers only").required("Taluq is required").test("notZero", "Taluq is required", (value) => !(value === 0)),
    reg_industry_id: yup.number().typeError("Industry must contain numbers only").required("Industry is required"),
    captcha: yup.string().typeError("Captcha must contain characters only").required("Captcha is required"),
    reg_doc: yup
      .mixed<FileType[]>()
      .test("fileRequired", "Industry Reg. Doc is required", (value) => {
        if (value === undefined || value.length === 0) return false;
        return true;
      })
      .test("fileFormat", "Please select a valid industry registration document", (value) => {
        if (value === undefined || value.length === 0) {
          return false;
        } else {
          return ["image/jpeg", "image/jpg", "image/png"].includes(
            value[0].blobFile!.type
          );
        }
      })
      .transform((value) => (((value !== undefined && value.length > 0) && (value[0].blobFile instanceof File)) ? value : undefined))
      .required("Industry Reg. Doc is required"),
    sign: yup
      .mixed<FileType[]>()
      .test("fileRequired", "Director Signature is required", (value) => {
        if (value === undefined || value.length === 0) return false;
        return true;
      })
      .test("fileFormat", "Please select a valid principal signature", (value) => {
        if (value === undefined || value.length === 0) {
          return false;
        } else {
          return ["image/jpeg", "image/jpg", "image/png"].includes(
            value[0].blobFile!.type
          );
        }
      })
      .transform((value) => (((value !== undefined && value.length > 0) && (value[0].blobFile instanceof File)) ? value : undefined))
      .required("Director Signature is required"),
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
            value[0].blobFile!.type
          );
        }
      })
      .transform((value) => (((value !== undefined && value.length > 0) && (value[0].blobFile instanceof File)) ? value : undefined))
      .required("Seal is required"),
  })
  .required();

function IndustryRegisterPage() {

  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
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
    formState: { errors }
  } = useForm<SchemaType>({ resolver: yupResolver(schema) });

  const city_id = watch("city_id");

  const { data: cities, isFetching: isCityFetching, isLoading: isCityLoading } = useCityCommonSelectQuery(true);
  const { data: taluqs, isFetching: isTaluqFetching, isLoading: isTaluqLoading } = useTaluqCommonSelectQuery((city_id !== 0 && city_id !== undefined), (city_id === 0 ? undefined : city_id));
  const { data: industries, isFetching: isIndustryFetching, isLoading: isIndustryLoading } = useIndustryCommonSelectQuery(search.length > 0, search);

  const searchHandler = debounce((value: string) => {
    setSearch(value);
  }, 500);

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", getValues().name);
      formData.append("email", getValues().email);
      formData.append("phone", getValues().phone.toString());
      formData.append("password", getValues().password.toString());
      formData.append("confirm_password", getValues().confirm_password.toString());
      formData.append("act", getValues().act);
      formData.append("address", getValues().address);
      formData.append("city_id", getValues().city_id.toString());
      formData.append("taluq_id", getValues().taluq_id.toString());
      formData.append("reg_industry_id", getValues().reg_industry_id.toString());
      formData.append("captcha", getValues().captcha);
      formData.append("reg_doc", getValues().reg_doc![0].blobFile!);
      formData.append("sign", getValues().sign![0].blobFile!);
      formData.append("seal", getValues().seal![0].blobFile!);
      await axios.post(api_routes.industry.auth.register.industry, formData);
      toastSuccess("Registration Successful");
      reset({
        name: "",
        email: "",
        phone: undefined,
        password: "",
        confirm_password: "",
        act: "",
        address: "",
        city_id: 0,
        taluq_id: 0,
        reg_industry_id: 0,
        captcha: "",
        reg_doc: undefined,
        sign: undefined,
        seal: undefined,
      });
    } catch (error) {
      if (isAxiosError<AxiosErrorResponseType>(error)) {
        if (error?.response?.data?.errors) {
          for (const [key, value] of Object.entries(error?.response?.data?.errors)) {
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
          <div className={classes.formTitle}>
            Industry Registration
          </div>
          <div className={classes.formFields}>
            <Form onSubmit={() => onSubmit()} style={{ width: '100%' }}>
              <Row className="show-grid mb-1">
                <Col xs={12}>
                  <SelectInput name="city_id" label="District" resetHandler={() => {setValue("taluq_id", 0)}} data={cities ? cities.map(item => ({ label: item.name, value: item.id })) : []} loading={isCityFetching || isCityLoading} control={control} error={errors.city_id?.message} />
                </Col>
                <Col xs={12}>
                  <SelectInput name="taluq_id" label="Taluq" data={taluqs ? taluqs.map(item => ({ label: item.name, value: item.id })) : []} disabled={city_id === 0 || city_id === undefined || taluqs === undefined || taluqs.length === 0} loading={isTaluqFetching || isTaluqLoading} control={control} error={errors.taluq_id?.message} />
                </Col>
              </Row>
              <div className='industry-select-register mb-1'>
                <SelectInput name="reg_industry_id" label="Industry" searchPlaceholder="Type To Search Industry.." data={industries ? industries.map(item => ({ label: item.name, value: item.id })) : []} loading={isIndustryFetching || isIndustryLoading} searchHandler={searchHandler} control={control} error={errors.reg_industry_id?.message} />
                <p><b>Incase Industry not in above list - <Link to={page_routes.industry.auth.request}>Request Industry</Link></b></p>
              </div>
              <Row className="show-grid mb-1">
                <Col xs={12}>
                  <SelectInput name="act" label="Act" data={[{label:'Labour', value:'1'}, {label:'Company', value:'2'}, {label:'Other', value:'3'}]} control={control} error={errors.act?.message} />
                </Col>
                <Col xs={12}>
                  <TextInput name="name" label="Director Name" control={control} error={errors.name?.message} />
                </Col>
              </Row>
              <Row className="show-grid mb-1">
                <Col xs={12}>
                  <TextInput name="email" type='email' focus={true} label="Email" control={control} error={errors.email?.message} />
                </Col>
                <Col xs={12}>
                  <TextInput name="phone" label="Phone" control={control} error={errors.phone?.message} />
                </Col>
              </Row>
              <Row className="show-grid mb-1">
                <Col xs={12}>
                  <PasswordInput name="password" label="Password" control={control} error={errors.password?.message} />
                </Col>
                <Col xs={12}>
                  <PasswordInput name="confirm_password" label="Confirm Password" control={control} error={errors.confirm_password?.message} />
                </Col>
              </Row>
              <TextInput name="address" label="Address" helpText="Do not use any special characters" textarea={true} control={control} error={errors.address?.message} />
              <Row className="show-grid mb-1">
                <Col xs={12}>
                  <FileInput name="reg_doc" accept='image/png, image/jpeg, image/jpg' label="Upload Industry Reg. Doc" helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)" control={control} error={errors.reg_doc?.message} />
                </Col>
                <Col xs={12}>
                  <FileInput name="sign" accept='image/png, image/jpeg, image/jpg' label="Upload Director Signature" helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)" control={control} error={errors.sign?.message} />
                </Col>
              </Row>
              <FileInput name="seal" accept='image/png, image/jpeg, image/jpg' label="Upload Seal" helpText=" Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)" control={control} error={errors.seal?.message} />
              <CaptchaInput control={control} error={errors.captcha?.message} ref={captchaRef} />
              <Form.Group>
                <ButtonToolbar style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Button appearance="primary" size='lg' type="submit" loading={loading} disabled={loading}>Submit</Button>
                  <Link to={page_routes.industry.auth.login} style={{ marginLeft: '10px' }}><Button appearance="link" type='button'>Already have an account?</Button></Link>
                </ButtonToolbar>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndustryRegisterPage
