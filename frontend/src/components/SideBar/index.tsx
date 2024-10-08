import { FC } from 'react';
import { Nav, Sidebar, Sidenav } from 'rsuite';
import classes from './index.module.css'
import ChangeListIcon from '@rsuite/icons/ChangeList';
import ListIcon from '@rsuite/icons/List';
import DocPassIcon from '@rsuite/icons/DocPass';
import TextImageIcon from '@rsuite/icons/TextImage';
import LocationIcon from '@rsuite/icons/Location';
import PeoplesIcon from '@rsuite/icons/Peoples';
import GearIcon from '@rsuite/icons/Gear';
import PeoplesMapIcon from '@rsuite/icons/PeoplesMap';
import SettingHorizontalIcon from '@rsuite/icons/SettingHorizontal';
import { useAccountModal } from '../../hooks/useAccountModal';
import { useUser } from '../../hooks/useUser';
import { NavLink } from 'react-router-dom';
import CalendarIcon from '@rsuite/icons/Calendar';
import TagNumberIcon from '@rsuite/icons/TagNumber';
import ReviewIcon from '@rsuite/icons/Review';
import { page_routes } from '../../utils/routes/pages';
import { RolesEnum } from '../../utils/constants/role';
import AppSelectIcon from '@rsuite/icons/AppSelect';
import AdminIcon from '@rsuite/icons/Admin';

