import { Panel, Stack, HeadingGroup, Heading, Text, useMediaQuery } from "rsuite"
// import { StudentApplicationType } from "../../../utils/types";
import classes from './index.module.css';

// type Props = {
// 	data: StudentApplicationType;
// }

function ConfirmationReport() {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
	return (
		<div className="mb-1">
		<Panel header={
			<div className="text-center">
				<h5 className={classes.inner_main_heading}>Confirmation Report</h5>
			</div>
		} className='info-modal-panel' bordered>
			<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Institute Confirmation Report</Heading>
					<Text>-----------------</Text>
				</HeadingGroup>
				<HeadingGroup className='mb-1'>
					<Heading level={6} className='info-heading'>Industry Confirmation Report</Heading>
					<Text>-----------------</Text>
				</HeadingGroup>
				<div></div>
			</Stack>
		</Panel>
		</div>
	)
}

export default ConfirmationReport