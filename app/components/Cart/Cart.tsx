import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { useRecoilState } from 'recoil';
import { cartModalState, pageState, pathState, productState } from 'recoil/atom';
import {
    GetAllCartItemsQueryVariables,
    useGetAllCartItemsQuery,
    GetCartItemMutationVariables,
    useGetCartItemMutation,
} from '../../src/graphql/types/graphql';
import { option, headers, adminClient } from '@/graphql/client/client';
import Pagination from 'components/Body/Pagination/Pagination';
import Modal from 'components/Modal/Modal';
import { GetCookie, RemoveCookie } from 'utils/cookie';
import { useRouter } from 'next/router';

function Cart() {
    const [_, setPath] = useRecoilState<string>(pathState); // header current state blue text
    const [page, __] = useRecoilState(pageState); // pagination state
    const [isCateModal, setIsCartModal] = useRecoilState<boolean>(cartModalState);
    const [___, setProduct] = useRecoilState<any>(productState); // get product modal value  -> pass modal
    const [err, setErr] = useState(false);
    const [token, setToken] = useState<string>('');
    const [cartId, setCartId] = useState<number>(0);
    const [isGetCart, setIsGetCart] = useState<boolean>(false);

    const router = useRouter();

    // get all cart
    const getAllVariable: GetAllCartItemsQueryVariables = { first: 30, skip: 30 * (page - 1) };
    const { data, isError } = useGetAllCartItemsQuery(adminClient, getAllVariable, option, headers);

    // get a cart mutation
    const getVariable: GetCartItemMutationVariables = { id: cartId };
    const mutation = useGetCartItemMutation(adminClient, option, headers);

    // session timeout -> remove cookie
    if (isError) {
        RemoveCookie();
        router.push('/');
    }

    // before draw display
    useLayoutEffect(() => {
        // reload once
        if (window.name != 'reload') {
            window.location.reload();
            window.name = 'reload';
        }
    }, []);

    //initial render
    useEffect(() => {
        // get cookie when client render
        if (typeof window != undefined) {
            const cookie = GetCookie(); // utils function
            setToken(cookie as string);
        }
        setPath('/cart');
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
                            <img src={m.img} alt='product_image' />
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
