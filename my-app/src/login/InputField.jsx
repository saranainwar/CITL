import React from 'react';
import { motion } from 'framer-motion';

function InputField({ label, type = "text", value, onChange }) {
  const id = `${label.toLowerCase()}-input`;

  return (
    <div className="mb-6">
      <label 
        htmlFor={id} 
        className="block text-2xl font-semibold text-indigo-900 mb-2">
        {label}:
      </label>
      <motion.input
        type={type}
        id={id}
        value={value} // Controlled value from props
        onChange={onChange} // onChange event from props
        className="w-[367px] h-12 px-4 border border-indigo-500 rounded-full text-lg bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label={label}
        placeholder={`Enter ${label}`}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

export default InputField;
