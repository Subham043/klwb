import { FC } from "react"
import { Button, ButtonToolbar, Divider, Heading, HeadingGroup, Input, InputGroup, Pagination, Panel, Stack, Table, Text } from "rsuite"
import { Link, useParams } from "react-router-dom"
import ArowBackIcon from '@rsuite/icons/ArowBack';
import SearchIcon from '@rsuite/icons/Search';
import { useMediaQuery } from "rsuite/esm/useMediaQuery/useMediaQuery";
import { useInstituteRegisteredQuery, useInstitutesRegisteredStaffQuery } from "../../hooks/data/institute_registered";
import { useSearchQueryParam } from "../../hooks/useSearchQueryParam";
import { usePaginationQueryParam } from "../../hooks/usePaginationQueryParam";
import { useExcelExport } from "../../hooks/useExcelExport";
import { api_routes } from "../../utils/routes/api";
import { page_routes } from "../../utils/routes/pages";
import Status from "../../components/Status";
import Moment from "../../components/Moment";
import ErrorBoundaryLayout from "../../layouts/ErrorBoundaryLayout";


const InstituteRegisteredInfo:FC = () => {
    const [isMobile] = useMediaQuery('(max-width: 700px)');
    const {id} = useParams<{ id: string }>();
    const {data, isFetching, isLoading, isRefetching, refetch:refetchData, error } = useInstituteRegisteredQuery(Number(id) || 0, true);
    const {search, searchHandler} = useSearchQueryParam("_staff");
    const {page, pageHandler, limit, limitHandler} = usePaginationQueryParam("_staff");
    const {data:staffs, isFetching:isStaffFetching, isLoading:isStaffLoading } = useInstitutesRegisteredStaffQuery(Number(id) || 0);
    const {excelLoading, exportExcel} = useExcelExport();

    const excelHandler = async () => {
        await exportExcel(api_routes.admin.institute.registered.staff.excel(Number(id)), 'registered_institute_staffs.xlsx');
    }

    return <div className="data-table-container">
        <Panel
            bordered
            shaded
            header={
            <Stack justifyContent="space-between" alignItems="center">
                <div>
                    <h1 className="brand-text-color">Registered Institute Information</h1>
                </div>
                <ButtonToolbar>
                    <Button as={Link} appearance="primary" color="orange" startIcon={<ArowBackIcon />} to={page_routes.admin.institute.registered} >Go Back</Button>
                </ButtonToolbar>
            </Stack>
            }
        >
            <Divider />
            <div className="mb-1">
                <ErrorBoundaryLayout loading={(isFetching || isLoading || isRefetching)} error={error} refetch={refetchData}>
                    <Panel header="Profile Information" className='info-modal-panel' bordered>
                        <Stack divider={<Divider />} direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
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
                        <Stack divider={<Divider />} direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
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
                        <Stack divider={<Divider />} direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
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
                        <Stack divider={<Divider />} direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
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
                        <Stack divider={<Divider />} direction={isMobile ? 'column' : 'row'} spacing={10} className='info-modal-stack'>
                            <HeadingGroup className='mb-1'>
                                <Heading level={6} className='info-heading'>Institute Reg. File</Heading>
                                <img src={data?.reg_certification} alt="" style={{objectFit: 'contain', height: '200px'}} />
                            </HeadingGroup>
                            <HeadingGroup className='mb-1'>
                                <Heading level={6} className='info-heading'>Principal Signature</Heading>
                                <img src={data?.principal_signature} alt="" style={{objectFit: 'contain', height: '200px'}} />
                            </HeadingGroup>
                            <HeadingGroup className='mb-1'>
                                <Heading level={6} className='info-heading'>Seal</Heading>
                                <img src={data?.seal} alt="" style={{objectFit: 'contain', height: '200px'}} />
                            </HeadingGroup>
                        </Stack>
                    </Panel>
                </ErrorBoundaryLayout>
            </div>
            <div className="mb-1">
                <Panel header="Scholarship Information" className='info-modal-panel' bordered>

                </Panel>
            </div>
            <div className="mb-1">
                <Panel header="Employee Information" className='info-modal-panel' bordered>
                    <div className="mb-1">
                        <Stack justifyContent="space-between">
                            <ButtonToolbar>
                                <Button appearance="default" active loading={excelLoading} onClick={excelHandler}>
                                    Export Excel
                                </Button>
                            </ButtonToolbar>
                            <InputGroup size="md" inside>
                                <Input placeholder='Search' defaultValue={search} onChange={searchHandler} />
                                <InputGroup.Button>
                                    <SearchIcon />
                                </InputGroup.Button>
                            </InputGroup>
                        </Stack>
                    </div>
                    <Table
                        loading={isStaffLoading||isStaffFetching}
                        bordered={true}
                        cellBordered={true}
                        autoHeight={true}
                        height={100}
                        data={staffs?.data ?? []}
                    >
                        <Table.Column width={60} align="center" fixed>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.Cell dataKey="id" />
                        </Table.Column>

                        <Table.Column flexGrow={1}>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.Cell dataKey="name" />
                        </Table.Column>

                        <Table.Column flexGrow={1}>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.Cell dataKey="email" />
                        </Table.Column>

                        <Table.Column flexGrow={1}>
                            <Table.HeaderCell>Phone</Table.HeaderCell>
                            <Table.Cell dataKey="phone" />
                        </Table.Column>

                        <Table.Column flexGrow={1}>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.Cell dataKey="role" />
                        </Table.Column>

                        <Table.Column width={60} align="center" verticalAlign="middle">
                            <Table.HeaderCell>Status</Table.HeaderCell>

                            <Table.Cell style={{ padding: '6px' }}>
                                {rowData => (
                                    <Status status={!rowData.is_blocked} wrongLabel="Blocked" />
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

                    </Table>
                    <div className="mt-1">
                        <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            maxButtons={5}
                            size="sm"
                            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                            total={(staffs?.meta.total ?? 0)}
                            limitOptions={[10, 30, 50]}
                            limit={Number(limit)}
                            activePage={Number(page)}
                            onChangePage={pageHandler}
                            onChangeLimit={limitHandler}
                        />
                    </div>
                </Panel>
            </div>
        </Panel>
    </div>
}

export default InstituteRegisteredInfo