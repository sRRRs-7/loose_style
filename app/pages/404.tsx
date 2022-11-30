import React, { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Error from '../components/Error/Error';

export default function ErrorPage() {
    return (
        <div>
            <div>
                <div>
                    <Header />
                </div>

                <div>
                    <Error />
                </div>

                <div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
