import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // استایل‌های پروژه (RTL و فونت)
import App from './App';

import 'antd/dist/antd.css'; // ایمپورت استایل antd نسخه ۴

import { ConfigProvider } from 'antd';
import faIR from 'antd/lib/locale/fa_IR';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider direction="rtl" locale={faIR}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
