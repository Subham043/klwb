import classes from "./index.module.css";
import IntroScreen from "../../../components/IntroScreen";
import { Divider } from "rsuite";
import Login from "../../../components/Login";
import { page_routes } from "../../../utils/routes/pages";
import { api_routes } from "../../../utils/routes/api";
import { Link } from "react-router-dom";
import DetailIcon from "@rsuite/icons/Detail";

function IndustryLoginPage() {
  return (
    <div className="row justify-center">
      <div className={classes.info_col}>
        <IntroScreen>
          <p>
            <b>
              If You Don't Have an Account?{" "}
              <Link to={page_routes.industry.auth.register}>Register</Link>
            </b>
          </p>
          <p>For Industry Registration/Contribution Manual Kindly</p>
          <p>
            <b>
              <a href="/contribution-guidelines.pdf" download={true}>
                <DetailIcon style={{ fontSize: "1.6rem" }} />
              </a>
            </b>
          </p>
        </IntroScreen>
        <Divider>Note</Divider>
        <p>
          <b>
            Industries must ensure the following points for paying the
            contribution
          </b>
        </p>
        <ol>
          <li>The Industry must be registered on the portal.</li>
          <li>
            The Industry must pay the required contribution to the Labour
            Welfare Board before 15th January, 2026 to avoid interest on the
            contribution.
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
