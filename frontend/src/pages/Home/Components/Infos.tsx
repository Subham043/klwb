import { FC } from 'react';
import classes from '../index.module.css'
import { LanguagesEnum } from '../../../utils/constants/language';
import { Link } from 'react-router-dom';
import { page_routes } from '../../../utils/routes/pages';

const year	= new Date().getFullYear();

const notificationContent = {
	english: (<>
		<div className={classes.notificationItem}>
					<p>
						Labour Welfare Fund for the calendar year {year-1} to be paid compulsory on or before 15-1-{year}
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						For Educational Assistance <Link to={page_routes.student.auth.login} target="_blank" rel="noopener noreferrer">CLICK HERE</Link>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						Various benefits given to organized workers and their dependents under welfare schemes in last 4 years. For details <a href="/4_year_progress.pdf" download={true}>CLICK HERE</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						Press Note <a href="/press-note.pdf" download={true}>CLICK HERE</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						Department of Parliamentary Affairs and Legislation Secretariat Notification <a href="/noti2.pdf" download={true}>CLICK HERE</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						Notification issued to Public for guidelines to Apply Online
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
	</>),
	kannada: (<>
		<div className={classes.notificationItem}>
					<p>
						ಕಾರ್ಮಿಕ ಕಲ್ಯಾಣ ನಿಧಿಗೆ {year-1}ನೇ ಕ್ಯಾಲೆಂಡರ್ ವರ್ಷದ ವಂತಿಕೆಯನ್ನು 15-1-{year} ರೊಳಗೆ ಪಾವತಿಸುವುದು ಕಡ್ಡಾಯವಾಗಿರುತ್ತದೆ
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						ಶೈಕ್ಷಣಿಕ ಪ್ರೋತ್ಸಾಹ ಧನಸಹಾಯಕ್ಕಾಗಿ ಅರ್ಜಿಸಲ್ಲಿಸಲು <Link to={page_routes.student.auth.login} target="_blank" rel="noopener noreferrer">ಕ್ಲಿಕ್ ಮಾಡಿ</Link>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						2015-16 ನೇ ಸಾಲಿನಿಂದ 2019-20 ನೇ ಸಾಲಿನವರೆಗೆ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳಡಿ ಸಂಘಟಿತ ಕಾರ್ಮಿಕರು ಮತ್ತು ಅವರ ಕುಟುಂಬದ ಅವಲಂಬಿತರಿಗೆ ನೀಡಿರುವ ವಿವಿಧ
ಸೌಲಭ್ಯಗಳ ವಿವರಗಳಿಗೆ <a href="/4_year_progress.pdf" download={true}>ಕ್ಲಿಕ್ ಮಾಡಿ</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						Press Note <a href="/press-note.pdf" download={true}>ಕ್ಲಿಕ್ ಮಾಡಿ</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
					ಕರ್ನಾಟಕ ವಿಶೇಷ ರಾಜ್ಯಪತ್ರದಲ್ಲಿ ವಂತಿಕೆ ಹೆಚ್ಚಿಸಿದ ಕುರಿತು <a href="/noti2.pdf" download={true}>ಕ್ಲಿಕ್ ಮಾಡಿ</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಮಾರ್ಗಸೂಚಿಗಳಿಗಾಗಿ ಸಾರ್ವಜನಿಕರಿಗೆ ಅಧಿಸೂಚನೆ ನೀಡಲಾಗಿದೆ
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
	</>),
}

export const Notification: FC<{language:LanguagesEnum}> = ({language}) => {
	return (
		<div className={classes.notificationDiv}>
			<h4>{language === LanguagesEnum.KANNADA ? "ಅರ್ಜಿದಾರರ ಗಮನಕ್ಕೆ" : "Notifications"}</h4>
			<div className={classes.marqueeNotificationContent}>
				{notificationContent[language]}
			</div>
		</div>
	);
}

