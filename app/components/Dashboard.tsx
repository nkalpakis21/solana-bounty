import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Contribution Summary</h2>
        <p>Total Contributions: {/* TODO: Insert total contributions */}</p>
        <p>Total Earned: {/* TODO: Insert total earnings */}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <ul>
          <li>Activity Item 1</li>
          <li>Activity Item 2</li>
          <li>Activity Item 3</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Wallet Balance</h2>
        <p>Balance: {/* TODO: Insert wallet balance */}</p>
      </div>
    </div>
  );
};

export default Dashboard;
