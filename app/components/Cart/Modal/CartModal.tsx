import { cartIdState, cartModalState, productState } from '../../../recoil/atom';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './CartModal.module.scss';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { adminClient, headers, option } from '@/graphql/client/client';
import { useDeleteCartMutation, GetCartItemMutationVariables } from '@/graphql/types/graphql';

function CartModal() {
    const [_, setIsCartModal] = useRecoilState<boolean>(cartModalState); // cart modal state
    const [product, __] = useRecoilState<any>(productState); // get product modal value
    const [cartId, ___] = useRecoilState<number>(cartIdState); // receive cart id from top cart page

    // delete a cart mutation
    const deleteMutation = useDeleteCartMutation(adminClient, option, headers);

    function modalCloseHandler() {
        setIsCartModal(false);
    }

    // delete a cart item mutation
    function deleteHandler(id: number) {
        const deleteVariable: GetCartItemMutationVariables = { id: id };
        deleteMutation
            .mutateAsync(deleteVariable, option)
            .then((res) => {
                console.log(res.deleteCart);
            })
            .catch((err) => {
                console.log(err.deleteCart);
            });
        window.location.reload();
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

                <div className={styles.btn}>
                    <div
                        onClick={() => {
                            deleteHandler(cartId);
                            setIsCartModal(false);
                        }}
                    >
                        <DeleteOutlineTwoToneIcon className={styles.trash} />
                    </div>
                    <button className={styles.purchase}>Purchase</button>
                </div>
            </section>
            <div className={styles.overlay}></div>
        </>
    );
}

export default CartModal;
