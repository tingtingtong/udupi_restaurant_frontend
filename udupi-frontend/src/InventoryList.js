import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function InventoryList() {
  const [inventory, setInventory] = useState([]);
  const [timeFrame, setTimeFrame] = useState('today');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      const token = localStorage.getItem('token');
      let url = `http://localhost:5000/api/inventory/list/${timeFrame}`;
      if (timeFrame === 'custom') {
        url = `http://localhost:5000/api/inventory/list?startDate=${startDate}&endDate=${endDate}`;
      }
      try {
        const response = await axios.get(url, {
          headers: { Authorization: token },
        });
        console.log(`Fetched inventory for ${timeFrame}:`, response.data);
        setInventory(response.data);
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
        alert('Failed to fetch inventory. Please try again.');
      }
    };

    if (timeFrame === 'custom' && startDate && endDate) {
      fetchInventory();
    } else if (timeFrame !== 'custom') {
      fetchInventory();
    }
  }, [timeFrame, startDate, endDate]);

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
      <div>
        <button
          className={timeFrame === 'today' ? 'active' : ''}
          onClick={() => setTimeFrame('today')}
        >
          Today
        </button>
        <button
          className={timeFrame === 'twoDays' ? 'active' : ''}
          onClick={() => setTimeFrame('twoDays')}
        >
          Last 2 Days
        </button>
        <button
          className={timeFrame === 'week' ? 'active' : ''}
          onClick={() => setTimeFrame('week')}
        >
          Last Week
        </button>
        <button
          className={timeFrame === 'month' ? 'active' : ''}
          onClick={() => setTimeFrame('month')}
        >
          Last Month
        </button>
        <button
          className={timeFrame === 'custom' ? 'active' : ''}
          onClick={() => setTimeFrame('custom')}
        >
          Custom Range
        </button>
      </div>
      {timeFrame === 'custom' && (
        <div>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Key</th>
            <th>Stock Taken</th>
            <th>Stock Remaining</th>
            <th>Total Stock</th>
            <th>Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.key}</td>
              <td>{item.stockTaken}</td>
              <td>{item.stockRemaining}</td>
              <td>{item.totalStock}</td>
              <td>{new Date(item.dateTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDownload}>Download as Excel</button>
    </div>
  );
}

export default InventoryList;
