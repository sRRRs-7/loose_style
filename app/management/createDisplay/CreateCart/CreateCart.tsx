import React, { useState } from 'react';
import styles from './CreateCart.module.scss';
import { useCreateCartMutation, CreateCartMutationVariables } from '../../../src/graphql/types/graphql';
import { adminClient, headers, option } from '@/graphql/client/client';

function CreateCart() {
    const [userId, setUserId] = useState<number>();
    const [productId, setProductId] = useState<number>();
    const [err, setErr] = useState<boolean>(false);

    const variable: CreateCartMutationVariables = {
        user_id: userId!,
        product_id: productId!,
    };
    const mutation = useCreateCartMutation(adminClient, option, headers);

    function changeHandlerUserId(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setUserId(e.target.valueAsNumber);
    }

    function changeHandlerProductId(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setProductId(e.target.valueAsNumber);
    }

    function createHandler() {
        if (userId == null || productId == null) {
            setErr(true);
            return;
        }
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (res.createCart.is_error) {
                    setErr(true);
                }
            })
            .catch((res) => {
                setErr(true);
                return;
            });
        setUserId(0);
        setProductId(0);
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create Cart</p>
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>userId</p>
                        <input
                            type='number'
                            name='userId'
                            value={userId}
                            className={styles.input}
                            placeholder='userId (integer)'
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

export default CreateCart;
