import { Tooltip, Whisper } from 'rsuite'
import classes from './index.module.css'

export default function ScholarshipStatus() {
	return (
		<>
		<div className={classes.navigation_menu}>
			<ul className={classes.navigation_tabs}>
			<Whisper placement="top" trigger="hover" speaker={<Tooltip>Submitted</Tooltip>}>
				<li className={classes.tab_inactive}>
					<div>Application</div>
				</li>
			</Whisper>
			<Whisper placement="top" trigger="hover" speaker={<Tooltip>Rejected</Tooltip>}>
				<li className={classes.tab_rejected}>
					<div>Institution</div>
				</li>
			</Whisper>
			<Whisper placement="top" trigger="hover" speaker={<Tooltip>Pending</Tooltip>}>
				<li className={classes.tab_disabled}>
					<div>Industry</div>
				</li>
			</Whisper>
			<Whisper placement="top" trigger="hover" speaker={<Tooltip>Pending</Tooltip>}>
				<li className={classes.tab_disabled}>
					<div>Labour Welfare Board</div>
				</li>
			</Whisper>
			</ul>
		</div>
		</>
	)
}
