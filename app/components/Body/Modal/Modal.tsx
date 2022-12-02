import { getProductModalState, productState } from '../../../recoil/atom';
import React from 'react';
import { useRecoilState } from 'recoil';
import styles from './Modal.module.scss';
import { CreateCartMutationVariables, useCreateCartMutation } from '../../../src/graphql/types/graphql';
import { adminClient, NewHeader, option } from '@/graphql/client/client';
import { GetCookie, RemoveCookie } from 'utils/cookie';
import { useRouter } from 'next/router';

function Modal() {
    const [_, setIsGetProductModal] = useRecoilState<boolean>(getProductModalState); // get product and show modal
    const [product, __] = useRecoilState<any>(productState); // get product modal value

    // create cart mutation
    const addCartMutation = useCreateCartMutation(adminClient, option, NewHeader());

    const router = useRouter();

    function modalCloseHandler() {
        setIsGetProductModal(false);
    }

    function addCartHandler(productId: number) {
        const addCartVariable: CreateCartMutationVariables = { product_id: productId };
        addCartMutation
            .mutateAsync(addCartVariable, option)
            .then((res) => {
                setIsGetProductModal(false);
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    RemoveCookie();
                    router.push('/login');
                }
            });
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

                {GetCookie() == undefined ? (
                    <div></div>
                ) : (
                    <button
                        className={styles.btn}
                        onClick={() => {
                            addCartHandler(product?.id);
                        }}
                    >
                        Add Cart
                    </button>
                )}
            </section>

            {/* modal background blur */}
            <div className={styles.overlay}></div>
        </>
    );
}

export default Modal;
