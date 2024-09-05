import {
	Button,
	ButtonToolbar,
	Col,
	Heading,
	HeadingGroup,
	Panel,
	Row,
	Stack,
	Text,
	useMediaQuery,
} from "rsuite";
import { useInstituteAccountQuery } from "../../../../hooks/data/profile";
import ErrorBoundaryLayout from "../../../../layouts/ErrorBoundaryLayout";
import FileUploader from "../../../FileUploader";
import { api_routes } from "../../../../utils/routes/api";
import { useState } from "react";
import AccountInfoUpdate from "./AccountInfoUpdate";
import { useUser } from "../../../../hooks/useUser";
import { RolesEnum } from "../../../../utils/constants/role";

export default function InstituteDashboardAccountInfo() {
	const [isMobile] = useMediaQuery("(max-width: 700px)");
	const [instituteUpdateModal, setInstituteUpdateModal] = useState<boolean>(false);
	const {user} = useUser();
	const {
			data: account_info,
			isLoading: isAccountLoading,
			isFetching: isAccountFetching,
			isRefetching: isAccountRefetching,
			refetch: accountRefetch,
			error: accountError,
	} = useInstituteAccountQuery(true);

	return (
			<div>
					<ErrorBoundaryLayout
							loading={isAccountRefetching || isAccountLoading || isAccountFetching}
							error={accountError}
							refetch={accountRefetch}
					>
							<div className="mt-1">
									<Panel
											header={
													<Stack justifyContent={(user && user.role === RolesEnum.INSTITUTE) ? "space-between" : "center"}>
															<Heading level={6} style={{ color: "white" }}>
																	Industry Information
															</Heading>
															{(user && user.role === RolesEnum.INSTITUTE) && <ButtonToolbar>
																	<Button appearance="primary" color="green" size="sm" onClick={() => setInstituteUpdateModal(true)}>
																			Edit
																	</Button>
															</ButtonToolbar>}
													</Stack>
											}
											className="info-modal-panel"
											bordered
											style={{ backgroundColor: "white" }}
									>
											<Stack
													alignItems="flex-start"
													direction={isMobile ? "column" : "row"}
													spacing={10}
													className="info-modal-stack"
											>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Institute Name
															</Heading>
															<Text>{account_info?.institute.name}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Institute Reg. No.
															</Heading>
															<Text>{account_info?.reg_no}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Prinicpal Name
															</Heading>
															<Text>{account_info?.principal}</Text>
													</HeadingGroup>
											</Stack>
											<Stack
													alignItems="flex-start"
													direction={isMobile ? "column" : "row"}
													spacing={10}
													className="info-modal-stack"
											>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Email
															</Heading>
															<Text>{account_info?.email}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Phone
															</Heading>
															<Text>{account_info?.phone}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Pincode
															</Heading>
															<Text>{account_info?.address.pincode}</Text>
													</HeadingGroup>
											</Stack>
											<Stack
													alignItems="flex-start"
													direction={isMobile ? "column" : "row"}
													spacing={10}
													className="info-modal-stack"
											>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	District
															</Heading>
															<Text>{account_info?.address.city.name}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Taluq
															</Heading>
															<Text>{account_info?.address.taluq.name}</Text>
													</HeadingGroup>
													<HeadingGroup className="mb-1">
															<Heading level={6} className="info-heading">
																	Address
															</Heading>
															<Text>{account_info?.address.address}</Text>
													</HeadingGroup>
											</Stack>
									</Panel>
							</div>
							<div className="mt-1">
									<Row gutter={30}>
											<Col xs={8}>
													<Panel
															header={
																	<Stack justifyContent="center">
																			<Heading level={6} style={{ color: "white" }}>
																					Registration Certificate
																			</Heading>
																	</Stack>
															}
															className="info-modal-panel"
															bordered
															style={{ backgroundColor: "white" }}
													>
														<FileUploader src={account_info?.reg_certification} name="reg_certification" apiRoute={api_routes.institute.account.doc_update} refetch={accountRefetch} allowed={(user && user.role === RolesEnum.INSTITUTE) ? true : false} />
													</Panel>
											</Col>
											<Col xs={8}>
													<Panel
															header={
																	<Stack justifyContent="center">
																			<Heading level={6} style={{ color: "white" }}>
																					Principal Signature
																			</Heading>
																	</Stack>
															}
															className="info-modal-panel"
															bordered
															style={{ backgroundColor: "white" }}
													>
														<FileUploader src={account_info?.principal_signature} name="principal_signature" apiRoute={api_routes.institute.account.doc_update} refetch={accountRefetch} allowed={(user && user.role === RolesEnum.INSTITUTE) ? true : false} />
													</Panel>
											</Col>
											<Col xs={8}>
													<Panel
															header={
																	<Stack justifyContent="center">
																			<Heading level={6} style={{ color: "white" }}>
																					Institute Seal
																			</Heading>
																	</Stack>
															}
															className="info-modal-panel"
															bordered
															style={{ backgroundColor: "white" }}
													>
														<FileUploader src={account_info?.seal} name="seal" apiRoute={api_routes.institute.account.doc_update} refetch={accountRefetch} allowed={(user && user.role === RolesEnum.INSTITUTE) ? true : false} />
													</Panel>
											</Col>
									</Row>
							</div>
							{(user && user.role === RolesEnum.INSTITUTE) && <AccountInfoUpdate modal={instituteUpdateModal} setModal={setInstituteUpdateModal} data={account_info} refetch={accountRefetch} error={accountError} loading={(isAccountRefetching || isAccountLoading || isAccountFetching)} />}
					</ErrorBoundaryLayout>
			</div>
	);
}
