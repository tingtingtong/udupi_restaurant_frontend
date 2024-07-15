import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddInventory = () => {
  const [itemName, setItemName] = useState('');
  const [itemNames, setItemNames] = useState([]);
  const [stockTaken, setStockTaken] = useState('');
  const [totalStock, setTotalStock] = useState('');

  useEffect(() => {
    const fetchItemNames = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/items/list', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setItemNames(response.data);
      } catch (error) {
        console.error('Failed to fetch item names:', error);
      }
    };

    fetchItemNames();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/inventory/add', { itemName, stockTaken, totalStock }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Item added to inventory');
    } catch (error) {
      console.error('Adding inventory failed:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Inventory Item</h2>
      <form onSubmit={handleAddItem}>
        <select value={itemName} onChange={(e) => setItemName(e.target.value)}>
          <option value="">Select Item</option>
          {itemNames.map(item => (
            <option key={item._id} value={item.name}>{item.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Stock Taken"
          value={stockTaken}
          onChange={(e) => setStockTaken(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Total Stock"
          value={totalStock}
          onChange={(e) => setTotalStock(Number(e.target.value))}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddInventory;
