import classes from './index.module.css'
import ForgotPassword from '../../../components/ForgotPassword'

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

export default ForgotPasswordPage
