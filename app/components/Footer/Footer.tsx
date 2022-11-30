import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
    return (
        <div>
            <div className={styles.box}>
                <p className={styles.text}>Loose Style</p>
                <p className={styles.sub_text}> - To Be Lazy - </p>
            </div>
        </div>
    );
}

export default Footer;
