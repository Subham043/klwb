import { FC } from 'react'
import WelcomeMessage from '../WelcomeMessage'

const IntroScreen:FC<{children?: React.ReactNode}> = ({children}) => <div className="text-center">
	<WelcomeMessage />
	{children}
	</div>

export default IntroScreen