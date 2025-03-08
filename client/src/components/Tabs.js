// client/src/components/Tabs.js
import React, { useState } from 'react';

function Tabs() {
  // انتخاب تب اصلی: 'anbar' (انبار) یا 'kars' (لیست کارها)
  const [activeMainTab, setActiveMainTab] = useState('anbar');

  // بر اساس تب اصلی انتخاب‌شده، محتوای مربوطه را نمایش می‌دهیم
  const renderMainTabContent = () => {
    switch (activeMainTab) {
      case 'anbar':
        return <AnbarTabs />;
      case 'kars':
        return <KarsTabs />;
      default:
        return <AnbarTabs />;
    }
  };

  return (
    <div>
      {/* دکمه‌های تب اصلی */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setActiveMainTab('anbar')}>انبار</button>
        <button onClick={() => setActiveMainTab('kars')}>لیست کارها</button>
      </div>

      {/* محتوای تب اصلی (زیرتب‌ها) */}
      {renderMainTabContent()}
    </div>
  );
}

/* ------------------------------------------------------------------
   1) تب اصلی: انبار
   زیرتب‌ها: نام انبارها | لیست کالاها | ورودی انبارها | فروش انبار | گزارشات انبار
------------------------------------------------------------------ */

function AnbarTabs() {
  const [activeAnbarTab, setActiveAnbarTab] = useState('warehouses');

  const renderAnbarContent = () => {
    switch (activeAnbarTab) {
      case 'warehouses':
        return <WarehouseNames />;
      case 'products':
        return <ProductList />;
      case 'incoming':
        return <Incoming />;
      case 'sales':
        return <Sales />;
      case 'reports':
        return <WarehouseReports />;
      default:
        return <WarehouseNames />;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setActiveAnbarTab('warehouses')}>نام انبارها</button>
        <button onClick={() => setActiveAnbarTab('products')}>لیست کالاها</button>
        <button onClick={() => setActiveAnbarTab('incoming')}>ورودی انبارها</button>
        <button onClick={() => setActiveAnbarTab('sales')}>فروش انبار</button>
        <button onClick={() => setActiveAnbarTab('reports')}>گزارشات انبار</button>
      </div>
      {renderAnbarContent()}
    </div>
  );
}

// زیرتب‌ها (محتوای نمونه)
function WarehouseNames() {
  return (
    <div>
      <h3>نام انبارها</h3>
      <p>در اینجا می‌توانید لیست انبارها را نمایش دهید یا فرم ایجاد انبار جدید بگذارید.</p>
    </div>
  );
}

function ProductList() {
  return (
    <div>
      <h3>لیست کالاها</h3>
      <p>در اینجا لیست کالاهای موجود را نمایش دهید.</p>
    </div>
  );
}

function Incoming() {
  return (
    <div>
      <h3>ورودی انبارها</h3>
      <p>در اینجا فرم یا جدول برای ثبت ورودی کالا به انبار.</p>
    </div>
  );
}

function Sales() {
  return (
    <div>
      <h3>فروش انبار</h3>
      <p>در اینجا فرم یا جدول برای ثبت فروش کالا از انبار.</p>
    </div>
  );
}

function WarehouseReports() {
  return (
    <div>
      <h3>گزارشات انبار</h3>
      <p>در اینجا گزارشات مربوط به موجودی، فروش و ورود/خروج کالا را نمایش دهید.</p>
    </div>
  );
}

/* ------------------------------------------------------------------
   2) تب اصلی: لیست کارها
   زیرتب‌ها: کارهای تکنسین‌ها | گزارشات تکنسین‌ها | حقوق تکنسین‌ها
------------------------------------------------------------------ */

function KarsTabs() {
  const [activeKarsTab, setActiveKarsTab] = useState('techWorks');

  const renderKarsContent = () => {
    switch (activeKarsTab) {
      case 'techWorks':
        return <TechnicianWorks />;
      case 'techReports':
        return <TechnicianReports />;
      case 'techSalary':
        return <TechnicianSalary />;
      default:
        return <TechnicianWorks />;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setActiveKarsTab('techWorks')}>کارهای تکنسین‌ها</button>
        <button onClick={() => setActiveKarsTab('techReports')}>گزارشات تکنسین‌ها</button>
        <button onClick={() => setActiveKarsTab('techSalary')}>حقوق تکنسین‌ها</button>
      </div>
      {renderKarsContent()}
    </div>
  );
}

// زیرتب‌ها (محتوای نمونه)
function TechnicianWorks() {
  return (
    <div>
      <h3>کارهای تکنسین‌ها</h3>
      <p>در اینجا لیست کارهای محول‌شده به تکنسین‌ها را نمایش دهید.</p>
    </div>
  );
}

function TechnicianReports() {
  return (
    <div>
      <h3>گزارشات تکنسین‌ها</h3>
      <p>در اینجا گزارش کارهای انجام‌شده توسط تکنسین‌ها را نمایش دهید.</p>
    </div>
  );
}

function TechnicianSalary() {
  return (
    <div>
      <h3>حقوق تکنسین‌ها</h3>
      <p>در اینجا اطلاعات مربوط به حقوق و دستمزد تکنسین‌ها را نمایش دهید.</p>
    </div>
  );
}

export default Tabs;
