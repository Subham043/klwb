import { Badge } from "rsuite";

type Props = {
	current_application_state: number;
	application_state: number;
	status: number;
}

export default function StatusBadge({status, application_state, current_application_state}:Props) {
		return (
			application_state>current_application_state ? 
			<Badge style={{ background: '#4caf50', padding: '7px 9px', }} content={'APPROVED'} /> : (
							status === 1 ? <Badge style={{ background: '#4caf50', padding: '7px 9px', }} content={'APPROVED'} /> : (
											status === 0 ? <Badge style={{ background: '#fa8900', padding: '7px 9px', }} content={'PENDING'} /> : <Badge style={{ background: '#f44336', padding: '7px 9px', }} content={'REJECTED'} />
							)
			)
		)
}
