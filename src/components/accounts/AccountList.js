// src/AccountList.js

import React from 'react';

export default function AccountList({ accounts }) {
  return (
    <div>
      <h3>Account List</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {accounts.map((account, index) => (
          <li key={index} style={{ padding: '8px', border: '1px solid #ccc', marginBottom: '5px' }}>
            {account.name} - {account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}
