import { cartIdState, cartModalState, getAllCartState, productState } from '../../../recoil/atom';
import React from 'react';
import { useRecoilState } from 'recoil';
import styles from './CartModal.module.scss';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { client, NewHeader, option } from 'graphql/client/client';
import { useDeleteCartMutation, GetCartItemMutationVariables } from 'graphql/types/graphql';
import { RemoveCookie } from 'utils/cookie';

function CartModal() {
    // cart modal state
    const [_, setIsCartModal] = useRecoilState<boolean>(cartModalState);
    // get product modal value
    const [product, __] = useRecoilState<any>(productState);
    // receive cart id from top cart page
    const [cartId, ___] = useRecoilState<number>(cartIdState);
    // get all cart trigger
    const [____, setIsGetCart] = useRecoilState<boolean>(getAllCartState);

    // delete a cart mutation
    const deleteMutation = useDeleteCartMutation(client, option, NewHeader());

    // close modal
    function modalCloseHandler() {
        setIsCartModal(false);
    }

    // delete a cart item mutation
    function deleteHandler(id: number) {
        console.log(id);
        const deleteVariable: GetCartItemMutationVariables = { id: id };
        deleteMutation
            .mutateAsync(deleteVariable, option)
            .then((res) => {
                setIsGetCart(true);
                setIsCartModal(false);
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    RemoveCookie;
                    window.location.href = '/login';
                }
            });
        // window.location.reload();
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
