import { Form, Input, InputGroup } from 'rsuite'
import { Controller, Control } from 'react-hook-form';
import { useState } from 'react';
import VisibleIcon from '@rsuite/icons/Visible';
import UnvisibleIcon from '@rsuite/icons/Unvisible';

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
		label: string
		name: string
		error: string | undefined
};

const PasswordInput = (props: PropType) => {
	const { control, error, label, name} = props;
	const [visible, setVisible] = useState<boolean>(false);
	const handleChange = () => {
			setVisible(!visible);
	};
	return (
					<Form.Group>
									<Controller
											name={name}
											control={control}
											render={({ field }) => (
															<div>
																			<Form.ControlLabel>{label}</Form.ControlLabel>
																			<InputGroup inside>
																							<Input type={visible ? 'text' : 'password'} name={field.name} value={field.value} onChange={field.onChange} />
																							<InputGroup.Button onClick={handleChange}>
																											{visible ? <UnvisibleIcon /> : <VisibleIcon />}
																							</InputGroup.Button>
																			</InputGroup>
																			<Form.ErrorMessage show={!!error} placement="bottomStart">
																							{error}
																			</Form.ErrorMessage>
															</div>
											)}
										/>
					</Form.Group>
    )
};

export default PasswordInput