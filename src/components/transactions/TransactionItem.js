import React from 'react';

const TransactionItem = ({ transaction, onEdit }) => (
  <div>
    <span>{transaction.date} {transaction.time}</span>
    <span>{transaction.details}</span>
    <span>{transaction.account}</span>
    <span>{transaction.amount < 0 ? '-' : '+'} Rs. {Math.abs(transaction.amount)}</span>
    <button onClick={onEdit}>Edit</button>
  </div>
);

export default TransactionItem;
