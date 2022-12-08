import { adminState, tokenState } from '../../../recoil/atom';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './ManageLogin.module.scss';
import {
    GetAdminMutationVariables,
    useGetAdminMutation,
    CreateAdminTokenMutationVariables,
    useCreateAdminTokenMutation,
} from '../../../graphql/types/graphql';
import { client, option, NewAdminHeader } from '../../../graphql/client/client';
import nookies from 'nookies';
import { GetAdminCookie, GetCookie, SetAdminCookie } from 'utils/cookie';

function ManageLogin() {
    const [_, setAdmin] = useRecoilState(adminState);
    const [err, setErr] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [auth, setAuth] = useState<boolean>(false);

    // get cookie
    const cookie = GetAdminCookie(); // utils function
    const [__, setToken] = useRecoilState<boolean>(tokenState);

    // admin mutation
    const adminVariable: GetAdminMutationVariables = { username: username, password: password };
    const adminMutation = useGetAdminMutation(client, option, NewAdminHeader());

    // token mutation
    const tokenVariable: CreateAdminTokenMutationVariables = { user_id: username };
    const tokenMutation = useCreateAdminTokenMutation(client, option, NewAdminHeader());

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
                            setToken(true);
                            SetAdminCookie(res.createAdminToken); // utils function
                        })
                        .catch((err) => {
                            setErr(true);
                            return;
                        });
                }
            })
            .catch((err) => {
                setErr(true);
                return;
            });
    }

    useEffect(() => {
        if (cookie) {
            setAdmin(true);
        }
        // set cookie
        if (auth) {
            setErr(false);
            setUsername('');
            setPassword('');
            setAdmin(true);
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

// SSR cookie
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
