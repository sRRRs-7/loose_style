import React, { useState } from 'react';
import styles from './CreateMedia.module.scss';
import { useCreateMediaMutation, CreateMediaMutationVariables } from '../../../graphql/types/graphql';
import { adminClient, NewAdminHeader, option } from 'graphql/client/client';
import { RemoveAdminCookie } from 'utils/cookie';

function CreateMedia() {
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [err, setErr] = useState<boolean>(false);
    const [success, setSuccess] = useState(false);

    const variable: CreateMediaMutationVariables = {
        title: title,
        contents: contents,
        img: img,
    };

    const mutation = useCreateMediaMutation(adminClient, option, NewAdminHeader());

    function changeHandlerTitle(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setTitle(e.target.value);
    }

    function changeHandlerContents(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault;
        setContents(e.target.value);
    }

    function changeHandlerImg(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setImg(e.target.value);
    }

    function createHandler() {
        if (title == '' || contents == '' || img == '') {
            setErr(true);
            setSuccess(false);
            return;
        }
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (!res.createMedia.is_error) {
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
        // text init
        setTitle('');
        setContents('');
        setImg('');
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create Media</p>
                    </div>

                    <div>
                        {success && (
                            <div className={styles.success}>
                                <p>Success</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>title</p>
                        <input
                            type='text'
                            name='title'
                            value={title}
                            className={styles.input}
                            placeholder='title'
                            onChange={(e) => changeHandlerTitle(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>contents</p>
                        <textarea
                            name='contents'
                            value={contents}
                            className={styles.input}
                            placeholder='contents'
                            onChange={(e) => changeHandlerContents(e)}
                            required
                            rows={7}
                            cols={50}
                        />
                    </div>

                    <div className={styles.inputFile_box}>
                        <p className={styles.text}>image</p>
                        <input
                            type='file'
                            name='image'
                            value={img}
                            className={styles.inputFile}
                            placeholder='image'
                            onChange={(e) => changeHandlerImg(e)}
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

export default CreateMedia;
