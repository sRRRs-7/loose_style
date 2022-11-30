import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Login from 'components/Login/Login';
import React from 'react';

function login() {
    return (
        <div>
            <div>
                <Header />
            </div>

            <div>
                <Login />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}

export default login;
