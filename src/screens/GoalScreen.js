import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import GoalHeader from "../components/goals/GoalHeader";
import GoalFeature from "../components/goals/GoalFeature";
import GoalList from "../components/goals/GoalList";
import { useDispatch, useSelector } from "react-redux";
import { validateToken } from "../features/userSlice";
import { fetchGoal } from "../features/goalSlice";

export default function GoalScreen() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  // Effect hook to dispatch actions when the component mounts
  useEffect(() => {
    // Async function to fetch goal data after validating the token
    async function fetchData() {
      try {
        // Dispatch token validation action
        await dispatch(validateToken(token));
        
        // Dispatch the fetchGoal action to get goal list
        dispatch(fetchGoal({ token: token }));
      } catch (error) {
        // Handle any errors during the token validation or goal fetching process
        console.error("Error fetching goal data:", error);
        // Optionally, you can dispatch an error action to update the UI or show a notification
      }
    }

    // Invoke fetchData to start the process
    fetchData();
  }, [dispatch, token]);

  // Get the goal list from the redux state
  const goalList = useSelector((state) => state.goal.goalList);

  return (
    <Layout title={"Goals"} load={goalList.length > 0}>
      {/* Layout containing Goal Header, Feature, and List */}
      <GoalHeader />
      <GoalFeature />
      <GoalList />
    </Layout>
  );
}
