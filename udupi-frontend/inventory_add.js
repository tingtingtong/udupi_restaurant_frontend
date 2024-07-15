const mongoose = require('mongoose');
const Inventory = require('./models/Inventory');  // Import the Inventory model

mongoose.connect('mongodb://localhost:27017/udupi-restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

const initialItems = [
  { itemName: 'Item 1', key: 1, stockTaken: 0, stockRemaining: 100, totalStock: 100 },
  { itemName: 'Item 2', key: 2, stockTaken: 0, stockRemaining: 200, totalStock: 200 },
  // Add more initial items as needed
];

const initializeInventory = async () => {
  try {
    const count = await Inventory.estimatedDocumentCount();  // Use estimatedDocumentCount instead of countDocuments
    if (count === 0) {
      await Inventory.insertMany(initialItems);
      console.log('Initial inventory items added');
    } else {
      console.log('Inventory already initialized');
    }
    mongoose.connection.close();
  } catch (error) {
    console.error('Error initializing inventory:', error);
  }
};

initializeInventory();
