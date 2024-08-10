import { FC, useMemo } from 'react';
import { Container, Content } from 'rsuite';
import Footer from '../../components/Footer';
import classes from './index.module.css'
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import SchemeMarquee from './Components/SchemeMarquee';
import LoginPanel from './Components/LoginPanel';
import { AboutSection, ReportSection } from './Components/Sections';
import { ContactUs, HelpDesk, Notification } from './Components/Infos';
import { useSearchParams } from 'react-router-dom';
import { getLanguage } from '../../utils/helpers/getLanguage';
import { LanguagesEnum } from '../../utils/constants/language';

const HomePage:FC = () => {
				const [searchParams] = useSearchParams();
				const language = useMemo(() => getLanguage((searchParams.get('lang')?.toLowerCase() as LanguagesEnum || LanguagesEnum.ENGLISH)), [searchParams]);
    return (
      <Container>
        <Navbar language={language} />
        <Banner language={language} />
        <SchemeMarquee language={language} />
        <LoginPanel language={language} />
								<Content className={classes.content}>
									<div className="container">
										<div className="row">
											<div className={classes.aboutCol}>
												<AboutSection language={language} />
												<ReportSection language={language} />
											</div>
											<div className={classes.notificationCol}>
												<Notification language={language} />
												<HelpDesk language={language} />
												<ContactUs language={language} />
											</div>
										</div>
									</div>
								</Content>
        <Footer />
      </Container>
    );
}

export default HomePage
