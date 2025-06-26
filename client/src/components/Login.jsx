import React, { useState } from 'react';
import { login } from '../services/api';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      setToken(data.token);
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <form onSubmit={handleLogin} className="bg-gray-400 p-6 rounded shadow-md">
        <h2 className=" text-white text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-amber-50 border p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-amber-50 border p-2 w-full mb-4"
        />
        <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;