import React, { useEffect } from 'react';
import styles from './Error.module.scss';
import { useRouter } from 'next/router';

function Error() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 5000);
    });

    return (
        <div>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>This page is not exist</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;
