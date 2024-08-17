import { Panel, Stack, HeadingGroup, Heading, Text, useMediaQuery } from "rsuite"
import { StudentApplicationType } from "../../../utils/types";
import classes from './index.module.css';

type Props = {
	data: StudentApplicationType;
}

function MarkInfo({ data }: Props) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
	return (
		<div className="mb-1">
			<Panel header={
				<div className="text-center">
					<h5 className={classes.inner_main_heading}>Previous Year Class and Marks</h5>
				</div>
			} className='info-modal-panel' bordered>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Class Name</Heading>
						<Text>{data?.mark.prv_class}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Marks</Heading>
						<Text>{data?.mark.prv_marks}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Marks Card Type</Heading>
						<Text>{data?.mark.prv_markcard2 ? "Semester Wise" : "Yearly"}</Text>
					</HeadingGroup>
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
					{data?.mark.prv_markcard && <HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Marks Card Copy</Heading>
						<img src={data?.mark.prv_markcard} alt="" style={{objectFit: 'contain', height: '100px'}} />
					</HeadingGroup>}
					{data?.mark.prv_markcard2 && <HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>2nd Marks Card Copy</Heading>
						<img src={data?.mark.prv_markcard2} alt="" style={{objectFit: 'contain', height: '100px'}} />
					</HeadingGroup>}
					<div></div>
				</Stack>
			</Panel>
		</div>
	)
}

export default MarkInfo