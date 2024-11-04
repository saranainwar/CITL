import React from 'react';
import { motion } from 'framer-motion';

function LoginButton() {
  return (
    <motion.button 
      type="submit" 
      className="px-16 pt-2 pb-4 mt-10 text-2xl font-extrabold text-white whitespace-nowrap bg-orange-400 rounded-full"
      whileHover={{ scale: 1.15 }}
      transition={{ duration: 0.3 }}
    >
      Login
    </motion.button>
  );
}

export default LoginButton;
