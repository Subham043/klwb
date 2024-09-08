import { page_routes } from "../../../utils/routes/pages";
import DashboardMessageCard from "./DashboardMessageCard";

type DashboardMessageProps = {
  message: string;
  is_scholarship_open: boolean;
  is_eligible_to_apply: boolean;
  can_resubmit: boolean;
};

export default function DashboardMessage({
  message,
  is_scholarship_open,
  is_eligible_to_apply,
  can_resubmit,
}: DashboardMessageProps) {
  if (is_scholarship_open) {
    if (is_eligible_to_apply) {
      return (
        <DashboardMessageCard
          message={message}
          link={page_routes.student.scholarship.apply}
          type="success"
          color="green"
          button_title="APPLY NOW"
        />
      );
    } else {
      if (can_resubmit) {
        return (
          <DashboardMessageCard
            message={message}
            link={page_routes.student.scholarship.resubmit}
            type="error"
            color="red"
            button_title="RESUBMIT"
          />
        );
      } else {
        return (
          <DashboardMessageCard
            message={message}
            link={page_routes.student.scholarship.status}
            type="info"
            color="blue"
            button_title="CHECK STATUS"
          />
        );
      }
    }
  }

  return (
    <DashboardMessageCard
      message={message}
      link={page_routes.student.scholarship.status}
      type="error"
      color="red"
      button_title="CHECK STATUS"
    />
  );
}
