import React from 'react';
import { motion } from 'framer-motion';

function InputField2({ label, type, name, value, onChange, className }) {
  return (
    <motion.div
      className={`flex flex-col px-px mt-3 ${className}`}
      
      transition={{ duration: 0.2 }}
    >
      <label htmlFor={name} className="self-start">{label}:</label>
      <motion.input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-5 max-w-full h-10 border border-indigo-500 border-solid bg-indigo-300 bg-opacity-0 rounded-full px-3"
        whileFocus={{ borderColor: '#ff7f50', boxShadow: '0 0 8px rgba(255,127,80,0.5)' }}
        whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

export default InputField2;
