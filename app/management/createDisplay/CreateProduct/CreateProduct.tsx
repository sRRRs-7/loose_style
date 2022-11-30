import React, { useState } from 'react';
import styles from './CreateProduct.module.scss';
import { useCreateProductMutation, CreateProductMutationVariables } from '../../../src/graphql/types/graphql';
import { adminClient, headers, option } from '@/graphql/client/client';

function CreateProduct() {
    const [productName, setProductName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [unitPrice, setUnitPrice] = useState<number>();
    const [discount, setDisCount] = useState<number>(0.1);
    const [stock, setStock] = useState<number>();
    const [brandID, setBrandID] = useState<number>();
    const [categoryID, setCategoryID] = useState<number>();
    const [err, setErr] = useState<boolean>(false);

    const variable: CreateProductMutationVariables = {
        product_name: productName,
        description: description,
        img: img,
        unit_price: unitPrice!,
        discount: discount!,
        stock: stock!,
        brand: brandID!,
        category: categoryID!,
    };
    const mutation = useCreateProductMutation(adminClient, option, headers);

    function changeHandlerProductName(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setProductName(e.target.value);
    }

    function changeHandlerDescription(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setDescription(e.target.value);
    }

    function changeHandlerImg(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setImg(e.target.value);
    }

    function changeHandlerUnitPrice(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setUnitPrice(e.target.valueAsNumber);
    }

    function changeHandlerDiscount(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setDisCount(e.target.valueAsNumber);
    }

    function changeHandlerStock(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setStock(e.target.valueAsNumber);
    }

    function changeHandlerBrand(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setBrandID(e.target.valueAsNumber);
    }

    function changeHandlerCategory(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setCategoryID(e.target.valueAsNumber);
    }

    function createHandler() {
        if (
            productName == '' ||
            description == '' ||
            img == '' ||
            unitPrice == null ||
            discount > 1 ||
            stock == null ||
            brandID == null ||
            categoryID == null
        ) {
            setErr(true);
            return;
        }
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (res.createProducts.is_error) {
                    setErr(true);
                }
            })
            .catch((res) => {
                setErr(true);
                return;
            });
        setProductName('');
        setDescription('');
        setImg('');
        setUnitPrice(0);
        setDisCount(0.0);
        setStock(0);
        setBrandID(0);
        setCategoryID(0);
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create Product</p>
                    </div>
                    <div className={styles.input_box}>
                        <p className={styles.text}>product name</p>
                        <input
                            type='text'
                            name='product name'
                            value={productName}
                            className={styles.input}
                            placeholder='product name'
                            onChange={(e) => changeHandlerProductName(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>description</p>
                        <input
                            type='textarea'
                            name='password'
                            value={description}
                            className={styles.input}
                            placeholder='description'
                            onChange={(e) => changeHandlerDescription(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>image</p>
                        <input
                            type='file'
                            name='image'
                            value={img}
                            className={styles.input}
                            placeholder='image'
                            onChange={(e) => changeHandlerImg(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>unit price</p>
                        <input
                            type='number'
                            name='unitPrice'
                            value={unitPrice}
                            className={styles.input}
                            placeholder='unitPrice (integer)'
                            onChange={(e) => changeHandlerUnitPrice(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>discount</p>
                        <input
                            type='number'
                            name='discount'
                            value={discount}
                            className={styles.input}
                            placeholder='discount (integer)'
                            onChange={(e) => changeHandlerDiscount(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>stock</p>
                        <input
                            type='number'
                            name='stock'
                            value={stock}
                            className={styles.input}
                            placeholder='stock (integer)'
                            onChange={(e) => changeHandlerStock(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>brand ID</p>
                        <input
                            type='number'
                            name='brand ID'
                            value={brandID}
                            className={styles.input}
                            placeholder='brand ID (integer)'
                            onChange={(e) => changeHandlerBrand(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>category ID</p>
                        <input
                            type='number'
                            name='category ID'
                            value={categoryID}
                            className={styles.input}
                            placeholder='category ID (integer)'
                            onChange={(e) => changeHandlerCategory(e)}
                            required
                        />
                    </div>

                    <div className={styles.adminBox}>
                        <button
                            className={styles.adminButton}
                            onClick={() => {
                                createHandler();
                            }}
                        >
                            Create
                        </button>
                    </div>
                    <div>
                        {err && (
                            <div className={styles.err}>
                                <p>error</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;
