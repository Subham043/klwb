import { Badge } from "rsuite";

type Props = {
	application_state: number;
	status: number;
}

const statusMap = new Map<number, string>([[0, 'PENDING'], [1, 'APPROVED'], [2, 'REJECTED']]);
const statusColorMap = new Map<number, string>([[0, '#fa8900'], [1, '#4caf50'], [2, '#f44336']]);
const applicationStateMap = new Map<number, string>([[0, 'STUDENT'], [1, 'INSTITUTE'], [2, 'INDUSTRY'], [3, 'LABOUR BOARD'], [4, 'ADMIN']]);

export default function ApplicationStatusBadge({status, application_state}:Props) {
		return (
			<Badge style={{ background: statusColorMap.get(status), padding: '7px 9px', }} content={`${statusMap.get(status)} ${status === 0 ? 'FROM' : 'BY'} ${applicationStateMap.get(application_state)}`} /> 
		)
}