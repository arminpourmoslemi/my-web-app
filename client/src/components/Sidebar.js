// client/src/components/Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css'; // استایل‌ها را در یک فایل جداگانه می‌نویسیم

function Sidebar({ onSelectItem }) {
  // آرایه‌ای از آیتم‌های منو، هر کدام شامل:
  // - id: شناسه یکتا
  // - label: متن تب اصلی
  // - subItems: آرایه زیرشاخه‌ها
  // - isOpen: باز یا بسته بودن منوی کشویی
  const [menuItems, setMenuItems] = useState([
    {
      id: 'anbar',
      label: 'انبار',
      subItems: [
        { id: 'warehouses', label: 'نام انبارها' },
        { id: 'products', label: 'لیست کالاها' },
        { id: 'incoming', label: 'ورودی انبارها' },
        { id: 'sales', label: 'فروش انبار' },
        { id: 'reports', label: 'گزارشات انبار' }
      ],
      isOpen: false
    },
    {
      id: 'kars',
      label: 'لیست کارها',
      subItems: [
        { id: 'techWorks', label: 'کارهای تکنسین‌ها' },
        { id: 'techReports', label: 'گزارشات تکنسین‌ها' },
        { id: 'techSalary', label: 'حقوق تکنسین‌ها' }
      ],
      isOpen: false
    }
  ]);

  // تابعی برای باز/بسته کردن منوی یک آیتم اصلی
  const toggleMenu = (itemId) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, isOpen: !item.isOpen }
          : item
      )
    );
  };

  // وقتی کاربر روی یکی از زیرشاخه‌ها کلیک می‌کند، این تابع صدا زده می‌شود
  const handleSubItemClick = (mainId, subId) => {
    // اگر مایلید در محتوای اصلی (Main Content) چیزی را عوض کنید، 
    // می‌توانید از تابع onSelectItem (که از والد می‌آید) استفاده کنید.
    if (onSelectItem) {
      onSelectItem(mainId, subId);
    }
  };

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <div key={item.id} className="sidebar-item">
          {/* عنوان آیتم اصلی */}
          <div
            className="sidebar-item-header"
            onClick={() => toggleMenu(item.id)}
          >
            <span>{item.label}</span>
            {/* اگر منو باز است، علامت '-'، در غیر این صورت '+' نمایش دهیم (اختیاری) */}
            <span>{item.isOpen ? '−' : '+'}</span>
          </div>

          {/* اگر منو باز است، زیرشاخه‌ها را نمایش دهیم */}
          {item.isOpen && (
            <div className="sidebar-subitems">
              {item.subItems.map((sub) => (
                <div
                  key={sub.id}
                  className="sidebar-subitem"
                  onClick={() => handleSubItemClick(item.id, sub.id)}
                >
                  {sub.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
