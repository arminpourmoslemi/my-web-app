import React, { useState } from 'react';
import Layout from './layouts/Layout';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Register from './components/Register';
import WarehouseNames from './components/WarehouseNames';

function App() {
  // توکن نشان‌دهنده ورود موفق
  const [token, setToken] = useState('');
  // تعیین می‌کند کاربر در صورت نداشتن توکن، فرم لاگین یا ثبت‌نام ببیند
  const [showLogin, setShowLogin] = useState(true);

  // برای مدیریت آیتم‌های منو
  const [selectedMain, setSelectedMain] = useState('');
  const [selectedSub, setSelectedSub] = useState('');

  // تابعی که از Sidebar می‌آید تا بدانیم کاربر کدام آیتم را انتخاب کرده
  const handleSelectItem = (mainId, subId) => {
    setSelectedMain(mainId);
    setSelectedSub(subId);
  };

  // محتوای اصلی بر اساس آیتم انتخاب‌شده
  let mainContent = <div style={{ padding: '1rem' }}>محتوای پیش‌فرض</div>;

  // اگر در منوی سایدبار "انبار" انتخاب شد و زیرشاخه "warehouses" باشد
  if (selectedMain === 'anbar' && selectedSub === 'warehouses') {
    mainContent = <WarehouseNames />;
  }

  // اگر کاربر توکن دارد => نمایش داشبورد (Layout)
  if (token) {
    return (
      <Layout
        header={<Header onLogout={() => setToken('')} />}
        sidebar={<Sidebar onSelectItem={handleSelectItem} />}
        main={mainContent}
      />
    );
  }

  // اگر توکن نداریم => یا صفحه لاگین یا ثبت‌نام
  return showLogin ? (
    <Login setToken={setToken} onSwitchToRegister={() => setShowLogin(false)} />
  ) : (
    <Register onSwitchToLogin={() => setShowLogin(true)} />
  );
}

export default App;
