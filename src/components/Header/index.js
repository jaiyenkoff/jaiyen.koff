import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from './../../firebase/utils'
import './styles.scss'
import { useSelector } from "react-redux";

//Logo 
import Logo from './../../assets/logos/Jaiyen-logo.png'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const Header = props => {
    const { currentUser } = useSelector(mapState);
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="JAIYEN KOFFEE" />
                    </Link>
                </div>
                <div className="callToAction">

                    {currentUser && (
                        <ul>
                            <li>
                                <Link to="/dashboard">
                                    My Account
                                </Link>
                            </li>
                             <li>
                                <span onClick={() => auth.signOut()}>
                                    Log Out
                                </span>
                            </li>
                        </ul>
                    )}
                    {!currentUser && (
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
                    )}
                    
                </div>
            </div>
        </header>
    )
}



Header.defaultProps = {
    currentUser: null
}


export default Header;