import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import InputField2 from './InputField2';
import axios from 'axios';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'startup', // Default role to startup
  });

  const navigate = useNavigate(); // Initialize the navigate hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/authorize/register', formData);
      alert(response.data.message);
      
      // Check the role and redirect accordingly
      if (formData.role === 'startup') {
        navigate('/edit_startup');
      } else {
        navigate('/investor_profile');
      }
      
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error);
      alert(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  const fields = [
    { label: 'Full name', type: 'text', name: 'name' },
    { label: 'Username', type: 'text', name: 'userId' },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Password', type: 'password', name: 'password' },
    { label: 'Confirm Password', type: 'password', name: 'confirmPassword' },
    { label: 'Role', type: 'text', name: 'role' }, // You can also change this to a dropdown
  ];

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col w-full max-w-md mx-auto px-4  transform scale-90"
    >
      <motion.div 
        className="flex flex-col text-base font-semibold text-indigo-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-2">Please Fill out the form to Register!</h2>
        {fields.map((field) => (
          <motion.div
            key={field.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * fields.indexOf(field) }}
          >
            <InputField2
              label={field.label}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="input-field"
            />
          </motion.div>
        ))}
        <motion.button
          type="submit"
          className="px-6 py-2 mt-8 font-medium text-white bg-orange-400 rounded-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: '0 0 15px rgba(255,165,0,0.5)', // Circular shadow
            backgroundColor: '#ff4500' 
          }} // Hover effect
        >
          Register
        </motion.button>
        <p className="text-center mt-2 text-black text-sm">
          Yes, I have an account? <Link to="/login" className="font-medium text-blue-500">Login</Link>
        </p>
      </motion.div>
    </form>
  );
}

export default RegistrationForm;
