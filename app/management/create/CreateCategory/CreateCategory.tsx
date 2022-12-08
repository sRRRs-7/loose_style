import React, { useState } from 'react';
import styles from './CreateCategory.module.scss';
import { useCreateCategoryMutation, CreateCategoryMutationVariables } from '../../../graphql/types/graphql';
import { client, NewAdminHeader, option } from 'graphql/client/client';
import { RemoveAdminCookie } from 'utils/cookie';

function CreateCategory() {
    const [category, setCategory] = useState<string>('');
    // status
    const [err, setErr] = useState<boolean>(false);
    const [success, setSuccess] = useState(false);

    // mutation
    const variable: CreateCategoryMutationVariables = { category: category };
    const mutation = useCreateCategoryMutation(client, option, NewAdminHeader());

    function changeHandlerCategory(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setCategory(e.target.value);
    }

    function createHandler() {
        if (category == '') {
            setErr(true);
            setSuccess(false);
            return;
        }
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (!res.createCategory.is_error) {
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
        // input init
        setCategory('');
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create Category</p>
                    </div>

                    <div>
                        {success && (
                            <div className={styles.success}>
                                <p>Success</p>
                            </div>
                        )}
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
