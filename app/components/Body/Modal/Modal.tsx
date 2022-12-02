import { getProductModalState, productState } from '../../../recoil/atom';
import React from 'react';
import { useRecoilState } from 'recoil';
import styles from './Modal.module.scss';

function Modal() {
    const [_, setIsGetProductModal] = useRecoilState<boolean>(getProductModalState); // get product and show modal
    const [product, ___] = useRecoilState<any>(productState); // get product modal value

    function modalCloseHandler() {
        setIsGetProductModal(false);
    }

    return (
        <>
            <section className={styles.modal}>
                <div className={styles.flex_box}>
                    <img src='' alt='' />
                    <button
                        className={styles.close_btn}
                        onClick={() => {
                            modalCloseHandler();
                        }}
                    >
                        ❌
                    </button>
                </div>

                <div className={styles.content}>
                    <p>contents</p>
                    <p>{product?.id}</p>
                    <img src={product?.img} alt='product_image' />
                    <p>{product?.product_name}</p>
                    <p>{product?.description}</p>
                    <p>{product?.unit_price}</p>
                </div>

                <button className={styles.btn}>Add Cart</button>
            </section>
            <div className={styles.overlay}></div>
        </>
    );
}

export default Modal;