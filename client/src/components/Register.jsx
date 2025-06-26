import React, { useState } from 'react';
import { register } from '../services/api';




const Register = ({setShowLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Viewer'); 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, password, role);
      alert('Registration successful');
    } catch (err) {
      if (err.response?.data?.error?.code === 11000) {
        alert('Username already exists. Please choose another.');
      } else {
        alert('Registration failed: ' + err.response?.data?.message || 'Unknown error');
      }
    }
  };
  const handleLoginRedirect = () => {
    setShowLogin(false);
  }


  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <form onSubmit={handleRegister} className="bg-gray-400 p-6 rounded shadow-md">
        <h2 className=" text-white text-xl font-bold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=" bg-amber-50 border p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-amber-50 border p-2 w-full mb-4"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className=" bg-amber-50 border p-2 w-full mb-4 "
        >
          <option value="Admin">Admin</option>
          <option value="Dispatcher">Dispatcher</option>
          <option value="Viewer">Viewer</option>
        </select>
        <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded">
          Register
        </button>
        <div className="mt-4">
          <button
            type="button"
            onClick={handleLoginRedirect}
            className="text-black hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
      
      </form>
    </div>
  );
};

export default Register;