import { Panel, Stack, HeadingGroup, Heading, Text, useMediaQuery } from "rsuite"
import { StudentApplicationType } from "../../../utils/types";
import classes from './index.module.css';

type Props = {
	data: StudentApplicationType;
}

function AadharInfo({ data }: Props) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
	return (
		<div className="mb-1">
			<Panel header={
				<div className="text-center">
					<h5 className={classes.inner_main_heading}>Aadhar Card Details</h5>
				</div>
			} className='info-modal-panel' bordered>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Aadhar</Heading>
						<Text>{data?.basic_detail.adharcard_no}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Father's Aadhar</Heading>
						<Text>{(data?.basic_detail.not_applicable && data?.basic_detail.not_applicable==="father") ? "Not Applicable": data?.basic_detail.f_adhar}</Text>
					</HeadingGroup>
					<HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Mother's Aadhar</Heading>
						<Text>{(data?.basic_detail.not_applicable && data?.basic_detail.not_applicable==="mother") ? "Not Applicable": data?.basic_detail.m_adhar}</Text>
					</HeadingGroup>
				</Stack>
				<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
					{data?.basic_detail.adharcard_file && <HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Aadhar File</Heading>
						<img src={data?.basic_detail.adharcard_file} alt="" style={{objectFit: 'contain', height: '100px'}} />
					</HeadingGroup>}
					{
						(data?.basic_detail.not_applicable && data?.basic_detail.not_applicable==="father") ? (data?.basic_detail.deathcertificate && <HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Father's Death Certificate</Heading>
							<img src={data?.basic_detail.deathcertificate} alt="" style={{objectFit: 'contain', height: '100px'}} />
						</HeadingGroup>) : (data?.basic_detail.f_adharfile && <HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Father's Aadhar File</Heading>
						<img src={data?.basic_detail.f_adharfile} alt="" style={{objectFit: 'contain', height: '100px'}} />
					</HeadingGroup>)
					}
					{
						(data?.basic_detail.not_applicable && data?.basic_detail.not_applicable==="mother") ? (data?.basic_detail.deathcertificate && <HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Mother's Death Certificate</Heading>
							<img src={data?.basic_detail.deathcertificate} alt="" style={{objectFit: 'contain', height: '100px'}} />
						</HeadingGroup>) : (data?.basic_detail.m_adharfile && <HeadingGroup className='mb-1'>
						<Heading level={6} className='info-heading'>Mother's Aadhar File</Heading>
						<img src={data?.basic_detail.m_adharfile} alt="" style={{objectFit: 'contain', height: '100px'}} />
					</HeadingGroup>)
					}
				</Stack>
			</Panel>
		</div>
	)
}

export default AadharInfo