import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import AddInventory from './AddInventory';
import InventoryList from './InventoryList';
import AddItem from './AddItem';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="App">
      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li><Link to="/add-inventory">Add Inventory Item</Link></li>
              <li><Link to="/inventory-list">Inventory List</Link></li>
              <li><Link to="/add-item">Add Item Name</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
        {isAuthenticated && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/add-inventory" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddInventory /></ProtectedRoute>} />
        <Route path="/inventory-list" element={<ProtectedRoute isAuthenticated={isAuthenticated}><InventoryList /></ProtectedRoute>} />
        <Route path="/add-item" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddItem /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddInventory /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
