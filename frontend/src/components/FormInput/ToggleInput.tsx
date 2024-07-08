import { Form, Toggle } from 'rsuite'
import { Controller, Control } from 'react-hook-form';
import { ReactNode } from 'react';

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
		checkedLabel: ReactNode
		uncheckedLabel: ReactNode
		name: string
		error: string | undefined
};


const ToggleInput = (props: PropType) => {
	const { control, error, checkedLabel, uncheckedLabel, name} = props;
	return (
					<Form.Group>
									<Controller
													name={name}
													control={control}
													render={({ field }) => (
																	<>
																					<Toggle size="lg" checkedChildren={checkedLabel} unCheckedChildren={uncheckedLabel} checked={field.value === 1} onChange={(checked) => field.onChange(checked ? 1 : 0)} />
																					<Form.ErrorMessage show={!!error} placement="bottomStart">
																									{error}
																					</Form.ErrorMessage>
																	</>
													)}
									/>
					</Form.Group>
    )
};

export default ToggleInput