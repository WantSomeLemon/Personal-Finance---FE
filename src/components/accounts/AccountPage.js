// src/AccountPage.js

import React, { useState } from 'react';
import AccountHeader from './AccountHeader';
import AccountList from './AccountList';

export default function AccountPage() {
  const [accounts, setAccounts] = useState([
    { name: 'Account 1', balance: '$1000' },
    { name: 'Account 2', balance: '$1500' },
  ]);

  const addAccount = () => {
    const newAccount = { name: `Account ${accounts.length + 1}`, balance: '$0' };
    setAccounts([...accounts, newAccount]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <AccountHeader onAddAccount={addAccount} />
      <AccountList accounts={accounts} />
    </div>
  );
}
