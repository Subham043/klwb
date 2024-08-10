import moment from "moment";

type Props = {
		datetime: string;
		format?: string;
}

export default function Moment({datetime, format = "DD MMM, YYYY hh:mm a"}: Props) {
		return (
				<>{moment(datetime).format(format)}</>
		)
}
