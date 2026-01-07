import classes from "./index.module.css";
import IntroScreen from "../../../components/IntroScreen";
import { Divider } from "rsuite";
import Login from "../../../components/Login";
import { page_routes } from "../../../utils/routes/pages";
import { api_routes } from "../../../utils/routes/api";

function AdminLoginPage() {
  return (
    <div className="row justify-center">
      <div className={classes.info_col}>
        <IntroScreen />
        <Divider>Note</Divider>
        <p>
          <b>
            For processing Scholarship applications, the Labour Welfare Board
            requires the following
          </b>
        </p>
        <ol>
          <li>
            The Industry where the student's parent (Father / Mother) is
            employed must be registered with the Labour Welfare Board portal.
          </li>
          <li>
            The Educational Institution where the student is currently studying
            must also be registered on the portal.
          </li>
          <li>
            Scholarship applications will be enabled for students only after
            both the Industry and the Educational Institution are successfully
            registered.
          </li>
          <li>
            The concerned Industry must pay the prescribed contribution to the
            Labour Welfare Board; only upon receipt and confirmation of this
            contribution will the student's Scholarship application be accepted
            and considered for approval.
          </li>
        </ol>
      </div>
      <div className={classes.form_col}>
        <Login
          title="Official"
          forgot_password_link={page_routes.admin.auth.forgot_password}
          login_email_api_link={api_routes.admin.auth.login.email}
          login_phone_api_link={api_routes.admin.auth.login.phone}
        />
      </div>
    </div>
  );
}

export default AdminLoginPage;
