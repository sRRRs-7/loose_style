import { adminState } from '@/recoil/atom';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './ManageLogin.module.scss';
import {
    GetAdminMutationVariables,
    useGetAdminMutation,
    useCreateTokenMutation,
    CreateTokenMutationVariables,
} from '../../../src/graphql/types/graphql';
import { tokenClient, option, headers } from '../../../src/graphql/client/client';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import nookies from 'nookies';

function ManageLogin() {
    const [_, setAdmin] = useRecoilState(adminState);
    const [err, setErr] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [auth, setAuth] = useState<boolean>(false);

    // get cookie
    const cookie = nookies.get(null, `${process.env.NEXT_PUBLIC_COOKIE_KEY}`);
    const [token, setToken] = useState<string>(cookie[`${process.env.NEXT_PUBLIC_COOKIE_KEY}`]);

    // admin mutation
    const adminVariable: GetAdminMutationVariables = { username: username, password: password };
    const adminMutation = useGetAdminMutation(tokenClient, option, headers);

    // token mutation
    const tokenVariable: CreateTokenMutationVariables = {};
    const tokenMutation = useCreateTokenMutation(tokenClient, option, headers);

    function changeHandlerId(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setUsername(e.target.value);
    }

    function changeHandlerPass(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPassword(e.target.value);
    }

    function adminHandler() {
        if (username == '' || password == '') {
            setErr(true);
            return;
        }
        // login with username and password
        adminMutation
            .mutateAsync(adminVariable, option)
            .then((res) => {
                if (res.getAdmin.is_password && res.getAdmin.is_username) {
                    setAuth(true);
                    // fetch get token
                    tokenMutation
                        .mutateAsync(tokenVariable, option)
                        .then((res) => {
                            setToken(res.createToken);
                            setCookie(null, `${process.env.NEXT_PUBLIC_COOKIE_KEY}`, res.createToken, {
                                domain: 'localhost',
                                maxAge: 24 * 60 * 60,
                                path: '/',
                                secure: false,
                            });
                        })
                        .catch((res) => {
                            setErr(true);
                            return;
                        });
                }
            })
            .catch((res) => {
                setErr(true);
                return;
            });

        setErr(false);
    }

    useEffect(() => {
        if (token) {
            setAdmin(true);
        }
        // set cookie
        if (auth) {
            setErr(false);
            setUsername('');
            setPassword('');
            setAdmin(true);
            window.location.reload();
        }
    }, [auth]); // important token dependency

    return (
        <div>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Management</p>
                    </div>

                    <div>
                        {err && (
                            <div className={styles.err}>
                                <p>error</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>UserId</p>
                        <input
                            type='text'
                            name='username'
                            value={username}
                            className={styles.input}
                            placeholder='username'
                            onChange={(e) => changeHandlerId(e)}
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>Password</p>
                        <input
                            type='text'
                            name='password'
                            value={password}
                            className={styles.input}
                            placeholder='password'
                            onChange={(e) => changeHandlerPass(e)}
                        />
                    </div>

                    <div className={styles.adminBox}>
                        <button
                            className={styles.adminButton}
                            onClick={() => {
                                adminHandler();
                            }}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageLogin;

export async function getServerSideProps(ctx: any) {
    // Parse
    const cookies = nookies.get(ctx);
    console.log(cookies);

    // Set
    nookies.set(ctx, 'fromGetInitialProps', 'value', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    });

    // Destroy
    // nookies.destroy(ctx, 'cookieName')

    return { cookies };
}
