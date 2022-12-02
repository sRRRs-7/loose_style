import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { useRecoilState } from 'recoil';
import { cartIdState, cartModalState, pageState, pathState, productState } from '../../recoil/atom';
import {
    GetAllCartItemsQueryVariables,
    useGetAllCartItemsQuery,
    GetCartItemMutationVariables,
    useGetCartItemMutation,
    DeleteCartMutationVariables,
    useDeleteCartMutation,
} from '../../src/graphql/types/graphql';
import { option, headers, adminClient } from '@/graphql/client/client';
import Pagination from 'components/Body/Pagination/Pagination';
import { GetCookie, RemoveCookie } from 'utils/cookie';
import { useRouter } from 'next/router';
import CartLoading from './CartLoading';
import CartModal from './Modal/CartModal';

function Cart() {
    const [_, setPath] = useRecoilState<string>(pathState); // header current state blue text
    const [page, __] = useRecoilState(pageState); // pagination state
    const [isCateModal, setIsCartModal] = useRecoilState<boolean>(cartModalState);
    const [___, setProduct] = useRecoilState<any>(productState); // get product modal value  -> pass modal
    const [____, setDeleteCartId] = useRecoilState<number>(cartIdState); // receive cart id from top cart page
    const [err, setErr] = useState(false);
    const [token, setToken] = useState<string>('');
    const [cartId, setCartId] = useState<number>(0);
    const [isGetCart, setIsGetCart] = useState<boolean>(false);

    const router = useRouter();

    // get all cart
    const getAllVariable: GetAllCartItemsQueryVariables = { first: 30, skip: 30 * (page - 1) };
    const { data, isError, isLoading } = useGetAllCartItemsQuery(adminClient, getAllVariable, option, headers);

    // get a cart mutation
    const getVariable: GetCartItemMutationVariables = { id: cartId };
    const getMutation = useGetCartItemMutation(adminClient, option, headers);

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
            getMutation
                .mutateAsync(getVariable, option)
                .then((res) => {
                    setProduct(res.getCartItem); // pass to cart modal
                })
                .catch((err) => {
                    setErr(true);
                });
        }
    }, [isCateModal, cartId, isGetCart]);

    function cartModalHandler(id: number) {
        setIsCartModal(true); // show modal
        setCartId(id); // get a cart arg
        setIsGetCart(true); // get a cart function trigger
    }

    // Loading display render
    if (isLoading) {
        return <CartLoading />;
    }

    return (
        <>
            <div>
                <Pagination />
            </div>

            <div>{isCateModal && <CartModal />}</div>

            {err && (
                <div className={styles.err}>
                    <p>No contents</p>
                </div>
            )}

            {data?.getAllCartItems.length == 0 && (
                <div className={styles.flex_box}>
                    <p>No items</p>
                </div>
            )}

            <div className={styles.box}>
                <div className={styles.grid_box}>
                    {data?.getAllCartItems.map((c) => (
                        <div
                            className={styles.grid_items}
                            key={c.id}
                            onClick={() => {
                                cartModalHandler(parseInt(c.id));
                                setDeleteCartId(c.cart_id);
                            }}
                        >
                            <p>{c.id}</p>
                            <img src={c.img} alt='product_image' />
                            <p>{c.brand}</p>
                            <p>{c.product_name}</p>
                            <p>{c.unit_price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Cart;
