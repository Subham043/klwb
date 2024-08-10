import classes from './index.module.css'
import ForgotPassword from '../../../components/ForgotPassword'
import { page_routes } from '../../../utils/routes/pages';
import { api_routes } from '../../../utils/routes/api';

type Props = {
    title: string;
    login_link: string;
    reset_password_redirect?:string;
    forgot_password_phone_api_link?:string;
    forgot_password_email_api_link?:string;
};

function ForgotPasswordPage({title, login_link, reset_password_redirect, forgot_password_phone_api_link, forgot_password_email_api_link}:Props) {
  return (
    <div className="row justify-center">
        <div className={classes.form_col}>
            <ForgotPassword title={title} login_link={login_link} reset_password_redirect={reset_password_redirect} forgot_password_phone_api_link={forgot_password_phone_api_link} forgot_password_email_api_link={forgot_password_email_api_link} />
        </div>
    </div>
  )
}


export const AdminForgotPasswordPage = () => <ForgotPasswordPage title="Admin" login_link={page_routes.admin.auth.login} reset_password_redirect={page_routes.admin.auth.reset_password} forgot_password_email_api_link={api_routes.admin.auth.forgot_password.email} forgot_password_phone_api_link={api_routes.admin.auth.forgot_password.phone} />
export const StudentForgotPasswordPage = () => <ForgotPasswordPage title="Student" login_link={page_routes.student.auth.login} reset_password_redirect={page_routes.student.auth.reset_password} forgot_password_email_api_link={api_routes.user.auth.forgot_password.email} forgot_password_phone_api_link={api_routes.user.auth.forgot_password.phone}  />
export const InstituteForgotPasswordPage = () => <ForgotPasswordPage title="Institute" login_link={page_routes.institute.auth.login} reset_password_redirect={page_routes.institute.auth.reset_password} forgot_password_email_api_link={api_routes.institute.auth.forgot_password.email} forgot_password_phone_api_link={api_routes.institute.auth.forgot_password.phone}  />
export const IndustryForgotPasswordPage = () => <ForgotPasswordPage title="Industry" login_link={page_routes.industry.auth.login} reset_password_redirect={page_routes.industry.auth.reset_password} forgot_password_email_api_link={api_routes.admin.auth.forgot_password.email} forgot_password_phone_api_link={api_routes.admin.auth.forgot_password.phone} />