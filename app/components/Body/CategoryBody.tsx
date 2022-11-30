import React, { useEffect, useState } from 'react';
import styles from './Body.module.scss';
import { useRecoilState } from 'recoil';
import {
    categorySearchState,
    categoryState,
    getProductModalState,
    keywordSearchState,
    pageState,
    pathState,
    productState,
    topBodyState,
} from '@/recoil/atom';
import {
    GetProductMutationVariables,
    useGetProductMutation,
    GetAllProductByCategoryMutationVariables,
    useGetAllProductByCategoryMutation,
} from '../../src/graphql/types/graphql';
import { tokenClient, headers, option } from '../../src/graphql/client/client';
import Modal from '../Modal/Modal';

function CategoryBody() {
    const [page, _] = useRecoilState<number>(pageState);
    // fetch condition state
    const [__, setIsTop] = useRecoilState<boolean>(topBodyState); // share top body component
    const [isCategorySearch, setIsCategorySearch] = useRecoilState<boolean>(categorySearchState); // share category component
    const [____, setIsKeywordSearch] = useRecoilState<boolean>(keywordSearchState); // share header component
    const [isGetProductModal, setIsGetProductModal] = useRecoilState<boolean>(getProductModalState); // get product and show modal
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
    const getProductByCategoryMutation = useGetAllProductByCategoryMutation(tokenClient, option, headers);

    // get a product handler -> display modal
    const getProductVariable: GetProductMutationVariables = { product_id: productId! };
    const getProductMutation = useGetProductMutation(tokenClient, option, headers);

    // condition fetch -> exclusive own state reset logic
    useEffect(() => {
        setIsCategorySearch(true);
        setIsKeywordSearch(false);
        setIsTop(false);

        // search category
        if (isCategorySearch) {
            getProductByCategoryMutation.mutateAsync(getProductByCategoryVariable, option).then((res) => {
                setProducts(res.getAllProductsByCategory);
            });
        }

        // get product
        if (isGetProductModal) {
            getProductMutation.mutateAsync(getProductVariable, option).then((res) => {
                setProduct(res.getProduct); // set product for modal
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
