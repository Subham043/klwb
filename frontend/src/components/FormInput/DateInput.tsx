import { DatePicker, Form } from 'rsuite'
import { Controller, Control } from 'react-hook-form';
import moment from 'moment';

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
		label: string
		name: string
		error: string | undefined
		disabled?: boolean
		shouldDisableDate?: ((date: Date) => boolean) | undefined
};


const DateInput = (props: PropType) => {
	const { control, error, label, name, disabled, shouldDisableDate } = props;
	return (
					<Form.Group>
										<Controller
														name={name}
														control={control}
														render={({ field }) => (
																		<>
																						<Form.ControlLabel>{label}</Form.ControlLabel>
																						<DatePicker disabled={disabled} name={field.name} value={new Date(field.value)} shouldDisableDate={shouldDisableDate} onChange={(value) => field.onChange(moment(value).format('YYYY-MM-DD'))} oneTap format='dd-MM-yyyy' className='w-100' />
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