/*
import { Table,Text} from '@mantine/core';
import {useSelector} from "react-redux";
import { ReactComponent as EditSVG } from '../../assets/Edit.svg';
import {useState} from "react";
import GoalEditForm from "./GoalEditForm";

export default function GoalList() {

    const goalList = useSelector(state => state.goal.goalList)
    const [displayGoalEditForm,setDisplayGoalEditForm] = useState(false);
    const [selectedEditElement,setSelectedEditElement] = useState(null);
    function handleGoalEditFormClose(){
        setDisplayGoalEditForm(false)
    }
    function handleEdit(element){
        setSelectedEditElement(element)
        setDisplayGoalEditForm(true)
    }

    function handleDate(date){
        const formatDate = new Date(date)
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return formatDate.toLocaleDateString('en-US',dateOptions)
    }

    const rows = goalList.map((element) => (
        <tr key={element.name}>
            <td><Text fw={700}>{element.name}</Text><Text c={"dimmed"} size={"xs"}>{element.description}</Text></td>
            <td><Text fw={700}>{handleDate(element.targetDate)}</Text></td>
            <td><Text fw={700}>{`${element.targetAmount}`}</Text></td>
            <td><Text fw={700}>{element.status}</Text></td>
            <td>{<EditSVG onClick={() => handleEdit(element) }/>}</td>
        </tr>
    ));

    return (
        <div>
            {displayGoalEditForm &&  <GoalEditForm element={selectedEditElement} open={displayGoalEditForm} close={handleGoalEditFormClose}/>}
            <Table verticalSpacing="lg">
                <thead>
                    <tr>
                        <th><Text c="dimmed">NAME</Text></th>
                        <th><Text c="dimmed">TARGET DATE</Text></th>
                        <th><Text c="dimmed">TARGET AMOUNT</Text></th>
                        <th><Text c="dimmed">STATUS</Text></th>
                        <th><Text c="dimmed">EDIT</Text></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    )
}

*/
import React, { useState } from "react";
import "./GoalsList.css";
import GoalsForm from "./GoalForm";

