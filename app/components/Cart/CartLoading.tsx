import { Pagination } from '@mui/material';
import React from 'react';
import styles from './Cart.module.scss';
import { DotLoader } from 'react-spinners';

const CartLoading = () => {
    return (
        <>
            <section>
                <Pagination />
            </section>

            <section className={styles.spinnerBox}>
                <div>
                    <DotLoader color='rgb(94, 241, 241)' size={70} speedMultiplier={2} />
                </div>
            </section>
        </>
    );
};

export default CartLoading;
