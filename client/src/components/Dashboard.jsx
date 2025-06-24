import React, { useState, useEffect } from 'react';
import { getTrucks, updateTruckStatus } from '../services/api';
import AddTruck from './Add_Truck';

const Dashboard = ({ token, setToken }) => {
  const [trucks, setTrucks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddTruck, setShowAddTruck] = useState(false);

  useEffect(() => {
    const fetchTrucks = async () => {
      const data = await getTrucks(token);
      setTrucks(data);
    };

    const fetchUserRole = async () => {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setIsAdmin(decodedToken.role === 'Admin');
    };

    fetchTrucks();
    fetchUserRole();
  }, [token]);

  const handleStatusChange = async (id, status) => {
    await updateTruckStatus(id, status, token);
    setTrucks((prev) =>
      prev.map((truck) => (truck._id === id ? { ...truck, status } : truck))
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null); 
    window.location.reload(); 
  };

  const filteredTrucks =
    filter === 'All' ? trucks : trucks.filter((truck) => truck.status === filter);

  return (
    <div className="p-6 relative">
      {/* ✅ AddTruck Modal */}
      {showAddTruck && (
        <AddTruck token={token} onClose={() => setShowAddTruck(false)} />
      )}

      {/* ✅ Header and Filter */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Truck Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Idle">Idle</option>
        </select>

        {isAdmin && (
          <button
            onClick={() => setShowAddTruck(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Truck
          </button>
        )}
      </div>

      {/* ✅ Table */}
      <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 w-32">Truck ID</th>
            <th className="border p-2 w-48">Driver Name</th>
            <th className="border p-2 w-32">Status</th>
            <th className="border p-2 w-64">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrucks.map((truck) => (
            <tr key={truck._id} className="align-top">
              <td className="border p-2">{truck.truckId}</td>
              <td className="border p-2">{truck.driverName}</td>
              <td
                className={`border p-2 w-32 font-semibold ${
                  truck.status === 'Delivered'
                    ? 'text-green-600'
                    : truck.status === 'In Transit'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {truck.status}
              </td>
              <td className="border p-2 space-x-2 w-64">
                <button
                  onClick={() => handleStatusChange(truck._id, 'Delivered')}
                  className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                >
                  Delivered
                </button>
                <button
                  onClick={() => handleStatusChange(truck._id, 'In Transit')}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                >
                  In Transit
                </button>
                <button
                  onClick={() => handleStatusChange(truck._id, 'Idle')}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  Idle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;