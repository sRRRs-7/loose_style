import React, { useState } from 'react';
import styles from './CreateOrder.module.scss';
import { useCreateOrderMutation, CreateOrderMutationVariables } from '../../../src/graphql/types/graphql';
import { adminClient, NewAdminHeader, option } from '@/graphql/client/client';
import { RemoveAdminCookie } from 'utils/cookie';

function CreateOrder() {
    const [userId, setUserId] = useState<string>('');
    const [productId, setProductId] = useState<number>();
    const [quantity, setQuantity] = useState<number>();
    const [postage, setPostage] = useState<number>();
    const [price, setPrice] = useState<number>();
    const [status, setStatus] = useState<boolean>(false);
    // status
    const [err, setErr] = useState<boolean>(false);
    const [success, setSuccess] = useState(false);

    const variable: CreateOrderMutationVariables = {
        user_id: userId,
        product_id: productId!,
        quantity: quantity!,
        postage: postage!,
        price: price!,
        status: status,
    };
    const mutation = useCreateOrderMutation(adminClient, option, NewAdminHeader());

    function changeHandlerUserId(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setUserId(e.target.value);
    }

    function changeHandlerProductId(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setProductId(e.target.valueAsNumber);
    }

    function changeHandlerQuantity(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setQuantity(e.target.valueAsNumber);
    }

    function changeHandlerPostage(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPostage(e.target.valueAsNumber);
    }

    function changeHandlerPrice(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPrice(e.target.valueAsNumber);
    }

    function changeHandlerStatus() {
        setStatus(!status);
    }

    function createHandler() {
        if (userId == '' || productId == null || quantity == null || postage == null || price == null) {
            setErr(true);
            setSuccess(false);
            return;
        }
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (!res.createOrder.is_error) {
                    setErr(false);
                    setSuccess(true);
                }
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    RemoveAdminCookie();
                    window.location.reload();
                }
                setErr(true);
                setSuccess(false);
                return;
            });
        setUserId('');
        setProductId(0);
        setQuantity(0);
        setPostage(0);
        setPrice(0);
        setStatus(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create Order</p>
                    </div>

                    <div>
                        {success && (
                            <div className={styles.success}>
                                <p>Success</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>UserId</p>
                        <input
                            type='text'
                            name='userId'
                            value={userId}
                            className={styles.input}
                            placeholder='userId'
                            onChange={(e) => changeHandlerUserId(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>productId</p>
                        <input
                            type='number'
                            name='productId'
                            value={productId}
                            className={styles.input}
                            placeholder='productId (integer)'
                            onChange={(e) => changeHandlerProductId(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>quantity</p>
                        <input
                            type='number'
                            name='quantity'
                            value={quantity}
                            className={styles.input}
                            placeholder='quantity (integer)'
                            onChange={(e) => changeHandlerQuantity(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>postage</p>
                        <input
                            type='number'
                            name='postage'
                            value={postage}
                            className={styles.input}
                            placeholder='postage (integer)'
                            onChange={(e) => changeHandlerPostage(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>price</p>
                        <input
                            type='number'
                            name='price'
                            value={price}
                            className={styles.input}
                            placeholder='price (integer)'
                            onChange={(e) => changeHandlerPrice(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>status</p>
                        <input
                            type='checkbox'
                            checked={status}
                            name='status'
                            className={styles.input}
                            onClick={() => changeHandlerStatus()}
                            readOnly
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

export default CreateOrder;
