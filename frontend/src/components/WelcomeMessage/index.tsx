import { FC } from 'react'
import classes from './index.module.css'
import Logo from '../Logo'

const WelcomeMessage:FC = () => <>
	<Logo className={classes.logo} />
	<h2>Welcome To</h2>
	<h1>Karnataka Labour Welfare Board</h1>
</>

export default WelcomeMessage