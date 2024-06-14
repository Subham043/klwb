import { Link } from 'react-router-dom'
import classes from './index.module.css'
import { page_routes } from '../../utils/page_routes'

export default function AuthMenu() {
    return <div className="container">
        <div className="row justify-between align-center">
            <div className="col-auto">
                <Link to={page_routes.main} className={classes.linkMenu}>Home</Link>
            </div>
            <div className="col-auto">
                <div className="row justify-between align-center gap-1">
                    <Link to={page_routes.auth.login} className={classes.linkMenu}>Login</Link>
                    <Link to={page_routes.auth.register.student} className={classes.linkMenu}>Registration</Link>
                </div>
            </div>
        </div>
    </div>
}