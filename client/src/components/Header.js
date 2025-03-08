// client/src/components/Header.js
import React from 'react';

function Header({ onLogout }) {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <div>لوگو / نام سیستم</div>
      <button onClick={onLogout}>خروج</button>
    </div>
  );
}

export default Header;
