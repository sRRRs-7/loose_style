import React, { useState } from 'react';
import styles from './CreateUser.module.scss';
import { useCreateUserMutation, CreateUserMutationVariables } from '../../../graphql/types/graphql';
import { adminClient, NewAdminHeader, option } from 'graphql/client/client';
import { RemoveAdminCookie } from 'utils/cookie';

function CreateUser() {
    const [userID, setUserID] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [sex, setSex] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [familyName, setFamilyName] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [postcode, setPostcode] = useState<number>();
    const [prefectureCode, setPrefectureCode] = useState<string>();
    const [city, setCity] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [building, setBuilding] = useState<string>('');
    const [phone, setPhone] = useState<string>();
    // status
    const [err, setErr] = useState<boolean>(false);
    const [success, setSuccess] = useState(false);

    const variable: CreateUserMutationVariables = {
        user_id: userID,
        password: password,
        username: username,
        email: email,
        sex: sex,
        date_of_birth: birth,
        destination_family_name: familyName,
        destination_first_name: firstName,
        postcode: postcode!,
        prefecture_code: prefectureCode!,
        city: city,
        street: street,
        building: building,
        phone: phone!,
    };
    const mutation = useCreateUserMutation(adminClient, option, NewAdminHeader());

    function changeHandlerUserID(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setUserID(e.target.value);
    }

    function changeHandlerPass(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPassword(e.target.value);
    }

    function changeHandlerUsername(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setUsername(e.target.value);
    }

    function changeHandlerEmail(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setEmail(e.target.value);
    }

    function changeHandlerSex(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setSex(e.target.value);
    }

    function changeHandlerBirth(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setBirth(e.target.value);
    }

    function changeHandlerFamilyName(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setFamilyName(e.target.value);
    }

    function changeHandlerFirstName(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setFirstName(e.target.value);
    }

    function changeHandlerPostcode(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPostcode(e.target.valueAsNumber);
    }

    function changeHandlerPrefectureCode(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPrefectureCode(e.target.value);
    }

    function changeHandlerCity(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setCity(e.target.value);
    }

    function changeHandlerStreet(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setStreet(e.target.value);
    }

    function changeHandlerBuilding(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setBuilding(e.target.value);
    }

    function changeHandlerPhone(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPhone(e.target.value);
    }

    function createHandler() {
        if (
            userID == '' ||
            password == '' ||
            username == '' ||
            email == '' ||
            sex == '' ||
            birth == '' ||
            familyName == '' ||
            firstName == '' ||
            postcode == null ||
            prefectureCode == '' ||
            street == '' ||
            city == '' ||
            building == '' ||
            phone == ''
        ) {
            setErr(true);
            setSuccess(false);
            return;
        }
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (!res.createUser.is_error) {
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
        setUserID('');
        setPassword('');
        setUsername('');
        setEmail('');
        setSex('');
        setBirth('');
        setFamilyName('');
        setFirstName('');
        setPostcode(0);
        setPrefectureCode('');
        setStreet('');
        setCity('');
        setBuilding('');
        setPhone('');
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create User</p>
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
                            name='userID'
                            value={userID}
                            className={styles.input}
                            placeholder='userID'
                            onChange={(e) => changeHandlerUserID(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>password</p>
                        <input
                            type='text'
                            name='password'
                            value={password}
                            className={styles.input}
                            placeholder='password'
                            onChange={(e) => changeHandlerPass(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>username</p>
                        <input
                            type='text'
                            name='username'
                            value={username}
                            className={styles.input}
                            placeholder='username'
                            onChange={(e) => changeHandlerUsername(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>email</p>
                        <input
                            type='text'
                            name='email'
                            value={email}
                            className={styles.input}
                            placeholder='email'
                            onChange={(e) => changeHandlerEmail(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>sex</p>
                        <input
                            type='text'
                            name='sex'
                            value={sex}
                            className={styles.input}
                            placeholder='sex'
                            onChange={(e) => changeHandlerSex(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>birth</p>
                        <input
                            type='text'
                            name='birth'
                            value={birth}
                            className={styles.input}
                            placeholder='birth'
                            onChange={(e) => changeHandlerBirth(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>familyName</p>
                        <input
                            type='text'
                            name='familyName'
                            value={familyName}
                            className={styles.input}
                            placeholder='familyName'
                            onChange={(e) => changeHandlerFamilyName(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>firstName</p>
                        <input
                            type='text'
                            name='firstName'
                            value={firstName}
                            className={styles.input}
                            placeholder='firstName'
                            onChange={(e) => changeHandlerFirstName(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>postcode</p>
                        <input
                            type='number'
                            name='postcode'
                            value={postcode}
                            className={styles.input}
                            placeholder='postcode'
                            onChange={(e) => changeHandlerPostcode(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>prefectureCode</p>
                        <input
                            type='text'
                            name='prefectureCode'
                            value={prefectureCode}
                            className={styles.input}
                            placeholder='prefectureCode'
                            onChange={(e) => changeHandlerPrefectureCode(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>city</p>
                        <input
                            type='text'
                            name='city'
                            value={city}
                            className={styles.input}
                            placeholder='city'
                            onChange={(e) => changeHandlerCity(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>street</p>
                        <input
                            type='text'
                            name='street'
                            value={street}
                            className={styles.input}
                            placeholder='street'
                            onChange={(e) => changeHandlerStreet(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>building</p>
                        <input
                            type='text'
                            name='street'
                            value={building}
                            className={styles.input}
                            placeholder='building'
                            onChange={(e) => changeHandlerBuilding(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>phone</p>
                        <input
                            type='text'
                            name='phone'
                            value={phone}
                            className={styles.input}
                            placeholder='phone'
                            onChange={(e) => changeHandlerPhone(e)}
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

export default CreateUser;
