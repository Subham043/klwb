import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Content } from 'rsuite';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import classes from './index.module.css'
import SideBar from '../../components/SideBar';
import DashboardMenu from '../../components/DashboardMenu';

const DashboardLayout:FC = () => {
    const [expand, setExpand] = useState(false);
    return (
        <Container>
            <Header>
                <DashboardMenu expand={expand} setExpand={setExpand} />
            </Header>
            <Container>
                <SideBar expand={expand} />
                <Container>
                    <Content className={classes.content}>
                        <div className={classes.container}>
                            <Outlet />
                        </div>
                    </Content>
                </Container>
            </Container>
            <Footer />
        </Container>
    )
}

export default DashboardLayout
