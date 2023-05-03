import React, { useState } from 'react';

const Money = () => {
  const [amount, setAmount] = useState('');
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/users/add-money', { userId, amount });
      alert('Money added successfully!');
    } catch (error) {
      console.error('Error adding money:', error);
      alert('Error adding money. Please try again.');
    }
  };

  return (
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
  );
};

export default Money;
