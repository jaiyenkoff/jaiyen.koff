import React from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'

//Logo 
import Logo from './../../assets/logos/Jaiyen-logo.png'

const Header = props => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="JAIYEN KOFFEE" />
                    </Link>
                </div>
                <div className="callToAction">
                    <ul>
                        <li>
                            <Link to="/jointheparty">
                                Join The Party
                            </Link>
                        </li>
                        <li>
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header