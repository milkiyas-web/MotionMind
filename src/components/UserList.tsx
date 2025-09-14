import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/helpers';

const UserList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchUsers();
      setUserData(data);
    };
    loadData();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {userData.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;