import { Tabs } from 'rsuite'
import classes from './index.module.css'
import ResetWithPhone from '../../../components/ResetPassword/ResetWithPhone';
import ResetWithEmail from '../../../components/ResetPassword/ResetWithEmail';
import { useParams, useSearchParams } from 'react-router-dom';

function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  return (
    <div className="row justify-center">
      <div className={classes.form_col}>
        <div className={classes.formContainer}>
            <div className={classes.formTitle}>
              Reset Password
            </div>
            <div className="auth-form">
              <Tabs defaultActiveKey="1" appearance="subtle">
                <Tabs.Tab eventKey="1" title="Reset With Email">
                  <div className={classes.formFields}>
                    <ResetWithEmail token={params.token ?? ''} type={searchParams.get('type') || 'student'} />
                  </div>
                </Tabs.Tab>
                <Tabs.Tab eventKey="2" title="Reset With Mobile No.">
                  <div className={classes.formFields}>
                    <ResetWithPhone token={params.token ?? ''} type={searchParams.get('type') || 'student'} />
                  </div>
                </Tabs.Tab>
              </Tabs>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
