// server/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

// اتصال به دیتابیس MongoDB
connectDB();

// استفاده از میدل‌ورهای موردنیاز
app.use(cors());
app.use(bodyParser.json());

// مسیر احراز هویت (ثبت‌نام و ورود)
app.use('/api/auth', require('./routes/auth'));

// مسیر انبارها (CRUD)
app.use('/api/warehouse', require('./routes/warehouse'));

// راه‌اندازی سرور
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
