import { Link } from "react-router-dom";
import { Button, Message, Stack } from "rsuite";
import { TypeAttributes } from "rsuite/esm/internals/types";

type DashboardMessageCardProps = {
	message: string;
	link: string;
	type: TypeAttributes.Status;
	color: TypeAttributes.Color;
	button_title: string;
}

export default function DashboardMessageCard({ message, link, type, color, button_title }: DashboardMessageCardProps) {
		return (
			<Message type={type} bordered showIcon className="mt-1" style={{ gap: 10 }}>
						<Stack justifyContent="space-between" className='w-100'>
										<div><strong>{message}</strong></div>
										<Button as={Link} to={link} size="sm" appearance="primary" color={color}>{button_title}</Button>
						</Stack>
			</Message>
		)
}
