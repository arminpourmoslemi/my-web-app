// server/models/Warehouse.js
const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
  name: { type: String, required: true },    // نام انبار
  code: { type: String, required: true },    // کد انبار
  manager: { type: String, default: '' }     // انباردار
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
