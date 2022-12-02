import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { useRecoilState } from 'recoil';
import { cartIdState, cartModalState, getAllCartState, pageState, pathState, productState } from '../../recoil/atom';
import {
    GetAllCartItemsQueryVariables,
    useGetAllCartItemsQuery,
    GetCartItemMutationVariables,
    useGetCartItemMutation,
} from '../../src/graphql/types/graphql';
import { option, adminClient, NewHeader } from '@/graphql/client/client';
import Pagination from 'components/Body/Pagination/Pagination';
import { RemoveCookie } from 'utils/cookie';
import { useRouter } from 'next/router';
import CartLoading from './CartLoading';
import CartModal from './Modal/CartModal';
import KeyboardCapslockTwoToneIcon from '@mui/icons-material/KeyboardCapslockTwoTone';
import Footer from 'components/Footer/Footer';

function Cart() {
    // display header current state blue text
    const [_, setPath] = useRecoilState<string>(pathState);
    // pagination state
    const [page, __] = useRecoilState(pageState);
    // modal state
    const [isCateModal, setIsCartModal] = useRecoilState<boolean>(cartModalState);
    // get product modal value  -> pass modal
    const [___, setProduct] = useRecoilState<any>(productState);
    // receive cart id from top cart page
    const [____, setDeleteCartId] = useRecoilState<number>(cartIdState);
    // status
    const [err, setErr] = useState(false);
    // get a cart args
    const [cartId, setCartId] = useState<number>(0);
    const [isGetCart, setIsGetCart] = useRecoilState<boolean>(getAllCartState);
    // initial render spinner
    const [isFetch, setIsFetch] = useState<boolean>(true);

    const router = useRouter();

    // get all cart
    const getAllVariable: GetAllCartItemsQueryVariables = { first: 30, skip: 30 * (page - 1) };
    const { data, isError } = useGetAllCartItemsQuery(adminClient, getAllVariable, option, NewHeader());

    // get a cart mutation
    const getVariable: GetCartItemMutationVariables = { id: cartId };
    const getMutation = useGetCartItemMutation(adminClient, option, NewHeader());

    useEffect(() => {
        setPath('/cart');
        // get a cart mutation
        if (isGetCart) {
            getMutation
                .mutateAsync(getVariable, option)
                .then((res) => {
                    setProduct(res.getCartItem); // pass to cart modal
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        RemoveCookie();
                        router.push('/');
                    }
                    setErr(true);
                });
        }
    }, [isCateModal, cartId, isGetCart]);

    // show modal
    function cartModalHandler(id: number) {
        setIsCartModal(true); // show modal
        setCartId(id); // get a cart arg -> (state -> useEffect -> mutation)
        setIsGetCart(true); // get a cart function trigger
    }

    // from bottom to top
    function returnTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    // session timeout -> remove cookie
    if (isError) {
        RemoveCookie();
    }
    // initial loading spinner
    useEffect(() => {
        setTimeout(() => {
            setIsFetch(false);
        }, 500);
    }, [isFetch]);

    // Loading display render
    if (isFetch) {
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

            <div className={styles.top}>
                <KeyboardCapslockTwoToneIcon
                    className={styles.topIcon}
                    onClick={() => {
                        returnTop();
                    }}
                />
                <p>To the top</p>
            </div>

            <div>
                <Footer />
            </div>
        </>
    );
}

export default Cart;
