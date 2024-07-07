import { FC } from 'react';
import { Loader } from 'rsuite';
import classes from './index.module.css'
import Logo from '../Logo';

const PageLoader:FC<{display?: boolean}> = ({display = false}) => {

    return (
        <div className="grid-center min-h-dvh">
            <div className='w-100'>
                {display && <><Logo className={classes.logo} /><br/></>}
                <div className='text-center mt-1'>
                    <Loader size="md" />
                </div>
            </div>
        </div>
    )
}
export default PageLoader