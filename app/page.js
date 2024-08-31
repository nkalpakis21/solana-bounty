import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Blockchain Incentive Platform</h1>
      <p className="mb-4">Contribute to open-source projects and earn rewards!</p>
      <Link href="/dashboard">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Go to Dashboard</button>
      </Link>
    </div>
  );
};

export default HomePage;
