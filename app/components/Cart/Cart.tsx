import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { useRecoilState } from 'recoil';
import { cartModalState, pageState, pathState, productState } from '@/recoil/atom';
import {
    GetAllCartItemsQueryVariables,
    useGetAllCartItemsQuery,
    GetCartItemMutationVariables,
    useGetCartItemMutation,
} from '../../src/graphql/types/graphql';
import { option, headers, adminClient } from '@/graphql/client/client';
import nookies from 'nookies';
import Pagination from 'components/Body/Pagination/Pagination';
import Modal from 'components/Modal/Modal';

function Cart() {
    const [page, _] = useRecoilState(pageState); // pagination state
    const [__, setPath] = useRecoilState<string>(pathState);
    const [isCateModal, setIsCartModal] = useRecoilState<boolean>(cartModalState);
    const [product, setProduct] = useRecoilState<any>(productState); // get product modal value
    const [err, setErr] = useState(false);
    const [token, setToken] = useState<string>('');
    const [cartId, setCartId] = useState<number>(0);
    const [isGetCart, setIsGetCart] = useState<boolean>(false);

    // get all cart
    const getAllVariable: GetAllCartItemsQueryVariables = {};
    const { data } = useGetAllCartItemsQuery(adminClient, getAllVariable, option, headers);

    // get a cart mutation
    const getVariable: GetCartItemMutationVariables = { id: cartId };
    const mutation = useGetCartItemMutation(adminClient, option, headers);

    //initial render
    useEffect(() => {
        // reload once
        if (window.name != 'reload') {
            location.reload();
            window.name = 'reload';
        }

        // get cookie when client render
        if (typeof window != undefined) {
            const cookie = nookies.get(null, `${process.env.NEXT_PUBLIC_COOKIE_KEY}`);
            setToken(cookie[process.env.NEXT_PUBLIC_COOKIE_KEY!]);
        }
    }, [token]);

    useEffect(() => {
        // get a cart mutation
        if (isGetCart) {
            mutation
                .mutateAsync(getVariable, option)
                .then((res) => {
                    setProduct(res.getCartItem);
                })
                .catch((res) => {
                    setErr(true);
                });
        }
    }, [isCateModal, cartId, isGetCart]);

    function cartModalHandler(id: number) {
        setIsCartModal(true); // show modal
        setCartId(id); // get a cart arg
        setIsGetCart(true); // get a cart function trigger
    }

    return (
        <>
            <div>
                <Pagination />
            </div>

            {isCateModal && <Modal />}

            <div>
                {err && (
                    <div className={styles.err}>
                        <p>No contents</p>
                    </div>
                )}
            </div>

            <div className={styles.box}>
                <div className={styles.grid_box}>
                    {data?.getAllCartItems.map((m) => (
                        <div
                            className={styles.grid_items}
                            key={m.id}
                            onClick={() => {
                                cartModalHandler(parseInt(m.id));
                            }}
                        >
                            <p>{m.id}</p>
                            <p>{m.brand}</p>
                            <p>{m.product_name}</p>
                            <p>{m.img}</p>
                            <p>{m.unit_price}</p>
                            <p>{m.created_at}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Cart;
