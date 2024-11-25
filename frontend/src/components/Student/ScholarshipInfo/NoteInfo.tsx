import { Grid, Row, Col, Text, Form, Button, ButtonToolbar, Stack } from "rsuite";
import {
  AxiosErrorResponseType,
  StudentApplicationType,
} from "../../../utils/types";
import classes from "./index.module.css";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import { useUser } from "../../../hooks/useUser";
import { RolesEnum } from "../../../utils/constants/role";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../../../hooks/useToast";
import { isAxiosError } from "axios";
import { useAxios } from "../../../hooks/useAxios";
import { useState } from "react";
import { api_routes } from "../../../utils/routes/api";
import TextInput from "../../FormInput/TextInput";
import EditBtn from "../../Buttons/EditBtn";

type Props = {
  data: StudentApplicationType;
  refetch?: () => void;
};

type SchemaType = {
  note: string;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    note: yup
      .string()
      .typeError("Note must contain characters only")
      .required("Note is required"),
  })
  .required();

function NoteInfo({ data, refetch }: Props) {
  const { user } = useUser();
  const [allowEdit, setAllowEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toastError, toastSuccess } = useToast();
  const axios = useAxios();

  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    values: {
      note: data
        ? (user && user.role === RolesEnum.VERIFICATION_OFFICER
          ? (data.govt_note
            ? data.govt_note
            : "")
          : (data.admin_note
          ? data.admin_note
          : ""))
        : "",
    },
  });

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      if(user && user.role === RolesEnum.VERIFICATION_OFFICER){
        await axios.post(api_routes.govt.scholarship.note(data.id), getValues());
      }else{
        await axios.post(api_routes.admin.scholarship.note(data.id), getValues());
      }
      toastSuccess("Saved Successfully");
      refetch && refetch();
      setAllowEdit(false);
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
    <div className="mb-1">
      <ModalCardContainer
        header={
          <Stack justifyContent="space-between">
            <h5 className={classes.inner_main_heading} style={{ margin: 0 }}>Notes</h5>
            <ButtonToolbar>
              {!allowEdit && <EditBtn clickHandler={() => setAllowEdit(true)} />}
            </ButtonToolbar>
          </Stack>
        }
      >
        <Grid fluid>
          <Row gutter={30}>
            <Col className="pb-1" xs={24}>
              {allowEdit ? (
                <Form onSubmit={() => onSubmit()} style={{ width: "100%" }}>
                  <TextInput
                    name="note"
                    label="Note"
                    helpText="Do not use any special characters"
                    textarea={true}
                    control={control}
                    error={errors.note?.message}
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
                      onClick={() => setAllowEdit(false)}
                      appearance="primary"
                      color="red"
                    >
                      Cancel
                    </Button>
                  </ButtonToolbar>
                </Form>
              ) : (
                <Text>
                  {user && user.role === RolesEnum.VERIFICATION_OFFICER
                    ? data?.govt_note
                    : data?.admin_note}
                </Text>
              )}
            </Col>
          </Row>
        </Grid>
      </ModalCardContainer>
    </div>
  );
}

export default NoteInfo;
