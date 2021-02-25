import React from 'react';
import './styles.scss'

// img
import inGlass from './../../assets/images/jaiyen-glass.png';
import inBottle from './../../assets/images/directory-2.jpg';

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">           
                <div
                className="item"
                style={{
                    backgroundImage: `url(${inGlass})`
                }}
                >
                    <a>
                        Fresh Brew
                    </a>
                </div>
                <div
                className="item"
                style={{
                    backgroundImage: `url(${inBottle})`
                 }}
                >
                    <a>
                        To Go
                    </a>
                </div>
            </div>
        </div> 
    )
}

export default Directory