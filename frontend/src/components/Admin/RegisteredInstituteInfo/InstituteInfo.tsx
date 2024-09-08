import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { useToast } from "../../../hooks/useToast";
import { useAxios } from "../../../hooks/useAxios";
import { useState } from "react";
import { useRegisteredInstituteQuery } from "../../../hooks/data/registered_institute";
import { api_routes } from "../../../utils/routes/api";
import { Button, ButtonToolbar, Col, Grid, Heading, Panel, Row, Stack } from "rsuite";
import Status from "../../Status";
import { VerificationEnum } from "../../../utils/constants/verified";
import InstituteInfoUpdate from "./InstituteInfoUpdate";
import InstituteAuthUpdate from "./InstituteAuthUpdate";
import FileViewer from "../../FileViewer";
import DetailInfo from "../../DetailInfo";
import Moment from "../../Moment";

type Props = {
	id: number;
}

export default function InstituteInfo({ id }: Props) {
	const { toastError, toastSuccess } = useToast();
	const axios = useAxios();
	const { data, isFetching, isLoading, isRefetching, refetch: refetchData, error } = useRegisteredInstituteQuery(Number(id) || 0, true);
	const [toggleLoading, setToggleLoading] = useState<boolean>(false);
	const [instituteUpdateModal, setInstituteUpdateModal] = useState<boolean>(false);
	const [instituteAuthModal, setInstituteAuthModal] = useState<boolean>(false);

	const toggleStatus = async () => {
		setToggleLoading(true);
		try {
			const response = await axios.get(api_routes.admin.registered_institute.toggle(Number(id) || 0));
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
						<Grid fluid>
							<Row gutter={30}>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Name" value={data?.institute.name} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Principal Name" value={data?.principal} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Email" value={data?.email} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Phone" value={data?.phone} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Management Type" value={data?.institute.management_type} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Institute Category" value={data?.institute.category} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Institute Type" value={data?.institute.type} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Region Type" value={data?.institute.urban_rural} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Pincode" value={data?.address.pincode} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Address" value={data?.address.address} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="District" value={data?.address.city.name} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Taluq" value={data?.address.taluq.name} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Institute Reg. File" value={<FileViewer src={data?.reg_certification} />} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Principal Signature" value={<FileViewer src={data?.principal_signature} />} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Seal" value={<FileViewer src={data?.seal} />} />
									</Col>
							</Row>
						</Grid>
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
						<Grid fluid>
							<Row gutter={30}>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Name" value={data?.profile.name} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Email" value={data?.profile.email} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Phone" value={data?.profile.phone} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Verification" value={<Status status={data?.profile.verified === VerificationEnum.VERIFIED} wrongLabel={VerificationEnum.VERIFICATION_PENDING} correctLabel={VerificationEnum.VERIFIED} />} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Status" value={<Status status={!data?.profile.is_blocked} wrongLabel="Blocked" />} />
									</Col>
									<Col className="pb-1" xs={8}>
											<DetailInfo title="Registered On" value={<Moment datetime={data?.profile.created_at || ''} />} />
									</Col>
							</Row>
						</Grid>
				</Panel>
			</div>
			<InstituteInfoUpdate modal={instituteUpdateModal} setModal={setInstituteUpdateModal} data={data} refetch={refetchData} error={error} loading={(isFetching || isLoading || isRefetching)} />
			<InstituteAuthUpdate modal={instituteAuthModal} setModal={setInstituteAuthModal} data={data} refetch={refetchData} error={error} loading={(isFetching || isLoading || isRefetching)} />
		</ErrorBoundaryLayout>
	)
}
