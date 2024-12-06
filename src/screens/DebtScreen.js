import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import DebtHeader from "../components/debts/DebtHeader";
import DebtFeature from "../components/debts/DebtFeature";
import DebtList from "../components/debts/DebtList";
import { useDispatch, useSelector } from "react-redux";
import { validateToken } from "../features/userSlice";
import { fetchDebt } from "../features/debtSlice";

export default function DebtScreen() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  
  // Effect hook to dispatch actions when the component mounts
  useEffect(() => {
    // Async function to fetch debt data after validating the token
    async function fetchData() {
      try {
        // Dispatch token validation action
        await dispatch(validateToken(token));
        
        // Dispatch the fetchDebt action to get debt list
        dispatch(fetchDebt({ token: token }));
      } catch (error) {
        // Handle any errors during the token validation or debt fetching process
        console.error("Error fetching debt data:", error);
        // Optionally, you can dispatch an error action to update the UI or show a notification
      }
    }

    // Invoke fetchData to start the process
    fetchData();
  }, [dispatch, token]);

  // Get the debt list from the redux state
  const debtList = useSelector((state) => state.debt.debtList);

  return (
    <Layout title={"Debts"} load={debtList.length > 0}>
      {/* Layout containing Debt Header, Feature and List */}
      <DebtHeader />
      <DebtFeature />
      <DebtList />
    </Layout>
  );
}
