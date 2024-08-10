import { Badge } from "rsuite";

type Props = {
	status: boolean;
	correctLabel?: string;
	wrongLabel?: string;
}

export default function Status({status, correctLabel="Active", wrongLabel="Inactive"}:Props) {
		return (
				<Badge style={{ background: status ? '#4caf50' : '#f44336' }} content={status ? correctLabel : wrongLabel} />
		)
}
