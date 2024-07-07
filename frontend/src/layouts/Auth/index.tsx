import { FC } from 'react';
import { Container, Content } from 'rsuite';
import Header from '../../components/Header';
import AuthMenu, {AuthMenuProps} from '../../components/AuthMenu';
import Footer from '../../components/Footer';
import classes from './index.module.css'
import SuspenseOutlet from '../../components/SuspenseOutlet';

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

export default AuthLayout
