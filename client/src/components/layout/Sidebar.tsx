import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white p-4 shadow-lg">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <ul className="mt-4">
        <li className="p-2 hover:bg-gray-200 rounded">Home</li>
        <li className="p-2 hover:bg-gray-200 rounded">Analytics</li>
        <li className="p-2 hover:bg-gray-200 rounded">Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
