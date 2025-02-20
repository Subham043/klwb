import InstituteDashboardCounter from "../../../components/Institute/Dashboard/Conters";
import InstituteDashboardAccountInfo from "../../../components/Institute/Dashboard/AccountInfo";
import { Message, Stack } from "rsuite";

export default function InstituteDashboardPage() {

  return (
    <div>
					<InstituteDashboardCounter />
          <Message type="info" bordered showIcon className="mt-1 align-self-start-md" style={{ gap: 10 }}>
                <Stack justifyContent="space-between" className='w-100 wrap-sm'>
                        <div><strong>Please make sure that you have completed the documentation process by uploading all the required documents in order to approve or reject scholarship applications.</strong></div>
                </Stack>
          </Message>
					<InstituteDashboardAccountInfo />
    </div>
  );
}
