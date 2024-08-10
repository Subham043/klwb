import { FC } from 'react';
import { Container, Content, Divider } from 'rsuite';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import classes from './index.module.css'
import { Link } from 'react-router-dom';
import IntroScreen from '../../components/IntroScreen';
import { page_routes } from '../../utils/routes/pages';

const PageNotFound:FC = () => {

    return (
        <Container>
            <Header />
            <Content className={classes.content}>
                <div className="container grid-center">
                    <div className="row justify-center">
                        <div className={classes.info_col}>
                            <IntroScreen>
                                <Divider><h1>404</h1></Divider>
                                <p><b>Oops! Page Not Found</b></p>
                                <Link to={page_routes.main} className={classes.link}>Back to Home</Link>
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
