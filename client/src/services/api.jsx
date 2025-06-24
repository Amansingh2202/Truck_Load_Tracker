import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const register = async (username, password, role) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, password, role });
  return response.data;
}

export const getTrucks = async (token) => {
  const response = await axios.get(`${API_URL}/trucks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
export const Add_Truck=async (truckId, driverName, status, token) => {
  const response = await axios.post(`${API_URL}/trucks/add`, { truckId, driverName, status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}


export const updateTruckStatus = async (id, status, token) => {
  const response = await axios.put(`${API_URL}/trucks/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};