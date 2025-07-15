import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Productt() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/all-product')
      .then(response => {
        setUsers(response.data.data); // ✅ yahi sahi hai
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Products...</p>;

  return (
    <>
      <div>
        <h2>All Products</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.description} - ₹{user.price} - Stock: {user.stock}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
