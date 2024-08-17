import { useMediaQuery } from "rsuite/esm/useMediaQuery/useMediaQuery";
import ErrorBoundaryLayout from "../../layouts/ErrorBoundaryLayout";
import { useToast } from "../../hooks/useToast";
import { useAxios } from "../../hooks/useAxios";
import { useState } from "react";
import { useInstituteRegisteredQuery } from "../../hooks/data/institute_registered";
import { api_routes } from "../../utils/routes/api";
import { Button, ButtonToolbar, Heading, HeadingGroup, Panel, Stack, Text } from "rsuite";
import Status from "../Status";
import Moment from "../Moment";
import { VerificationEnum } from "../../utils/constants/verified";
import InstituteInfoUpdate from "./InstituteInfoUpdate";
import InstituteAuthUpdate from "./InstituteAuthUpdate";

type Props = {
	id: number;
}

export default function InstituteInfo({ id }: Props) {
	const [isMobile] = useMediaQuery('(max-width: 700px)');
	const { toastError, toastSuccess } = useToast();
	const axios = useAxios();
	const { data, isFetching, isLoading, isRefetching, refetch: refetchData, error } = useInstituteRegisteredQuery(Number(id) || 0, true);
	const [toggleLoading, setToggleLoading] = useState<boolean>(false);
	const [instituteUpdateModal, setInstituteUpdateModal] = useState<boolean>(false);
	const [instituteAuthModal, setInstituteAuthModal] = useState<boolean>(false);

	const toggleStatus = async () => {
		setToggleLoading(true);
		try {
			const response = await axios.get(api_routes.admin.institute.registered.toggle(Number(id) || 0));
			toastSuccess(response.data.message);
			refetchData();
		} catch (error) {
			toastError("Failed to toggle status");
		} finally {
			setToggleLoading(false);
		}
	}
	return (
		<ErrorBoundaryLayout loading={(isFetching || isLoading || isRefetching)} error={error} refetch={refetchData}>
			<div className="mb-1">
				<Panel
					header={
						<Stack justifyContent="space-between">
							<Heading level={6} style={{ color: 'white' }}>Institute Information</Heading>
							<ButtonToolbar>
								<Button appearance="primary" color="cyan" size="sm" onClick={() => setInstituteUpdateModal(true)}>Edit</Button>
								<Button appearance="primary" color="orange" size="sm" onClick={toggleStatus} disabled={toggleLoading} loading={toggleLoading} >{data?.profile.is_blocked ? "Unblock" : "Block"}</Button>
							</ButtonToolbar>
						</Stack>
					}
					className='info-modal-panel'
					bordered>
					<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Name</Heading>
							<Text>{data?.registered_institute.name}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Principal Name</Heading>
							<Text>{data?.principal}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Email</Heading>
							<Text>{data?.email}</Text>
						</HeadingGroup>
					</Stack>
					<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Phone</Heading>
							<Text>{data?.phone}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Management Type</Heading>
							<Text>{data?.registered_institute.management_type}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Institute Category</Heading>
							<Text>{data?.registered_institute.category}</Text>
						</HeadingGroup>
					</Stack>
					<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Institute Type</Heading>
							<Text>{data?.registered_institute.type}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Region Type</Heading>
							<Text>{data?.registered_institute.urban_rural}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Pincode</Heading>
							<Text>{data?.address.pincode}</Text>
						</HeadingGroup>
					</Stack>
					<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Address</Heading>
							<Text>{data?.address.address}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>District</Heading>
							<Text>{data?.address.city.name}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Taluq</Heading>
							<Text>{data?.address.taluq.name}</Text>
						</HeadingGroup>
					</Stack>
					<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Institute Reg. File</Heading>
							<img src={data?.reg_certification} alt="" style={{ objectFit: 'contain', height: '100px' }} />
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Principal Signature</Heading>
							<img src={data?.principal_signature} alt="" style={{ objectFit: 'contain', height: '100px' }} />
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Seal</Heading>
							<img src={data?.seal} alt="" style={{ objectFit: 'contain', height: '100px' }} />
						</HeadingGroup>
					</Stack>
				</Panel>
			</div>
			<div className="mb-1">
				<Panel
					header={
						<Stack justifyContent="space-between">
							<Heading level={6} style={{ color: 'white' }}>Login Information</Heading>
							<Button appearance="primary" color="cyan" size="sm" onClick={() => setInstituteAuthModal(true)}>Edit</Button>
						</Stack>
					}
					className='info-modal-panel'
					bordered>
					<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Name</Heading>
							<Text>{data?.profile.name}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Email</Heading>
							<Text>{data?.profile.email}</Text>
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Phone</Heading>
							<Text>{data?.profile.phone}</Text>
						</HeadingGroup>
					</Stack>
					<Stack alignItems="flex-start" direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Verification</Heading>
							<Status status={data?.profile.verified === VerificationEnum.VERIFIED} wrongLabel={VerificationEnum.VERIFICATION_PENDING} correctLabel={VerificationEnum.VERIFIED} />
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Status</Heading>
							<Status status={!data?.profile.is_blocked} wrongLabel="Blocked" />
						</HeadingGroup>
						<HeadingGroup className='mb-1'>
							<Heading level={6} className='info-heading'>Registered On</Heading>
							<Text><Moment datetime={data?.profile.created_at || ''} /></Text>
						</HeadingGroup>
					</Stack>
				</Panel>
			</div>
			<InstituteInfoUpdate modal={instituteUpdateModal} setModal={setInstituteUpdateModal} data={data} refetch={refetchData} error={error} loading={(isFetching || isLoading || isRefetching)} />
			<InstituteAuthUpdate modal={instituteAuthModal} setModal={setInstituteAuthModal} data={data} refetch={refetchData} error={error} loading={(isFetching || isLoading || isRefetching)} />
		</ErrorBoundaryLayout>
	)
}
