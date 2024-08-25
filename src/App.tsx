import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  // Mock data fetch for demonstration purposes
  useEffect(() => {
    setUsers([
      { id: 1, name: 'Ash J', email: 'ash123@example.com' },
      { id: 2, name: '', email: 'jane@example.com' },
    ]);
  }, []);

  const handleCreateOrUpdateUser = () => {
    if (editingUserId !== null) {
      // Update user logic
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId ? { ...user, ...userDetails } : user
        )
      );
    } else {
      // Create user logic
      const newUser = {
        id: users.length + 1,
        ...userDetails,
      };
      setUsers([...users, newUser]);
    }
    setUserDetails({ name: '', email: '' });
    setEditingUserId(null);
  };

  const handleEdit = (user: any) => {
    setUserDetails(user);
    setEditingUserId(user.id);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <>
      <div className="header">
        <div id="h1">User Management</div>
      </div>

      <h1 id="users">Users</h1>

      <div id="userddiv">
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <span>{user.name}</span> | <span>{user.email}</span>
            <button className="edit-button" onClick={() => handleEdit(user)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => handleDelete(user.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
        />
        <button onClick={handleCreateOrUpdateUser}>
          {editingUserId ? 'Update User' : 'Create User'}
        </button>
      </div>
    </>
  );
}

export default App;
