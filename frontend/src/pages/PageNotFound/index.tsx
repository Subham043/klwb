import { FC } from 'react';
import { Container, Content, Divider } from 'rsuite';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import classes from './index.module.css'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import { page_routes } from '../../utils/page_routes';

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
                            <div className="text-center">
                                <img src={logo} alt="" className={classes.logo} />
                                <h2>Welcome To</h2>
                                <h1>Karnataka Labour Welfare Board</h1>
                                <Divider><h1>404</h1></Divider>
                                <p><b>Oops! Page Not Found</b></p>
                                <Link to={page_routes.main} className={classes.link}>Back to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
            <Footer />
        </Container>
    )
}

export default PageNotFound
