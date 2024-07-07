import { FC } from 'react';
import { Dropdown, Header } from 'rsuite';
import classes from './index.module.css'
import Logo from '../../components/Logo';
import { NavLink } from 'react-router-dom';
import { page_routes } from '../../utils/page_routes';
import MenuIcon from '@rsuite/icons/Menu';
import minister1 from '../../../public/head1.jpeg'
import minister2 from '../../../public/head2.png'

const Navbar:FC<{language:"kannada" | "english"}> = ({language}) => {
    return (
					<>
            <Header className={classes.mainHeader}>
                <div className="container">
                    <div className="row justify-around align-center">
                        <div className="col-auto text-center">
                            <img src={minister1} alt="" className={classes.ministerLogo} />
                            <h1 className={classes.ministerName}>{language==='kannada' ? 'ಶ್ರೀ ಸಂತೋಷ ಲಾಡ್' : 'Shri Santosh S Lad'}</h1>
                            <h2 className={classes.ministerPosition}>
                                {language==='kannada' ? "ಮಾನ್ಯ ಕಾರ್ಮಿಕ ಮಂತ್ರಿ ಕರ್ನಾಟಕ ಸರ್ಕಾರ" : "Hon'ble Minister of Labour Govt. of Karnataka"}
                            </h2>
                        </div>
                        <div className="col-auto text-center col-order-3">
                            <Logo className={classes.logo} />
                            <h2 className={classes.subHeading}>{language==='kannada' ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ' : 'Government of Karnataka'}</h2>
                            <h1 className={classes.heading}>
                                {language==='kannada' ? 'ಕರ್ನಾಟಕ ಕಾರ್ಮಿಕ ಕಲ್ಯಾಣ ಮಂಡಳಿ' : 'Karnataka Labour Welfare Board'}
                            </h1>
                        </div>
                        <div className="col-auto text-center">
                            <img src={minister2} alt="" className={classes.ministerLogo} />
                            <h1 className={classes.ministerName}>{language==='kannada' ? 'ಶ್ರೀ ಸಿದ್ದರಾಮಯ್ಯ' : 'Shri Siddaramaiah'}</h1>
                            <h2 className={classes.ministerPosition}>
                                {language==='kannada' ? "ಮಾನ್ಯ ಮುಖ್ಯ ಮಂತ್ರಿ ಕರ್ನಾಟಕ ಸರ್ಕಾರ" : "Hon'able Chief Minister Govt. of Karnataka"}
                            </h2>
                        </div>
                    </div>
                </div>
            </Header>
            <Header className={classes.menuHeader}>
              <div className="container">
                <div className="row justify-center align-center mobile-justify-between">
                  <div className={classes.menuButton}>
                    <Dropdown trigger='click' title={<MenuIcon />} noCaret>
                      <Dropdown.Item as={NavLink} to={page_routes.main}>{language === 'kannada' ? 'ಮುಖಪುಟ' : 'Home'}</Dropdown.Item>
                      <Dropdown.Item as={'a'} href={"#about"}>{language === 'kannada' ? 'ನಮ್ಮ ಬಗ್ಗೆ' : 'About Us'}</Dropdown.Item>
                      <Dropdown.Item as={'a'} href={"#report"}>{language === 'kannada' ? 'ವರದಿಗಳು' : 'Reports'}</Dropdown.Item>
                      <Dropdown.Item as={'a'} href={"#contact"}>{language === 'kannada' ? 'ಸಂಪಕಿ೯ಸಿ' : 'Contact Us'}</Dropdown.Item>
                    </Dropdown>
                  </div>
                  <NavLink
                    to={page_routes.main}
                    className={`${classes.linkMenu} ${classes.linkHomeMenu}`}
                  >
                    {language === 'kannada' ? 'ಮುಖಪುಟ' : 'Home'}
                  </NavLink>
                  <a
                    href={"#about"}
                    className={`${classes.linkMenu}`}
                  >
                    {language === 'kannada' ? 'ನಮ್ಮ ಬಗ್ಗೆ' : 'About Us'}
                  </a>
                  <a
                    href={"#report"}
                    className={`${classes.linkMenu}`}
                  >
                    {language === 'kannada' ? 'ವರದಿಗಳು' : 'Reports'}
                  </a>
                  <a
                    href={"#contact"}
                    className={`${classes.linkMenu}`}
                  >
                    {language === 'kannada' ? 'ಸಂಪಕಿ೯ಸಿ' : 'Contact Us'}
                  </a>
                  <NavLink
                    to={(language === 'kannada' ? "?lang=english" : "?lang=kannada")}
                    className={`${classes.linkMenu} ${classes.linkLoginMenu}`}
                  >
                  {language === 'kannada' ? 'English' : 'ಕನ್ನಡ'}
                  </NavLink>
                </div>
              </div>
            </Header>
					</>
    );
}

export default Navbar