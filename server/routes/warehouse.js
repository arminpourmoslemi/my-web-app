// server/routes/warehouse.js
const express = require('express');
const router = express.Router();
const Warehouse = require('../models/Warehouse');

// دریافت لیست انبارها
// GET /api/warehouse
router.get('/', async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'خطای سرور در دریافت انبارها' });
  }
});

// ایجاد انبار جدید
// POST /api/warehouse
router.post('/', async (req, res) => {
  try {
    const { name, code, manager } = req.body;
    const newWarehouse = new Warehouse({ name, code, manager });
    await newWarehouse.save();
    res.json(newWarehouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'خطای سرور در ایجاد انبار' });
  }
});

// ویرایش انبار
// PUT /api/warehouse/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, code, manager } = req.body;
    const updatedWarehouse = await Warehouse.findByIdAndUpdate(
      req.params.id,
      { name, code, manager },
      { new: true }
    );
    res.json(updatedWarehouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'خطای سرور در ویرایش انبار' });
  }
});

// حذف انبار
// DELETE /api/warehouse/:id
router.delete('/:id', async (req, res) => {
  try {
    await Warehouse.findByIdAndDelete(req.params.id);
    res.json({ msg: 'انبار حذف شد' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'خطای سرور در حذف انبار' });
  }
});

module.exports = router;
