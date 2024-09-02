import { Form, Loader, Uploader } from "rsuite";
import FileViewer from "../FileViewer";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAxiosError } from "axios";
import { FileType } from "rsuite/esm/Uploader";
import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { AxiosErrorResponseType } from "../../utils/types";
import { useToast } from "../../hooks/useToast";

type Props = {
  src?: string | undefined;
		name: string;
		apiRoute: string;
		refetch?: () => void;
    allowed?: boolean;
};

type SchemaType = {
  file?: FileType[] | undefined;
};

const schema: yup.ObjectSchema<SchemaType> = yup
  .object({
    file: yup
      .mixed<FileType[]>()
      .test("fileRequired", "File is required", (value) => {
        if (value === undefined || value.length === 0) return false;
        return true;
      })
      .test("fileFormat", "Please select a valid file", (value) => {
        if (value === undefined || value.length === 0) {
          return false;
        } else {
          return ["image/jpeg", "image/jpg", "image/png"].includes(
            value[value.length-1].blobFile!.type
          );
        }
      })
      .transform((value) =>
        value !== undefined &&
        value.length > 0 &&
        value[value.length-1].blobFile instanceof File
          ? value
          : undefined
      )
      .required("File is required"),
  })
  .required();

export default function FileUploader({ src, name, apiRoute, refetch, allowed=false }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { toastError, toastSuccess } = useToast();
  const axios = useAxios();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors },
  } = useForm<SchemaType>({ resolver: yupResolver(schema) });

		const onSubmit = handleSubmit(async () => {
			setLoading(true);
			try {
					const formData = new FormData();
					formData.append(name, getValues().file![getValues().file!.length - 1 || 0].blobFile!);
					await axios.post(apiRoute, formData);
					toastSuccess("File uploaded successfully");
					reset({
							file: undefined,
					});
					if (refetch) refetch();
			} catch (error) {
					if (isAxiosError<AxiosErrorResponseType>(error)) {
							if (error?.response?.data?.errors && error?.response?.data?.errors[name]) {
								setError("file", {
										type: "server",
										message: error?.response?.data?.errors[name][0],
								});
							} else if (error?.response?.data?.message) {
									toastError(error.response.data.message);
							}
					}
			} finally {
					setLoading(false);
			}
	});

  return (
			<div className="p-relative">
				{(loading) && <Loader backdrop content="loading..." vertical style={{ zIndex: 3 }} />}
    <Form>
      <Form.Group>
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <>
														<div style={{textAlign: "center", padding: "10px"}}>
              	<FileViewer src={src} />
														</div>
              {allowed && <Uploader
                action=""
                autoUpload={false}
                multiple={false}
																data={{ name: field.name }}
                maxPreviewFileSize={1}
                accept="image/*"
																fileList={field.value}
                onChange={(file) => {field.onChange(file);onSubmit();}}
																disabled={field.value!==undefined && field.value.length > 0}
																disabledFileItem={false}
																onRemove={() => {
																	field.onChange(undefined); 
																	reset({
																			file: undefined,
																	});
																}}
                draggable
																fileListVisible={field.value!==undefined && field.value.length > 0}
              >
                <div
                  style={{
                    height: 50,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>Click or Drag files to this area to upload</span>
                </div>
              </Uploader>}
							{allowed && <Form.HelpText><b>Note:</b> <i>Only JPG, JPEG, PNG images are allowed (It should be less than 515kb)</i></Form.HelpText>}
              {allowed && <Form.ErrorMessage show={!!errors.file} placement="bottomStart">
                {errors.file?.message}
              </Form.ErrorMessage>}
            </>
          )}
        />
      </Form.Group>
    </Form>
			</div>
  );
}
