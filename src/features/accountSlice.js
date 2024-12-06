import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createAccount,
  deleteAccount,
  getAccount,
  updateAccount,
} from "../api/accountService";
import { notifications } from "@mantine/notifications";
import { ReactComponent as SuccessIcon } from "../assets/success-icon.svg";

// Async thunk for adding an account
export const addAccount = createAsyncThunk(
  "account/addAccount",
  async (body, { rejectWithValue }) => {
    try {
      const response = await createAccount(
        body.token,
        body.name,
        body.currentBalance,
        body.paymentTypes
      );
      return response.data; // On success, return response data
    } catch (err) {
      // If an error occurs, log it and return error response
      console.error(err);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

// Async thunk for updating an account
export const changeAccount = createAsyncThunk(
  "account/changeAccount",
  async (body, { rejectWithValue }) => {
    try {
      const response = await updateAccount(body.token, body);
      return response.data; // On success, return response data
    } catch (err) {
      // If an error occurs, log it and return error response
      console.error(err);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

// Async thunk for deleting an account
export const removeAccount = createAsyncThunk(
  "account/removeAccount",
  async (body, { rejectWithValue }) => {
    try {
      const response = await deleteAccount(body.token, body.accountId);
      return response.data; // On success, return response data
    } catch (err) {
      // If an error occurs, log it and return error response
      console.error(err);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

// Async thunk for fetching accounts
export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async (body, { rejectWithValue }) => {
    try {
      const response = await getAccount(body.token);
      return response.data; // On success, return response data
    } catch (err) {
      // If an error occurs, log it and return error response
      console.error(err);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

// Redux slice for account state management
const accountSlice = createSlice({
  name: "account",
  initialState: {
    displayAccountForm: false,
    addAccountInProcess: false,
    fetchAccountInProcess: false,
    accountList: [],
  },
  reducers: {
    // Action to show the account form
    showAccountForm: (state) => {
      state.displayAccountForm = true;
    },
    // Action to close the account form
    closeAccountForm: (state) => {
      state.displayAccountForm = false;
    },
  },
  extraReducers: {
    // Handling addAccount actions
    [addAccount.pending]: (state) => {
      state.addAccountInProcess = true; // Start the process
    },
    [addAccount.fulfilled]: (state, action) => {
      if (action.payload.message === "success") {
        // Show success notification if the account is added successfully
        notifications.show({
          title: "Account Added",
          message: "Your account was added successfully!",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
      } else {
        // Show failure notification if there was an issue
        notifications.show({
          title: action.payload.message,
          message: "Please try again!",
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      }
      state.addAccountInProcess = false; // End the process
      state.displayAccountForm = false; // Close the form
    },
    [addAccount.rejected]: (state, action) => {
      // Show error notification if the account creation failed
      state.addAccountInProcess = false;
      notifications.show({
        title: "Account Creation Failed",
        message: action.payload || "Please try again!",
        radius: "lg",
        color: "red",
        autoClose: 5000,
      });
    },
    // Handling fetchAccount actions
    [fetchAccount.pending]: (state) => {
      state.fetchAccountInProcess = true; // Start the process
    },
    [fetchAccount.fulfilled]: (state, action) => {
      if (action.payload.message === "success") {
        // Update account list if fetching was successful
        state.accountList = action.payload.data;
      } else {
        console.log(action.payload.message);
      }
      state.fetchAccountInProcess = false; // End the process
    },
    [fetchAccount.rejected]: (state, action) => {
      // Show error notification if fetching accounts failed
      state.fetchAccountInProcess = false;
      console.log("Account fetch failed", action.payload);
    },
    // Handling changeAccount actions
    [changeAccount.pending]: (state) => {
      console.log("Account update pending"); // Log pending action
    },
    [changeAccount.fulfilled]: (state, action) => {
      if (action.payload.message === "success") {
        // Show success notification if account update is successful
        notifications.show({
          title: "Account Updated",
          message: "Your account was updated successfully!",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
      } else {
        console.log(action.payload.message); // Log failure message
        notifications.show({
          title: action.payload.message,
          message: "Please try again!",
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      }
      state.fetchAccountInProcess = false; // End the process
    },
    [changeAccount.rejected]: (state, action) => {
      // Show error notification if the update failed
      console.log("Account update failed", action.payload);
      notifications.show({
        title: "Account Update Failed",
        message: "Please try again!",
        radius: "lg",
        color: "red",
        autoClose: 5000,
      });
    },
    // Handling removeAccount actions
    [removeAccount.pending]: (state) => {
      console.log("Account delete pending"); // Log pending action
    },
    [removeAccount.fulfilled]: (state, action) => {
      if (action.payload.message === "success") {
        // Show success notification if account deletion is successful
        notifications.show({
          title: "Account Deleted",
          message: "Your account was deleted successfully!",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
      } else {
        console.log(action.payload.message); // Log failure message
        notifications.show({
          title: action.payload.message,
          message: "Please try again!",
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      }
      state.fetchAccountInProcess = false; // End the process
    },
    [removeAccount.rejected]: (state, action) => {
      // Show error notification if deletion failed
      console.log("Account delete failed", action.payload);
      notifications.show({
        title: "Account Deletion Failed",
        message: "Please try again!",
        radius: "lg",
        color: "red",
        autoClose: 5000,
      });
    },
  },
});

// Export actions and reducer
export const { showAccountForm, closeAccountForm } = accountSlice.actions;
export default accountSlice;
