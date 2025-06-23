import { FC } from 'react';
import classes from '../index.module.css'
import { AboutIcon, DeathIcon, MaternityIcon, MedicalIcon, SchemeIcon } from './SvgIcon';
import { LanguagesEnum } from '../../../utils/constants/language';

const aboutContent = {
	english: (<>
		<h4>About Us</h4>
				<p> The Karnataka Labour Welfare Fund is constituted for financing and conducting
					activities to promote welfare of contributing employees covered under the
					Karnataka Labour Welfare Act, 1965. The employees working in various industries,
					their dependents and children are eligible for the welfare schemes. </p>
				<p><b>Note:</b> Every year before 15th of January the employees’, employers’
					contribute in the ratio of 50 : 100 i.e. Rs. 150 /- for each employee is to be
					remitted by the employer to the Welfare Fund.</p>
	</>),
	kannada: (<>
		<h4>ನಮ್ಮ ಬಗ್ಗೆ</h4>
				<p> ಕರ್ನಾಟಕ ರಾಜ್ಯದಲ್ಲಿ ಕಾರ್ಮಿಕ ಕಲ್ಯಾಣವನ್ನು ಸಂವರ್ಧನಗೊಳಿಸುವುದಕ್ಕೆ ಹಣಕಾಸು ನೆರವು ಒದಗಿಸಲು ಮತ್ತು ಚಟುವಟಿಕೆಗಳನ್ನು ನಡೆಸುವುದಕ್ಕಾಗಿ ಒಂದು ನಿಧಿಯನ್ನು, ಕರ್ನಾಟಕ ಕಾರ್ಮಿಕ ಕಲ್ಯಾಣ ನಿಧಿ ಅಧಿನಿಯಮ, 1965 ಅಡಿಯಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾಗಿದೆ. ಮಂಡಳಿಗೆ ವಂತಿಗೆ ಪಾವತಿಸುವ ವಿವಿಧ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ದುಡಿಯುತ್ತಿರುವ ಸಂಘಟಿತ ಕಾರ್ಮಿಕರು ಮತ್ತು, ಅವರ ಕುಟುಂಬದ ಅವಲಂಬಿತರ ಕ್ಷೇಮಾಭಿವೃದ್ಧಿಗೆ ಕಾರ್ಮಿಕ ಕಲ್ಯಾಣ ಮಂಡಳಿಯಲ್ಲಿ ಯೋಜನೆಗಳು ಜಾರಿಯಲ್ಲಿರುತ್ತದೆ. </p>
				<p><b>ಸೂಚನೆ:</b> ಯೋಜನೆಯ ಸೌಲಭ್ಯ ಪಡೆಯಲು ಪ್ರತಿ ವರ್ಷ ಜನವರಿ 15 ರೊಳಗೆ ಕಾರ್ಮಿಕರು, ಮಾಲೀಕರು ರೂ.50:100 ಅನುಪಾತದಲ್ಲಿ ಒಬ್ಬ ಕಾರ್ಮಿಕನಿಗೆ ಒಟ್ಟು ರೂ. 150/- ಗಳಂತೆ ವಂತಿಕೆಯನ್ನು ಕಾರ್ಮಿಕ ಕಲ್ಯಾಣ ನಿಧಿಗೆ ಪಾವತಿಸತಕ್ಕದ್ದು.</p>
	</>),
}

export const AboutSection: FC<{language:LanguagesEnum}> = ({language}) => {
	return (
		<div className={classes.aboutDiv} id='about'>
			<div className="row justify-center align-center">
				<div className={classes.iconContainer}>
					<AboutIcon />
				</div>
			</div>
			<div className={classes.textContainer}>
				{aboutContent[language]}
			</div>
		</div>
	);
}

