import React, { useState } from 'react';
import styles from './CreateBrand.module.scss';
import { useCreateBrandMutation, CreateBrandMutationVariables } from '../../../graphql/types/graphql';
import { adminClient, NewAdminHeader, option } from 'graphql/client/client';
import { RemoveAdminCookie } from 'utils/cookie';

function CreateBrand() {
    const [brand, setBrand] = useState<string>('');
    // status
    const [err, setErr] = useState<boolean>(false);
    const [success, setSuccess] = useState(false);

    const variable: CreateBrandMutationVariables = { brand: brand };
    const mutation = useCreateBrandMutation(adminClient, option, NewAdminHeader());

    function changeHandlerBrand(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setBrand(e.target.value);
    }

    function createHandler() {
        if (brand == '') {
            setErr(true);
            setSuccess(false);
            return;
        }
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (!res.createBrand.is_error) {
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
        setBrand('');
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create Brand</p>
                    </div>

                    <div>
                        {success && (
                            <div className={styles.success}>
                                <p>Success</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>brand name</p>
                        <input
                            type='text'
                            name='username'
                            value={brand}
                            className={styles.input}
                            placeholder='brand name'
                            onChange={(e) => changeHandlerBrand(e)}
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

export default CreateBrand;
