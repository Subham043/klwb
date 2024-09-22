import {
  Button,
  ButtonToolbar,
  Input,
  InputGroup,
  Pagination,
  Stack,
  Table,
} from "rsuite";
import Status from "../../Status";
import Moment from "../../Moment";
import { useRegisteredIndustriesStaffQuery } from "../../../hooks/data/registered_industry";
import { useExcelExport } from "../../../hooks/useExcelExport";
import { useSearchQueryParam } from "../../../hooks/useSearchQueryParam";
import { usePaginationQueryParam } from "../../../hooks/usePaginationQueryParam";
import { api_routes } from "../../../utils/routes/api";
import SearchIcon from "@rsuite/icons/Search";
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import { table } from "../../../utils/constants/table";
import ModalCardContainer from "../../MainCards/ModalCardContainer";
import BlockBtn from "../../Buttons/BlockBtn";
import { RegisteredIndustryStaffType } from "../../../utils/types";
import { useState } from "react";
import EditBtn from "../../Buttons/EditBtn";
import PasswordBtn from "../../Buttons/PasswordBtn";
import StaffForm from "./StaffForm";
import { VerificationEnum } from "../../../utils/constants/verified";

type Props = {
  id: number;
};

type Modal =
  | {
      status: false;
    }
  | {
      status: true;
      data: RegisteredIndustryStaffType | undefined;
    };

export default function Staff({ id }: Props) {
  const { search, searchHandler } = useSearchQueryParam("_staff");
  const { page, pageHandler, limit, limitHandler } =
    usePaginationQueryParam("_staff");
  const {
    data: staffs,
    isFetching: isStaffFetching,
    isLoading: isStaffLoading,
    isRefetching: isStaffRefetching,
    error,
    refetch: refetchData,
  } = useRegisteredIndustriesStaffQuery(Number(id) || 0);
  const { excelLoading, exportExcel } = useExcelExport();
  const [staffModal, setStaffModal] = useState<Modal>({ status: false });

  const excelHandler = async () => {
    await exportExcel(
      api_routes.admin.registered_industry.staff.excel(Number(id)),
      "registered_industry_staffs.xlsx"
    );
  };

  return (
    <div className="mb-1">
      <ErrorBoundaryLayout error={error} refetch={refetchData}>
        <ModalCardContainer header="Employee Information">
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
            loading={isStaffLoading || isStaffFetching || isStaffRefetching}
            {...table}
            data={staffs?.data || []}
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

              <Table.Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <Status status={!rowData.is_blocked} wrongLabel="Blocked" />
                )}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={160} align="center" verticalAlign="middle">
              <Table.HeaderCell>Verification Status</Table.HeaderCell>

              <Table.Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <Status
                    status={rowData.verified === VerificationEnum.VERIFIED}
                    wrongLabel={VerificationEnum.VERIFICATION_PENDING}
                    correctLabel={VerificationEnum.VERIFIED}
                  />
                )}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={250} verticalAlign="middle">
              <Table.HeaderCell>Created At</Table.HeaderCell>

              <Table.Cell style={{ padding: "6px" }}>
                {(rowData) => <Moment datetime={rowData.created_at} />}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={140} fixed="right">
              <Table.HeaderCell>Action</Table.HeaderCell>

              <Table.Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <ButtonToolbar>
                    <EditBtn
                      clickHandler={() =>
                        setStaffModal({
                          status: true,
                          data: rowData as RegisteredIndustryStaffType,
                        })
                      }
                    />
                    <PasswordBtn
                      route={api_routes.admin.registered_industry.staff.password(
                        Number(id) || 0,
                        rowData.id
                      )}
                    />
                    <BlockBtn
                      route={api_routes.admin.registered_industry.staff.status(
                        Number(id) || 0,
                        rowData.id
                      )}
                      refetch={refetchData}
                      isBlocked={rowData.is_blocked!}
                    />
                  </ButtonToolbar>
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
              layout={["total", "-", "limit", "|", "pager", "skip"]}
              total={staffs?.meta.total || 0}
              limitOptions={[10, 30, 50]}
              limit={Number(limit)}
              activePage={Number(page)}
              onChangePage={pageHandler}
              onChangeLimit={limitHandler}
            />
          </div>
        </ModalCardContainer>
        <StaffForm
          modal={staffModal}
          closeModal={() => setStaffModal({ status: false })}
          refetch={refetchData}
          id={Number(id)}
        />
      </ErrorBoundaryLayout>
    </div>
  );
}
