import React from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link';

function Footer() {
    return (
        <div>
            <div className={styles.box}>
                <p className={styles.text}>Loose Style</p>
                <p className={styles.sub_text}> - To Be Lazy - </p>
                <div className={styles.manage}>
                    <Link href={'/manage'}>manage display</Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;
