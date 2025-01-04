import { AxiosError } from "axios";
import { ReactNode } from "react"
import { Button, Loader, Message } from "rsuite";
import ReloadIcon from '@rsuite/icons/Reload';


type Props = {
	children?: ReactNode;
	loading?: boolean;
	error?: unknown;
 refetch?: () => void;
}

export default function ErrorBoundaryLayout({children, loading=false, error, refetch}:Props) {
		return (
				<div className="p-relative">
					{(loading) && <Loader backdrop content="loading..." size="sm" style={{ zIndex: 100 }} />}
					{
									error ? 
									<Message showIcon type="error" header="A problem occurred" className="mb-1">
													<p>{(error instanceof AxiosError ? error.response?.data?.message : (error instanceof Error ?  error.message : "Something went wrong! Please try again."))}</p>
													<Button className="mt-1" type="button" color="red" appearance="primary" startIcon={<ReloadIcon />} onClick={() => refetch ? refetch() : undefined}>
																	Try Again
													</Button>
									</Message>: <>
													{children}
									</>
					}
				</div>
		)
}
