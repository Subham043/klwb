import { FC } from 'react';
import { Container, Content } from 'rsuite';
import Header from '../../components/Header';
import AuthMenu, {AuthMenuProps} from '../../components/AuthMenu';
import Footer from '../../components/Footer';
import classes from './index.module.css'
import SuspenseOutlet from '../../components/SuspenseOutlet';
import { page_routes } from '../../utils/routes/pages';

const AuthLayout:FC<AuthMenuProps & {bgImage?:string}> = (props) => {
    return (
        <Container>
            <Header>
                <AuthMenu {...props} />
            </Header>
            <Content className={classes.content} style={props.bgImage ? {backgroundImage: `url(${props.bgImage})`} : undefined}>
                <div className="container grid-center">
                    <SuspenseOutlet />
                </div>
            </Content>
            <Footer />
        </Container>
    )
}

export const AdminAuthLayout = () => <AuthLayout noMenu={false} loginLink={page_routes.admin.auth.login} hasRegister={false} />
export const InstituteAuthLayout = () => <AuthLayout noMenu={false} loginLink={page_routes.institute.auth.login} hasRegister={true} registerLink={page_routes.institute.auth.register} bgImage={'/inst-bg.jpg'} />
export const IndustryAuthLayout = () => <AuthLayout noMenu={false} loginLink={page_routes.industry.auth.login} hasRegister={true} registerLink={page_routes.industry.auth.register} bgImage={'/ind-bg.jpg'} />
export const StudentAuthLayout = () => <AuthLayout noMenu={false} loginLink={page_routes.student.auth.login} hasRegister={true} registerLink={page_routes.student.auth.register} bgImage={'/rg-bg.jpg'} />