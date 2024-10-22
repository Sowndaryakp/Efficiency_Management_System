import React from 'react';
import { Link } from 'react-router-dom';

const SidebarUser = () => {
  return (
    <nav className="bg-gray-200 w-1/4 p-4">
      <ul>
        <li><Link to="/user/dashboard">User Dashboard</Link></li>
        <li><Link to="/user/profile">Profile</Link></li>
        {/* Add more user-specific links */}
      </ul>
    </nav>
  );
};

export default SidebarUser;
