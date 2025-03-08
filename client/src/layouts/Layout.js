import React from 'react';
import './Layout.css';

function Layout({ header, sidebar, main }) {
  return (
    <div className="layout-container">
      <header className="header">{header}</header>
      <main className="main-content">{main}</main>
      <aside className="sidebar">{sidebar}</aside>
    </div>
  );
}

export default Layout;
