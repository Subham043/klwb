import { Link } from "react-router-dom";
import { Message } from "rsuite";
import { page_routes } from "../../../utils/routes/pages";
import Moment from "../../Moment";

type Props = {
	message?: string;
	date?: string;
};

export default function ApplicationClosed({ message, date }: Props) {
  return <Message type="error" centered showIcon header={message || "Scholarship applications are closed as of now for the current year. Please check back later."}>
		{date && <p>
				Your application was successfully submitted on <Moment datetime={date} />
		</p>}
		<p>
				You can check the application status in the <Link to={page_routes.student.scholarship.status}>status section</Link>.
		</p>
</Message>;
}
