import { FC } from "react"
import { Drawer as MainDrawer } from "rsuite"
import { ChildrenType } from "../../utils/types";
import { ModalSize } from "rsuite/esm/Modal";


const InfoDrawer:FC<ChildrenType & {title: string; size?: ModalSize; drawer: {status: boolean, id?: number}; drawerHandler: (value:{status: boolean, id?: number})=>void}> = ({children, size="xs", title, drawer, drawerHandler}) => {

    return <MainDrawer size={size} open={drawer.status} onClose={()=>drawerHandler({status:false})}>
            <MainDrawer.Header>
                <MainDrawer.Title>{title}</MainDrawer.Title>
            </MainDrawer.Header>
            <MainDrawer.Body className="px-2">
                {children}
            </MainDrawer.Body>
        </MainDrawer>
}

export default InfoDrawer