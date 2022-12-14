import React, { useEffect, useState } from 'react';
import styles from './Body.module.scss';
import { useRecoilState } from 'recoil';
import {
    categorySearchState,
    categoryState,
    getProductModalState,
    keywordSearchState,
    pageState,
    productState,
    topBodyState,
} from '../../recoil/atom';
import {
    GetProductMutationVariables,
    useGetProductMutation,
    GetAllProductByCategoryMutationVariables,
    useGetAllProductByCategoryMutation,
} from '../../graphql/types/graphql';
import { client, option, NewHeader, NewAdminHeader } from '../../graphql/client/client';
import Modal from './Modal/Modal';

function CategoryBody() {
    const [page, _] = useRecoilState<number>(pageState);
    // share top body component
    const [__, setIsTop] = useRecoilState<boolean>(topBodyState);
    // share category component
    const [isCategorySearch, setIsCategorySearch] = useRecoilState<boolean>(categorySearchState);
    // share header component
    const [____, setIsKeywordSearch] = useRecoilState<boolean>(keywordSearchState);
    // get product and show modal
    const [isGetProductModal, setIsGetProductModal] = useRecoilState<boolean>(getProductModalState);
    // input value
    const [category, _____] = useRecoilState<string>(categoryState); // share category component
    const [productId, setProductId] = useState<number>();
    // data state
    const [products, setProducts] = useState<any[]>([]);
    const [______, setProduct] = useRecoilState<any>(productState); // get product modal value

    // get all products by category
    const getProductByCategoryVariable: GetAllProductByCategoryMutationVariables = {
        category: category,
        first: 30,
        skip: 30 * (page - 1),
    };
    const getProductByCategoryMutation = useGetAllProductByCategoryMutation(client, option, NewHeader());

    // get a product handler -> display modal
    const getProductVariable: GetProductMutationVariables = { product_id: productId! };
    const getProductMutation = useGetProductMutation(client, option, NewAdminHeader());

    // condition fetch -> exclusive own state reset logic
    useEffect(() => {
        setIsCategorySearch(true); // category search component render
        setIsKeywordSearch(false); // keyword search component render
        setIsTop(false); // top search component render

        // search category
        if (isCategorySearch) {
            getProductByCategoryMutation
                .mutateAsync(getProductByCategoryVariable, option)
                .then((res) => {
                    setProducts(res.getAllProductsByCategory);
                })
                .catch((err) => {
                    console.log(err.response.status);
                });
        }

        // get product
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
    }, [page, category, isCategorySearch, productId]); // dependency fetch input value and condition

    // get a product with modal handler
    function getProductHandler(id: number) {
        setIsGetProductModal(true);
        setProductId(id);
    }

    // production display
    return (
        <>
            {isGetProductModal && <Modal />}

            {products?.length == 0 ? (
                <div className={styles.flex_box}>
                    <p>No items</p>
                </div>
            ) : (
                <div className={styles.flex_box}>
                    <p>{products?.length} items</p>
                </div>
            )}

            <section className={styles.box}>
                <div className={styles.grid_box}>
                    {products?.map((p) => (
                        <div className={styles.grid_items} key={p.id} onClick={() => getProductHandler(parseInt(p.id))}>
                            <p>{p.id}</p>
                            <img src={p.img} alt='imgSource' />
                            <p>{p.product_name}</p>
                            <p>{p.description}</p>
                            <p>{p.unit_price}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default CategoryBody;
