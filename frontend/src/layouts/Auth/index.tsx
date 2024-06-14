import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Content, Divider } from 'rsuite';
import Header from '../../components/Header';
import AuthMenu from '../../components/AuthMenu';
import Footer from '../../components/Footer';
import classes from './index.module.css'
import logo from '../../assets/images/logo.png'
import DetailIcon from '@rsuite/icons/Detail';
import { page_routes } from '../../utils/page_routes';

const AuthLayout:FC = () => {

    return (
        <Container>
            <Header>
                <AuthMenu />
            </Header>
            <Content className={classes.content}>
                <div className="container grid-center">
                    <div className="row justify-center">
                        <div className={classes.info_col}>
                            <div className="text-center">
                                <img src={logo} alt="" className={classes.logo} />
                                <h2>Welcome To</h2>
                                <h1>Karnataka Labour Welfare Board</h1>
                                <p><b>If You Don't Have an Account? <Link to={page_routes.auth.register.student}>Register</Link></b></p>
                                <p>For Student Registration Manual Kindly</p>
                                <p><b><Link to='/'><DetailIcon style={{fontSize:'1.6rem'}} /></Link></b></p>
                                <p>ವಿದ್ಯಾರ್ಥಿ ನೋಂದಣಿಯ ಮಾಹಿತಿಗಾಗಿ</p>
                                <p><b><Link to='/'><DetailIcon style={{fontSize:'1.6rem'}} /></Link></b></p>
                            </div>
                            <Divider>Note</Divider>
                            <p><b>Students applying for Scholarship must look for two points</b></p>
                            <ol>
                                <li>Education Institution where student studying must register before students apply.</li>
                                <li>Industry where student's parents (Father / Mother) work must be registered before students apply.</li>
                                <li>After the registration of both (Educational Institution and Industry) then only students will be able to REGISTER AND apply for Scholarship.</li>
                            </ol>
                        </div>
                        <div className={classes.form_col}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </Content>
            <Footer />
        </Container>
    )
}

export default AuthLayout
