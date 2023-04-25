import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post('/users/login', { email, password });
    const { token, userId, role } = response.data;

    // Save the token and user ID in local storage or any other preferred storage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);

    // Redirect to the appropriate page based on the user's role
    if (role === 'admin') {
      navigate('/Admin');
    } else {
      navigate('/Store');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    // Show an error message or handle the error as needed
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      {/* ... */}
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* ... */}
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* ... */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {/* ... */}
    </form>
  );
};

export default Login;
