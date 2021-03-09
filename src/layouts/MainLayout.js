import React from 'react'

// Components
import Header from './..//components/Header';
import Footer from './../components/Footer';
import AdminPortal from './../components/AdminToolBar';

const MainLayout = props => {
    return (
        <div>
            <AdminPortal />
            <Header {...props} />
                <div className="main">
                    {props.children}
                </div>
            <Footer />
        </div>
    );
};

export default MainLayout;