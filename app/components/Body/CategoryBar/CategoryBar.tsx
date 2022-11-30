import { categorySearchState, categoryState, pageState } from '@/recoil/atom';
import React from 'react';
import { useRecoilState } from 'recoil';
import styles from './CategoryBar.module.scss';

function CategoryBar() {
    const [category, setCategory] = useRecoilState(categoryState);
    const [__, setPage] = useRecoilState(pageState);
    const [_, setIsCategorySearch] = useRecoilState<boolean>(categorySearchState);

    function clickHandler(category: string) {
        setCategory(category);
        setPage(1);
        setIsCategorySearch(true);
    }

    return (
        <>
            <div className={styles.box}>
                <div className={styles.grid_box}>
                    {category == 'fashion' ? (
                        <div className={styles.grid_items_current}>
                            <p>Fashion</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickHandler('fashion')}>
                            <p>Fashion</p>
                        </div>
                    )}

                    {category == 'life_style' ? (
                        <div className={styles.grid_items_current}>
                            <p>Life Style</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickHandler('life_style')}>
                            <p>Life Style</p>
                        </div>
                    )}

                    {category == 'chair' ? (
                        <div className={styles.grid_items_current}>
                            <p>Chair</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickHandler('chair')}>
                            <p>Chair</p>
                        </div>
                    )}

                    {category == 'interior' ? (
                        <div className={styles.grid_items_current}>
                            <p>Interior</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickHandler('interior')}>
                            <p>Interior</p>
                        </div>
                    )}

                    {category == 'shoes' ? (
                        <div className={styles.grid_items_current}>
                            <p>Shoes</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickHandler('shoes')}>
                            <p>Shoes</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CategoryBar;
