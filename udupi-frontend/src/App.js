import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import AddInventory from './AddInventory';
import InventoryList from './InventoryList';
import AddItem from './AddItem';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/add-inventory">Add Inventory Item</Link></li>
          <li><Link to="/inventory-list">Inventory List</Link></li>
          <li><Link to="/add-item">Add Item Name</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-inventory" element={<AddInventory />} />
        <Route path="/inventory-list" element={<InventoryList />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/" element={<h1>Welcome to Udupi Restaurant Inventory Management</h1>} />
      </Routes>
    </div>
  );
}

export default App;
