/*
import {Text, Table, Card, Grid, Badge, BackgroundImage} from '@mantine/core';
import {ReactComponent as EditSVG} from '../../assets/Edit.svg';
//import Account_Background from "../../assets/Acc_Background.svg";
import {useSelector} from "react-redux";
import {useState} from "react";
import AccountEditForm from "./AccountEditForm";




export default function AccountList() {
    const accountList = useSelector(state => state.account.accountList)
    const isMobile = useSelector(state => state.user.isMobile)
    const [displayAccountEditForm, setDisplayAccountEditForm] = useState(false);
    const [selectedEditElement, setSelectedEditElement] = useState(null);
    function handleEdit(element) {
        setSelectedEditElement(element)
        setDisplayAccountEditForm(true)
    }

    function handleAccountEditFormClose() {
        setDisplayAccountEditForm(false)
    }

    const rows = accountList.map((element) => {
        const cardContent = (
            <div>
                <div style={{margin:10}}>
                    <Grid>
                        <Grid.Col style={{marginLeft: 'auto'}} span={"content"}>
                            <Badge size={"xl"} radius="md" variant="dot">{element.name}</Badge>
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={"content"}>
                            <Text style={{marginTop: 20}}>Total Available Balance</Text>
                            <Badge variant="filled" size={"xl"}><Text
                                         fw={700}>Rs. {element.currentBalance.toLocaleString('en-US')}</Text></Badge>
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col style={{marginLeft: 'auto'}} span={"content"}>
                            <Text style={{marginTop: 28}} size={"xs"}>{element.paymentTypes.join(' • ')}</Text>
                        </Grid.Col>
                    </Grid>
                </div>
            </div>

        );

        if (isMobile) {
            return (
                <Card key={element.accountId} radius="md" withBorder style={{marginBottom: 8,padding:0, borderWidth:1.5}}>
                    {cardContent}
                </Card>
            );
        }

        // For desktop view, render a table row
        return (
            <tr key={element.accountId}>
                <td>
                    <Text fw={700}>{element.name}</Text>
                </td>
                <td>
                    <Text fw={700}>{`Rs. ${element.totalIncome.toLocaleString('en-US')}`}</Text>
                </td>
                <td>
                    <Text fw={700}>{`Rs. ${element.totalExpenses.toLocaleString('en-US')}`}</Text>
                </td>
                <td>
                    <Text fw={700} style={{color: '#26AB35'}}>
                        {`Rs. ${element.currentBalance.toLocaleString('en-US')}`}
                    </Text>
                </td>
                <td>{<EditSVG onClick={() => handleEdit(element)}/>}</td>
            </tr>
        );
    });

    return (
        <div>
            {displayAccountEditForm && (
                <AccountEditForm
                    element={selectedEditElement}
                    open={displayAccountEditForm}
                    close={handleAccountEditFormClose}
                />
            )}
            {isMobile ? (
                <div>
                    <Text fw={"700"} style={{marginBottom:3,marginTop:28}}>Your Accounts</Text>
                    <Text fz={"xs"} style={{marginBottom:10}}>Accounts with the current balance</Text>
                    <div>{rows}</div>
                </div>
            ) : (
                <Table verticalSpacing="lg">
                    <thead>
                    <tr>
                        <th>
                            <Text c="dimmed">ACCOUNT DETAILS</Text>
                        </th>
                        <th>
                            <Text c="dimmed">TOTAL INCOME</Text>
                        </th>
                        <th>
                            <Text c="dimmed">TOTAL EXPENSES</Text>
                        </th>
                        <th>
                            <Text c="dimmed">CURRENT BALANCE</Text>
                        </th>
                        <th>
                            <Text c="dimmed">EDIT</Text>
                        </th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            )}
        </div>
    );
}*/
import React, { useState } from "react";
import "./AccountList.css";
import AccountForm from "./AccountForm";

const AccountList = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bank: "MB Bank",
      deposit: 50788,
      withdrawal: 48185,
      balance: 2185,
    },
    {
      id: 2,
      bank: "VIETTINBANK",
      deposit: 20788,
      withdrawal: 2365,
      balance: 18305,
    },
    {
      id: 3,
      bank: "HDFC Bank",
      deposit: 15788,
      withdrawal: 14895,
      balance: 985,
    },
    {
      id: 4,
      bank: "SCB Bank",
      deposit: 50000,
      withdrawal: 25000,
      balance: 25000,
    },
    {
      id: 5,
      bank: "ACB Bank",
      deposit: 30000,
      withdrawal: 5000,
      balance: 25000,
    },
    {
      id: 6,
      bank: "Techcombank",
      deposit: 45000,
      withdrawal: 15000,
      balance: 30000,
    },
    {
      id: 7,
      bank: "Eximbank",
      deposit: 32000,
      withdrawal: 12000,
      balance: 20000,
    },
    // Thêm các tài khoản khác nếu cần
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;
  const totalPages = Math.ceil(accounts.length / pageSize);

  const handleAddClick = () => {
    setEditingAccount(null);
    setIsFormVisible(true);
  };

  const handleSaveAccount = (newAccount) => {
    if (editingAccount) {
      setAccounts(
        accounts.map((account) =>
          account.id === newAccount.id ? newAccount : account
        )
      );
    } else {
      setAccounts([...accounts, { ...newAccount, id: accounts.length + 1 }]);
    }
    setIsFormVisible(false);
  };

  const handleDeleteAccount = (id) => {
    const updatedAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(updatedAccounts);

    // Cập nhật số trang nếu cần sau khi xóa
    const newTotalPages = Math.ceil(updatedAccounts.length / pageSize);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages); // Điều chỉnh về trang hợp lệ cuối cùng
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalDeposit = accounts.reduce(
    (total, account) => total + account.deposit,
    0
  );
  const totalWithdrawal = accounts.reduce(
    (total, account) => total + account.withdrawal,
    0
  );
  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  const displayedAccounts = accounts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="account-management-container">
      <div className="header-section">
        <h2>Accounts</h2>
        <button className="add-account-btn" onClick={handleAddClick}>
          Add Account
        </button>
      </div>

      <div className="summary-section">
        <div className="summary-item">
          <p>{accounts.length}</p>
          <span>Total Accounts</span>
        </div>
        <div className="summary-item">
          <p>{totalDeposit.toLocaleString()} VND</p>
          <span>Total Deposit</span>
        </div>
        <div className="summary-item">
          <p>{totalWithdrawal.toLocaleString()} VND</p>
          <span>Total Withdrawal</span>
        </div>
        <div className="summary-item balance">
          <p>{totalBalance.toLocaleString()} VND</p>
          <span>Total Balance</span>
        </div>
      </div>

      <table className="account-table">
        <thead>
          <tr>
            <th>Account Details</th>
            <th>Total Deposit</th>
            <th>Total Withdrawal</th>
            <th>Current Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedAccounts.map((account) => (
            <tr key={account.id}>
              <td>{account.bank}</td>
              <td>{account.deposit.toLocaleString()} VND</td>
              <td>{account.withdrawal.toLocaleString()} VND</td>
              <td>{account.balance.toLocaleString()} VND</td>
              <td className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditingAccount(account);
                    setIsFormVisible(true);
                  }}
                >
                  ✎
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteAccount(account.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`pagination-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {isFormVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AccountForm
              account={editingAccount}
              onClose={() => setIsFormVisible(false)}
              onSave={handleSaveAccount}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountList;
//aaaa
