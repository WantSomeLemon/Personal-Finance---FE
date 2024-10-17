// src/AccountHeader.js

import React from 'react';

export default function AccountHeader({ onAddAccount }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <h2 style={{ margin: 5 }}>Accounts</h2>
      <button 
        style={{ 
          width: '100%', 
          borderRadius: '5px', 
          margin: 8, 
          padding: '10px 15px', 
          backgroundColor: '#007bff', 
          color: '#fff', 
          border: 'none', 
          cursor: 'pointer' 
        }}
        onClick={onAddAccount}
      >
        Add Account
      </button>
    </div>
  );
}
