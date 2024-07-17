import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddItem = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/items/add', { name }, {
        headers: { 'Authorization': token }
      });
      setSuccess('Item name added');
      setName('');
    } catch (error) {
      console.error('Adding item name failed:', error);
      setError(error.response?.data || 'Failed to add item name. Please try again.');
    }
  };

  return (
    <form onSubmit={handleAddItem}>
      <h2>Add Item Name</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;
