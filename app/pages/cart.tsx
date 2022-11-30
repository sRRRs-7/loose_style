import Cart from 'components/Cart/Cart';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React from 'react';

function cart() {
    return (
        <div>
            <div>
                <Header />
            </div>

            <div>
                <Cart />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}

export default cart;
