import { pathState } from 'recoil/atom';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './Login.module.scss';
import {
    CreateTokenMutationVariables,
    LoginUserMutationVariables,
    useCreateTokenMutation,
    useLoginUserMutation,
} from '../../src/graphql/types/graphql';
import { tokenClient, option, headers } from '@/graphql/client/client';
import { GetCookie, SetCookie } from 'utils/cookie';

function Login() {
    const [__, setPath] = useRecoilState<string>(pathState);
    const [err, setErr] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // get cookie
    const [token, setToken] = useState<string>('');

    // login mutation
    var variable: LoginUserMutationVariables = { user_id: userId, password: password };
    const loginMutation = useLoginUserMutation(tokenClient, option, headers);

    // token mutation
    const tokenVariable: CreateTokenMutationVariables = { user_id: userId };
    const tokenMutation = useCreateTokenMutation(tokenClient, option, headers);

    function changeHandlerId(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setUserId(e.target.value);
    }

    function changeHandlerPass(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPassword(e.target.value);
    }

    function loginHandler() {
        if (userId == '' || password == '') {
            setErr(true);
            return;
        }
        // user password auth
        loginMutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (res.loginUser) {
                    // get token
                    tokenMutation
                        .mutateAsync(tokenVariable, option)
                        .then((res) => {
                            setToken(res.createToken);
                            SetCookie(res.createToken);
                        })
                        .catch((res) => {
                            setErr(true);
                        });
                }
            })
            .catch((res) => {
                setErr(true);
            });
    }

    useEffect(() => {
        // client side get cookie
        if (typeof window != undefined) {
            const cookie = GetCookie(); // utils function
            setToken(cookie as string);
        }

        setPath(router.pathname);

        if (token) {
            setPath('/');
            router.push('/');
        } else {
            setUserId('');
            setPassword('');
        }
    }, [token]);

    return (
        <div>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Login</p>
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
                            name='userId'
                            value={userId}
                            className={styles.input}
                            placeholder='user id'
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

                    <div className={styles.loginBox}>
                        <button
                            className={styles.loginButton}
                            onClick={() => {
                                loginHandler();
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

export default Login;
