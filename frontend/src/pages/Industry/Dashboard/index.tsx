import IndustryDashboardCounter from "../../../components/Industry/Dashboard/Conters";
import IndustryDashboardAccountInfo from "../../../components/Industry/Dashboard/AccountInfo";
import { Message, Stack } from "rsuite";

export default function IndustryDashboardPage() {

  return (
    <div>
					<IndustryDashboardCounter />
          <Message type="info" bordered showIcon className="mt-1 align-self-start-md" style={{ gap: 10 }}>
                <Stack justifyContent="space-between" className='w-100 wrap-sm'>
                        <div><strong>Please make sure that you have completed the documentation process by uploading all the required documents and paid the contributions in order to approve or reject scholarship applications.</strong></div>
                </Stack>
          </Message>
					<IndustryDashboardAccountInfo />
    </div>
  );
}
