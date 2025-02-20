import { Button, Form, Uploader } from "rsuite";
import { Controller, Control } from "react-hook-form";

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  label: string;
  name: string;
  error: string | undefined;
  helpText?: string;
  accept?: string;
};

const FileInput = (props: PropType) => {
  const { control, error, label, name, helpText, accept } = props;
  return (
    <Form.Group>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Form.ControlLabel>{label}</Form.ControlLabel>
            <Uploader
              listType="picture-text"
              autoUpload={false}
              action=""
              onChange={field.onChange}
              className="w-100"
              data={{ name: field.name }}
              accept={accept}
              multiple={false}
              maxPreviewFileSize={1}
              disabled={field.value !== undefined && field.value.length > 0}
              fileListVisible={
                field.value !== undefined && field.value.length > 0
              }
              onRemove={() => {
                field.onChange(undefined);
              }}
            >
              <Button className="w-100" color="cyan" appearance="primary">Select file</Button>
            </Uploader>
            {helpText && (
              <Form.HelpText>
                <b>Note:</b> <i>{helpText}</i>
              </Form.HelpText>
            )}
            <Form.ErrorMessage show={!!error} placement="bottomStart">
              {error}
            </Form.ErrorMessage>
          </>
        )}
      />
    </Form.Group>
  );
};

export default FileInput;
