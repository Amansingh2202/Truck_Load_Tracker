import React, { useState } from 'react';
import { Add_Truck } from '../services/api';

const AddTruck = ({ token, onClose }) => {
  const [truckId, setTruckId] = useState('');
  const [driverName, setDriverName] = useState('');
  const [status, setStatus] = useState('Idle');
  const [message, setMessage] = useState('');

  const handleAddTruck = async (e) => {
    e.preventDefault();

    try {
      await Add_Truck(truckId, driverName, status, token);
      setMessage(`Truck added successfully!`);
      setTruckId('');
      setDriverName('');
      setStatus('Idle');
    } catch (error) {
      setMessage('Error adding truck: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Add Truck</h2>
        <form onSubmit={handleAddTruck} className="space-y-4">
          <input
            type="text"
            value={truckId}
            onChange={(e) => setTruckId(e.target.value)}
            placeholder="Truck ID"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            placeholder="Driver Name"
            className="w-full p-2 border rounded"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Idle">Idle</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Truck
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default AddTruck;
