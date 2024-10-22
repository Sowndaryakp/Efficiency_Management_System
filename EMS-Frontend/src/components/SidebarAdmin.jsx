import React from 'react';
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {
  return (
    <nav className="bg-gray-200 w-1/4 p-4">
      <ul>
        <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
        <li><Link to="/admin/users">Manage Users</Link></li>
        {/* Add more admin-specific links */}
      </ul>
    </nav>
  );
};

export default SidebarAdmin;
