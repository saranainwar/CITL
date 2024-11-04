import { div } from 'framer-motion/client';
import React, { useState } from 'react';

function CategoryButton({ label }) {
  const [hovered, setHovered] = useState(false);

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: '#D1E9F6', // Original button color
    border: '1px solid #ddd',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: hovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
    transform: hovered ? 'scale(1.1)' : 'scale(1)',
  };

  const alpha={
    margin:'2px'
  }
  return (
    <div style={alpha}>
    <button 
      style={buttonStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </button>
    </div>
  );
}

export default CategoryButton;
