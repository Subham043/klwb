import { Tabs } from 'rsuite'
import classes from './index.module.css'
import LoginWithPhone from './LoginWithPhone';
import LoginWithEmail from './LoginWithEmail';

type Props = {
    title: string;
    forgot_password_link: string;
    login_email_api_link?: string;
    login_phone_api_link?: string;
};

function Login({title, forgot_password_link, login_email_api_link, login_phone_api_link}:Props) {
  return (
    <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          {title} Login
        </div>
        <div className="auth-form">
          <Tabs defaultActiveKey="1" appearance="subtle">
            <Tabs.Tab eventKey="1" title="Login With Email">
              <div className={classes.formFields}>
                <LoginWithEmail forgot_password_link={forgot_password_link} login_email_api_link={login_email_api_link} />
              </div>
            </Tabs.Tab>
            <Tabs.Tab eventKey="2" title="Login With Mobile No.">
              <div className={classes.formFields}>
                <LoginWithPhone forgot_password_link={forgot_password_link} login_phone_api_link={login_phone_api_link} />
              </div>
            </Tabs.Tab>
          </Tabs>
        </div>
    </div>
  )
}

export default Login
