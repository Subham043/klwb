import { Tabs } from 'rsuite'
import classes from './index.module.css'
import ResetWithPhone from '../../../components/ForgotPassword/ResetWithPhone';
import ResetWithEmail from '../../../components/ForgotPassword/ResetWithEmail';

function ForgotPasswordPage() {
  return (
    <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          Student Forgot Password
        </div>
        <div className="auth-form">
          <Tabs defaultActiveKey="1" appearance="subtle">
            <Tabs.Tab eventKey="1" title="Reset With Email">
              <div className={classes.formFields}>
                <ResetWithEmail />
              </div>
            </Tabs.Tab>
            <Tabs.Tab eventKey="2" title="Reset With Mobile No.">
              <div className={classes.formFields}>
                <ResetWithPhone />
              </div>
            </Tabs.Tab>
          </Tabs>
        </div>
    </div>
  )
}

export default ForgotPasswordPage
