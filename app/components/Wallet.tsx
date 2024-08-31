import React from 'react';

const Wallet = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Wallet</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Balance</h2>
        <p>{/* TODO: Fetch and display wallet balance */}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <ul>
          <li>Transaction 1 - Amount: {/* TODO: Insert amount */}</li>
          <li>Transaction 2 - Amount: {/* TODO: Insert amount */}</li>
        </ul>
      </div>
    </div>
  );
};

export default Wallet;
