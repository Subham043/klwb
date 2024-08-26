import { Badge } from "rsuite";


export default function StatusBadge({status}:{status:number}) {
		if(status===1) return <Badge style={{ background: '#4caf50', padding: '7px 9px', }} content={'APPROVED'} />;
		if(status===2) return <Badge style={{ background: '#f44336', padding: '7px 9px', }} content={'REJECTED'} />;
		return (
			<Badge style={{ background: '#3666f4', padding: '7px 9px', }} content={'PENDING'} />
		)
}
