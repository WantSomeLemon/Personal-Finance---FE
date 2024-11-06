import React, { useState } from 'react';
import './DebtList.css';
import DebtForm from './DebtForm';

const DebtList = () => {
    const [debts, setDebts] = useState([
        {
            id: 1,
            creditor: 'State Bank of Vietnam',
            amount: 50788,
            dueDate: '2024-12-01',
            notes: 'Monthly payment',
            isPaid: false,
            paidDate: null,
            isDeleted: false,
            owner: 'John Doe'
        },
        {
            id: 2,
            creditor: 'Paytm Payment Bank',
            amount: 20788,
            dueDate: '2024-11-15',
            notes: 'Credit card payment',
            isPaid: false,
            paidDate: null,
            isDeleted: false,
            owner: 'Jane Smith'
        },
        {
            id: 3,
            creditor: 'HDFC Bank',
            amount: 15788,
            dueDate: '2024-10-30',
            notes: 'Personal loan',
            isPaid: true,
            paidDate: '2024-10-01',
            isDeleted: false,
            owner: 'Alice Johnson'
        },
        // Thêm dữ liệu nợ khác nếu cần
    ]);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingDebt, setEditingDebt] = useState(null);

    const handleAddClick = () => {
        setEditingDebt(null);
        setIsFormVisible(true);
    };

    const handleEditClick = (debt) => {
        setEditingDebt(debt);
        setIsFormVisible(true);
    };

    const handleDeleteClick = (id) => {
        setDebts(debts.map(debt => (debt.id === id ? { ...debt, isDeleted: true } : debt)));
    };

    const handleSaveDebt = (newDebt) => {
        if (editingDebt) {
            setDebts(debts.map(debt => (debt.id === newDebt.id ? { ...newDebt, isPaid: newDebt.isPaid ? 1 : 0 } : debt)));
        } else {
            setDebts([...debts, { ...newDebt, id: debts.length + 1, isPaid: newDebt.isPaid ? 1 : 0 }]);
        }
        setIsFormVisible(false);
    };

    const totalDebt = debts
        .filter(debt => !debt.isDeleted)
        .reduce((total, debt) => total + debt.amount, 0);

    return (
        <div className={`debt-list-container ${isFormVisible ? 'hidden' : ''}`}>
            <div className="header-section">
                <h2>Debt Management</h2>
                <button className="add-account-btn" onClick={handleAddClick}>
                    Add Debt
                </button>
            </div>

            <div className="summary-section">
                <div className="summary-item">
                    <p>{debts.filter(debt => !debt.isDeleted).length}</p>
                    <span>Total Debts</span>
                </div>
                <div className="summary-item total-amount">
                    <p> {totalDebt.toLocaleString()} VND </p>
                    <span>Total Amount</span>
                </div>
            </div>

            <table className="account-table">
                <thead>
                    <tr>
                        <th>Creditor</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Notes</th>
                        <th>Is Paid</th>
                        <th>Paid Date</th>
                        <th>Owner</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {debts.filter(debt => !debt.isDeleted).map(debt => (
                        <tr key={debt.id}>
                            <td>{debt.creditor}</td>
                            <td> {debt.amount.toLocaleString()} VND </td>
                            <td>{debt.dueDate}</td>
                            <td>{debt.notes}</td>
                            <td>{debt.isPaid ? 'Paid' : 'Unpaid'}</td>
                            <td>{debt.paidDate || '-'}</td>
                            <td>{debt.owner}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditClick(debt)}>✎</button>
                                <button className="delete-btn" onClick={() => handleDeleteClick(debt.id)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isFormVisible && (
                <div className="modal-overlay">
                    <div className="debt-form-container">
                        <DebtForm
                            debt={editingDebt}
                            onClose={() => setIsFormVisible(false)}
                            onSave={handleSaveDebt}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DebtList;




/*
// api 
import React, { useState, useEffect } from 'react';
import './DebtList.css';
import DebtForm from './DebtForm';

const DebtList = () => {
    const [debts, setDebts] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingDebt, setEditingDebt] = useState(null);

    // Fetch debts from the API on component mount
    useEffect(() => {
        const fetchDebts = async () => {
            try {
                const response = await fetch('/api/debts'); // cái đường dẫn trên posman 
                const data = await response.json();
                setDebts(data);
            } catch (error) {
                console.error('Error fetching debts:', error);
            }
        };

        fetchDebts();
    }, []);

    const handleAddClick = () => {
        setEditingDebt(null);
        setIsFormVisible(true);
    };

    const handleEditClick = (debt) => {
        setEditingDebt(debt);
        setIsFormVisible(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            await fetch(`/api/debts/${id}`, { method: 'DELETE' }); // Adjust the API endpoint as needed
            setDebts(debts.filter(debt => debt.id !== id));
        } catch (error) {
            console.error('Error deleting debt:', error);
        }
    };

    const handleSaveDebt = async (newDebt) => {
        if (editingDebt) {
            // Update existing debt
            try {
                const response = await fetch(`/api/debts/${editingDebt.id}`, {
                    method: 'PUT',
                    
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newDebt),
                });
                const updatedDebt = await response.json();
                setDebts(debts.map(debt => (debt.id === updatedDebt.id ? updatedDebt : debt)));
            } catch (error) {
                console.error('Error updating debt:', error);
            }
        } else {
            // Add new debt
            try {
                const response = await fetch('/api/debts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newDebt),
                });
                const addedDebt = await response.json();
                setDebts([...debts, addedDebt]);
            } catch (error) {
                console.error('Error adding debt:', error);
            }
        }
        setIsFormVisible(false);
    };

    const totalDebt = debts.reduce((total, debt) => total + debt.amount, 0);

    return (
        <div className="debt-list-container">
            <div className="header-section">
                <h2>Debt Management</h2>
                <button className="add-account-btn" onClick={handleAddClick}>
                    Add Debt
                </button>
            </div>

            <div className="summary-section">
                <div className="summary-item">
                    <p>{debts.length}</p>
                    <span>Total Debts</span>
                </div>
                <div className="summary-item total-amount">
                    <p>Rs. {totalDebt.toLocaleString()}</p>
                    <span>Total Amount</span>
                </div>
            </div>

            <table className="account-table">
                <thead>
                    <tr>
                        <th>Creditor</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Notes</th>
                        <th>Is Paid</th>
                        <th>Paid Date</th>
                        <th>Owner</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {debts.map(debt => (
                        <tr key={debt.id}>
                            <td>{debt.creditor}</td>
                            <td>Rs. {debt.amount.toLocaleString()}</td>
                            <td>{debt.dueDate}</td>
                            <td>{debt.notes}</td>
                            <td>{debt.isPaid ? 'Paid' : 'Unpaid'}</td>
                            <td>{debt.paidDate || '-'}</td>
                            <td>{debt.owner}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditClick(debt)}>✎</button>
                                <button className="delete-btn" onClick={() => handleDeleteClick(debt.id)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isFormVisible && (
                <DebtForm
                    debt={editingDebt}
                    onClose={() => setIsFormVisible(false)}
                    onSave={handleSaveDebt}
                />
            )}
        </div>
    );
};

export default DebtList;
*/
