import { Link } from "react-router-dom";
import { Message } from "rsuite";
import { page_routes } from "../../../utils/routes/pages";
import Moment from "../../Moment";

type Props = {
	message?: string;
	date?: string;
};

export default function ApplicationApplied({ message, date }: Props) {
  return <Message type="error" centered showIcon header={message || "Oops! You are not eligible to apply for scholarship."}>
		{date && <p>
			Your application has been successfully submitted on <Moment datetime={date} />
		</p>}
		<p>
				You can check the application status in the <Link to={page_routes.student.scholarship.status}>status section</Link>.
		</p>
</Message>;
}
