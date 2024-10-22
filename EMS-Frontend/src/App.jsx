import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/layouts/AppLayout'; // Import the Layout component
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard'; // Assuming you have this component
import UserJobCardEntry from './components/UserJobCardEntry'; // Import Manage Users component
import Profile from './components/Profile'; // Import Profile component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(''); // Store role here

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route path="/admin" element={isAuthenticated && role === 'Admin' ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Navigate to="/admin/dashboard" />} /> {/* Redirect to dashboard on entering /admin */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* User Routes */}
          <Route path="/user" element={isAuthenticated && role === 'User' ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Navigate to="/user/dashboard" />} /> {/* Redirect to dashboard on entering /user */}
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="user_job_card_entry" element={<UserJobCardEntry />} />
          </Route>

          {/* Redirect to login for unknown routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
