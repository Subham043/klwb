import React, { FC, useState } from "react"
import { Button, ButtonToolbar, Text, Tooltip, Whisper } from "rsuite";

const ConfirmAlert:FC<{children: React.ReactElement; confirmHandler: () => void; message?: string;}> = ({children, confirmHandler, message = "Are you sure you want to proceed?"}) => {
				const [open, setOpen] = useState(false);
				const handleTooltip = (status:boolean) => setOpen(status);
				const onConfirm = () => {
					confirmHandler();
					handleTooltip(false);
				}
				return <Whisper
					trigger="click"
					placement="bottomEnd"
					open={open}
					onClick={() => setOpen(true)}
					speaker={
							<Tooltip>
								<div style={{padding: 5}}>
										<Text style={{color: "white"}} size="md">
											{message}
										</Text>
										<ButtonToolbar style={{ marginTop: 10 }}>
											<Button onClick={onConfirm} appearance="primary" size="sm" color="red">
												Ok
											</Button>
											<Button onClick={()=>setOpen(false)} appearance="primary" size="sm" color="cyan">
												Cancel
												</Button>
										</ButtonToolbar>
								</div>
							</Tooltip>
					}
  >
				{children}
  </Whisper>
}

export default ConfirmAlert