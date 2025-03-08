// server/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// برای امنیت بیشتر از متغیر محیطی استفاده کنید
const JWT_SECRET = 'your_jwt_secret';

// ثبت‌نام کاربر
// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // آیا کاربر از قبل وجود دارد؟
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'نام کاربری تکراری است' });
    }

    // هش کردن پسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // ساخت کاربر جدید
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ msg: 'ثبت‌نام با موفقیت انجام شد' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'خطای سرور در ثبت‌نام' });
  }
});

// ورود کاربر
// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // جستجو در دیتابیس
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'نام کاربری یا رمز عبور اشتباه است' });
    }
    // مقایسه پسورد
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'نام کاربری یا رمز عبور اشتباه است' });
    }
    // تولید توکن JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'خطای سرور در ورود' });
  }
});

module.exports = router;
