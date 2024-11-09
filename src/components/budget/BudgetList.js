/*
import {useEffect, useState} from "react";
import {Table, Progress, Text, Grid, Card, Badge, Avatar} from "@mantine/core";
import {ReactComponent as EditSVG} from '../../assets/Edit.svg';
import {useDispatch, useSelector} from "react-redux";
import {fetchBudget} from "../../features/budgetSlice";
import BudgetEditForm from "./BudgetEditForm";


export default function BudgetList() {
    const dispatch = useDispatch()
    const [displayBudgetEditForm, setDisplayBudgetEditForm] = useState(false);
    const isMobile = useSelector(state => state.user.isMobile)
    const [selectedEditElement, setSelectedEditElement] = useState(null);
    const token = useSelector(state => state.user.token)
    useEffect(() => {
        dispatch(fetchBudget({token: token}))
    }, [dispatch, token])

    function handleBudgetEditFormClose() {
        setDisplayBudgetEditForm(false)
    }

    function handleBudgetEditFormOpen(element) {
        setSelectedEditElement(element)
        setDisplayBudgetEditForm(true)
    }

    const budgetList = useSelector(state => state.budget.budgetList)
    const rows = budgetList.map((element) => {
        const cardContent = (
            <div>
                <Grid>
                    <Grid.Col span={2} >
                        <Avatar color="blue" radius="xl">{element.category.name.slice(0,2).toUpperCase()}</Avatar>
                    </Grid.Col>
                    <Grid.Col span={10} >
                        <Text fw={"600"} style={{marginBottom:8}} fz={"sm"}>{`${element.category.name} (${Math.floor((100 * element.used) / element.amount)}%)`}</Text>
                        <Progress
                            tooltip={(100 * element.used) / element.amount}
                            style={{ marginTop: 5}}
                            value={(100 * element.used) / element.amount}
                            radius="xl"
                            size="sm"
                        />
                        <Text style={{marginTop:8,fontSize:10}}>{`Balance left to spend  Rs. ${element.balance.toLocaleString('en-US')} in Rs. ${element.amount.toLocaleString('en-US')}`}</Text>
                    </Grid.Col>
                </Grid>
            </div>
        );

        if (isMobile) {
            return (
                <Card key={element.budgetId} radius="md" p="md" withBorder style={{ marginBottom: 8 }}>
                    {cardContent}
                </Card>
            );
        }

        // For desktop view, render a table row
        return (
            <tr key={element.budgetId}>
                <td>
                    <Text fw={700}>{element.category.name}</Text>
                </td>
                <td>
                    <Text fw={700}>{`Rs. ${element.amount.toLocaleString('en-US')}`}</Text>
                </td>
                <td>
                    <Grid>
                        <Grid.Col span="content">
                            <Text fw={700}>{`Rs. ${element.used.toLocaleString('en-US')}`}</Text>
                        </Grid.Col>
                        <Grid.Col span="auto">
                            <Progress
                                tooltip={(100 * element.used) / element.amount}
                                style={{height: 9, marginTop: 5}}
                                value={(100 * element.used) / element.amount}
                                radius="xl"
                            />
                        </Grid.Col>
                    </Grid>
                </td>
                <td>
                    <Text fw={700} style={{color: '#26AB35'}}>
                        {`Rs. ${element.balance.toLocaleString('en-US')}`}
                    </Text>
                </td>
                <td>{<EditSVG onClick={() => handleBudgetEditFormOpen(element)}></EditSVG>}</td>
            </tr>
        );
    });

    return (
        <div>
            {displayBudgetEditForm && (
                <BudgetEditForm
                    element={selectedEditElement}
                    open={displayBudgetEditForm}
                    close={handleBudgetEditFormClose}
                />
            )}
            {isMobile ? (
                <div>
                    <Text fw={"700"} style={{marginBottom:3,marginTop:28}}>This month</Text>
                    <Text fz={"xs"} style={{marginBottom:10}}>All your Budget spending based on this month</Text>
                    <div>{rows}</div>
                </div>
            ) : (
                <Table verticalSpacing="md">
                    <thead>
                    <tr>
                        <th>
                            <Text c="dimmed">CATEGORY</Text>
                        </th>
                        <th>
                            <Text c="dimmed">BUDGET</Text>
                        </th>
                        <th>
                            <Text c="dimmed">USED AMOUNT</Text>
                        </th>
                        <th>
                            <Text c="dimmed">BALANCE LEFT</Text>
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
import React, { useState } from "react";
import "./BudgetList.css";
import BudgetForm from "./BudgetForm";

const BudgetList = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, name: "Groceries", budget: 8000, usedAmount: 5600 },
    { id: 2, name: "Food", budget: 7000, usedAmount: 6392 },
    { id: 3, name: "Rent", budget: 10000, usedAmount: 4500 },
    { id: 4, name: "Transport", budget: 5000, usedAmount: 3000 },
    { id: 5, name: "Entertainment", budget: 6000, usedAmount: 2500 },
    { id: 6, name: "Utilities", budget: 4000, usedAmount: 1000 },
    { id: 7, name: "Education", budget: 3000, usedAmount: 2000 },
    { id: 8, name: "Savings", budget: 20000, usedAmount: 15000 },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddClick = () => {
    setEditingBudget(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (budget) => {
    setEditingBudget(budget);
    setIsFormVisible(true);
  };

  const handleDeleteClick = (id) => {
    const updatedBudgets = budgets.filter((budget) => budget.id !== id);
    setBudgets(updatedBudgets);

    // Cập nhật số lượng trang sau khi xóa
    const newTotalPages = Math.ceil(updatedBudgets.length / itemsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages); // Trở về trang hợp lệ cuối cùng
    }
  };

  const handleSaveBudget = (newBudget) => {
    if (editingBudget) {
      setBudgets(
        budgets.map((budget) =>
          budget.id === newBudget.id ? newBudget : budget
        )
      );
    } else {
      setBudgets([
        ...budgets,
        {
          ...newBudget,
          id: budgets.length ? budgets[budgets.length - 1].id + 1 : 1,
        },
      ]);
    }
    setIsFormVisible(false);
  };

  const totalBudget = budgets.reduce(
    (total, budget) => total + budget.budget,
    0
  );
  const totalUsed = budgets.reduce(
    (total, budget) => total + budget.usedAmount,
    0
  );
  const totalLeft = totalBudget - totalUsed;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBudgets = budgets.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(budgets.length / itemsPerPage);

  return (
    <div className="budget-list-container">
      {isFormVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <BudgetForm
              budget={editingBudget}
              onClose={() => setIsFormVisible(false)}
              onSave={handleSaveBudget}
            />
          </div>
        </div>
      )}

      <div className="header-section">
        <h2>Budget Management</h2>
        <button className="add-budget-btn" onClick={handleAddClick}>
          Add Budget
        </button>
      </div>

      <div className="summary-section">
        <div className="summary-item">
          <p> {totalBudget.toLocaleString()} VND </p>
          <span>Total Budget</span>
        </div>
        <div className="summary-item">
          <p> {totalUsed.toLocaleString()} VND </p>
          <span>Total Used</span>
        </div>
        <div className="summary-item total-left">
          <p> {totalLeft.toLocaleString()} VND </p>
          <span>Total Left</span>
        </div>
      </div>

      <table className="budget-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Budget</th>
            <th>Used Amount</th>
            <th>Balance Left</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBudgets.map((budget) => (
            <tr key={budget.id}>
              <td>{budget.name}</td>
              <td>{budget.budget.toLocaleString()} VND </td>
              <td> {budget.usedAmount.toLocaleString()} VND </td>
              <td>
                {" "}
                {(budget.budget - budget.usedAmount).toLocaleString()} VND{" "}
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(budget)}
                >
                  ✎
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(budget.id)}
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
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
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
    </div>
  );
};

export default BudgetList;
