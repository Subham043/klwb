import { Tabs } from 'rsuite'
import classes from './index.module.css'
import ResetWithPhone from './ResetWithPhone';
import ResetWithEmail from './ResetWithEmail';

function ForgotPassword({title, login_link}:{title:string; login_link:string}) {
  return (
    <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          {title} Forgot Password
        </div>
        <div className="auth-form">
          <Tabs defaultActiveKey="1" appearance="subtle">
            <Tabs.Tab eventKey="1" title="Reset With Email">
              <div className={classes.formFields}>
                <ResetWithEmail title={title} login_link={login_link} />
              </div>
            </Tabs.Tab>
            <Tabs.Tab eventKey="2" title="Reset With Mobile No.">
              <div className={classes.formFields}>
                <ResetWithPhone title={title} login_link={login_link} />
              </div>
            </Tabs.Tab>
          </Tabs>
        </div>
    </div>
  )
}

export default ForgotPassword
