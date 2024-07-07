import { FC, useState } from 'react';
import { Container, Content } from 'rsuite';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import classes from './index.module.css'
import SideBar from '../../components/SideBar';
import DashboardMenu from '../../components/DashboardMenu';
import SuspenseOutlet from '../../components/SuspenseOutlet';

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
                            <SuspenseOutlet />
                        </div>
                    </Content>
                </Container>
            </Container>
            <Footer />
        </Container>
    )
}

export default DashboardLayout
