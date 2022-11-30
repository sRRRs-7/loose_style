import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { keywordSearchState, keywordState, pageState, pathState } from '../../src/recoil/atom';
import styles from './Header.module.scss';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { blue } from '@mui/material/colors';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import nookies from 'nookies';

function Header() {
    const [path, setPath] = useRecoilState<string>(pathState);
    const [_, setPage] = useRecoilState<number>(pageState);
    const [__, setIsKeywordSearch] = useRecoilState(keywordSearchState);
    const [keyword, setKeyword] = useRecoilState<string>(keywordState);
    const [value, setValue] = useState<string>('');

    // get cookie
    const [token, setToken] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        // client side get cookie
        if (typeof window != undefined) {
            const cookie = nookies.get(null, `${process.env.NEXT_PUBLIC_COOKIE_KEY}`);
            setToken(cookie[process.env.NEXT_PUBLIC_COOKIE_KEY!]);
        }
    }, [token]);

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setValue(e.target.value);
    }

    // enter key search
    function enterHandler(e: any) {
        e.preventDefault;
        if (e.key != 'Enter') {
            return;
        }
        window.onkeydown;
        setIsKeywordSearch(true);
        setKeyword(value);
        setPage(1);
        setValue('');
    }

    // click search icon
    function searchHandler() {
        setIsKeywordSearch(true);
        setKeyword(value);
        setPage(1);
        setValue('');
    }

    function logoutHandler() {
        destroyCookie(null, `${process.env.NEXT_PUBLIC_COOKIE_KEY}`);
        if (router.pathname == '/') {
            router.reload();
        }
        router.push('/');
    }

    function pathHandler(pathname: string) {
        setPath(pathname);
    }

    function homeHandler() {
        // display refresh
        if (router.pathname == '/') {
            window.location.reload();
        }
    }

    return (
        <div className={styles.box}>
            <div className={styles.title_box}>
                <Link href='/'>
                    <p className={styles.text} onClick={() => homeHandler()}>
                        Loose Style
                    </p>
                </Link>
            </div>
            <div className={styles.input_box}>
                {(router.pathname == '/' || router.pathname == '/cart') && (
                    <div>
                        <input
                            type='text'
                            value={value}
                            className={styles.input}
                            placeholder='Search...'
                            onChange={(e) => changeHandler(e)}
                            onKeyDown={(e) => enterHandler(e)}
                        />
                        <SearchTwoToneIcon className={styles.search_icon} onClick={() => searchHandler()} />
                    </div>
                )}
            </div>

            {token ? (
                <div className={styles.sign_box}>
                    {path == '/cart' ? (
                        <ShoppingCartTwoToneIcon sx={{ color: blue[700] }} fontSize='large' />
                    ) : (
                        <Link href='/cart'>
                            <ShoppingCartTwoToneIcon className={styles.cart_icon} onClick={() => pathHandler('/cart')} />
                        </Link>
                    )}
                    <div>
                        <p className={styles.sign_text} onClick={() => logoutHandler()}>
                            Logout
                        </p>
                    </div>
                </div>
            ) : (
                <div className={styles.sign_box}>
                    {path == '/signup' ? (
                        <p className={styles.current_path}>Signup</p>
                    ) : (
                        <Link href='/signup'>
                            <p className={styles.sign_text} onClick={() => pathHandler('/signup')}>
                                Signup
                            </p>
                        </Link>
                    )}

                    {path == '/login' ? (
                        <p className={styles.current_path}>Login</p>
                    ) : (
                        <Link href='/login'>
                            <p className={styles.sign_text} onClick={() => pathHandler('/login')}>
                                Login
                            </p>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default Header;
