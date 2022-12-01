import React, { useEffect } from 'react';
import Body from '../components/Body/Body';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function Home() {
    useEffect(() => {
        if (window.name == 'reload') {
            window.name = '';
        }
    });

    return (
        <div>
            <div>
                <Header />
            </div>

            <div>
                <Body />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}
