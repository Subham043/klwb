import { Badge } from "rsuite";
import { useUser } from "../../../hooks/useUser";
import { RolesEnum } from "../../../utils/constants/role";


export default function ApplicationStateBadge({application_state}:{application_state:number}) {
	const {user} = useUser();
		if(application_state===1) return <Badge style={{ background: '#4c97af', padding: '7px 9px', }} content={'INSTITUTE'} />;
		if(application_state===2) return <Badge style={{ background: '#af884c', padding: '7px 9px', }} content={'INDUSTRY'} />;
		if(user && (user.role === RolesEnum.ADMIN || user.role === RolesEnum.SUPER_ADMIN)){
			if(application_state===3) return <Badge style={{ background: '#8a4caf', padding: '7px 9px', }} content={'LABOUR BOARD'} />;
			if(application_state===4) return <Badge style={{ background: '#8daf4c', padding: '7px 9px', }} content={'ADMIN'} />;
		}else{
			if(application_state>2) return <Badge style={{ background: '#8a4caf', padding: '7px 9px', }} content={'LABOUR BOARD'} />;
		}
		return (
			<Badge style={{ background: '#af4c4c', padding: '7px 9px', }} content={'APPLICATION'} />
		)
}
