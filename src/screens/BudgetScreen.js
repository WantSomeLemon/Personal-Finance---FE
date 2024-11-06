/*import Layout from "../layout/Layout";
import BudgetHeader from "../components/budget/BudgetHeader";
import BudgetFeature from "../components/budget/BudgetFeature";
import BudgetList from "../components/budget/BudgetList";
import {useDispatch,useSelector} from "react-redux";
import {fetchBudget} from "../features/budgetSlice";
import {useEffect} from "react";
import {validateToken} from "../features/userSlice";


export default function BudgetScreen(){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(()=>{
        async function fetchData() {
            await dispatch(validateToken(token))
            dispatch(fetchBudget({token:token}))
        }
        fetchData()
    },[dispatch, token])
    const budgetList = useSelector(state => state.budget.budgetList)
    return(
        <Layout title={"Budgets"} load={budgetList.length>0}>

                <BudgetHeader/>
                <BudgetFeature/>
                <BudgetList/>

        </Layout>
    )
}

*/

import React, { useState } from 'react';
import BudgetList from '../components/budget/BudgetList'; // Component for displaying list of budgets
// import BudgetForm from '../components/budgets/BudgetForm'; // Uncomment when using BudgetForm
import Layout from '../layout/Layout'; // Layout containing header and sidebar

const BudgetScreen = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, name: 'Groceries', amount: 8000, used: 5600 },
    { id: 2, name: 'Food', amount: 7000, used: 6392 },
    { id: 3, name: 'Rent', amount: 10000, used: 4500 },
  ]); // Initial budget data
  const [currentBudget, setCurrentBudget] = useState(null); // Holds the budget being edited

  // Add or update budget
  const handleSaveBudget = (budget) => {
    if (budget.id) {
      // If the budget has an id, update the existing budget
      setBudgets(budgets.map(b => b.id === budget.id ? budget : b));
    } else {
      // If the budget doesn't have an id, add a new budget
      budget.id = budgets.length + 1;
      setBudgets([...budgets, budget]);
    }
    setCurrentBudget(null); // Reset form after saving
  };

  // Delete budget
  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id)); // Filter out the deleted budget
  };

  return (
    <Layout title={"Budgets"} load={budgets.length > 0}>
      {/* Display list of budgets */}
      <BudgetList budgets={budgets} onEditBudget={setCurrentBudget} onDeleteBudget={handleDeleteBudget} />
      {/* Uncomment the line below when you implement BudgetForm */}
      {/* <BudgetForm budget={currentBudget} onSave={handleSaveBudget} /> */}
    </Layout>
  );
};

export default BudgetScreen;
