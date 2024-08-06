import { Tabs } from 'rsuite'
import classes from './index.module.css'
import ResetWithPhone from './ResetWithPhone';
import ResetWithEmail from './ResetWithEmail';

type Props = {
    title: string;
    login_link: string;
    reset_password_redirect?:string;
    forgot_password_phone_api_link?:string;
    forgot_password_email_api_link?:string;
};

function ForgotPassword({title, login_link, reset_password_redirect, forgot_password_phone_api_link, forgot_password_email_api_link}:Props) {
  return (
    <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          {title} Forgot Password
        </div>
        <div className="auth-form">
          <Tabs defaultActiveKey="1" appearance="subtle">
            <Tabs.Tab eventKey="1" title="Reset With Email">
              <div className={classes.formFields}>
                <ResetWithEmail login_link={login_link} reset_password_redirect={reset_password_redirect} forgot_password_email_api_link={forgot_password_email_api_link} />
              </div>
            </Tabs.Tab>
            <Tabs.Tab eventKey="2" title="Reset With Mobile No.">
              <div className={classes.formFields}>
                <ResetWithPhone login_link={login_link} reset_password_redirect={reset_password_redirect} forgot_password_phone_api_link={forgot_password_phone_api_link} />
              </div>
            </Tabs.Tab>
          </Tabs>
        </div>
    </div>
  )
}

export default ForgotPassword
