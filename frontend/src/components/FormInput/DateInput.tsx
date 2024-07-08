import { DatePicker, Form } from 'rsuite'
import { Controller, Control } from 'react-hook-form';

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
		label: string
		name: string
		error: string | undefined
};


const DateInput = (props: PropType) => {
	const { control, error, label, name} = props;
	return (
					<Form.Group>
										<Controller
														name={name}
														control={control}
														render={({ field }) => (
																		<>
																						<Form.ControlLabel>{label}</Form.ControlLabel>
																						<DatePicker name={field.name} value={new Date(field.value)} onChange={field.onChange} format='dd-MM-yyyy' className='w-100' />
																						<Form.ErrorMessage show={!!error} placement="bottomStart">
																										{error}
																						</Form.ErrorMessage>
																		</>
														)}
										/>
						</Form.Group>
    )
};

export default DateInput