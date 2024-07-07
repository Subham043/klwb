import { FC } from 'react';
import { Container, Content, Divider } from 'rsuite';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import classes from './index.module.css'
import { Link } from 'react-router-dom';
import { page_routes } from '../../utils/page_routes';
import IntroScreen from '../../components/IntroScreen';

const PageNotFound:FC = () => {

    return (
        <Container>
            <Header>
                <></>
            </Header>
            <Content className={classes.content}>
                <div className="container grid-center">
                    <div className="row justify-center">
                        <div className={classes.info_col}>
                            <IntroScreen>
                                <Divider><h1>404</h1></Divider>
                                <p><b>Oops! Page Not Found</b></p>
                                <Link to={page_routes.dashboard} className={classes.link}>Back to Home</Link>
                            </IntroScreen>
                        </div>
                    </div>
                </div>
            </Content>
            <Footer />
        </Container>
    )
}

export default PageNotFound
