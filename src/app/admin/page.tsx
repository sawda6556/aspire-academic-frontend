import React from 'react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      <p className="text-gray-500 mt-1">Welcome back, carakay68@gmail.com</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Total Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">128</p>
          <div className="mt-2 text-xs text-green-500 font-medium">
            +12% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Pending Tutors</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
          <div className="mt-2 text-xs text-orange-500 font-medium">
            Requires attention
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Total Lessons</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">452</p>
          <div className="mt-2 text-xs text-green-500 font-medium">
            +5.4% from last week
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-400">Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">$2,450</p>
          <div className="mt-2 text-xs text-green-500 font-medium">
            +8.1% from last month
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Recent Tutor Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Tutor Name</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Omar Khalid</td>
                <td className="px-6 py-4 text-sm text-gray-500">Mathematics</td>
                <td className="px-6 py-4 text-sm text-gray-500">May 10, 2026</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-600 rounded-full">Pending</span>
                </td>
                <td className="px-6 py-4 text-sm text-blue-600 font-medium cursor-pointer">Review</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Fatima Zahra</td>
                <td className="px-6 py-4 text-sm text-gray-500">Islamic Studies</td>
                <td className="px-6 py-4 text-sm text-gray-500">May 09, 2026</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-600 rounded-full">Pending</span>
                </td>
                <td className="px-6 py-4 text-sm text-blue-600 font-medium cursor-pointer">Review</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
