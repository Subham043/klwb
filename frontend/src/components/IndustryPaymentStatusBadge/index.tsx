import { Badge } from "rsuite";

type Props = {
	status: number;
}

export default function IndustryPaymentStatusBadge({ status }: Props) {
	return (
		(
			status === 1 ? <Badge style={{ background: '#4caf50', padding: '7px 9px', }} content={'SUCCESS'} /> : (
				status === 0 ? <Badge style={{ background: '#fa8900', padding: '7px 9px', }} content={'PENDING'} /> : <Badge style={{ background: '#f44336', padding: '7px 9px', }} content={'FAILED'} />
			)
		)
	)
}
