import { FC } from 'react';
import { Nav, Sidebar, Sidenav } from 'rsuite';
import classes from './index.module.css'
import ChangeListIcon from '@rsuite/icons/ChangeList';
import ListIcon from '@rsuite/icons/List';
import DocPassIcon from '@rsuite/icons/DocPass';
import DetailIcon from '@rsuite/icons/Detail';
import MemberIcon from '@rsuite/icons/Member';
import TextImageIcon from '@rsuite/icons/TextImage';
import { useAccountModal } from '../../hooks/useAccountModal';


const SideBar:FC<{expand: boolean}> = ({expand}) => {
    const {toggleAccountModal} = useAccountModal();

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
                        <Nav.Item eventKey="5" icon={<MemberIcon />} onClick={() => toggleAccountModal(true)}>
                            Account Settings
                        </Nav.Item>
                        <Nav.Menu
                            eventKey="6"
                            trigger="hover"
                            title="Course Management"
                            icon={<TextImageIcon />}
                            placement="rightStart"
                        >
                            <Nav.Item eventKey="6-1">Graduation</Nav.Item>
                            <Nav.Item eventKey="6-2">Class</Nav.Item>
                            <Nav.Item eventKey="6-3">Course</Nav.Item>
                        </Nav.Menu>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </Sidebar>
    )
}

export default SideBar
