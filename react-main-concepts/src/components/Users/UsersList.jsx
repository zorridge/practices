import React from 'react';

import Card from '../UI/Card';
import styles from './UsersList.module.css';

const UsersList = props => {
    const outputUsers = [];
    props.users.forEach(user => {
        outputUsers.push(
            <li key={user.id}>
                {user.username} ({user.age} years old)
            </li>
        );
    });

    return (
        <Card className={styles.users}>
            <ul>
                {outputUsers}
            </ul>
        </Card>
    );
};

export default UsersList;