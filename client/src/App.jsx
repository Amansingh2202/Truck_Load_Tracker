import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const App = () => {
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

 
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    }
  }, [token]);

  return (
    <div  className='mx-auto'>
      {!token ? (
        <>
          {!showLogin ? (
            <Login setToken={setToken} />
          ) : (
            <Register setShowLogin={setShowLogin}/>
          )}
         
        
        </>
      ) : (
        <Dashboard token={token} setToken={setToken} />
      )}
     
    </div>
  );
};

export default App;
