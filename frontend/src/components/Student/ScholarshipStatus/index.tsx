import { Button, Message, Stack, Tooltip, Whisper } from 'rsuite'
import classes from './index.module.css'
import { StudentApplicationType } from '../../../utils/types';
import { Link } from 'react-router-dom';
import { page_routes } from '../../../utils/routes/pages';

type Props = {
	data: StudentApplicationType;
	can_resubmit?: boolean;
}

function Status({ children, tooltip, className }: { children: React.ReactNode, tooltip: string, className: string }) {
	return (
		<Whisper placement="top" trigger="hover" speaker={<Tooltip>{tooltip}</Tooltip>}>
			<li className={className}>
				<div>{children}</div>
			</li>
		</Whisper>
	);
}

function Rejected({ children }: { children: React.ReactNode }) {
	return (
		<Status className={classes.tab_rejected} tooltip="Rejected">
			{children}
		</Status>
	);
}
function Submitted({ children }: { children: React.ReactNode }) {
	return (
		<Status className={classes.tab_inactive} tooltip="Submitted">
			{children}
		</Status>
	);
}
function Approved({ children }: { children: React.ReactNode }) {
	return (
		<Status className={classes.tab_inactive} tooltip="Approved">
			{children}
		</Status>
	);
}
function Pending({ children }: { children: React.ReactNode }) {
	return (
		<Status className={classes.tab_disabled} tooltip="Pending">
			{children}
		</Status>
	);
}
function Active({ children }: { children: React.ReactNode }) {
	return (
		<Status className={classes.tab_active} tooltip="Pending">
			{children}
		</Status>
	);
}

function ApplicationStatus() {
	return (
		<Submitted>
			<div className={classes.tab_name}>Application</div>
		</Submitted>
	);
}

function CurrentStatus({ status, application_state, name, current_state }: { status: number, application_state: number, current_state: number, name: string }) {
	if (application_state === current_state) {
		if (status === 0) {
			return (
				<Active>
					<div className={classes.tab_name}>{name}</div>
				</Active>
			);
		}
		if (status === 1) {
			return (
				<Approved>
					<div className={classes.tab_name}>{name}</div>
				</Approved>
			);
		}
		if (status === 2) {
			return (
				<Rejected>
					<div className={classes.tab_name}>{name}</div>
				</Rejected>
			);
		}
	}
	if (application_state > current_state) {
		return (
			<Approved>
				<div className={classes.tab_name}>{name}</div>
			</Approved>
		);
	}
	return (
		<Pending>
			<div className={classes.tab_name}>{name}</div>
		</Pending>
	);
}
export default function ScholarshipStatus({ data, can_resubmit = false }: Props) {
	return (
		<>
			<div className={classes.navigation_menu}>
				<ul className={classes.navigation_tabs}>
					<ApplicationStatus />
					<CurrentStatus status={data.status} application_state={data.application_state} name='Institution' current_state={1} />
					<CurrentStatus status={data.status} application_state={data.application_state} name='Industry' current_state={2} />
					<CurrentStatus status={data.status} application_state={data.application_state} name='Labour Welfare Board' current_state={3} />
				</ul>
			</div>
			{(data.status===2) && <div className='scholarship-rejected-status mt-1'>
				<Message type="error" bordered showIcon className="mb-1" style={{ gap: 10 }}>
						<Stack justifyContent="space-between" className='w-100'>
								<div><strong>Reason for Rejection:</strong> {data.reject_reason || 'N/A'}</div>
								{can_resubmit && <Button as={Link} to={page_routes.student.scholarship.resubmit} size="sm" appearance="primary" color='red'>RESUBMIT APPLICATION</Button>}
						</Stack>
				</Message>
			</div>}
		</>
	)
}
