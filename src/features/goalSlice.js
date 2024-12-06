import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createGoal, deleteGoal, getGoal, updateGoal } from "../api/goalService";
import _ from "lodash";
import { notifications } from "@mantine/notifications";
import { ReactComponent as SuccessIcon } from "../assets/success-icon.svg";

// Async thunk to add a new goal
export const addGoal = createAsyncThunk("goal/addGoal", async (body) => {
  try {
    const res = await createGoal(body.token, body);
    return res.data;
  } catch (err) {
    console.error("Error in creating goal:", err);
    return err.response ? err.response.data : { message: "Unknown error occurred" }; // Improved error handling
  }
});

// Async thunk to edit an existing goal
export const editGoal = createAsyncThunk("goal/editGoal", async (body) => {
  try {
    const res = await updateGoal(body.token, body);
    return res.data;
  } catch (err) {
    console.error("Error in updating goal:", err);
    return err.response ? err.response.data : { message: "Unknown error occurred" }; // Improved error handling
  }
});

// Async thunk to remove a goal
export const removeGoal = createAsyncThunk("goal/removeGoal", async (body) => {
  try {
    const res = await deleteGoal(body.token, body.goalId);
    return res.data;
  } catch (err) {
    console.error("Error in removing goal:", err);
    return err.response ? err.response.data : { message: "Unknown error occurred" }; // Improved error handling
  }
});

// Async thunk to fetch all goals
export const fetchGoal = createAsyncThunk("goal/fetchGoal", async (body) => {
  try {
    const res = await getGoal(body.token);
    return res.data;
  } catch (err) {
    console.error("Error in fetching goals:", err);
    return err.response ? err.response.data : { message: "Unknown error occurred" }; // Improved error handling
  }
});

const goalSlice = createSlice({
  name: "goal",
  initialState: {
    displayGoalForm: false,
    addGoalInProcess: false,
    addGoalEditInProcess: false,
    fetchGoalInProcess: false,
    goalList: [],
  },
  reducers: {
    showGoalForm: (state) => {
      state.displayGoalForm = true; // Show the goal form
    },
    closeGoalForm: (state) => {
      state.displayGoalForm = false; // Close the goal form
    },
  },
  extraReducers: {
    // Handle add goal actions
    [addGoal.pending]: (state) => {
      state.addGoalInProcess = true;
      console.log("Goal Add pending");
    },
    [addGoal.fulfilled]: (state, action) => {
      state.addGoalInProcess = false;
      if (action.payload?.message === "success") {
        console.log("Goal Created");
        notifications.show({
          title: "Goal Created",
          message: "Your goal was created successfully!",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
      } else if (_.isEmpty(action.payload)) {
        notifications.show({
          title: "Something went wrong",
          message: "Please try again!",
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      } else {
        notifications.show({
          title: action.payload?.message,
          message: action.payload?.message,
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      }
      state.displayGoalForm = false; // Close the goal form after successful creation
    },
    [addGoal.rejected]: (state) => {
      state.addGoalInProcess = false;
      console.error("Goal Create failed");
      alert("Goal Create failed, Try again");
    },

    // Handle edit goal actions
    [editGoal.pending]: (state) => {
      state.addGoalEditInProcess = true;
      console.log("Goal Edit pending");
    },
    [editGoal.fulfilled]: (state, action) => {
      state.addGoalEditInProcess = false;
      if (action.payload?.message === "success") {
        console.log("Goal Updated");
        notifications.show({
          title: "Goal Updated",
          message: "Your goal was updated successfully!",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
      } else if (_.isEmpty(action.payload)) {
        notifications.show({
          title: "Something went wrong",
          message: "Please try again!",
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      } else {
        notifications.show({
          title: action.payload?.message,
          message: action.payload?.message,
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      }
    },
    [editGoal.rejected]: (state) => {
      state.addGoalEditInProcess = false;
      console.error("Goal update failed");
      alert("Goal update failed, Try again");
    },

    // Handle remove goal actions
    [removeGoal.pending]: (state) => {
      console.log("Goal Remove pending");
    },
    [removeGoal.fulfilled]: (state, action) => {
      if (action.payload?.message === "success") {
        console.log("Goal Removed");
        notifications.show({
          title: "Goal Removed",
          message: "Your goal was removed successfully!",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
      } else if (_.isEmpty(action.payload)) {
        notifications.show({
          title: "Something went wrong",
          message: "Please try again!",
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      } else {
        notifications.show({
          title: action.payload?.message,
          message: action.payload?.message,
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      }
    },
    [removeGoal.rejected]: (state) => {
      console.error("Goal remove failed");
      alert("Goal remove failed, Try again");
    },

    // Handle fetch goal actions
    [fetchGoal.pending]: (state) => {
      state.fetchGoalInProcess = true;
      console.log("Goal fetch pending");
    },
    [fetchGoal.fulfilled]: (state, action) => {
      if (action.payload?.message === "success") {
        state.goalList = action.payload.data;
        console.log("Goals fetched successfully", state.goalList);
      } else {
        console.log("Error fetching goals:", action.payload?.message);
      }
      state.fetchGoalInProcess = false;
    },
    [fetchGoal.rejected]: (state) => {
      state.fetchGoalInProcess = false;
      console.error("Goal fetch failed");
    },
  },
});

// Export actions
export const { showGoalForm, closeGoalForm } = goalSlice.actions;

// Export the reducer
export default goalSlice;