const reportContent = {
	english: (<>
		<h4>List of schemes:</h4>
				<p className='text-center'><code style={{color: '#ffa500'}}>BENEFITS AVAILABLE TO WORKERS WITHOUT WAGE LIMIT, AGE 18-60 YEARS</code></p>
				<p><b>Medical Assistance:</b> Medical assistance to workers minimum of Rs. 1,000/- to maximum of Rs.25,000/- for treatment of major ailments viz., Heart operation, Kidney transplantation, Cancer treatment, Angioplasty, Eye, Orthopaedic, Uterus operations, Gall bladder problems, Kidney stone removal, Brain haemorrhage, and for medical check-up each case Rs. 500/- to Rs. 1000/-</p>
				<p><b>Accident Benefit:</b> Accident benefit of Rs. 1,000/- to Rs. 10,000/- will be paid to workers who met with accidents at work place. The application is to be submitted within three months of occurrence of accident with medical records</p>
				<p><b>Maternity benefit for women:</b> Rs 10,000/- Financial Assistance will be given as maternity Benefit for working women for first 2 Children. The application is to be submitted within 6 months of Delivery.</p>
				<p><b>Funeral Expenses:</b> Rs. 20,000/- will be given to the deceased’s Workers dependents. The application is to be submitted within 6 months of death of worker.</p>
				<p><b>Medical Check-up Camps:</b> Rs. 1,00,000/- Financial Assistance for annual medical check-up camps Sponsored by Trade Union/Associations for workers.</p>
				<p><b>Annual Sports activity:</b> Rs. 1,00,000/- Financial Assistance for annual Sports activity at district-level by registered Trade Unions</p>
	</>),
	kannada: (<>
		<h4>ಯೋಜನೆಗಳ ಪಟ್ಟಿ:</h4>
				<p className='text-center'><code style={{color: '#ffa500'}}>18-60 ವರ್ಷ ವಯಸ್ಸಿನ, ವೇತನ ಮಿತಿಯಿಲ್ಲದ ಕಾರ್ಮಿಕರಿಗೆ ಪ್ರಯೋಜನಗಳು ಲಭ್ಯವಿದೆ</code></p>
				<p><b>ಕಾರ್ಮಿಕರಿಗೆ ವೈದ್ಯಕೀಯ ನೆರವು:</b> ಹೃದಯ ಶಸ್ತçಚಿಕಿತ್ಸೆ, ಕಿಡ್ನಿ ಟ್ರಾನ್ಸ್ಪ್ಲಾಂಟೇಷನ್, ಕ್ಯಾನ್ಸರ್, ಆಂಜಿಯೋಪ್ಲಾಸ್ಟಿ, ಕಣ್ಣು, ಅರ್ಥೊಪೆಡಿಕ್, ಗರ್ಭಕೋಶದ ಶಸ್ತç ಚಿಕಿತ್ಸೆ, ಗಾಲ್ ಬ್ಲಾಡರ್ ತೊಂದರೆ, ಮೆದುಳಿನ ರಕ್ತಸ್ರಾವ ಚಿಕಿತ್ಸೆಗೆ ಕನಿಷ್ಠ ರೂ. ೧,೦೦೦/-ದಿಂದ ಗರಿಷ್ಠ ರೂ,೨೫,೦೦೦/-ವರೆಗೆ ಮತ್ತು ಆರೋಗ್ಯ ತಪಾಸಣೆಗೆ ರೂ. ೫೦೦/-ರಿಂದ ರೂ, ೧೦೦೦/-ವರೆಗೆ ಧನ ಸಹಾಯ ನೀಡಲಾಗುವುದು.</p>
				<p><b>ಕಾರ್ಮಿಕರಿಗೆ ಅಪಘಾತ ಧನ ಸಹಾಯ:</b> ಕಾರ್ಮಿಕರಿಗೆ ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಅಪಘಾತವಾದಲ್ಲಿ ಕÀನಿಷ್ಠ ರೂ. ೧,೦೦೦/- ಗರಿಷ್ಠ ರೂ. ೧೦,೦೦೦/- ವರೆಗೆ ಧನ ಸಹಾಯ ನೀಡಲಾಗುವುದು. ಸೌಲಭ್ಯ ಪಡೆಯುವ ಕಾರ್ಮಿಕರು ಅಪಘಾತವಾದ ಮೂರು ತಿಂಗಳೊಳಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸತಕ್ಕದ್ದು.</p>
				<p><b>ಹೆರಿಗೆ ಭತ್ಯೆ ಸೌಲಭ್ಯ:</b> ಮಹಿಳಾ ಕಾರ್ಮಿಕರಿಗೆ ಮೊದಲ ೨ ಮಕ್ಕಳಿಗೆ ಮಾತ್ರ ಹೆರಿಗೆ ಭತ್ಯೆ ಸೌಲಭ್ಯವನ್ನು ತಲಾ ರೂ. ೧೦,೦೦೦/- ಧನ ಸಹಾಯ ನೀಡಲಾಗುವುದು. ಮಗು ಜನಿಸಿದ ೬ ತಿಂಗಳೊಳಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸತಕ್ಕದ್ದು</p>
				<p><b>ಮೃತ ಕಾರ್ಮಿಕನ ಅಂತ್ಯ ಸಂಸ್ಕಾರಕ್ಕೆ ಧನ ಸಹಾಯ:</b> ಈ ಯೋಜನೆಯ ಸೌಲಭ್ಯ ಪಡೆಯಲು ಮೃತರ ಕುಟುಂಬದ ಅವಲಂಬಿತರು ಕಾರ್ಮಿಕ ಮೃತಪಟ್ಟ ೬ ತಿಂಗಳೊಳಗೆ ನಿಗಧಿತ ಅರ್ಜಿ ನಮೂನೆಯಲ್ಲಿ ಸೂಕ್ತ ದಾಖಲೆÀಗಳೊಂದಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದಲ್ಲಿ, ರೂ. ೧೦,೦೦೦/- ಧನ ಸಹಾಯ ನೀಡಲಾಗುವುದು.</p>
				<p><b>ವಾರ್ಷಿಕ ವೈದ್ಯಕೀಯ ತಪಾಸಣೆ ಶಿಬಿರ ಹಮ್ಮಿಕೊಳ್ಳುವ ಟ್ರೇಡ್ ಯೂನಿಯನ್/ಸಂಸ್ಥೆಗಳಿಗೆ ಧನಸಹಾಯ:</b> ನೋಂದಾಯಿತ ಕಾರ್ಮಿಕ ಸಂಘಟನೆಗಳು/ಸರ್ಕಾರೇತರ ಸಂಸ್ಥೆಗಳು ಕಲ್ಯಾಣ ಆಯುಕ್ತರ ಪೂರ್ವಾನುಮತಿಯೊಂದಿಗೆ ಹಮ್ಮಿಕೊಳ್ಳುವ ವಾರ್ಷಿಕ ಆರೋಗ್ಯ ತಪಾಸಣೆ ಶಿಬಿರಕ್ಕೆ ರೂ. ೧,೦೦,೦೦೦/- ಧನ ಸಹಾಯ ನೀಡಲಾಗುವುದು.</p>
				<p><b>ವಾರ್ಷಿಕ ಕ್ರೀಡಾ ಕೂಟ ಹಮ್ಮಿಕೊಳ್ಳುವ ನೊಂದಾಯಿತ ಕಾರ್ಮಿಕ ಸಂಘಗಳಿಗೆ ಧನಸಹಾಯ:</b> ನೋಂದಾಯಿತ ಕಾರ್ಮಿಕ ಸಂಘಟನೆಗಳು ಕಲ್ಯಾಣ ಆಯುಕ್ತರ ಪೂರ್ವಾನುಮತಿಯೊಂದಿಗೆ ವಾರ್ಷಿಕ ಕ್ರೀಡಾ ಕೂಟ ಹಮ್ಮಿಕೊಂಡಲ್ಲಿ ರೂ. ೧,೦೦,೦೦೦/- ಧನ ಸಹಾಯ ನೀಡಲಾಗುವುದು.</p>
	</>),
}

