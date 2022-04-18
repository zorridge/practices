import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import styles from './AddUser.module.css';

const AddUser = props => {
    const [inputUsername, setInputUsername] = useState('');
    const [inputAge, setInputAge] = useState('');
    const [error, setError] = useState();

    const usernameChangeHandler = e => {
        setInputUsername(e.target.value);
    };

    const ageChangeHandler = e => {
        setInputAge(e.target.value);
    };

    const addUserHandler = e => {
        e.preventDefault();
        if (inputUsername.trim().length === 0 || inputAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age.'
            });
            return;
        }
        if (+inputAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter an age greater than 0.'
            });
            return;
        }
        props.onSubmitUser({ id: Math.random().toString(), username: inputUsername, age: inputAge });
        setInputUsername('');
        setInputAge('');
    };

    const dismissErrorHandler = () => {
        setError(null);
    };

    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onDismissError={dismissErrorHandler} />}
            <Card className={styles.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor='username' >Username</label>
                    <input type='text' id='username' value={inputUsername} onChange={usernameChangeHandler} />
                    <label htmlFor='age' >Age (Years)</label>
                    <input type='number' id='age' value={inputAge} onChange={ageChangeHandler} />
                    <Button type='submit'>Add User</Button>
                </form>
            </Card>
        </div>
    );
};

export default AddUser;