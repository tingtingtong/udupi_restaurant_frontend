import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function InventoryList() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/inventory/list', {
          headers: { 'Authorization': token }
        });
        setInventory(response.data);
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
        alert('Failed to fetch inventory. Please try again.');
      }
    };

    fetchInventory();
  }, []);

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(inventory);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'inventory.xlsx');
  };

  return (
    <div>
      <h2>Inventory List</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDownload}>Download as Excel</button>
    </div>
  );
}

export default InventoryList;
