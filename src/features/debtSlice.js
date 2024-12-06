import { notifications } from "@mantine/notifications";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  createDebt,
  deleteDebt,
  getDebt,
  updateDebt,
} from "../api/debtService";
import { ReactComponent as SuccessIcon } from "../assets/success-icon.svg";

// Async thunk to add a debt
export const addDebt = createAsyncThunk("debt/addDebt", async (body) => {
  try {
    // API call to create a debt
    const res = await createDebt(body);
    return res.data;
  } catch (err) {
    // Handle error and return the response data or default error message
    console.error("Error creating debt:", err);
    return err.response?.data || { message: "Unknown error occurred" };
  }
});

// Async thunk to edit a debt
export const editDebt = createAsyncThunk("debt/editDebt", async (body) => {
  try {
    console.log("body", body);
    // API call to update the debt
    const res = await updateDebt(body);
    return res.data;
  } catch (err) {
    // Handle error and return the response data or default error message
    console.error("Error updating debt:", err);
    return err.response?.data || { message: "Unknown error occurred" };
  }
});

// Async thunk to remove a debt
export const removeDebt = createAsyncThunk("debt/removeDebt", async (body) => {
  try {
    // API call to delete a debt
    const res = await deleteDebt(body);
    return res.data;
  } catch (err) {
    // Handle error and return the response data or default error message
    console.error("Error removing debt:", err);
    return err.response?.data || { message: "Unknown error occurred" };
  }
});

// Async thunk to fetch debts
export const fetchDebt = createAsyncThunk(
  "debt/fetchDebt",
  async (value, { getState, rejectWithValue }) => {
    try {
      // Get token from the state
      const state = getState();
      const token = state.user.token;
      // API call to fetch debts
      const response = await getDebt(token, value);
      // Return data received from API
      return response.data;
    } catch (error) {
      // Log and reject the error if fetching fails
      console.error("Failed to fetch debts:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const debtSlice = createSlice({
  name: "debt",
  initialState: {
    displayDebtForm: false,
    addDebtInProcess: false,
    addDebtEditInProcess: false,
    fetchDebtInProcess: false,
    debtList: [],
  },
  reducers: {
    // Action to show debt form
    showDebtForm: (state) => {
      state.displayDebtForm = true;
    },
    // Action to close debt form
    closeDebtForm: (state) => {
      state.displayDebtForm = false;
    },
  },
  extraReducers: {
    // Handling the pending state for addDebt
    [addDebt.pending]: (state) => {
      state.addDebtInProcess = true;
      console.log("Debt Add pending");
    },
    // Handling the fulfilled state for addDebt
    [addDebt.fulfilled]: (state, action) => {
      state.addDebtInProcess = false;
      if (action.payload?.message === "success") {
        console.log("Debt Created");
        notifications.show({
          title: "Debt Created",
          message: "Your debt was created successfully!",
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
      state.displayDebtForm = false;
    },
    // Handling the rejected state for addDebt
    [addDebt.rejected]: (state) => {
      state.addDebtInProcess = false;
      console.error("Debt Create failed");
      alert("Debt Create failed. Please try again.");
    },
    // Handling the pending state for editDebt
    [editDebt.pending]: (state) => {
      state.addDebtEditInProcess = true;
      console.log("Debt Edit pending");
    },
    // Handling the fulfilled state for editDebt
    [editDebt.fulfilled]: (state, action) => {
      state.addDebtEditInProcess = false;
      if (action.payload?.message === "success") {
        console.log("Debt Updated");
        notifications.show({
          title: "Debt Updated",
          message: "Your debt was updated successfully!",
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
    // Handling the rejected state for editDebt
    [editDebt.rejected]: (state) => {
      state.addDebtEditInProcess = false;
      console.error("Debt update failed");
      alert("Debt update failed. Please try again.");
    },
    // Handling the pending state for removeDebt
    [removeDebt.pending]: (state) => {
      console.log("Debt Remove pending");
    },
    // Handling the fulfilled state for removeDebt
    [removeDebt.fulfilled]: (state, action) => {
      if (action.payload?.message === "success") {
        console.log("Debt Removed");
        notifications.show({
          title: "Debt Removed",
          message: "Your debt was removed successfully!",
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
    // Handling the rejected state for removeDebt
    [removeDebt.rejected]: (state) => {
      console.error("Debt remove failed");
      alert("Debt removal failed. Please try again.");
    },
    // Handling the pending state for fetchDebt
    [fetchDebt.pending]: (state) => {
      state.fetchDebtInProcess = true;
      console.log("Debt fetch pending");
    },
    // Handling the fulfilled state for fetchDebt
    [fetchDebt.fulfilled]: (state, action) => {
      state.debtList = action.payload;
      console.log("Debt fetched", state.debtList);
    },
    // Handling the rejected state for fetchDebt
    [fetchDebt.rejected]: (state) => {
      state.fetchDebtInProcess = false;
      console.error("Debt fetch failed");
    },
  },
});

// Export actions to be dispatched
export const { showDebtForm, closeDebtForm } = debtSlice.actions;

export default debtSlice;
