import { FC } from "react"
import { Button, ButtonToolbar, Divider, Input, InputGroup, Pagination, Panel, Stack } from "rsuite"
import { ChildrenType } from "../../utils/types";
import SearchIcon from '@rsuite/icons/Search';
import { useSearchQueryParam } from "../../hooks/useSearchQueryParam";
import { usePaginationQueryParam } from "../../hooks/usePaginationQueryParam";


const PaginatedTableLayout:FC<ChildrenType & {title: string; addBtn?:boolean; buttonName?: string; total: number; excelLoading: boolean, excelHandler: () => void; addHandler?: () => void;}> = ({children, title, buttonName = title, total, excelLoading, addBtn=true, excelHandler, addHandler}) => {
    const {search, searchHandler} = useSearchQueryParam();
    const {page, pageHandler, limit, limitHandler} = usePaginationQueryParam();

    return<div className="data-table-container">
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
            <div className="mb-1">
                <Stack justifyContent="space-between">
                    <ButtonToolbar>
                        {addBtn && <Button appearance="primary" active onClick={addHandler ? addHandler : undefined}>
                            Add {buttonName}
                        </Button>}
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
            {children}
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
        </Panel>
    </div>
}

export default PaginatedTableLayout