import { Link } from 'react-router-dom'
import { IconButton } from 'rsuite'
import VisibleIcon from '@rsuite/icons/Visible';

type ViewLinkProps = {
	to: string;
}
export function ViewLink({ to }: ViewLinkProps) {
		return (
			<IconButton as={Link} appearance="primary" color="orange" size="sm" icon={<VisibleIcon />} to={to} />
		)
}
