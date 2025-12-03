import { IconButton, Tooltip, Whisper } from "rsuite";
import FileUploadIcon from "@rsuite/icons/FileUpload";

type UploadBtnProps = {
  clickHandler: () => void;
};
export default function UploadBtn({ clickHandler }: UploadBtnProps) {
  return (
    <Whisper
      placement="bottomEnd"
      controlId="control-id-click"
      trigger="hover"
      speaker={<Tooltip>Upload Excel</Tooltip>}
    >
      <IconButton
        appearance="primary"
        color="yellow"
        icon={<FileUploadIcon />}
        onClick={clickHandler}
        size="sm"
      />
    </Whisper>
  );
}
