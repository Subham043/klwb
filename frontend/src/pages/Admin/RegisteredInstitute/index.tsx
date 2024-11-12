import { FC } from "react"
import { ButtonToolbar, Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { useRegisteredInstitutesQuery } from "../../../hooks/data/registered_institute";
import { api_routes } from "../../../utils/routes/api";
import { page_routes } from "../../../utils/routes/pages";
import Moment from "../../../components/Moment";
import Status from "../../../components/Status";
import { table } from "../../../utils/constants/table";
import { ViewLink } from "../../../components/Buttons/ViewBtn";
import BlockBtn from "../../../components/Buttons/BlockBtn";
import PasswordBtn from "../../../components/Buttons/PasswordBtn";
import { VerificationEnum } from "../../../utils/constants/verified";
import VerifyBtn from "../../../components/Buttons/VerifyBtn";
import SelectCityStatus from "../../../components/SelectCity";
import SelectTaluqStatus from "../../../components/SelectTaluq";
import SelectAccountStatus from "../../../components/SelectAccountStatus";
import SelectVerificationStatus from "../../../components/SelectVerificationStatus";


const RegisteredInstitute:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useRegisteredInstitutesQuery();

    return <PaginatedTableLayout title="Institutes Registered">
        <PaginatedTableLayout.Header title="Institutes Registered" addBtn={false} excelLink={api_routes.admin.registered_institute.excel} excelName="registered_institute.xlsx">
            <SelectCityStatus />
            <SelectTaluqStatus />
            <SelectAccountStatus />
            <SelectVerificationStatus />
        </PaginatedTableLayout.Header>
        <PaginatedTableLayout.Content total={(data?.meta.total || 0)} error={error} refetch={refetch}>
            <Table
                loading={isLoading||isFetching||isRefetching}
                {...table}
                data={data?.data || []}
            >
                <Table.Column width={60} align="center" fixed>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.Cell dataKey="id" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.Cell dataKey="institute.name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Principal Name</Table.HeaderCell>
                    <Table.Cell dataKey="principal" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.Cell dataKey="email" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.Cell dataKey="phone" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Management Type</Table.HeaderCell>
                    <Table.Cell dataKey="institute.management_type" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>District</Table.HeaderCell>
                    <Table.Cell dataKey="address.city.name" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>Taluq</Table.HeaderCell>
                    <Table.Cell dataKey="address.taluq.name" />
                </Table.Column>

                <Table.Column width={60} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={!rowData.profile.is_blocked} wrongLabel="Blocked" />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={160} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Verification Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status
                                status={
                                    rowData.profile.verified === VerificationEnum.VERIFIED
                                }
                                wrongLabel={VerificationEnum.VERIFICATION_PENDING}
                                correctLabel={VerificationEnum.VERIFIED}
                            />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Created At</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.created_at} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={190} fixed="right">
                    <Table.HeaderCell>Action</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <ButtonToolbar>
                                <ViewLink to={page_routes.admin.institute.registered_info(rowData.id)} />
                                <PasswordBtn route={api_routes.admin.registered_institute.update_password(Number(rowData.id) || 0)} />
                                <VerifyBtn route={api_routes.admin.registered_institute.verify(rowData.id)} refetch={refetch} isVerified={rowData.profile.verified === VerificationEnum.VERIFIED} />
                                <BlockBtn route={api_routes.admin.registered_institute.toggle(Number(rowData.id) || 0)} refetch={refetch} isBlocked={rowData.profile.is_blocked!} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default RegisteredInstitute