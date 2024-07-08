import { FC, useMemo } from 'react';
import { Container, Content } from 'rsuite';
import Footer from '../../components/Footer';
import classes from './index.module.css'
import Navbar from './Navbar';
import Banner from './Banner';
import SchemeMarquee from './SchemeMarquee';
import LoginPanel from './LoginPanel';
import { AboutSection, ReportSection } from './Sections';
import { ContactUs, HelpDesk, Notification } from './Infos';
import { useSearchParams } from 'react-router-dom';
import { getLanguage } from '../../utils/helper';

const HomePage:FC = () => {
				const [searchParams] = useSearchParams();
				const language = useMemo(() => getLanguage(searchParams.get('lang')?.toLowerCase() || 'english'), [searchParams]);
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
