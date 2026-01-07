import classes from "./index.module.css";
import IntroScreen from "../../../components/IntroScreen";
import { Divider } from "rsuite";
import Login from "../../../components/Login";
import { page_routes } from "../../../utils/routes/pages";
import { api_routes } from "../../../utils/routes/api";

function InstituteLoginPage() {
  return (
    <div className="row justify-center">
      <div className={classes.info_col}>
        <IntroScreen />
        <Divider>Note</Divider>
        <p>
          <b>
            Educational Institutions must ensure the following before students
            apply for Scholarship
          </b>
        </p>
        <ol>
          <li>
            The Educational Institution must complete its registration on the
            Scholarship portal.
          </li>
          <li>
            The Industry where the student's parent (Father / Mother) is
            employed must also be registered on the portal.
          </li>
          <li>
            Only after both the Educational Institution and the relevant
            Industry are registered will students be able to register and apply
            for the Scholarship.
          </li>
        </ol>
      </div>
      <div className={classes.form_col}>
        <Login
          title="Institute"
          forgot_password_link={page_routes.institute.auth.forgot_password}
          login_email_api_link={api_routes.institute.auth.login.email}
          login_phone_api_link={api_routes.institute.auth.login.phone}
        />
      </div>
    </div>
  );
}

export default InstituteLoginPage;