const GoalsList = () => {
  const [goals, setGoals] = useState([
    {
      GoalID: 1,
      Name: "Save for Vacation",
      Description: "Save money for a trip",
      TargetAmount: 5000,
      CurrentAmount: 2000,
      TargetDate: "2025-06-01",
      isAchieved: false,
      AchievedDate: null,
      UserId: 1,
      isDeleted: false,
      createdAt: new Date(),
    },
    {
      GoalID: 2,
      Name: "Emergency Fund",
      Description: "Build an emergency fund",
      TargetAmount: 10000,
      CurrentAmount: 3000,
      TargetDate: "2024-12-31",
      isAchieved: false,
      AchievedDate: null,
      UserId: 1,
      isDeleted: false,
      createdAt: new Date(),
    },
    {
      GoalID: 3,
      Name: "Emergency Fund",
      Description: "Build an emergency fund",
      TargetAmount: 10000,
      CurrentAmount: 3000,
      TargetDate: "2024-12-31",
      isAchieved: false,
      AchievedDate: null,
      UserId: 1,
      isDeleted: false,
      createdAt: new Date(),
    },
    {
      GoalID: 4,
      Name: "Emergency Fund",
      Description: "Build an emergency fund",
      TargetAmount: 10000,
      CurrentAmount: 3000,
      TargetDate: "2024-12-31",
      isAchieved: false,
      AchievedDate: null,
      UserId: 1,
      isDeleted: false,
      createdAt: new Date(),
    },
    {
      GoalID: 5,
      Name: "Emergency Fund",
      Description: "Build an emergency fund",
      TargetAmount: 10000,
      CurrentAmount: 3000,
      TargetDate: "2024-12-31",
      isAchieved: false,
      AchievedDate: null,
      UserId: 1,
      isDeleted: false,
      createdAt: new Date(),
    },
    {
      GoalID: 6,
      Name: "Emergency Fund",
      Description: "Build an emergency fund",
      TargetAmount: 10000,
      CurrentAmount: 3000,
      TargetDate: "2024-12-31",
      isAchieved: false,
      AchievedDate: null,
      UserId: 1,
      isDeleted: false,
      createdAt: new Date(),
    },
    {
      GoalID: 7,
      Name: "Emergency Fund",
      Description: "Build an emergency fund",
      TargetAmount: 10000,
      CurrentAmount: 3000,
      TargetDate: "2024-12-31",
      isAchieved: false,
      AchievedDate: null,
      UserId: 1,
      isDeleted: false,
      createdAt: new Date(),
    },
    // other goal objects...
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddClick = () => {
    setEditingGoal(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (goal) => {
    setEditingGoal(goal);
    setIsFormVisible(true);
  };

  const handleDeleteClick = (GoalID) => {
    const updatedGoals = goals.map((goal) =>
      goal.GoalID === GoalID ? { ...goal, isDeleted: true } : goal
    );
    setGoals(updatedGoals);

    // Cập nhật số lượng trang sau khi xóa
    const newTotalPages = Math.ceil(
      updatedGoals.filter((goal) => !goal.isDeleted).length / itemsPerPage
    );
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages); // Trở về trang hợp lệ cuối cùng
    }
  };

  const handleSaveGoal = (newGoal) => {
    if (editingGoal) {
      setGoals(
        goals.map((goal) => (goal.GoalID === newGoal.GoalID ? newGoal : goal))
      );
    } else {
      newGoal.GoalID = goals.length ? goals[goals.length - 1].GoalID + 1 : 1;
      newGoal.createdAt = new Date();
      newGoal.isDeleted = false;
      setGoals([...goals, newGoal]);
    }
    setIsFormVisible(false);
  };

  // Pagination logic
  const filteredGoals = goals.filter((goal) => !goal.isDeleted);
  const totalPages = Math.ceil(filteredGoals.length / itemsPerPage);
  const currentGoals = filteredGoals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalTargetAmount = filteredGoals.reduce(
    (total, goal) => total + goal.TargetAmount,
    0
  );
  const totalCurrentAmount = filteredGoals.reduce(
    (total, goal) => total + goal.CurrentAmount,
    0
  );
  const totalRemaining = totalTargetAmount - totalCurrentAmount;

  return (
    <div className="goals-list-container">
      <div className="header-section">
        <h2>Goals Management</h2>
        <button className="add-goal-btn" onClick={handleAddClick}>
          Add Goal
        </button>
      </div>

      <div className="summary-section">
        <div className="summary-item">
          <p>{totalTargetAmount.toLocaleString()} VND</p>
          <span>Total Target Amount</span>
        </div>
        <div className="summary-item">
          <p>{totalCurrentAmount.toLocaleString()} VND</p>
          <span>Total Current Amount</span>
        </div>
        <div className="summary-item total-remaining">
          <p>{totalRemaining.toLocaleString()} VND</p>
          <span>Total Remaining</span>
        </div>
      </div>

      <table className="goals-table">
        <thead>
          <tr>
            <th>Goal ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Target Amount</th>
            <th>Current Amount</th>
            <th>Target Date</th>
            <th>Achieved</th>
            <th>Achieved Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentGoals.map((goal) => (
            <tr key={goal.GoalID}>
              <td>{goal.GoalID}</td>
              <td>{goal.Name}</td>
              <td>{goal.Description}</td>
              <td>{goal.TargetAmount.toLocaleString()} VND</td>
              <td>{goal.CurrentAmount.toLocaleString()} VND</td>
              <td>{new Date(goal.TargetDate).toLocaleDateString()}</td>
              <td>{goal.isAchieved ? "Yes" : "No"}</td>
              <td>
                {goal.AchievedDate
                  ? new Date(goal.AchievedDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(goal)}
                >
                  ✎
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(goal.GoalID)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredGoals.length > 6 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`page-btn ${
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
          <div className="goals-form-container">
            <GoalsForm
              goal={editingGoal}
              onClose={() => setIsFormVisible(false)}
              onSave={handleSaveGoal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsList;
