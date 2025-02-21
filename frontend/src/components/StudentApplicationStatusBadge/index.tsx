import { Badge } from "rsuite";

type Props = {
	application_state: number;
	status: number;
}

const statusMap = new Map<number, string>([[0, 'PENDING'], [1, 'APPROVED'], [2, 'REJECTED']]);
const statusColorMap = new Map<number, string>([[0, '#fa8900'], [1, '#4caf50'], [2, '#f44336']]);
const applicationStateMap = new Map<number, string>([[0, 'STUDENT'], [1, 'INSTITUTE'], [2, 'INDUSTRY'], [3, 'LABOUR BOARD'], [4, 'LABOUR BOARD']]);

export default function StudentApplicationStatusBadge({status, application_state}:Props) {
		if(status === 2 && application_state === 3) return <Badge style={{ background: '#f44336', padding: '7px 9px', }} content={`REJECTED BY LABOUR BOARD`} />
		if((status === 0 || status === 1) && application_state === 3) return <Badge style={{ background: '#fa8900', padding: '7px 9px', }} content={`PENDING FROM LABOUR BOARD`} />
		return (
			<Badge style={{ background: statusColorMap.get(status), padding: '7px 9px', }} content={`${statusMap.get(status)} ${status === 0 ? 'FROM' : 'BY'} ${applicationStateMap.get(application_state)}`} /> 
		)
}