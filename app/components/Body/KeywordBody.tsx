import React, { useEffect, useState } from 'react';
import styles from './Body.module.scss';
import { useRecoilState } from 'recoil';
import {
    categorySearchState,
    getProductModalState,
    keywordSearchState,
    keywordState,
    pageState,
    pathState,
    productState,
    topBodyState,
} from '@/recoil/atom';
import {
    GetProductMutationVariables,
    useGetProductMutation,
    GetAllProductsByKeywordMutationVariables,
    useGetAllProductsByKeywordMutation,
    SortBy,
} from '../../src/graphql/types/graphql';
import { tokenClient, headers, option } from '../../src/graphql/client/client';
import Loading from './Loading';
import Modal from '../Modal/Modal';

function KeywordBody() {
    const [page, _] = useRecoilState<number>(pageState);
    // fetch condition state
    const [__, setIsTop] = useRecoilState<boolean>(topBodyState); // share top body component
    const [___, setIsCategorySearch] = useRecoilState<boolean>(categorySearchState); // share category component
    const [isKeywordSearch, setIsKeywordSearch] = useRecoilState<boolean>(keywordSearchState); // share header component
    const [isGetProductModal, setIsGetProductModal] = useRecoilState<boolean>(getProductModalState); // get product and show modal
    // input value
    const [keyword, ____] = useRecoilState<string>(keywordState); // share header component
    const [productId, setProductId] = useState<number>();
    // data state
    const [products, setProducts] = useState<any[]>([]);
    const [_____, setProduct] = useRecoilState<any>(productState); // get product modal value

    // get all products by keyword
    const getProductByKeywordVariable: GetAllProductsByKeywordMutationVariables = {
        keyword: `%${keyword}%`,
        sortBy: SortBy.Asc,
        first: 30,
        skip: 30 * (page - 1),
    };
    const getProductByKeywordMutation = useGetAllProductsByKeywordMutation(tokenClient, option, headers);

    // get a product handler -> display modal
    const getProductVariable: GetProductMutationVariables = { product_id: productId! };
    const getProductMutation = useGetProductMutation(tokenClient, option, headers);

    // condition fetch -> exclusive own state reset logic
    useEffect(() => {
        setIsKeywordSearch(true);
        setIsTop(false);
        setIsCategorySearch(false);

        // search keyword
        if (isKeywordSearch) {
            getProductByKeywordMutation.mutateAsync(getProductByKeywordVariable, option).then((res) => {
                setProducts(res.getAllProductsByKeyword);
            });
        }

        // get product
        if (isGetProductModal) {
            getProductMutation.mutateAsync(getProductVariable, option).then((res) => {
                setProduct(res.getProduct); // set product for modal
            });
        }
    }, [page, keyword, isKeywordSearch, productId]); // dependency fetch input value and condition

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

export default KeywordBody;
