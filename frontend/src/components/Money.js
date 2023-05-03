import React, { useState, useEffect } from 'react';
import api from '../api';

const Money = () => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/userById/${userId}`);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Error fetching user data. Please try again.');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/add-money', { userId, amount });
      alert('Money added successfully!');
      setBalance(response.data.balance);
      setAmount('');
    } catch (error) {
      console.error('Error adding money:', error);
      alert('Error adding money. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add Money</h3>
        <input
          type="number"
          min="1"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Money</button>
      </form>
      <h4>Current Balance: ${balance.toFixed(2)}</h4>
    </div>
  );
};

export default Money;

