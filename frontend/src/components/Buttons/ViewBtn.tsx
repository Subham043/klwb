import { Link } from 'react-router-dom'
import { IconButton } from 'rsuite'
import VisibleIcon from '@rsuite/icons/Visible';

type ViewBtnProps = {
	to: string;
}
export default function ViewBtn({ to }: ViewBtnProps) {
		return (
			<IconButton as={Link} appearance="primary" color="orange" icon={<VisibleIcon />} to={to} />
		)
}
