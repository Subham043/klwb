import { Loader, Message } from "rsuite";


export default function CheckingEligibility() {
	return (
		<Message type="info" centered showIcon header="Checking eligibility!">
			<Loader speed="fast" content="Please wait..." />
		</Message>
	)
}
