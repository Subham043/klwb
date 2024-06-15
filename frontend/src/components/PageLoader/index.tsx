import { FC } from 'react';
import { Loader } from 'rsuite';
import classes from './index.module.css'
import logo from '../../assets/images/logo.png'

const PageLoader:FC<{display?: boolean}> = ({display = false}) => {

    return (
        <div className="grid-center">
                {display && <img src={logo} alt="" className={classes.logo} />}
                <Loader size="md" center />
            {/* <div className='text-center'>
            </div> */}
        </div>
    )
}
export default PageLoader