const applicationFormats = {
	english: [
		{name:'Maternity Application', link: '/maternity-application.pdf', Icon: MaternityIcon, button: 'Download'},
		{name:'Medical Application', link: '/medical-application.pdf', Icon: MedicalIcon, button: 'Download'},
		{name:'Death Application', link: '/death-application.pdf', Icon: DeathIcon, button: 'Download'},
	],
	kannada: [
		{name:'ಹೆರಿಗೆ ಅರ್ಜಿ', Icon: MaternityIcon, link: '/maternity-application.pdf', button: 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ'},
		{name:'ವೈದ್ಯಕೀಯ ಅಪ್ಲಿಕೇಶನ್', Icon: MedicalIcon, link: '/medical-application.pdf', button: 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ'},
		{name:'ಸಾವಿನ ಅಪ್ಲಿಕೇಶನ್', Icon: DeathIcon, link: '/death-application.pdf', button: 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ'},
	],
}

export const ReportSection: FC<{language:LanguagesEnum}> = ({language}) => {
	return (
		<div className={`${classes.aboutDiv} ${classes.reportDiv}`} id='report'>
			<div className="row justify-center align-center">
				<div className={classes.iconContainer}>
					<SchemeIcon />
				</div>
			</div>
			<div className={classes.textContainer}>
				{reportContent[language]}
			</div>
			<div className={classes.textContainer}>
				<h4>{language === LanguagesEnum.KANNADA ? "ಅಪ್ಲಿಕೇಶನ್ ಫಾರ್ಮ್ಯಾಟ್" : "Application Format"}:</h4>
				<div className="row justify-center gap-1 mt-2">
					{
						applicationFormats[language].map((format, index) => (
							<div key={index} className={`${classes.loginDiv} ${classes.applicationDiv}`}>
								<format.Icon />
								<h3>{format.name}</h3>
								<a href={format.link} download={true} target='_blank'>{format.button}</a>
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}
