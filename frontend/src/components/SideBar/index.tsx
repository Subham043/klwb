import { FC } from 'react';
import { Nav, Sidebar, Sidenav } from 'rsuite';
import classes from './index.module.css'
// import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import ChangeListIcon from '@rsuite/icons/ChangeList';
import ListIcon from '@rsuite/icons/List';
import DocPassIcon from '@rsuite/icons/DocPass';
import DetailIcon from '@rsuite/icons/Detail';
import MemberIcon from '@rsuite/icons/Member';


const SideBar:FC<{expand: boolean}> = ({expand}) => {
    return (
        <Sidebar
            className={classes.sidebar}
            width={expand ? 260 : 56}
            collapsible
        >
            <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item eventKey="1" active icon={<ChangeListIcon />}>
                            Apply Scholarship
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<DocPassIcon />}>
                            Scholarship Status
                        </Nav.Item>
                        <Nav.Item eventKey="3" icon={<ListIcon />}>
                            Scholarship List
                        </Nav.Item>
                        <Nav.Item eventKey="4" icon={<DetailIcon />}>
                            Application Detail
                        </Nav.Item>
                        <Nav.Item eventKey="5" icon={<MemberIcon />}>
                            Account Settings
                        </Nav.Item>
                        {/* <Nav.Item eventKey="2" icon={<ArrowRightLineIcon />}>
                            User Group
                        </Nav.Item> */}
                        {/* <Nav.Menu
                            eventKey="3"
                            trigger="hover"
                            title="Advanced"
                            icon={<ArrowRightLineIcon />}
                            placement="leftStart"
                        >
                            <Nav.Item eventKey="3-1">Geo</Nav.Item>
                            <Nav.Item eventKey="3-2">Devices</Nav.Item>
                            <Nav.Item eventKey="3-3">Brand</Nav.Item>
                            <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                            <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
                        </Nav.Menu> */}
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </Sidebar>
    )
}

export default SideBar
