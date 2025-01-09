import { FC, useState } from "react"
import { Badge, ButtonToolbar, IconButton, Table, Tooltip, Whisper } from "rsuite"
import PaginatedTableLayout from "../../../layouts/PaginatedTable";
import Moment from "../../../components/Moment";
import { useContributionsQuery } from "../../../hooks/data/contribution";
import SelectYear from "../../../components/Institute/SelectYear";
import { table } from "../../../utils/constants/table";
import { api_routes } from "../../../utils/routes/api";
import ChangeListIcon from '@rsuite/icons/ChangeList';
import { usePdfExport } from "../../../hooks/usePdfExport";
import PaymentStatusBadge from "../../../components/PaymentStatusBadge";
import SelectCityStatus from "../../../components/SelectCity";
import SelectTaluqStatus from "../../../components/SelectTaluq";
import SelectDateRangePicker from "../../../components/SelectDateRangePicker";
import { useAxios } from "../../../hooks/useAxios";
import { useToast } from "../../../hooks/useToast";
import ReloadIcon from '@rsuite/icons/Reload';
import { DrawerProps } from "../../../utils/types";
import EditBtn from "../../../components/Buttons/EditBtn";
import ContributionForm from "../../../components/Admin/ContributionForm";
import ContributionActivityLog from "../../../components/Admin/ContributionActivityLog";
import EventDetailIcon from '@rsuite/icons/EventDetail';

const Reverify = ({reg_industry_id, id, refetch}:{reg_industry_id: number, id: number, refetch: () => void}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const axios = useAxios();
    const {toastError} = useToast();
  
    const reVerifyHandler = async () => {
        setLoading(true);
        try {
            await axios.get(api_routes.admin.registered_industry.contribution.re_verify(reg_industry_id, id));
            refetch();
        } catch (error) {
            toastError("Failed to re-verify payment. Please try again later.")
        }finally {
            setLoading(false);
        }
    }
    return (
        <Whisper
            placement="bottomEnd"
            controlId="control-id-click"
            trigger="hover"
            speaker={<Tooltip>Re-Verify</Tooltip>}
        >
            <IconButton
                appearance="primary"
                color="violet"
                size="sm"
                icon={<ReloadIcon />}
                loading={loading}
                onClick={reVerifyHandler}
            />
        </Whisper>
    )
  }

const Receipt = ({id}:{id: number}) => {
    const {pdfLoading, exportPdf} = usePdfExport();

    const exportPdfHandler = async () => {
        await exportPdf(api_routes.admin.contribution.reciept(id || ""), "Reciept.pdf")
    }
    return (
        <ButtonToolbar>
            <Whisper
                placement="bottomEnd"
                controlId="control-id-click"
                trigger="hover"
                speaker={<Tooltip>Download</Tooltip>}
            >
            <IconButton
                appearance="primary"
                color={"green"}
                icon={<ChangeListIcon />}
                loading={pdfLoading}
                onClick={exportPdfHandler}
                size="sm"
            />
            </Whisper>
        </ButtonToolbar>
    )
}

const Excel = ({link}:{link: string}) => {

    return (
        <ButtonToolbar>
            <Whisper
                placement="bottomEnd"
                controlId="control-id-click"
                trigger="hover"
                speaker={<Tooltip>Download</Tooltip>}
            >
            <IconButton
                appearance="primary"
                color={"green"}
                icon={<ChangeListIcon />}
                as={"a"}
                href={link}
                download={true}
                size="sm"
            />
            </Whisper>
        </ButtonToolbar>
    )
}


const ContributionListPage:FC = () => {
    const {data, isLoading, isFetching, isRefetching, refetch, error} = useContributionsQuery();
    const [openDrawer, setOpenDrawer] = useState<DrawerProps>({status:false, type:'Create'});
    const [modal, setModal] = useState<{ status: boolean; data: number|null }>({ status: false, data: null });

    return <PaginatedTableLayout title="Contribution Comleted">
        <PaginatedTableLayout.Header title="Contribution Comleted" addBtn={false} excelLink={api_routes.admin.contribution.excel} excelName="contribution.xlsx">
            <SelectDateRangePicker />
            <SelectCityStatus />
            <SelectTaluqStatus />
            <SelectYear />
        </PaginatedTableLayout.Header>
        <PaginatedTableLayout.Content total={(data?.meta.total || 0)} error={error} refetch={refetch}>
            <Table
                loading={isLoading||isFetching||isRefetching}
                {...table}
                data={data?.data || []}
            >
                <Table.Column width={60} align="center" fixed>
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.Cell dataKey="year" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Company Name</Table.HeaderCell>
                    <Table.Cell dataKey="industry.name" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Company Act</Table.HeaderCell>
                    <Table.Cell dataKey="industry.act_label" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Company Category</Table.HeaderCell>
                    <Table.Cell dataKey="industry.category" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>District</Table.HeaderCell>
                    <Table.Cell dataKey="industry.city.name" />
                </Table.Column>

                <Table.Column  width={260}>
                    <Table.HeaderCell>Taluq</Table.HeaderCell>
                    <Table.Cell dataKey="industry.taluq.name" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Male Count</Table.HeaderCell>
                    <Table.Cell dataKey="male" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Female Count</Table.HeaderCell>
                    <Table.Cell dataKey="female" />
                </Table.Column>

                <Table.Column width={260}>
                    <Table.HeaderCell>Total Count</Table.HeaderCell>
                    <Table.Cell dataKey="total_employees" />
                </Table.Column>

                <Table.Column  width={160}>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.Cell dataKey="price" />
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Status</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <PaymentStatusBadge pay_status={rowData.status} />
                        )}
                    </Table.Cell>
                </Table.Column>
                
                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Edited</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            rowData.is_edited ? <Badge style={{ background: '#4caf50', padding: '7px 9px', }} content={'YES'} /> :
                            <Badge style={{ background: '#f44336', padding: '7px 9px', }} content={'NO'} />
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={80} verticalAlign="middle">
                    <Table.HeaderCell>Reciept</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => rowData.status === 1 ? (
                            <Receipt id={rowData.id} />
                        ): (
                            <></>
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={110} verticalAlign="middle">
                    <Table.HeaderCell>Employee Excel</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (rowData.status === 1 && rowData.employee_excel) ? (
                            <Excel link={rowData.employee_excel} />
                        ): (
                            <></>
                        )}
                    </Table.Cell>
                </Table.Column>

                <Table.Column width={250} verticalAlign="middle">
                    <Table.HeaderCell>Paid On</Table.HeaderCell>

                    <Table.Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Moment datetime={rowData.payed_on} />
                        )}
                    </Table.Cell>
                </Table.Column>
                <Table.Column width={130} fixed="right">
                    <Table.HeaderCell>Action</Table.HeaderCell>
    
                    <Table.Cell style={{ padding: "6px" }}>
                    {(rowData) => (
                        <ButtonToolbar>
                            <EditBtn clickHandler={() => setOpenDrawer({status:true, type:'Edit', id:rowData.id})} />
                            <Reverify reg_industry_id={rowData.comp_regd_id} id={rowData.id} refetch={refetch} />
                            <IconButton appearance="primary" color="cyan" size="sm" icon={<EventDetailIcon />} onClick={() => setModal({ status: true, data: rowData.id })} />
                        </ButtonToolbar>
                    )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </PaginatedTableLayout.Content>
        <ContributionForm drawer={openDrawer} drawerHandler={(value)=>setOpenDrawer(value)} refetch={refetch} />
        <ContributionActivityLog modal={modal} modalHandler={setModal} />
    </PaginatedTableLayout>
}

export default ContributionListPage