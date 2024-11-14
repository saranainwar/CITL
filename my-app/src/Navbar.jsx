import React from 'react';
import NavItem from './NavItem';
import AuthButton from './AuthButton';

const navItems = [
  { text: 'Pitchers', isPrimary: true },
  { text: 'Home' },
  { text: 'Startup' },
  { text: 'Investors' },
  { text: 'About' }
];

const authButtons = [
  { text: 'Sign In' },
  { text: 'Log In' }
];

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-content">
        <div className="nav-items">
          {navItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>
        <div className="auth-buttons">
          {authButtons.map((button, index) => (
            <AuthButton key={index} {...button} />
          ))}
        </div>
      </nav>
      <style jsx>{`
        .navbar {
          border-radius: 0;
          display: flex;
          flex-direction: column;
        }
        .navbar-content {
          background-color: #fff;
          width: 100%;
          padding: 29px 21px 29px 45px;
          display: flex;
          justify-content: space-between;
        }
        .nav-items {
          display: flex;
          align-items: center;
          gap: 58px;
        }
        .auth-buttons {
          display: flex;
          gap: 8px;
        }
        @media (max-width: 991px) {
          .navbar-content {
            max-width: 100%;
            padding: 20px;
            flex-direction: column;
            align-items: stretch;
          }
          .nav-items {
            margin-top: 40px;
            flex-wrap: wrap;
            justify-content: center;
          }
          .auth-buttons {
            margin-top: 40px;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;