import { FC } from 'react';
import { Nav, Sidebar, Sidenav, Text } from 'rsuite';
import classes from './index.module.css'
import ChangeListIcon from '@rsuite/icons/ChangeList';
import ListIcon from '@rsuite/icons/List';
import DocPassIcon from '@rsuite/icons/DocPass';
import DetailIcon from '@rsuite/icons/Detail';
import TextImageIcon from '@rsuite/icons/TextImage';
import LocationIcon from '@rsuite/icons/Location';
import PeoplesIcon from '@rsuite/icons/Peoples';
import GearIcon from '@rsuite/icons/Gear';
import SettingHorizontalIcon from '@rsuite/icons/SettingHorizontal';
import { useAccountModal } from '../../hooks/useAccountModal';
import { useUser } from '../../hooks/useUser';
import { NavLink } from 'react-router-dom';
import { page_routes } from '../../utils/page_routes';
import CalendarIcon from '@rsuite/icons/Calendar';
import TagNumberIcon from '@rsuite/icons/TagNumber';

const NavMenu = () => {
    const  {user} = useUser();
    return <>
            {
                ["Student"].includes((user && user.role) ? user.role : "Student") && <>
                    <Nav.Item eventKey="1" icon={<ChangeListIcon />}>
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
                </>
            }
            {
                ["Super-Admin", "Admin"].includes((user && user.role) ? user.role : "Student") && <>
                    <Nav.Item eventKey="8" icon={<PeoplesIcon />}>
                        <NavLink to={page_routes.employee} className='w-100 h-100 d-inline-block sidebar-navlink'>Employee Management</NavLink>
                    </Nav.Item>
                    <Nav.Item eventKey="10" icon={<CalendarIcon />}>
                        <NavLink to={page_routes.application_date} className='w-100 h-100 d-inline-block sidebar-navlink'>Application Dates</NavLink>
                    </Nav.Item>
                    <Nav.Item eventKey="11" icon={<TagNumberIcon />}>
                        <NavLink to={page_routes.application_fee} className='w-100 h-100 d-inline-block sidebar-navlink'>Scholarship Fees</NavLink>
                    </Nav.Item>
                    <Nav.Item eventKey="9" icon={<SettingHorizontalIcon />}>
                        <NavLink to={page_routes.security_question} className='w-100 h-100 d-inline-block sidebar-navlink'>Security Questions</NavLink>
                    </Nav.Item>
                    <Nav.Menu
                        eventKey="6"
                        trigger="hover"
                        title="Location Management"
                        icon={<LocationIcon />}
                        placement="rightStart"
                    >
                        <Nav.Item as={Text} eventKey="6-1"><NavLink to={page_routes.state} className='w-100 h-100 d-inline-block sidebar-navlink'>State</NavLink></Nav.Item>
                        <Nav.Item as={Text} eventKey="6-2"><NavLink to={page_routes.city} className='w-100 h-100 d-inline-block sidebar-navlink'>City</NavLink></Nav.Item>
                        <Nav.Item as={Text} eventKey="6-3"><NavLink to={page_routes.taluq} className='w-100 h-100 d-inline-block sidebar-navlink'>Taluq</NavLink></Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu
                        eventKey="7"
                        trigger="hover"
                        title="Course Management"
                        icon={<TextImageIcon />}
                        placement="rightStart"
                    >
                        <Nav.Item as={Text} eventKey="7-1"><NavLink to={page_routes.graduation} className='w-100 h-100 d-inline-block sidebar-navlink'>Graduation</NavLink></Nav.Item>
                        <Nav.Item as={Text} eventKey="7-2"><NavLink to={page_routes.course} className='w-100 h-100 d-inline-block sidebar-navlink'>Course</NavLink></Nav.Item>
                        <Nav.Item as={Text} eventKey="7-3"><NavLink to={page_routes.class} className='w-100 h-100 d-inline-block sidebar-navlink'>Class</NavLink></Nav.Item>
                    </Nav.Menu>
                </>
            }
        </>
}


const SideBar:FC<{expand: boolean}> = ({expand}) => {
    const {toggleAccountModal} = useAccountModal();

    return (
        <Sidebar
            className={classes.sidebar}
            width={expand ? 260 : 56}
            collapsible
        >
            <Sidenav expanded={expand} appearance="subtle">
                <Sidenav.Body>
                    <Nav>
                        <NavMenu />
                        <Nav.Item eventKey="5" icon={<GearIcon />} onClick={() => toggleAccountModal(true)}>
                            Account Settings
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </Sidebar>
    )
}

export default SideBar
