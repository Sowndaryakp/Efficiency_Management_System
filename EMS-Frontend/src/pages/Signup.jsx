import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role is 'user'
  const [passkey, setPasskey] = useState(''); // Passkey input for Admin

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRoleChange = (value) => {
    setRole(value);
    // Reset passkey if switching to 'user'
    if (value === 'User') {
      setPasskey('');
    }
  };

  const handleSignup = async () => {
    if (!username || !email || !password) {
      message.error('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      message.error('Please enter a valid email address (e.g., example@example.com).');
      return;
    }

    // If the role is 'Admin', ensure the passkey is provided
    if (role === 'Admin' && !passkey) {
      message.error('Passkey is required for admin registration.');
      return;
    }

    try {
      const response = await axios.post('http://172.18.7.93:7002/register', {
        username: username,
        email: email,
        password: password,
        role: role,
        passkey: role === 'Admin' ? passkey : null, // Use passkey only for admin
      });

      if (response.status === 201 || response.status === 200) {
        message.success(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      message.error('Signup failed. Please try again.');
      console.error('There was an error during the signup process:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center text-gray-800">Signup</h2>
        <Input 
          placeholder="Username" 
          className="mb-4" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Input 
          placeholder="Email" 
          className="mb-4" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input.Password 
          placeholder="Password" 
          className="mb-4" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Select 
          className="mb-4 w-full" 
          value={role} 
          onChange={handleRoleChange}
        >
          <Option value="User">User</Option>
          <Option value="Admin">Admin</Option>
        </Select>
        {role === 'Admin' && (
          <Input.Password 
            placeholder="Enter Admin Passkey" 
            className="mb-6" 
            value={passkey} 
            onChange={(e) => setPasskey(e.target.value)} 
          />
        )}
        <Button className="text-white hover:text-cornflower-500 bg-cornflower-600 w-full" onClick={handleSignup}>Signup</Button>
        <div className="text-center mt-4">
          <Link to="/login" className="text-cornflower-500 hover:text-cornflower-800">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
