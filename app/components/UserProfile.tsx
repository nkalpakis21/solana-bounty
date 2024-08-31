import React from 'react';

const UserProfile = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p>Name: {/* TODO: Fetch user name */}</p>
        <p>Reputation Score: {/* TODO: Fetch reputation score */}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Contributions</h2>
        <ul>
          <li>Contribution 1 - Status: {/* TODO: Insert status */}</li>
          <li>Contribution 2 - Status: {/* TODO: Insert status */}</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
