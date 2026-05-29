'use client';

import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  user_type: string;
  gender: string;
  created_at: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users/admin/all');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
      // Dummy data for demo
      setUsers([
        { id: '1', email: 'admin@aspire.com', user_type: 'ADMIN', gender: 'MALE', created_at: '2026-01-01' },
        { id: '2', email: 'tutor1@example.com', user_type: 'TUTOR', gender: 'FEMALE', created_at: '2026-05-01' },
        { id: '3', email: 'parent1@example.com', user_type: 'PARENT', gender: 'MALE', created_at: '2026-05-05' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <div className="text-sm text-gray-500">{filteredUsers.length} users found</div>
      </div>

      <div className="mt-6 flex gap-4">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search by email or type..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Add User
        </button>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Gender</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Loading users...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">No users found matching your search</td></tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      user.user_type === 'TUTOR' ? 'bg-purple-100 text-purple-700' :
                      user.user_type === 'PARENT' ? 'bg-blue-100 text-blue-700' :
                      user.user_type === 'STUDENT' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.user_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize">{user.gender.toLowerCase()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-semibold text-gray-400 hover:text-gray-600 mr-3">Edit</button>
                    <button className="text-sm font-semibold text-red-400 hover:text-red-600">Suspend</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
