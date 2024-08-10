import classes from './index.module.css'
import ResetPassword from '../../../components/ResetPassword';
import { useParams, useSearchParams } from 'react-router-dom';
import { page_routes } from '../../../utils/routes/pages';
import { api_routes } from '../../../utils/routes/api';

type Props = {
    title: string;
    login_link?: string;
    reset_password_api_link?:string;
    reset_password_resend_otp_api_link?:string;
};

function ResetPasswordPage({title, login_link, reset_password_api_link, reset_password_resend_otp_api_link} :Props) {
  const params = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  return (
    <div className="row justify-center">
      <div className={classes.form_col}>
        <div className={classes.formContainer}>
            <div className={classes.formTitle}>
              {title} Reset Password
            </div>
            <div className="auth-form">
              <div className={classes.formFields}>
                <ResetPassword token={params.token ?? ''} login_link={login_link} reset_password_api_link={reset_password_api_link} reset_password_resend_otp_api_link={reset_password_resend_otp_api_link} expires={searchParams.get('expires') || ''} signature={searchParams.get('signature') || ''} />
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export const AdminResetPasswordPage = () => <ResetPasswordPage title="Admin" login_link={page_routes.admin.auth.login} reset_password_api_link={api_routes.admin.auth.reset_password.index} reset_password_resend_otp_api_link={api_routes.admin.auth.reset_password.resend_otp} />
export const IndustryResetPasswordPage = () => <ResetPasswordPage title="Industry" login_link={page_routes.admin.auth.login} reset_password_api_link={api_routes.admin.auth.reset_password.index} reset_password_resend_otp_api_link={api_routes.admin.auth.reset_password.resend_otp} />
export const InstituteResetPasswordPage = () => <ResetPasswordPage title="Institute" login_link={page_routes.institute.auth.login} reset_password_api_link={api_routes.institute.auth.reset_password.index} reset_password_resend_otp_api_link={api_routes.institute.auth.reset_password.resend_otp} />
export const StudentResetPasswordPage = () => <ResetPasswordPage title="Student" login_link={page_routes.student.auth.login} reset_password_api_link={api_routes.user.auth.reset_password.index} reset_password_resend_otp_api_link={api_routes.user.auth.reset_password.resend_otp} />