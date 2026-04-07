import { NavLink } from "react-router-dom";
import SuspenseOutlet from "../../components/SuspenseOutlet";
import { Nav } from "rsuite";
import { page_routes } from "../../utils/routes/pages";

function TrackLayout() {
  return (
    <>
      <Nav style={{ marginBottom: "1rem" }}>
        <Nav.Item as={NavLink} to={page_routes.admin.track.verify_payment}>
          SBI Payment Information
        </Nav.Item>
        <Nav.Item
          as={NavLink}
          to={page_routes.admin.track.payment_full_contribution_list}
        >
          Payment Full Contribution List
        </Nav.Item>
        <Nav.Item
          as={NavLink}
          to={page_routes.admin.track.payment_full_contribution_activity_log}
        >
          Payment Full Contribution Activity Log
        </Nav.Item>
      </Nav>
      <SuspenseOutlet />
    </>
  );
}

export default TrackLayout;
