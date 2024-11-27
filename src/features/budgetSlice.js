import { notifications } from "@mantine/notifications";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  createBudget,
  deleteBudget,
  getBudget,
  updateBudget,
} from "../api/budgetService";
import { ReactComponent as SuccessIcon } from "../assets/success-icon.svg";

// Helper: Hàm hiển thị thông báo
const showNotification = (type, title, message) => {
  const options = {
    title,
    message,
    radius: "lg",
    autoClose: 5000,
  };

  if (type === "success") {
    options.icon = <SuccessIcon />;
  } else if (type === "error") {
    options.color = "red";
  }

  notifications.show(options);
};

// Thunks
export const addBudget = createAsyncThunk("budget/addBudget", async (body) => {
  try {
    const res = await createBudget(body.token, body.categoryId, body.amount);
    return res.data;
  } catch (err) {
    return err.response?.data || { message: "Unknown error" };
  }
});

export const editBudget = createAsyncThunk(
  "budget/editBudget",
  async (body) => {
    try {
      const res = await updateBudget(
        body.token,
        body.budgetId,
        body.categoryId,
        body.amount
      );
      return res.data;
    } catch (err) {
      return err.response?.data || { message: "Unknown error" };
    }
  }
);

export const removeBudget = createAsyncThunk(
  "budget/removeBudget",
  async (body) => {
    try {
      const res = await deleteBudget(body.token, body.budgetId);
      return res.data;
    } catch (err) {
      return err.response?.data || { message: "Unknown error" };
    }
  }
);

export const fetchBudget = createAsyncThunk(
  "budget/fetchBudget",
  async (body) => {
    try {
      const res = await getBudget(body.token);
      return res.data;
    } catch (err) {
      return err.response?.data || { message: "Unknown error" };
    }
  }
);

// Slice
const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    displayBudgetForm: false,
    addBudgetInProcess: false,
    addBudgetEditInProcess: false,
    fetchBudgetInProcess: false,
    budgetList: [],
  },
  reducers: {
    showBudgetForm: (state) => {
      state.displayBudgetForm = true;
    },
    closeBudgetForm: (state) => {
      state.displayBudgetForm = false;
    },
  },
  extraReducers: {
    [addBudget.pending]: (state) => {
      state.addBudgetInProcess = true;
    },
    [addBudget.fulfilled]: (state, action) => {
      state.addBudgetInProcess = false;
      if (action.payload?.message === "success") {
        showNotification(
          "success",
          "Budget Created",
          "Your budget was created successfully!"
        );
      } else {
        showNotification(
          "error",
          "Error",
          action.payload?.message || "Something went wrong"
        );
      }
      state.displayBudgetForm = false;
    },
    [addBudget.rejected]: (state) => {
      state.addBudgetInProcess = false;
      showNotification(
        "error",
        "Error",
        "Failed to create budget. Please try again."
      );
    },
    [editBudget.pending]: (state) => {
      state.addBudgetEditInProcess = true;
    },
    [editBudget.fulfilled]: (state, action) => {
      state.addBudgetEditInProcess = false;
      if (action.payload?.message === "success") {
        showNotification(
          "success",
          "Budget Updated",
          "Your budget was updated successfully!"
        );
      } else {
        showNotification(
          "error",
          "Error",
          action.payload?.message || "Something went wrong"
        );
      }
    },
    [editBudget.rejected]: (state) => {
      state.addBudgetEditInProcess = false;
      showNotification(
        "error",
        "Error",
        "Failed to update budget. Please try again."
      );
    },
    [removeBudget.pending]: (state) => {},
    [removeBudget.fulfilled]: (state, action) => {
      if (action.payload?.message === "success") {
        showNotification(
          "success",
          "Budget Removed",
          "Your budget was removed successfully!"
        );
      } else {
        showNotification(
          "error",
          "Error",
          action.payload?.message || "Something went wrong"
        );
      }
    },
    [removeBudget.rejected]: (state) => {
      showNotification(
        "error",
        "Error",
        "Failed to remove budget. Please try again."
      );
    },
    [fetchBudget.pending]: (state) => {
      state.fetchBudgetInProcess = true;
    },
    [fetchBudget.fulfilled]: (state, action) => {
      state.fetchBudgetInProcess = false;
      if (action.payload?.message === "success") {
        state.budgetList = action.payload.data || [];
        console.log("Budget fetched:", state.budgetList);
      } else {
        showNotification(
          "error",
          "Error",
          action.payload?.message || "Failed to fetch budgets"
        );
      }
    },
    [fetchBudget.rejected]: (state) => {
      state.fetchBudgetInProcess = false;
      showNotification(
        "error",
        "Error",
        "Failed to fetch budgets. Please try again."
      );
    },
  },
});

export const { showBudgetForm, closeBudgetForm } = budgetSlice.actions;

export default budgetSlice;
