import { Tabs } from 'rsuite'
import classes from './index.module.css'
import LoginWithPhone from '../../../components/Login/LoginWithPhone';
import LoginWithEmail from '../../../components/Login/LoginWithEmail';

function LoginPage() {
  return (
    <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          Student Login
        </div>
        <div className="auth-form">
          <Tabs defaultActiveKey="1" appearance="subtle">
            <Tabs.Tab eventKey="1" title="Login With Email">
              <div className={classes.formFields}>
                <LoginWithEmail />
              </div>
            </Tabs.Tab>
            <Tabs.Tab eventKey="2" title="Login With Mobile No.">
              <div className={classes.formFields}>
                <LoginWithPhone />
              </div>
            </Tabs.Tab>
          </Tabs>
        </div>
    </div>
  )
}

export default LoginPage
