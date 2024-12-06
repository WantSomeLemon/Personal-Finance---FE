import Layout from "../components/layout/Layout";
import BudgetHeader from "../components/budget/BudgetHeader";
import BudgetFeature from "../components/budget/BudgetFeature";
import BudgetList from "../components/budget/BudgetList";
import { useDispatch, useSelector } from "react-redux";
import { fetchBudget } from "../features/budgetSlice";
import { useEffect } from "react";
import { validateToken } from "../features/userSlice";

export default function BudgetScreen() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  // useEffect to trigger data fetching when the component is mounted or token changes
  useEffect(() => {
    async function fetchData() {
      try {
        // First, validate the token
        await dispatch(validateToken(token));
        // Then, fetch the budget data using the validated token
        dispatch(fetchBudget({ token: token }));
      } catch (error) {
        // Handle any errors that occur during the fetch operation
        console.error("Error fetching budget data:", error);
        // Optionally, you can dispatch an error action or show an error message
      }
    }

    // Call the fetchData function
    fetchData();
  }, [dispatch, token]);

  // Select the budgetList from the Redux store
  const budgetList = useSelector((state) => state.budget.budgetList);

  return (
    <Layout title={"Budgets"} load={budgetList.length > 0}>
      {/* Render components only if budgetList is available */}
      <BudgetHeader />
      <BudgetFeature />
      <BudgetList />
    </Layout>
  );
}
