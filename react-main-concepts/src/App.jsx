import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

const SEED_USERS = [];

function App() {
  const [users, setUsers] = useState(SEED_USERS);

  const submitUserHandler = data => {
    setUsers(prevUsers => {
      return [data, ...prevUsers];
    });
  };

  return (
    <div>
      <AddUser onSubmitUser={submitUserHandler} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
