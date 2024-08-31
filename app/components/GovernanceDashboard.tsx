import React from 'react';

const GovernanceDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Governance</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Active Proposals</h2>
        <ul>
          <li className="mb-4">
            Proposal 1 - Status: {/* TODO: Insert status */}
            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Vote</button>
          </li>
          <li>
            Proposal 2 - Status: {/* TODO: Insert status */}
            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Vote</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GovernanceDashboard;
