import React from 'react';
import { fetchUserData } from '../utils/helpers';

const UserList = () => {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    fetchUserData().then(data => setUserData(data));
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      {/* Render user data */}
    </div>
  );
};

export default UserList;