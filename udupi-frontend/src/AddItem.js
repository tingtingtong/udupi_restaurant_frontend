import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
  const [name, setName] = useState('');

  const handleAddItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/items/add', { name }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Item name added');
    } catch (error) {
      console.error('Adding item name failed:', error);
      alert('Failed to add item name. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Item Name</h2>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
