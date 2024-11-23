import { Badge } from "rsuite";

type Props = {
	pay_status: number;
}

export default function PaymentStatusBadge({ pay_status }: Props) {
	return (
		pay_status === 1 ? <Badge style={{ background: '#4caf50', padding: '7px 9px', }} content={'PAYMENT COMPLETED'} /> : (
			pay_status === 0 ? <Badge style={{ background: '#fa8900', padding: '7px 9px', }} content={'PAYMENT PENDING'} /> : <Badge style={{ background: '#f44336', padding: '7px 9px', }} content={'PAYMENT FAILED'} />
		)
	)
}
