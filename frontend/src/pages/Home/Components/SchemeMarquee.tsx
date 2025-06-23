import { FC, useState } from 'react';
import classes from '../index.module.css'
import PlayOutlineIcon from '@rsuite/icons/PlayOutline';
import PauseOutlineIcon from '@rsuite/icons/PauseOutline';
import Marquee from "react-fast-marquee";
import { LanguagesEnum } from '../../../utils/constants/language';

const items = {
	english: (
		<>
			<span>
				<b>
					BENEFITS AVAILABLE TO WORKERS WITHOUT WAGE LIMIT, AGE
					18-60 YEARS
				</b>
			</span>
			<span className={classes.marqueeDivider}></span>
			<span>
				Funeral Expenses of Rs. 20,000/- for death of the
				beneficiary payable to the deceased’s dependents, to be
				applied in the prescribed format within six months
			</span>
			<span className={classes.marqueeDivider}></span>
			<span>
				<b>Medical Check-up Camps:</b> Rs. 1,00,000/- Financial
				Assistance for annual medical check-up camps sponsored by
				Trade Union/Associations for workers contributing to the
				Welfare Fund once in year.
			</span>
			<span className={classes.marqueeDivider}></span>
			<span>
				<b>
					Annual Sports activity: Rs. 1,00,000/- Financial
					Assistance for annual Sports activity at district-level by
					registered Trade Unions one time in a year.
				</b>
			</span>
			<span className={classes.marqueeDivider}></span>
			<span>
				<b>
					Financial assistance for the beneficieres Wil be direct
					deposited to their savings account through rtgs
				</b>
			</span>
			<span className={classes.marqueeDivider}></span>
		</>
	),
	kannada: (
		<>
			<span>
				<b>
					ಈ ಯೋಜನೆಗಳಿಗೆ ಮಾಸಿಕ ಸಂಬಳದ ಮಿತಿಯಿರುವುದಿಲ್ಲ.  ವಯೋಮಿತಿ ವರ್ಷ 18- 60 .
				</b>
			</span>
			<span className={classes.marqueeDivider}></span>
			<span>
				<b>ಮೃತ ಕಾರ್ಮಿಕನ ಅಂತ್ಯ ಸಂಸ್ಕಾರಕ್ಕೆ ಧನ ಸಹಾಯ:</b> ಈ ಯೋಜನೆಯ ಸೌಲಭ್ಯ ಪಡೆಯಬೇಕಾದರೆ ಮೃತರ ಕುಟುಂಬದ ಅವಲಂಬಿತರು ಕಾರ್ಮಿಕ ಮೃತ ಪಟ್ಟ ಆರು ತಿಂಗಳೊಳಗೆ ನಿಗಧಿತ ಅರ್ಜಿ ನಮೂನೆಯಲ್ಲಿ ಸೂಕ್ತ ದಾಖಲೆಗಳೊಂದಿಗೆ ಸಲ್ಲಿಸಿದಲ್ಲಿ, ರೂ.20,000/- ಧನ ಸಹಾಯ ನೀಡಲಾಗುವುದು.
			</span>
			<span className={classes.marqueeDivider}></span>
			<span>
				<b>
					ವಾರ್ಷಿಕ ವೈದ್ಯಕೀಯ ತಪಾಸಣೆ ಶಿಭಿರ ಹಮ್ಮಿಕೊಳ್ಳುವ  ಟ್ರೇಡ್ ಯೂನಿಯನ್/ಸಂಸ್ಥೆಗಳಿಗೆ ಧನಸಹಾಯ: ನೋಂದಾಯಿತ ಕಾರ್ಮಿಕ ಸಂಘಟನೆಗಳು/ಸರ್ಕಾರೇತರ ಸಂಸ್ಥೆಗಳು ಕಲ್ಯಾಣ ಆಯುಕ್ತರಪೂರ್ವಾನುಮತಿಯೊಂದಿಗೆ ಹಮ್ಮಿಕೊಳ್ಳುವ ವಾರ್ಷಿಕ ಆರೋಗ್ಯ ತಪಾಸಣೆ  ಶಿಭಿರಕ್ಕೆ  ರೂ. 1,00,000/- ಧನ ಸಹಾಯ ನೀಡಲಾಗುವುದು. ಒಂದು ಸಂಘಟನೆಗೆ ವರ್ಷದಲ್ಲಿ ಒಂದು ಬಾರಿ ಮಾತ್ರ ಈ ಸೌಲಭ್ಯ ನೀಡಲಾಗುವುದು.
				</b>
			</span>
			<span className={classes.marqueeDivider}></span>
			<span>
				<b>
					ವಾರ್ಷಿಕ ಕ್ರೀಡಾ ಕೂಟ ಹಮ್ಮಿಕೊಳ್ಳುವ ನೊಂದಾಯಿತ ಕಾರ್ಮಿಕ ಸಂಘಗಳಿಗೆ ಧನಸಹಾಯ: ನೋಂದಾಯಿತ ಕಾರ್ಮಿಕ  ಸಂಘಟನೆಗಳು ಕಲ್ಯಾಣ ಆಯುಕ್ತರಪೂರ್ವಾನುಮತಿಯೊಂದಿಗೆ ವಾರ್ಷಿಕ ಕ್ರೀಡಾ ಕೂಟ ಹಮ್ಮಿಕೊಂಡಲ್ಲಿ ರೂ. 1,00,000/- ಧನ  ಸಹಾಯ ನೀಡಲಾಗುವುದು. ವರ್ಷದಲ್ಲಿ ಒಂದು ಸಂಘಟನೆಗೆ  ಒಂದು ಬಾರಿ ಮಾತ್ರ ಈ ಸೌಲಭ್ಯ ನೀಡಲಾಗುವುದು.
				</b>
			</span>
			<span className={classes.marqueeDivider}></span>
			<span>
				<b>
					ಧನ ಸಹಾಯವನ್ನು ಫಲಾನುಭವಿಗಳ ಉಳಿತಾಯ ಖಾತೆಗೆ ನೇರವಾಗಿ ಆರ್.ಟಿ.ಜಿ.ಎಸ್ ಮೂಲಕ ಜಮಾ ಮಾಡಲಾಗುವುದು
				</b>
			</span>
			<span className={classes.marqueeDivider}></span>
		</>
	)
}

const SchemeMarquee: FC<{ language: LanguagesEnum }> = ({ language }) => {
	const [pauseMarquee, setPauseMarquee] = useState(false);
	return (
		<div className={classes.welfareContainer}>
			<div className="container">
				<div className="row">
					<div className={classes.welfareHeading}>{language === LanguagesEnum.KANNADA ? "ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು" : "Welfare Scheme"}</div>
					<div className={classes.welfareMarquee}>
						<Marquee play={!pauseMarquee} pauseOnHover={true} speed={120}>
							<div className={`${classes.marqueeContent}`}>
								{items[language]}
							</div>
						</Marquee>
					</div>
					<div className={classes.welfareButton}>
						<button>
							{
								pauseMarquee ? <PlayOutlineIcon style={{ fontSize: "1.7rem" }} onClick={() => setPauseMarquee(false)} /> : <PauseOutlineIcon style={{ fontSize: "1.7rem" }} onClick={() => setPauseMarquee(true)} />
							}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SchemeMarquee