const helpdeskContent = {
	english: (<>
		<div className={classes.notificationItem}>
					<p>
						For any technical issues kindly mail us on: <a href="mailto:welfarecommissioner123@gmail.com">welfarecommissioner123@gmail.com</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						For Engineering and Medical assistance call us on <a href="tel:9141602562">9141602562</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						For queries related to Bengaluru urban district call us on <a href="tel:9141585402">9141585402</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						Pls call us on Mob No for other scholarship assistance: <a href="tel:8277120505">8277120505</a> and <a href="tel:9483710329">9483710329</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						Queries related Labour Welfare Fund : Call - <a href="tel:8277291175">8277291175</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						If no response please whatsapp your query to above number we will call you back with solution.
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
	</>),
	kannada: (<>
		<div className={classes.notificationItem}>
					<p>
						ತಾಂತ್ರಿಕ ಸಮಸ್ಯೆಗಳ ಪರಿಹಾರಕ್ಕಾಗಿ ಅಭ್ಯರ್ಥಿ ಸಹಾಯ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಬಹುದು: <a href="mailto:welfarecommissioner123@gmail.com">welfarecommissioner123@gmail.com</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						ವೈದ್ಯಕೀಯ ಹಾಗೂ ಇಂಜೀನಿಯರಿಂಗ್ ಸಂಬಂಧಿತಪ್ರಶ್ನೆಗಳಿಗೆ ಕರೆ ಮಾಡಿ <a href="tel:9141602562">೯೧೪೧೬೦೨೫೬೨</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						ಬೆಂಗಳೂರು ನಗರ ಸಂಬಂಧಿತ ಪ್ರಶ್ನೆಗಳಿಗೆ ಕರೆ ಮಾಡಿ <a href="tel:9141585402">೯೧೪೧೫೮೫೪೦೨</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						ಅನ್ಯ ಜಿಲ್ಲೆಗಳ ಸಂಬಂಧಿತ ಪ್ರಶ್ನೆಗಳಿಗೆ ಕರೆ ಮಾಡಿ : <a href="tel:8277120505">೮೨೭೭೧೨೦೫೦೫</a> ಹಾಗೂ <a href="tel:9483710329">೯೪೮೩೭೧೦೩೨೯</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						ಕಾರ್ಮಿಕ ಕಲ್ಯಾಣ ನಿಧಿ ಪಾವತಿ ಮಾಹಿತಿಗಾಗಿ ಕರೆ ಮಾಡಿ - <a href="tel:8277291175">೮೨೭೭೧೨೦೫೦೫</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						ಕರೆಗಳನ್ನು ಸ್ವೀಕರಿಸದೇ ಇದ್ದಲ್ಲಿ ನಿಮ್ಮ ದೂರುಗಳನ್ನು ಮೇಲೆ ನೀಡಿರುವ ದೂರವಾಣಿ ಸಂಖ್ಯೆಗಳಿಗೆ ವಾಟ್ಸಾಆಪ್ ಮಾಡಿ ನಾವು ನಿಮ್ಮ ದೂರುಗಳಿಗೆ ಉತ್ತರಿಸುತ್ತೇವೆ
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
	</>),
}
export const HelpDesk: FC<{language:LanguagesEnum}> = ({language}) => {
	return (
		<div className={classes.helpDeskDiv} id='contact'>
			<h4>{language === LanguagesEnum.KANNADA ? "ಸಹಾಯವಾಣಿ ಕೇಂದ್ರ" : "HELPDESK"}</h4>
			<div className={classes.marqueeNotificationContent}>
				{helpdeskContent[language]}
			</div>
		</div>
	);
}

export const ContactUs: FC<{language:LanguagesEnum}> = ({language}) => {
	return (
		<div className={classes.notificationDiv}>
			<h4>{language === LanguagesEnum.KANNADA ? "ಬಗ್ಗೆ" : "Contact Us"}</h4>
			<div className={classes.marqueeNotificationContent}>
				<div className={classes.notificationItem}>
					<p>
						<b>Address</b>: {language===LanguagesEnum.KANNADA ? `No.48, 2nd Floor,
							ಮತ್ತೀಕೆರೆ ಮುಖ್ಯ ರಸ್ತೆ, ಆರ್‌ಟಿಒ ಕಚೇರಿ ಹತ್ತಿರ,
							ಯಶವಂತಪುರ , ಬೆಂಗಳೂರು - 560022.`: `No.48, 2nd Floor,
						Mathikere Main Road, Near RTO Office,
						Yeshwanthpur, Bangalore - 560022.`}
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						<b>Phone</b>: <a href="tel:080 23570266">080 23570266</a> / <a href="tel:080 23575130">080 23575130</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						<b>Fax</b>: 080 23475188
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						<b>Email ID</b>: <a href="mailto:welfarecommissioner123@gmail.com">welfarecommissioner123@gmail.com</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
				<div className={classes.notificationItem}>
					<p>
						<b>Website</b>: <a href="https://klwb.karnataka.gov.in/" target='_blank'>{language===LanguagesEnum.KANNADA ? 'ಕರ್ನಾಟಕ ಕಾರ್ಮಿಕ ಕಲ್ಯಾಣ ಮಂಡಳಿ' : 'Karnataka Labour Welfare Board'}</a>
					</p>
					<div className={classes.marqueeNotificationDivider}></div>
				</div>
			</div>
		</div>
	);
}
