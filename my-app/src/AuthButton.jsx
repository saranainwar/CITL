import React from 'react';

function AuthButton({ text }) {
  return (
    <button className="auth-button">
      {text}
      <style jsx>{`
        .auth-button {
          border: none;
          border-radius: 30px;
          background-color: rgba(172, 188, 255, 0.41);
          color: #402e7a;
          font: 800 30px Inter, sans-serif;
          padding: 15px 36px;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .auth-button {
            padding: 15px 20px;
          }
        }
      `}</style>
    </button>
  );
}

export default AuthButton;