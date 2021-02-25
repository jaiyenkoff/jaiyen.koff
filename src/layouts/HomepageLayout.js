import React from 'react'

// Components
import Header from './../components/Header';
import Footer from './../components/Footer';

const HomepageLayout = props => {
    return (
        <div className="fullHeight">
            <div className="hero">
                <Header {...props} />
            </div>
            <div className="content">
                {props.children}
            </div>
            <Footer />
        </div>
    );
};

export default HomepageLayout;