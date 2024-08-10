import { ReactNode } from "react"
import { Button, Divider, Panel, Stack } from "rsuite"
import ArowBackIcon from '@rsuite/icons/ArowBack';
import { useNavigate } from "react-router-dom";


type Props = {
	children?: ReactNode;
	title: string;
}

export default function DetailLayout({children, title}:Props) {
	const navigate = useNavigate();
		return (
				<div className="data-table-container">
					<Panel
            bordered
            shaded
            header={
            <Stack justifyContent="space-between" alignItems="center">
                <div>
                    <h1 className="brand-text-color">{title}</h1>
                </div>
                <Button type="button" appearance="primary" color="violet" onClick={() => navigate(-1)} startIcon={<ArowBackIcon />} >Go Back</Button>
            </Stack>
            }
       >
								<Divider />
								{children}
							</Panel>
				</div>
		)
}
