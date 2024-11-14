import React from 'react';

function NavItem({ text, isPrimary }) {
  return (
    <a href="#" className={`nav-item ${isPrimary ? 'primary' : ''}`}>
      {text}
      <style jsx>{`
        .nav-item {
          color: #402e7a;
          font: 600 30px Inter, sans-serif;
          text-decoration: none;
          white-space: nowrap;
        }
        .primary {
          color: #c95827;
          font-size: 35px;
          font-weight: 800;
        }
      `}</style>
    </a>
  );
}

export default NavItem;