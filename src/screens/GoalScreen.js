/*import Layout from "../layout/Layout";
import GoalHeader from '../components/goals/GoalHeader';
import GoalFeature from "../components/goals/GoalFeature";
import GoalList from "../components/goals/GoalList";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {validateToken} from "../features/userSlice";
import {fetchGoal} from "../features/goalSlice";
export default function  GoalScreen(){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(()=>{
        async function fetchData() {
            await dispatch(validateToken(token))
            dispatch(fetchGoal({token:token}))
        }
        fetchData()
    },[dispatch, token])
    const goalList = useSelector(state => state.goal.goalList)
    return(
        <Layout title={"Goals"} load={goalList.length>0}>
            <GoalHeader/>
            <GoalFeature/>
            <GoalList/>
        </Layout>
    )
}

*/


import React, { useState } from 'react';
import GoalsList from '../components/goals/GoalList'; // Component for displaying list of goals
// import GoalsForm from '../components/goals/GoalsForm'; // Uncomment when using GoalsForm
import Layout from '../layout/Layout'; // Layout containing header and sidebar

const GoalsScreen = () => {
  const [goals, setGoals] = useState([
    { GoalID: 1, Name: 'Save for Vacation', Description: 'Save money for a trip to Hawaii', TargetAmount: 5000, CurrentAmount: 2000, TargetDate: '2024-12-31', isAchieved: false, AchievedDate: null, UserId: 1, isDeleted: false, createdAt: new Date().toISOString() },
    { GoalID: 2, Name: 'Emergency Fund', Description: 'Build an emergency fund for unexpected expenses', TargetAmount: 10000, CurrentAmount: 3000, TargetDate: '2025-06-30', isAchieved: false, AchievedDate: null, UserId: 1, isDeleted: false, createdAt: new Date().toISOString() },
  ]); // Initial goal data
  const [currentGoal, setCurrentGoal] = useState(null); // Holds the goal being edited

  // Add or update goal
  const handleSaveGoal = (goal) => {
    if (goal.GoalID) {
      // If the goal has an ID, update the existing goal
      setGoals(goals.map(g => g.GoalID === goal.GoalID ? goal : g));
    } else {
      // If the goal doesn't have an ID, add a new goal
      goal.GoalID = goals.length + 1; // Assign a new ID
      setGoals([...goals, goal]);
    }
    setCurrentGoal(null); // Reset form after saving
  };

  // Delete goal
  const handleDeleteGoal = (id) => {
    setGoals(goals.filter(g => g.GoalID !== id)); // Filter out the deleted goal
  };

  return (
    <Layout title={"Goals"} load={goals.length > 0}>
      {/* Display list of goals */}
      <GoalsList goals={goals} onEditGoal={setCurrentGoal} onDeleteGoal={handleDeleteGoal} />
      {/* Uncomment the line below when you implement GoalsForm */}
      {/* <GoalsForm goal={currentGoal} onSave={handleSaveGoal} /> */}
    </Layout>
  );
};

export default GoalsScreen;
