const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  key: { type: Number, required: true, unique: true },
  stockTaken: { type: Number, required: true },
  stockRemaining: { type: Number, required: true },
  totalStock: { type: Number, required: true },
  datetime: { type: Date, default: Date.now },
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;
