import { createState } from '@/recoil/atom';
import React from 'react';
import { useRecoilState } from 'recoil';
import styles from './ManageCategory.module.scss';

function ManageCategory() {
    const [_, setCreate] = useRecoilState<string>(createState);

    function clickHandler(category: string) {
        setCreate(category);
    }

    return (
        <div>
            <div className={styles.box}>
                <div className={styles.grid_box}>
                    <div className={styles.grid_items} onClick={() => clickHandler('media')}>
                        <p>media</p>
                    </div>
                    <div className={styles.grid_items} onClick={() => clickHandler('product')}>
                        <p>product</p>
                    </div>
                    <div className={styles.grid_items} onClick={() => clickHandler('user')}>
                        <p>user</p>
                    </div>
                    <div className={styles.grid_items} onClick={() => clickHandler('brand')}>
                        <p>brand</p>
                    </div>
                    <div className={styles.grid_items} onClick={() => clickHandler('category')}>
                        <p>category</p>
                    </div>
                    <div className={styles.grid_items} onClick={() => clickHandler('cart')}>
                        <p>cart</p>
                    </div>
                    <div className={styles.grid_items} onClick={() => clickHandler('order')}>
                        <p>order</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageCategory;
