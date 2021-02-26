import React from 'react';
import './styles.scss';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(fab, faFacebook, faInstagram)

const Footer = props => {
    return (
        <footer className="footer">
            <div className="wrap">
                <h4>- Don't Hurry, Drink Coffee -</h4>
                <div className="social">
                    <p>Follow Us</p>
                    <ul class="social-icons">
                    <li><a href="https://www.facebook.com/Jaiyen.koff"><FontAwesomeIcon className="icon" icon={['fab' , 'facebook']} size="2x" /></a></li>
                    <li><a href="https://www.instagram.com/jaiyen.koff/"><FontAwesomeIcon className="icon" icon={['fab' , 'instagram']} size="2x" /></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer