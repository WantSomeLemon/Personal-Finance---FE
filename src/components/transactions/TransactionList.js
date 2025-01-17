/*
import {Avatar, Badge, Card, Grid, Table, Text} from '@mantine/core';
import {ArrowRIcon ,ArrowGIcon} from "../../assets/assets";
import Edit from '../../assets/Edit.svg'
import {useSelector} from "react-redux";
import TransactionEditForm from "./TransactionEditForm";
 import {useState} from "react";

export default function TransactionList() {
    const transactionList = useSelector(state => state.transaction.transactionList)
    const isMobile = useSelector(state => state.user.isMobile)
    const [displayTransactionEditForm,setDisplayTransactionEditForm] = useState(false);
    const [selectedEditElement,setSelectedEditElement] = useState(null);

    function handleTransactionEditFormClose(){
        setDisplayTransactionEditForm(false)
    }
    function handleTransactionEditFormOpen(element){
        setSelectedEditElement(element)
        setDisplayTransactionEditForm(true)
    }
    const dateCol = (date) => {
        const dateTime = new Date(date)
        const dateoptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return (
            isMobile?
                <div>
                    <Text fw={700} fz="md" style={{marginBottom:5}}>{dateTime.toLocaleDateString('en-US',dateoptions)}</Text>
                </div>
                :
            <div>
                <Text fw={700} fz="md" style={{marginBottom:5}}>{dateTime.toLocaleDateString('en-US',dateoptions)}</Text>
                <Text fw={500} c="dimmed" fz="sm">{dateTime.toLocaleTimeString('en-US')}</Text>
            </div>
        )
    }
    const categoryCol = (category) => {
        return ( isMobile ?

                <div>
                    <Grid>
                        <Grid.Col span="content">
                            {category.type === "income" ?
                                <img src={ArrowGIcon}  alt={""}/> : <img src={ArrowRIcon}  alt={""}/>}
                        </Grid.Col>
                        <Grid.Col span="content">
                            {category.type === "income" ?
                                <Text fw={700} fz="md">{<Badge color="green">{category.name}</Badge>}</Text>  : <Text fw={700} fz="md">{<Badge  color="red">{category.name}</Badge>}</Text>}
                        </Grid.Col>
                    </Grid>
                </div>

                     :
           <div>
               <Grid>
                   <Grid.Col span="content">
                       {category.type === "income" ?
                           <ArrowGIcon/> : <ArrowRIcon/>}
                   </Grid.Col>
                   <Grid.Col span="auto">
                       {category.type === "income" ?
                           <Text fw={700} fz="md">Received from: {<Badge color="green">{category.name}</Badge>}</Text>  : <Text fw={700} fz="md">Spent on: {<Badge  color="red">{category.name}</Badge>}</Text>}
                   </Grid.Col>
               </Grid>
           </div>
        )
    }
    const accountDetails = (account, paymentType) => {
        return (
            <div style={{marginBottom:12}}>
                <Text fw={700} fz="md" style={{marginBottom:5}}>{account.name}</Text>
                <Text fw={500} c="dimmed" fz="sm">{paymentType}</Text>
            </div>
        )
    }
    const paytype = (element) => {
        return (
            <div style={{marginBottom:12}}>
                <img src={Edit} onClick={() => handleTransactionEditFormOpen(element)} alt={""}/>
            </div>
        )
    }
    const amountCol = (amount, type) => {
        return (
            <div style={{marginBottom:12}}>
                {type === "income" ?
                
                <Text fw={700} fz="md" style={{marginBottom:12,color: '#26AB35'}}>{"+ Rs. " + amount.toLocaleString("en-US")}</Text> : <Text fw={700} fz="md" style={{marginBottom:12}}>{"- Rs. " + amount.toLocaleString("en-US")}</Text>}
            </div>
        )
    }
    const rows = transactionList.map((element) => {
        const dateTime = new Date(element.dateTime)
        const dateOptions = { month: 'short', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: '2-digit' };
        const cardContent = (
            <div>
                <div>
                    <Grid>
                        <Grid.Col span={2} >
                            {element.category.type === "income" ?
                                <Avatar color="green" radius="xl">{element.category.name.slice(0,2).toUpperCase()}</Avatar>
                                :
                                <Avatar color="blue" radius="xl">{element.category.name.slice(0,2).toUpperCase()}</Avatar>
                            }
                        </Grid.Col>
                        <Grid.Col span={7} >
                            {element.category.type === "income" ?
                                <Text fw={500} fz="sm">{`Received from ${element.category.name.length>12 ? `${element.category.name.slice(0,12)}...`:element.category.name}`}</Text>  : <Text fw={500} fz="sm">{`Spent on ${element.category.name.length>12 ? `${element.category.name.slice(0,12)}...`:element.category.name}`}</Text>}
                            <Text fw={500} c="dimmed" fz="xs" style={{marginBottom:5}}>{`${dateTime.toLocaleDateString('en-US',dateOptions)}, ${dateTime.toLocaleTimeString('en-US',timeOptions)}`}</Text>
                        </Grid.Col>
                        <Grid.Col span={3} offset={0}>
                            <div style={{ display: "flex", justifyContent: "flex-end",marginRight:5 }}>
                                <Grid>
                                    {element.category.type === "income" ?
                                        <Text fw={700} fz="sm" style={{marginTop:10,color: '#26AB35'}}>{"+₹" + element.amount.toLocaleString("en-US")}</Text> : <Text style={{marginTop:10}} fw={700} fz="sm">{"-₹" + element.amount.toLocaleString("en-US")}</Text>}
                                </Grid>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end",marginRight:5,marginTop:3 }}>
                                <Grid>
                                    <Text style={{marginTop:10}} fw={500} c={"dimmed"} fz="xs">{element.paymentType.length>10 ? `${element.account.name.slice(0,10)}...`:element.paymentType}</Text>
                                </Grid>
                            </div>
                        </Grid.Col>
                    </Grid>
                </div>
            </div>
        );

        if (isMobile) {
            return (
                <Card key={element.id} radius="md" p="sm" withBorder style={{ marginBottom: 8 }}>
                    {cardContent}
                </Card>
            );
        }

        // For desktop view, render a table row
        return (
            <tr key={element.id}>
                <td>{dateCol(element.dateTime)}</td>
                <td>{categoryCol(element.category)}</td>
                <td>{accountDetails(element.account, element.paymentType)}</td>
                <td>{amountCol(element.amount, element.category.type)}</td>
                <td>{paytype(element)}</td>
            </tr>
        );
    });

    return (
        <div>
            {displayTransactionEditForm && (
                <TransactionEditForm
                    element={selectedEditElement}
                    open={displayTransactionEditForm}
                    close={handleTransactionEditFormClose}
                />
            )}
            {isMobile ? (
                <div>
                    <Text fw={"700"} style={{marginBottom:3,marginTop:10}}>History</Text>
                    <Text fz={"xs"} style={{marginBottom:10}}>Recent transactions from all your accounts</Text>
                    <div>{rows}</div>
                </div>
            ) : (
                <Table>
                    <thead>
                    <tr>
                        <th>
                            <Text fw={700} c="dimmed">
                                DATE & TIME
                            </Text>
                        </th>
                        <th>
                            <Text fw={700} c="dimmed">
                                TRANSACTION DETAILS
                            </Text>
                        </th>
                        <th>
                            <Text fw={700} c="dimmed">
                                ACCOUNT DETAILS
                            </Text>
                        </th>
                        <th>
                            <Text fw={700} c="dimmed">
                                AMOUNT
                            </Text>
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
}

*/
import React, { useState } from 'react';
import './TransactionList.css';
import TransactionForm from './TransactionForm';

const TransactionList = ({ transactions, onAddTransaction, onEditTransaction, onDeleteTransaction }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    // Filter and search transactions
    const filteredTransactions = transactions.filter(transaction => {
        return (
            (transaction.category.toLowerCase().includes(filterCategory.toLowerCase()) || filterCategory === '') &&
            (
                transaction.transactionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    });

    const handleAddClick = () => {
        setEditingTransaction(null);
        setIsFormVisible(true);
    };

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
        setIsFormVisible(true);
    };

    const handleDeleteClick = (id) => {
        onDeleteTransaction(id);
    };

    const handleSaveTransaction = (newTransaction) => {
        if (newTransaction.id) {
            onEditTransaction(newTransaction);
        } else {
            onAddTransaction(newTransaction);
        }
        setIsFormVisible(false);
    };

    return (
        <div className="transaction-list-container">
            <div className="header-section">
                <h2>Transactions</h2>
                <button className="add-transaction-btn" onClick={handleAddClick}>
                    Add Transactions
                </button>
            </div>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {[...new Set(transactions.map(t => t.category))].map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>DATE & TIME</th>
                        <th>TRANSACTION DETAILS</th>
                        <th>ACCOUNT DETAILS</th>
                        <th>AMOUNT</th>
                        <th>EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>
                                    <div>{transaction.dateTime}</div>
                                    <small>{transaction.time}</small>
                                </td>
                                <td>
                                    {transaction.amount > 0 ? (
                                        <span className="transaction-type received">
                                            ↓ Received from: <span className="category-label">{transaction.category}</span>
                                        </span>
                                    ) : (
                                        <span className="transaction-type spent">
                                            ↑ Spent on: <span className="category-label">{transaction.category}</span>
                                        </span>
                                    )}
                                    <div>Transaction ID: #{transaction.id}</div>
                                </td>
                                <td>
    <div>{transaction.accountName}</div>
    <small className="payment-method">{transaction.paymentMethod}</small>
</td>

                                <td className={transaction.amount > 0 ? 'positive' : 'negative'}>
                                    {transaction.amount > 0 ? ` + ${transaction.amount}  VND` : `-  ${transaction.amount} VND`}
                                </td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEditClick(transaction)}>✎</button>
                                    <button className="delete-btn" onClick={() => handleDeleteClick(transaction.id)}>🗑️</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No transactions found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isFormVisible && (
                <div className="modal-overlay">
                    <TransactionForm
                        transaction={editingTransaction}
                        onSave={handleSaveTransaction}
                        onCancel={() => setIsFormVisible(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default TransactionList;




