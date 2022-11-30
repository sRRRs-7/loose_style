import React, { useState } from 'react';
import styles from './CreateCategory.module.scss';
import { useCreateCategoryMutation, CreateCategoryMutationVariables } from '../../../src/graphql/types/graphql';
import { adminClient, headers, option } from '@/graphql/client/client';

function CreateCategory() {
    const [category, setCategory] = useState<string>('');
    const [err, setErr] = useState<boolean>(false);

    const variable: CreateCategoryMutationVariables = { category: category };
    const mutation = useCreateCategoryMutation(adminClient, option, headers);

    function changeHandlerCategory(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setCategory(e.target.value);
    }

    function createHandler() {
        if (category == '') {
            setErr(true);
            return;
        }
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (res.createCategory.is_error) {
                    setErr(true);
                }
            })
            .catch((res) => {
                setErr(true);
                return;
            });
        setCategory('');
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create Category</p>
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>category name</p>
                        <input
                            type='text'
                            name='category'
                            value={category}
                            className={styles.input}
                            placeholder='category name'
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

export default CreateCategory;
