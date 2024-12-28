import {
  Button,
  ButtonToolbar,
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Stack,
  Table,
  Tooltip,
  Whisper,
} from "rsuite";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { usePaginationQueryParam } from "../../../hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "../../../hooks/useSearchQueryParam";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import SearchIcon from "@rsuite/icons/Search";
import { table } from "../../../utils/constants/table";
import { api_routes } from "../../../utils/routes/api";
import Moment from "../../Moment";
import { useRegisteredIndustriesContributionQuery } from "../../../hooks/data/registered_industry";
import ChangeListIcon from '@rsuite/icons/ChangeList';
import { usePdfExport } from "../../../hooks/usePdfExport";
import PaymentStatusBadge from "../../PaymentStatusBadge";

export type Props = {
  id: number;
};

const Receipt = ({ id }: { id: number }) => {
  const { pdfLoading, exportPdf } = usePdfExport();

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

const Excel = ({ link }: { link: string }) => {

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

export default function Contribution({ id }: Props) {
  const { search, searchHandler } = useSearchQueryParam("_contribution");
  const { page, pageHandler, limit, limitHandler } =
    usePaginationQueryParam("_contribution");
  const {
    data: contributions,
    isFetching: isContributionFetching,
    isLoading: isContributionLoading,
    isRefetching: isContributionRefetching,
    error,
    refetch: refetchData,
  } = useRegisteredIndustriesContributionQuery(Number(id) || 0);
  const { excelLoading, exportExcel } = useExcelExport();

  const excelHandler = async () => {
    await exportExcel(
      api_routes.admin.registered_industry.contribution.excel(Number(id)),
      "registered_industry_contributions.xlsx"
    );
  };

  return (
    <div className="mb-1">
      <ErrorBoundaryLayout error={error} refetch={refetchData}>
        <ModalCardContainer header="Contribution Information">
          <div className="mb-1">
            <Stack justifyContent="space-between">
              <ButtonToolbar>
                <Button
                  appearance="default"
                  active
                  loading={excelLoading}
                  onClick={excelHandler}
                >
                  Export Excel
                </Button>
              </ButtonToolbar>
              <InputGroup size="md" inside>
                <Input
                  placeholder="Search"
                  defaultValue={search}
                  onChange={searchHandler}
                />
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
            </Stack>
          </div>
          <Table
            loading={isContributionLoading || isContributionFetching || isContributionRefetching}
            {...table}
            data={contributions?.data || []}
          >
            <Table.Column width={60} align="center" fixed>
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.Cell dataKey="year" />
            </Table.Column>

            <Table.Column width={260}>
              <Table.HeaderCell>Company Name</Table.HeaderCell>
              <Table.Cell dataKey="industry.name" />
            </Table.Column>

            <Table.Column width={260}>
              <Table.HeaderCell>District</Table.HeaderCell>
              <Table.Cell dataKey="industry.city.name" />
            </Table.Column>

            <Table.Column width={260}>
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

            <Table.Column width={160}>
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

            <Table.Column width={80} verticalAlign="middle">
              <Table.HeaderCell>Reciept</Table.HeaderCell>

              <Table.Cell style={{ padding: '6px' }}>
                {rowData => rowData.status === 1 ? (
                  <Receipt id={rowData.id} />
                ) : (
                  <></>
                )}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={110} verticalAlign="middle">
              <Table.HeaderCell>Employee Excel</Table.HeaderCell>

              <Table.Cell style={{ padding: '6px' }}>
                {rowData => (rowData.status === 1 && rowData.employee_excel) ? (
                  <Excel link={rowData.employee_excel} />
                ) : (
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

            {/* <Table.Column width={70} fixed="right">
              <Table.HeaderCell>Action</Table.HeaderCell>

              <Table.Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <ButtonToolbar>
                    <ViewLink
                      to={page_routes.admin.contribution.view(rowData.id)}
                    />
                  </ButtonToolbar>
                )}
              </Table.Cell>
            </Table.Column> */}
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
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              total={contributions?.meta.total || 0}
              limitOptions={[10, 30, 50]}
              limit={Number(limit)}
              activePage={Number(page)}
              onChangePage={pageHandler}
              onChangeLimit={limitHandler}
            />
          </div>
        </ModalCardContainer>
      </ErrorBoundaryLayout>
    </div>
  );
}
