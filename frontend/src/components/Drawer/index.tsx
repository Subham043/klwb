import { FC } from "react"
import { Drawer as MainDrawer } from "rsuite"
import { ChildrenType, DrawerProps } from "../../utils/types";


const Drawer:FC<ChildrenType & {title: string; drawer: DrawerProps; drawerHandler: (value:DrawerProps)=>void}> = ({children, title, drawer, drawerHandler}) => {

    return <MainDrawer size="xs" open={drawer.status} onClose={()=>drawerHandler({status:false, type:'Create'})}>
            <MainDrawer.Header>
                <MainDrawer.Title>{drawer.type==='Create' ? 'Add': 'Update'} {title}</MainDrawer.Title>
            </MainDrawer.Header>
            <MainDrawer.Body className="px-2">
                {children}
            </MainDrawer.Body>
        </MainDrawer>
}

export default Drawer