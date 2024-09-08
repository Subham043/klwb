import { IconButton } from "rsuite";
import EditIcon from '@rsuite/icons/Edit';

type EditBtnProps = {
	clickHandler: () => void
}
export default function EditBtn({ clickHandler }: EditBtnProps) {
		return (
			<IconButton appearance="primary" color="orange" icon={<EditIcon />} onClick={clickHandler} />
		)
}