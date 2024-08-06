import { Form, Input } from 'rsuite'
import { Controller, Control } from 'react-hook-form';
import { forwardRef } from 'react';

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
		label: string
		name: string
		type?: string
		focus?: boolean
		helpText?: string
		textarea?: boolean
		error: string | undefined
};

const Textarea = forwardRef<HTMLTextAreaElement>((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const TextInput = (props: PropType) => {
	const { control, error, label, type, name, focus=false, helpText, textarea} = props;

	return (
					<Form.Group>
									<Controller
													name={name}
													control={control}
													render={({ field }) => (
																	<>
																					<Form.ControlLabel>{label}</Form.ControlLabel>
																					{
																						textarea ? 
																						<Form.Control name={field.name} value={field.value} accepter={Textarea} autoFocus={focus} style={textarea ? {minHeight: '70px'} : undefined} onChange={field.onChange} />:
																						<Form.Control name={field.name} type={type} value={field.value} autoFocus={focus} onChange={field.onChange} />
																					}
																					{helpText && <Form.HelpText><b>Note:</b> <i>{helpText}</i></Form.HelpText>}
																					<Form.ErrorMessage show={!!error} placement="bottomStart">
																									{error}
																					</Form.ErrorMessage>
																	</>
													)}
									/>
					</Form.Group>
    )
};

export default TextInput