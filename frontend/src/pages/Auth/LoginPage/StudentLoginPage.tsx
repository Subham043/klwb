import classes from './index.module.css'
import IntroScreen from "../../../components/IntroScreen"
import { Divider } from 'rsuite'
import { Link } from 'react-router-dom'
import { page_routes } from '../../../utils/page_routes'
import DetailIcon from '@rsuite/icons/Detail';
import Login from '../../../components/Login'
import { api_routes } from '../../../utils/api_routes'

function StudentLoginPage() {
  return (
    <div className="row justify-center">
        <div className={classes.info_col}>
            <IntroScreen>
                <p><b>If You Don't Have an Account? <Link to={page_routes.auth.student.register}>Register</Link></b></p>
                <p>For Student Registration Manual Kindly</p>
                <p><b><Link to='/'><DetailIcon style={{fontSize:'1.6rem'}} /></Link></b></p>
                <p>ವಿದ್ಯಾರ್ಥಿ ನೋಂದಣಿಯ ಮಾಹಿತಿಗಾಗಿ</p>
                <p><b><Link to='/'><DetailIcon style={{fontSize:'1.6rem'}} /></Link></b></p>
            </IntroScreen>
            <Divider>Note</Divider>
            <p><b>Students applying for Scholarship must look for two points</b></p>
            <ol>
                <li>Education Institution where student studying must register before students apply.</li>
                <li>Industry where student's parents (Father / Mother) work must be registered before students apply.</li>
                <li>After the registration of both (Educational Institution and Industry) then only students will be able to REGISTER AND apply for Scholarship.</li>
            </ol>
        </div>
        <div className={classes.form_col}>
            <Login title='Student' forgot_password_link={page_routes.auth.student.forgot_password} authenticated_redirect_link={page_routes.dashboard} login_email_api_link={api_routes.user.auth.login.email} login_phone_api_link={api_routes.user.auth.login.phone} />
        </div>
    </div>
  )
}

export default StudentLoginPage