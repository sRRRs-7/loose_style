import React, { useEffect, useState } from 'react';
import styles from './Body.module.scss';
import { useRecoilState } from 'recoil';
import { categorySearchState, getProductModalState, keywordSearchState, pageState, pathState, productState, topBodyState } from '../../recoil/atom';
import {
    GetAllProductsQueryVariables,
    useGetAllProductsQuery,
    GetProductMutationVariables,
    useGetProductMutation,
} from '../../graphql/types/graphql';
import { client, option, NewAdminHeader } from '../../graphql/client/client';
import Modal from './Modal/Modal';

function TopBody() {
    const [page, _] = useRecoilState<number>(pageState);
    // fetch condition state
    const [__, setIsTop] = useRecoilState<boolean>(topBodyState); // share top body component
    const [___, setIsCategorySearch] = useRecoilState<boolean>(categorySearchState); // share category component
    const [____, setIsKeywordSearch] = useRecoilState<boolean>(keywordSearchState); // share header component
    const [isGetProductModal, setIsGetProductModal] = useRecoilState<boolean>(getProductModalState); // get product and show modal
    // modal display value
    const [productId, setProductId] = useState<number>();
    // data state
    const [______, setProduct] = useRecoilState<any>(productState);

    // get all products
    const variable: GetAllProductsQueryVariables = { first: 30, skip: 30 * (page - 1) };
    const { data, isError } = useGetAllProductsQuery(client, variable, option, NewAdminHeader());

    // get a product handler -> display modal
    const getProductVariable: GetProductMutationVariables = { product_id: productId! };
    const getProductMutation = useGetProductMutation(client, option, NewAdminHeader());

    // condition fetch -> exclusive own state reset logic
    useEffect(() => {
        // render state
        setIsTop(true);
        setIsCategorySearch(false);
        setIsKeywordSearch(false);
        // get product fetch
        if (isGetProductModal) {
            getProductMutation
                .mutateAsync(getProductVariable, option)
                .then((res) => {
                    setProduct(res.getProduct); // set product for modal
                })
                .catch((err) => {
                    console.log(err.response.status);
                });
        }
    }, [page, isGetProductModal, productId]); // dependency fetch input value and condition

    // get a product with modal handler
    function getProductHandler(id: number) {
        setIsGetProductModal(true);
        setProductId(id);
    }

    // production display
    return (
        <>
            {isGetProductModal && <Modal />}

            {data?.getAllProducts.length == 0 ? (
                <div className={styles.flex_box}>
                    <p>No items</p>
                </div>
            ) : (
                <div className={styles.flex_box}>
                    <p>{data?.getAllProducts.length} items</p>
                </div>
            )}

            <div className={styles.box}>
                <div className={styles.grid_box}>
                    {data?.getAllProducts.map((m) => (
                        <div className={styles.grid_items} key={m.id} onClick={() => getProductHandler(parseInt(m.id))}>
                            <p>{m.id}</p>
                            <img src={m.img} alt='imgSource' />
                            <p>{m.product_name}</p>
                            <p>{m.description}</p>
                            <p>{m.unit_price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TopBody;