const NavMenu = () => {
    const  {user} = useUser();
    return <>
            {
                [RolesEnum.STUDENT].includes((user && user.role) ? user.role : RolesEnum.STUDENT) && <>
                    <Nav.Item eventKey="1" as={NavLink} to={page_routes.student.dashboard} className='sidebar-navlink' icon={<AppSelectIcon />}>
                        Dashboard
                    </Nav.Item>
                    <Nav.Item eventKey="2" as={NavLink} to={page_routes.student.scholarship.apply} className='sidebar-navlink' icon={<ChangeListIcon />}>
                        Apply Scholarship
                    </Nav.Item>
                    <Nav.Item eventKey="3" as={NavLink} to={page_routes.student.scholarship.status} className='sidebar-navlink' icon={<DocPassIcon />}>
                        Scholarship Status
                    </Nav.Item>
                    <Nav.Item eventKey="4" as={NavLink} to={page_routes.student.scholarship.list} className='sidebar-navlink' icon={<ListIcon />}>
                        Scholarship List
                    </Nav.Item>
                </>
            }
            {
                [RolesEnum.INSTITUTE, RolesEnum.INSTITUTE_STAFF].includes((user && user.role) ? user.role : RolesEnum.STUDENT) && <>
                    <Nav.Item eventKey="15" as={NavLink} to={page_routes.institute.dashboard} className='sidebar-navlink' icon={<AppSelectIcon />}>
                        Dashboard
                    </Nav.Item>
                    <Nav.Item eventKey="16" as={NavLink} to={page_routes.institute.scholarship.list} className='sidebar-navlink' icon={<ListIcon />}>
                        Scholarship List
                    </Nav.Item>
                </>
            }
            {
                [RolesEnum.INSTITUTE].includes((user && user.role) ? user.role : RolesEnum.STUDENT) && <>
                    <Nav.Item eventKey="17" as={NavLink} to={page_routes.institute.employee} className='sidebar-navlink' icon={<PeoplesIcon />}>
                        Employees
                    </Nav.Item>
                </>
            }
            {
                [RolesEnum.INDUSTRY, RolesEnum.INDUSTRY_STAFF].includes((user && user.role) ? user.role : RolesEnum.STUDENT) && <>
                    <Nav.Item eventKey="18" as={NavLink} to={page_routes.industry.dashboard} className='sidebar-navlink' icon={<AppSelectIcon />}>
                        Dashboard
                    </Nav.Item>
                    <Nav.Item eventKey="19" as={NavLink} to={page_routes.industry.scholarship.list} className='sidebar-navlink' icon={<ListIcon />}>
                        Scholarship List
                    </Nav.Item>
                </>
            }
            {
                [RolesEnum.INDUSTRY].includes((user && user.role) ? user.role : RolesEnum.STUDENT) && <>
                    <Nav.Item eventKey="20" as={NavLink} to={page_routes.industry.employee} className='sidebar-navlink' icon={<PeoplesIcon />}>
                        Employees
                    </Nav.Item>
                </>
            }
            {
                [RolesEnum.VERIFICATION_OFFICER].includes((user && user.role) ? user.role : RolesEnum.STUDENT) && <>
                    <Nav.Item eventKey="22" as={NavLink} to={page_routes.govt.dashboard} className='sidebar-navlink' icon={<AppSelectIcon />}>
                        Dashboard
                    </Nav.Item>
                    <Nav.Item eventKey="23" as={NavLink} to={page_routes.govt.scholarship.list} className='sidebar-navlink' icon={<ListIcon />}>
                        Scholarship List
                    </Nav.Item>
                </>
            }
            {
                [RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN].includes((user && user.role) ? user.role : RolesEnum.STUDENT) && <>
                    <Nav.Item eventKey="13" as={NavLink} to={page_routes.admin.dashboard} className='sidebar-navlink' icon={<AppSelectIcon />}>
                        Dashboard
                    </Nav.Item>
                    <Nav.Item eventKey="14" as={NavLink} to={page_routes.admin.employee} className='sidebar-navlink' icon={<PeoplesIcon />}>
                        Staff / Officer
                    </Nav.Item>
                    <Nav.Item eventKey="21" as={NavLink} to={page_routes.admin.student} className='sidebar-navlink' icon={<AdminIcon />}>
                        Student
                    </Nav.Item>
                    <Nav.Item eventKey="10" as={NavLink} to={page_routes.admin.application_date} className='sidebar-navlink' icon={<CalendarIcon />}>
                        Application Dates
                    </Nav.Item>
                    <Nav.Item eventKey="11" as={NavLink} to={page_routes.admin.application_fee} className='sidebar-navlink' icon={<TagNumberIcon />}>
                        Educational Assistance Amount
                    </Nav.Item>
                    <Nav.Item eventKey="12" as={NavLink} to={page_routes.admin.security_question} className='sidebar-navlink' icon={<SettingHorizontalIcon />}>
                        Security Questions
                    </Nav.Item>
                    <Nav.Menu
                        eventKey="6"
                        trigger="hover"
                        title="Location Management"
                        icon={<LocationIcon />}
                        placement="rightStart"
                        className='sidebar-navmenu'
                    >
                        <Nav.Item as={NavLink} to={page_routes.admin.state} className='sidebar-navlink' eventKey="6-1">State</Nav.Item>
                        <Nav.Item as={NavLink} to={page_routes.admin.city} className='sidebar-navlink' eventKey="6-2">District</Nav.Item>
                        <Nav.Item as={NavLink} to={page_routes.admin.taluq} className='sidebar-navlink' eventKey="6-3">Taluq</Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu
                        eventKey="7"
                        trigger="hover"
                        title="Course Management"
                        icon={<TextImageIcon />}
                        placement="rightStart"
                        className='sidebar-navmenu'
                    >
                        <Nav.Item as={NavLink} to={page_routes.admin.graduation} className='sidebar-navlink' eventKey="7-1">Graduation</Nav.Item>
                        <Nav.Item as={NavLink} to={page_routes.admin.course} className='sidebar-navlink' eventKey="7-2">Course</Nav.Item>
                        <Nav.Item as={NavLink} to={page_routes.admin.class} className='sidebar-navlink' eventKey="7-3">Class</Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu
                        eventKey="8"
                        trigger="hover"
                        title="Institute Management"
                        icon={<ReviewIcon />}
                        placement="rightStart"
                        className='sidebar-navmenu'
                    >
                        <Nav.Item as={NavLink} to={page_routes.admin.institute.all} className='sidebar-navlink' eventKey="8-1">All Institutes</Nav.Item>
                        <Nav.Item as={NavLink} to={page_routes.admin.institute.registered} className='sidebar-navlink' eventKey="8-2">Institute Registered</Nav.Item>
                        <Nav.Item as={NavLink} to={page_routes.admin.institute.non_registered} className='sidebar-navlink' eventKey="8-3">Institute Non Registered</Nav.Item>
                        <Nav.Item as={NavLink} to={page_routes.admin.institute.request} className='sidebar-navlink' eventKey="8-4">Institute Request</Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu
                        eventKey="9"
                        trigger="hover"
                        title="Industry Management"
                        icon={<PeoplesMapIcon />}
                        placement="rightStart"
                        className='sidebar-navmenu'
                    >
                        <Nav.Item as={NavLink} to={page_routes.admin.industry.all} className='sidebar-navlink' eventKey="9-1">All Industries</Nav.Item>
                        <Nav.Item as={NavLink} to={page_routes.admin.industry.registered} className='sidebar-navlink' eventKey="9-2">Industry Registered</Nav.Item>
                        <Nav.Item as={NavLink} to={page_routes.admin.industry.non_registered} className='sidebar-navlink' eventKey="9-3">Industry Non Registered</Nav.Item>
                        <Nav.Item as={NavLink} to={page_routes.admin.industry.request} className='sidebar-navlink' eventKey="9-4">Industry Request</Nav.Item>
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
