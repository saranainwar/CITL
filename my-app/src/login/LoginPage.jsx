import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import LoginButton from './LoginButton';
import BackgroundImage from './BackgroundImage';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [role, setRole] = useState(''); // New state for role

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/authorize/login', {
        userId: username,
        password: password,
      });
  
      if (response.status === 200) {
        setSuccessMessage('Login successful');
        setErrorMessage('');
        
        // Use the redirect URL returned from the backend
        const { redirectUrl } = response.data;
        window.location.href = redirectUrl;
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
        setSuccessMessage('');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  const handleGoogleLogin = () => {
    if (role) {
      window.location.href = `http://localhost:3000/auth/google?role=${role}`;
    } else {
      setErrorMessage('Please select a role before logging in.');
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden bg-neutral-100 flex items-center justify-center">
      <div className="flex gap-5 max-md:flex-col h-full w-full -mt-[200px] ml-[100px]">
        <section className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full h-full items-center justify-center">
          <div className="flex flex-col mt-24 max-md:mt-10 h-full items-center justify-center">
            <header className="flex flex-col pr-20 pl-1.5 max-md:pr-5 items-center">
              <h1 className="text-4xl font-bold text-indigo-900">
                Welcome Back!
              </h1>
            </header>
            <form className="flex flex-col items-center mt-8 space-y-4" onSubmit={handleLogin}>
              <InputField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                className="border border-gray-300 rounded-lg p-2"
                required
              >
                <option value="" disabled>Select your role</option>
                <option value="investor">Investor</option>
                <option value="startup">Startup</option>
              </select>
              <LoginButton />
            </form>
            {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
            <button
              onClick={handleGoogleLogin}
              className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Sign in with Google
            </button>
            <p className="text-base text-black mt-4">
              Don't have an account? 
              <Link to="/register" className="font-medium ml-1">Register</Link>
            </p>
          </div>
        </section>
        <BackgroundImage />
      </div>
    </main>
  );
}

export default LoginPage;
