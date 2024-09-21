import { IconButton, Tooltip, Whisper } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";

type EditBtnProps = {
  clickHandler: () => void;
};
export default function EditBtn({ clickHandler }: EditBtnProps) {
  return (
    <Whisper
      placement="bottomEnd"
      controlId="control-id-click"
      trigger="hover"
      speaker={
        <Tooltip>
          Edit
        </Tooltip>
      }
    >
      <IconButton
        appearance="primary"
        color="orange"
        icon={<EditIcon />}
        onClick={clickHandler}
        size="sm"
      />
    </Whisper>
  );
}
