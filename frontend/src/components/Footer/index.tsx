import { Footer as MainFooter } from "rsuite"
import classes from './index.module.css'

function Footer() {

  return (
    <>
        <MainFooter className={classes.footer}>
          <div className="container text-center">
            <p className={classes.copyright}>Government of Karnataka © Copyright {new Date().getFullYear()}. All rights reserved.</p>
          </div>
        </MainFooter>
    </>
  )
}

export default Footer
