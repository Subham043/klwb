import { IconButton } from "rsuite";
import TrashIcon from '@rsuite/icons/Trash';
import ConfirmAlert from "../ConfirmAlert";

type DeleteBtnProps = {
  clickHandler: () => void;
		deleteLoading: boolean;
};
export default function DeleteBtn({ clickHandler, deleteLoading }: DeleteBtnProps) {
  return (
    <ConfirmAlert confirmHandler={clickHandler}>
      <IconButton
        appearance="primary"
        color="red"
        icon={<TrashIcon />}
        loading={deleteLoading}
      />
    </ConfirmAlert>
  );
}
