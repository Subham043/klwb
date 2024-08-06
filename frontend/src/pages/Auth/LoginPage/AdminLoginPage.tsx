import classes from './index.module.css'
import IntroScreen from "../../../components/IntroScreen"
import { Divider } from 'rsuite'
import Login from '../../../components/Login'
import { page_routes } from '../../../utils/page_routes'
import { api_routes } from '../../../utils/api_routes'

function AdminLoginPage() {
  return (
    <div className="row justify-center">
        <div className={classes.info_col}>
            <IntroScreen />
            <Divider>Note</Divider>
            <p><b>Students applying for Scholarship must look for two points</b></p>
            <ol>
                <li>Education Institution where student studying must register before students apply.</li>
                <li>Industry where student's parents (Father / Mother) work must be registered before students apply.</li>
                <li>After the registration of both (Educational Institution and Industry) then only students will be able to REGISTER AND apply for Scholarship.</li>
            </ol>
        </div>
        <div className={classes.form_col}>
            <Login title='Admin' forgot_password_link={page_routes.auth.admin.forgot_password} authenticated_redirect_link={page_routes.dashboard} login_email_api_link={api_routes.admin.auth.login.email} login_phone_api_link={api_routes.admin.auth.login.phone} />
        </div>
    </div>
  )
}

export default AdminLoginPage
