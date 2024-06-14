import { Header as MainHeader } from "rsuite"
import classes from './index.module.css'
import logo from '../../assets/images/logo.png'
import { ChildrenType } from "../../utils/types"

function Header({children}:ChildrenType) {

  return (
    <>
        <MainHeader className={classes.topHeader}>
            <div className="container">
                <div className="row justify-around align-center">
                    <div className="col-auto text-center">
                        <h2 className={classes.subHeading}>ಕರ್ನಾಟಕ ಸರ್ಕಾರ</h2>
                        <h1 className={classes.heading}>ಕರ್ನಾಟಕ ಕಾರ್ಮಿಕ ಕಲ್ಯಾಣ ಮಂಡಳಿ</h1>
                    </div>
                    <div className="col-auto">
                        <img src={logo} alt="" className={classes.logo} />
                    </div>
                    <div className="col-auto text-center">
                        <h2 className={classes.subHeading}>Government of Karnataka</h2>
                        <h1 className={classes.heading}>Karnataka Labour Welfare Board</h1>
                    </div>
                </div>
            </div>
        </MainHeader>
        <MainHeader className={classes.menuHeader}>
            {children}
        </MainHeader>
    </>
  )
}

export default Header
