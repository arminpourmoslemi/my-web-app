// Dashboard.js
import React, { useState } from 'react';

function Dashboard({ token }) {
  const [activeTab, setActiveTab] = useState('table');

  const renderContent = () => {
    if (activeTab === 'table') {
      return (
        <div>
          <h2>جدول اطلاعات</h2>
          <table border="1">
            <thead>
              <tr>
                <th>شناسه</th>
                <th>اطلاعات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>۱</td>
                <td>نمونه داده</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'form') {
      return (
        <div>
          <h2>فرم ورودی</h2>
          <form>
            <div>
              <label>داده:</label>
              <input type="text" />
            </div>
            <button type="submit">ارسال</button>
          </form>
        </div>
      );
    }
  };

  return (
    <div className="dashboard">
      <h1>داشبورد</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab('table')}>جدول</button>
        <button onClick={() => setActiveTab('form')}>فرم</button>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
}

export default Dashboard;
