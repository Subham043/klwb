import { FC, ReactNode } from "react"
import { Button, ButtonToolbar, Divider, Input, InputGroup, Message, Pagination, Stack, useMediaQuery } from "rsuite"
import SearchIcon from '@rsuite/icons/Search';
import { usePaginationQueryParam } from "../../hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "../../hooks/useSearchQueryParam";
import { useExcelExport } from "../../hooks/useExcelExport";
import { AxiosError } from "axios";
import ReloadIcon from '@rsuite/icons/Reload';
import PanelCardContainer from "../../components/MainCards/PanelCardContainer";

type HeaderProps = { 
    title: string; 
    addBtn?: boolean; 
    searchInput?: boolean; 
    buttonName?: string; 
    excelLink?: string, 
    excelName?: string,
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
        <PanelCardContainer
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
        </PanelCardContainer>
    </div>
};

// Define the Option subcomponent
const Header = ({ children, title, buttonName = title, excelLink, excelName, addBtn = true, searchInput = true, addHandler }: HeaderProps) => {
    const {excelLoading, exportExcel} = useExcelExport();
    const { search, searchHandler } = useSearchQueryParam();
    const excelHandler = async () => {
        (excelLink && excelName) ? await exportExcel(excelLink, excelName) : null;
    }
    const [isMobile] = useMediaQuery('(max-width: 700px)');

    return <div className="mb-1">
        <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" spacing={10}>
            <ButtonToolbar>
                {addBtn && <Button appearance="primary" type="button" active onClick={addHandler ? addHandler : undefined}>
                    Add {buttonName}
                </Button>}
                {(excelLink && excelName) && <Button appearance="default" type="button" active loading={excelLoading} onClick={excelHandler}>
                    Export Excel
                </Button>}
            </ButtonToolbar>
            <Stack direction={isMobile ? 'column' : 'row'} justifyContent="flex-end" alignItems="center" style={{ gap: 10, width: isMobile ? '100%' : 'auto' }}>
                {children}
                {searchInput && <InputGroup size="md" inside>
                    <Input placeholder='Search' defaultValue={search} onChange={searchHandler} />
                    <InputGroup.Button>
                        <SearchIcon />
                    </InputGroup.Button>
                </InputGroup>}
            </Stack>
        </Stack>
    </div>
};

// Define the Option subcomponent
const Content = ({ children, total, error, refetch }: ContentProps) => {
    const { page, pageHandler, limit, limitHandler } = usePaginationQueryParam();
    const isMobile = useMediaQuery(`(max-width: 700px)`);
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
                first={isMobile ? false : true}
                last={isMobile ? false : true}
                ellipsis
                boundaryLinks
                maxButtons={isMobile ? 3 : 5}
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