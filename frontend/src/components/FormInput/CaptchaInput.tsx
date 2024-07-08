import ReCAPTCHA from "react-google-recaptcha";
import { Form } from 'rsuite'
import { Controller, Control } from 'react-hook-form';
import { LegacyRef, forwardRef } from "react";

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
		error: string | undefined
};

const CaptchaInput = forwardRef((props: PropType, ref:LegacyRef<ReCAPTCHA> | undefined) => {
	const { control, error } = props;
	return (
					<Form.Group>
									<Controller
													name="captcha"
													control={control}
													render={({ field }) => (
																	<>
																					<ReCAPTCHA
																									sitekey={import.meta.env.VITE_USER_GOOGLE_CAPTCHA_SITE_KEY}
																									onChange={field.onChange}
																									ref={ref}
																					/>
																					<Form.ErrorMessage show={!!error} placement="bottomStart">
																									{error}
																					</Form.ErrorMessage>
																	</>
													)}
									/>
					</Form.Group>
    )
});

export default CaptchaInput