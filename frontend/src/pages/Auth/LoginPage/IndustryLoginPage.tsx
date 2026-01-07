import classes from "./index.module.css";
import IntroScreen from "../../../components/IntroScreen";
import { Divider } from "rsuite";
import Login from "../../../components/Login";
import { page_routes } from "../../../utils/routes/pages";
import { api_routes } from "../../../utils/routes/api";

function IndustryLoginPage() {
  return (
    <div className="row justify-center">
      <div className={classes.info_col}>
        <IntroScreen />
        <Divider>Note</Divider>
        <p>
          <b>
            Industries registering for the Scholarship scheme must ensure the
            following points
          </b>
        </p>
        <ol>
          <li>
            The Industry must be registered on the portal before any student
            (child of employee) can apply for the Scholarship.
          </li>
          <li>
            The Educational Institution where the employee's child is studying
            must also be registered on the portal.
          </li>
          <li>
            Only after both the Industry and the Educational Institution are
            successfully registered, the student will be able to REGISTER and
            apply for the Scholarship.
          </li>
          <li>
            The Industry must pay the required contribution to the Labour
            Welfare Board; only after the contribution is paid will the
            student's Scholarship application be accepted and processed.
          </li>
        </ol>
      </div>
      <div className={classes.form_col}>
        <Login
          title="Industry"
          forgot_password_link={page_routes.industry.auth.forgot_password}
          login_email_api_link={api_routes.industry.auth.login.email}
          login_phone_api_link={api_routes.industry.auth.login.phone}
        />
      </div>
    </div>
  );
}

export default IndustryLoginPage;
