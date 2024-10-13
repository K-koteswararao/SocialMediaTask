import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from backend
    const fetchUsers = async () => {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h3>{user.name}</h3>
              <p>Social Media: {user.socialMedia}</p>
              <div>
                {user.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Upload by ${user.name}`}
                    style={{ width: '100px', height: '100px' }}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No user submissions yet</p>
      )}
    </div>
  );
};

export default AdminDashboard;
