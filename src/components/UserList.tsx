import React, { useEffect } from 'react';

// Function to fetch user data (mocked for illustration)
const fetchUserData = () => ({
  users: [
    { id: 1, name: 'Jane Doe' },
    { id: 2, name: 'John Smith' }
  ]
});

const UserList = () => {
  // Initialize userData to prevent ReferenceError
  const userData = fetchUserData();

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {userData.users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;