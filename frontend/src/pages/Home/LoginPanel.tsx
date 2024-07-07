import { FC } from 'react';
import { Content } from 'rsuite';
import classes from './index.module.css'
import { page_routes } from '../../utils/page_routes';
import { Link } from 'react-router-dom';
import { AboutIcon, IndustryIcon, OfficialIcon, RupeeIcon, StudentIcon } from './SvgIcon';

const items = {
	english: [
		{name:'STUDENT', Icon: StudentIcon, link: page_routes.auth.student.login, button: 'Login'},
		{name:'INSTITUTE', Icon: AboutIcon, link: page_routes.auth.institute.login, button: 'Login'},
		{name:'INDUSTRY', Icon: IndustryIcon, link: page_routes.auth.industry.login, button: 'Login'},
		{name:'OFFICIAL', Icon: OfficialIcon, link: page_routes.auth.govt.login, button: 'Login'},
		{name:'PAYMENT OF LABOUR FUND', Icon: RupeeIcon, link: page_routes.auth.contribution.login, button: 'Login'}
	],
	kannada: [
		{name:'ವಿದ್ಯಾರ್ಥಿ', Icon: StudentIcon, link: page_routes.auth.student.login, button: 'ಲಾಗಿನ್ ಮಾಡಿ'},
		{name:'ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಗಳು', Icon: AboutIcon, link: page_routes.auth.institute.login, button: 'ಲಾಗಿನ್ ಮಾಡಿ'},
		{name:'ಉದ್ಯೋಗ ಸಂಸ್ಥೆಗಳು', Icon: IndustryIcon, link: page_routes.auth.industry.login, button: 'ಲಾಗಿನ್ ಮಾಡಿ'},
		{name:'ಅಧಿಕೃತ ಲಾಗಿನ್', Icon: OfficialIcon, link: page_routes.auth.govt.login, button: 'ಲಾಗಿನ್ ಮಾಡಿ'},
		{name:'ವಂತಿಕೆ ಪಾವತಿ', Icon: RupeeIcon, link: page_routes.auth.contribution.login, button: 'ಲಾಗಿನ್ ಮಾಡಿ'}
	],
}

const LoginPanel:FC<{language:"kannada" | "english"}> = ({language}) => {
    return (
      <Content className={classes.content}>
									<div className="container">
										<div className="row gap-1">
											{items[language].map((item, index) => (
												<div className={classes.loginDiv} key={index}>
													<item.Icon />
													<h3>{item.name}</h3>
													<Link to={item.link} target='_blank'>{item.button}</Link>
												</div>
											))}
										</div>
									</div>
								</Content>
    );
}

export default LoginPanel
