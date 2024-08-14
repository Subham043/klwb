import { Form, SelectPicker } from 'rsuite'
import { Controller, Control } from 'react-hook-form';
import { ItemDataType } from 'rsuite/esm/MultiCascadeTree';

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: ItemDataType<any>[]
		label: string
		name: string
		loading?: boolean
		disabled?: boolean
		error: string | undefined
		searchHandler?: (val: string) => void
		searchPlaceholder?: string
};


const SelectInput = (props: PropType) => {
	const { control, error, label, name, data, loading, disabled, searchHandler, searchPlaceholder} = props;
	return (
					<Form.Group>
									<Controller
													name={name}
													control={control}
													render={({ field }) => (
																	<>
																					<Form.ControlLabel>{label}</Form.ControlLabel>
																					<SelectPicker data={data} name={field.name} value={field.value} onChange={field.onChange} loading={loading} disabled={disabled} onSearch={(val) => searchHandler && searchHandler(val)} placeholder={searchPlaceholder} virtualized className='w-100' />
																					<Form.ErrorMessage show={!!error} placement="bottomStart">
																									{error}
																					</Form.ErrorMessage>
																	</>
													)}
									/>
					</Form.Group>
    )
};

export default SelectInput