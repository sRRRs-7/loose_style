import React, { useLayoutEffect, useState } from 'react';
import styles from './ManageHeader.module.scss';
import Link from 'next/link';
import { GetAdminCookie, RemoveAdminCookie } from 'utils/cookie';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../../recoil/atom';

function ManageHeader() {
    const [token, setToken] = useRecoilState<boolean>(tokenState);

    function logoutHandler() {
        RemoveAdminCookie();
        window.location.reload();
    }

    useLayoutEffect(() => {
        if (GetAdminCookie() != undefined) {
            setToken(true);
        }
    }, [token]);

    return (
        <div className={styles.box}>
            <div className={styles.title_box}>
                <Link href={'/'}>
                    <p className={styles.text}>Loose Style</p>
                </Link>
                {token ? (
                    <div>
                        <p className={styles.logout_text} onClick={() => logoutHandler()}>
                            Logout
                        </p>
                    </div>
                ) : (
                    <div>
                        <p className={styles.login_text}>login</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageHeader;
