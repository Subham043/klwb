import { FC } from 'react'
import logo from '../../assets/images/logo.png'

const Logo:FC<{className?: string}> = ({className}) => <img src={logo} alt="" className={className} />

export default Logo