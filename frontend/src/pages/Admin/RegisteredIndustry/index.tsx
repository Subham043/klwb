import { FC } from "react"
import { ButtonToolbar, Table } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import { useRegisteredIndustriesQuery } from "../../../hooks/data/registered_industry";
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


const RegisteredIndustry:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useRegisteredIndustriesQuery();

    return <PaginatedTableLayout title="Registered Industries">
        <PaginatedTableLayout.Header title="Registered Industries" addBtn={false} excelLink={api_routes.admin.registered_industry.excel} excelName="registered_industry.xlsx">
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
                    <Table.Cell fullText dataKey="id" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.Cell fullText dataKey="industry.name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Director Name</Table.HeaderCell>
                    <Table.Cell fullText dataKey="name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.Cell fullText dataKey="email" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.Cell fullText dataKey="phone" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Act</Table.HeaderCell>
                    <Table.Cell fullText dataKey="industry.act_label" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.Cell fullText dataKey="industry.category" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>District</Table.HeaderCell>
                    <Table.Cell fullText dataKey="city.name" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>Taluq</Table.HeaderCell>
                    <Table.Cell fullText dataKey="taluq.name" />
                </Table.Column>

                <Table.Column width={60} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status status={!rowData.is_blocked} wrongLabel="Blocked" />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={160} align="center" verticalAlign="middle">
                    <Table.HeaderCell>Verification Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Status
                                status={
                                    rowData.verified === VerificationEnum.VERIFIED
                                }
                                wrongLabel={VerificationEnum.VERIFICATION_PENDING}
                                correctLabel={VerificationEnum.VERIFIED}
                            />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Created At</Table.HeaderCell>

                    <Table.Cell fullText style={{ padding: '6px' }}>
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
                                <ViewLink to={page_routes.admin.industry.registered_info(rowData.id)} />
                                <PasswordBtn route={api_routes.admin.registered_industry.update_password(Number(rowData.id) || 0)} />
                                <VerifyBtn route={api_routes.admin.registered_industry.verify(rowData.id)} refetch={refetch} isVerified={rowData.verified === VerificationEnum.VERIFIED} />
                                <BlockBtn route={api_routes.admin.registered_industry.toggle(Number(rowData.id) || 0)} refetch={refetch} isBlocked={rowData.is_blocked!} />
                            </ButtonToolbar>
                        )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
    </PaginatedTableLayout>
}

export default RegisteredIndustry