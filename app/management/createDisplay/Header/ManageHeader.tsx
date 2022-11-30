import React from 'react';
import styles from './ManageHeader.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

function ManageHeader() {
    const router = useRouter();

    return (
        <div className={styles.box}>
            <div className={styles.title_box}>
                <Link href='/'>
                    <p className={styles.text} onClick={() => router.push('/')}>
                        Loose Style
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default ManageHeader;
