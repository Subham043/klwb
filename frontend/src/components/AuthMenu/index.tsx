import { Link } from 'react-router-dom'
import classes from './index.module.css'
import { page_routes } from '../../utils/page_routes'

export type AuthMenuProps = {
    noMenu: true
} | {
    noMenu: false;
    loginLink: string;
    hasRegister: false;
} | {
    noMenu: false;
    loginLink: string;
    hasRegister: true;
    registerLink: string;
}

export default function AuthMenu(props:AuthMenuProps) {
    return <div className="container">
        {props.noMenu ? <div className='py-2'></div> : <div className="row justify-between align-center">
            <div className="col-auto">
                <Link to={page_routes.main} className={classes.linkMenu}>Home</Link>
            </div>
            <div className="col-auto">
                <div className="row justify-between align-center gap-1">
                    <Link to={props.loginLink} className={classes.linkMenu}>Login</Link>
                    {props.hasRegister && <Link to={props.registerLink} className={classes.linkMenu}>Registration</Link>}
                </div>
            </div>
        </div>}
    </div>
}