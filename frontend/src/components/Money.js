import React, { useState, useEffect } from 'react';
import api from '../api';

const Money = () => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(undefined);
  const [userId, setUserId] = useState('');
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/userByEmail/${userEmail}`);
        console.log('balance:', response.data.balance);
        setBalance(response.data.balance);
        setUserId(response.data._id);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Error fetching user data. Please try again.');
      }
    };

    fetchUserData();
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('userId:', userId);
      console.log('amount:', amount);
      const response = await api.post('/users/add-money', { userId, amount });
      alert('Money added successfully!');
      console.log('new balance:', response.data.balance);
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
      {balance !== undefined ? (
        <h4>Current Balance: ${balance}</h4>
      ) : (
        <h4>Loading balance...</h4>
      )}
    </div>
  );
};

export default Money;
