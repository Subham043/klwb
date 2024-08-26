import { Badge } from "rsuite";


export default function ApplicationStateBadge({application_state}:{application_state:number}) {
		if(application_state===1) return <Badge style={{ background: '#4c97af', padding: '7px 9px', }} content={'INSTITUTE'} />;
		if(application_state===2) return <Badge style={{ background: '#af884c', padding: '7px 9px', }} content={'INDUSTRY'} />;
		if(application_state>2) return <Badge style={{ background: '#8a4caf', padding: '7px 9px', }} content={'LABOUR BOARD'} />;
		return (
			<Badge style={{ background: '#af4c4c', padding: '7px 9px', }} content={'APPLICATION'} />
		)
}
