import classes from './index.module.css'
import ForgotPassword from '../../../components/ForgotPassword'

function ForgotPasswordPage({title, login_link}:{title:string; login_link:string}) {
  return (
    <div className="row justify-center">
        <div className={classes.form_col}>
            <ForgotPassword title={title} login_link={login_link} />
        </div>
    </div>
  )
}

export default ForgotPasswordPage
