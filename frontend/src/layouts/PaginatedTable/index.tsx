import { FC, ReactNode } from "react"
import { Button, ButtonToolbar, Divider, Input, InputGroup, Message, Pagination, Panel, Stack } from "rsuite"
import SearchIcon from '@rsuite/icons/Search';
import { usePaginationQueryParam } from "../../hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "../../hooks/useSearchQueryParam";
import { useExcelExport } from "../../hooks/useExcelExport";
import { AxiosError } from "axios";
import ReloadIcon from '@rsuite/icons/Reload';

type HeaderProps = { 
    title: string; 
    addBtn?: boolean; 
    buttonName?: string; 
    excelLink: string, 
    excelName: string,
    addHandler?: () => void;
    children?: ReactNode;
}

type ContentProps = {
    total: number;
    children?: ReactNode;
    error?: unknown;
    refetch?: () => void;
}

type Props = { 
    title: string;
    children?: ReactNode;
}

// Define the Select component with the Option subcomponent
const PaginatedTableLayout: FC<Props> & {
  Header: FC<HeaderProps>;
  Content: FC<ContentProps>;
} = ({ children, title }) => {

  return <div className="data-table-container">
        <Panel
            bordered
            shaded
            header={
                <Stack justifyContent="center">
                    <div>
                        <h1 className="brand-text-color">{title}</h1>
                    </div>
                </Stack>
            }
        >
            <Divider />
            <>
                {children}
            </>
        </Panel>
    </div>
};

// Define the Option subcomponent
const Header = ({ children, title, buttonName = title, excelLink, excelName, addBtn = true, addHandler }: HeaderProps) => {
    const {excelLoading, exportExcel} = useExcelExport();
    const { search, searchHandler } = useSearchQueryParam();
    const excelHandler = async () => {
        await exportExcel(excelLink, excelName);
    }

    return <div className="mb-1">
        <Stack justifyContent="space-between">
            <ButtonToolbar>
                {addBtn && <Button appearance="primary" type="button" active onClick={addHandler ? addHandler : undefined}>
                    Add {buttonName}
                </Button>}
                <Button appearance="default" type="button" active loading={excelLoading} onClick={excelHandler}>
                    Export Excel
                </Button>
            </ButtonToolbar>
            <div>
               {children}
                <InputGroup size="md" inside>
                    <Input placeholder='Search' defaultValue={search} onChange={searchHandler} />
                    <InputGroup.Button>
                        <SearchIcon />
                    </InputGroup.Button>
                </InputGroup>
            </div>
        </Stack>
    </div>
};

// Define the Option subcomponent
const Content = ({ children, total, error, refetch }: ContentProps) => {
    const { page, pageHandler, limit, limitHandler } = usePaginationQueryParam();
    return <>
        {
            error ? 
            <Message showIcon type="error" header="A problem occurred">
                <p>{(error instanceof AxiosError ? error.response?.data?.message : (error instanceof Error ?  error.message : "Something went wrong! Please try again."))}</p>
                <Button className="mt-1" type="button" color="red" appearance="primary" startIcon={<ReloadIcon />} onClick={() => refetch ? refetch() : undefined}>
                    Try Again
                </Button>
            </Message>: <>
                {children}
            </>
        }
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
                total={total}
                limitOptions={[10, 30, 50]}
                limit={Number(limit)}
                activePage={Number(page)}
                onChangePage={pageHandler}
                onChangeLimit={limitHandler}
            />
        </div>
    </>
};

PaginatedTableLayout.Header = Header;
PaginatedTableLayout.Content = Content;

export default PaginatedTableLayout;