import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Signup from 'components/Signup/Signup';
import React from 'react';

function signup() {
    return (
        <div>
            <div>
                <Header />
            </div>

            <div>
                <Signup />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}

export default signup;
