import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  updateTransaction,
} from "../api/transactionService";
import { notifications } from "@mantine/notifications";
import { ReactComponent as SuccessIcon } from "../assets/success-icon.svg";

// Async Thunk to add a transaction
export const addTransaction = createAsyncThunk(
  "transaction/addTransaction",
  async (body) => {
    try {
      const res = await createTransaction(
        body.token,
        body.amount,
        body.description,
        body.paymentType,
        body.dateTime,
        body.categoryId,
        body.accountId
      );
      return res.data;
    } catch (err) {
      console.error("Error adding transaction:", err);
      return err.response?.data || { message: "Something went wrong" };
    }
  }
);

// Async Thunk to edit a transaction
export const editTransaction = createAsyncThunk(
  "transaction/editTransaction",
  async (body) => {
    try {
      const res = await updateTransaction(
        body.token,
        body.amount,
        body.description,
        body.paymentType,
        body.dateTime,
        body.categoryId,
        body.accountId,
        body.transactionId
      );
      return res.data;
    } catch (err) {
      console.error("Error editing transaction:", err);
      return err.response?.data || { message: "Something went wrong" };
    }
  }
);

// Async Thunk to fetch all transactions
export const fetchTransaction = createAsyncThunk(
  "transaction/fetchTransaction",
  async (body) => {
    try {
      const res = await getTransaction(body.token);
      return res.data;
    } catch (err) {
      console.error("Error fetching transactions:", err);
      return err.response?.data || { message: "Something went wrong" };
    }
  }
);

// Async Thunk to remove a transaction
export const removeTransaction = createAsyncThunk(
  "transaction/removeTransaction",
  async (body) => {
    try {
      const res = await deleteTransaction(body.token, body.transactionId);
      return res.data;
    } catch (err) {
      console.error("Error removing transaction:", err);
      return err.response?.data || { message: "Something went wrong" };
    }
  }
);

// Initial state for the transaction slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    count: 0,
    displayTransactionForm: false,
    addTransactionInProcess: false,
    editTransactionInProcess: false,
    fetchTransactionInProcess: false,
    transactionList: [],
  },
  reducers: {
    // Action to show the transaction form
    showTransactionForm: (state) => {
      state.displayTransactionForm = true;
    },
    // Action to close the transaction form
    closeTransactionForm: (state) => {
      state.displayTransactionForm = false;
    },
  },
  extraReducers: {
    // Handling the pending state of adding a transaction
    [addTransaction.pending]: (state) => {
      state.addTransactionInProcess = true;
      console.log("Transaction Add pending");
    },
    // Handling the fulfilled state of adding a transaction
    [addTransaction.fulfilled]: (state, action) => {
      state.addTransactionInProcess = false;
      if (action.payload.message === "success") {
        notifications.show({
          title: "Transaction Added",
          message: "Your transaction added successfully!!",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
        console.log("Transaction Created");
      } else {
        notifications.show({
          title: action.payload.message,
          message: "Please try again!!",
          radius: "lg",
          color: "red",
        });
        console.log(action.payload.message);
      }
      state.displayTransactionForm = false;
    },
    // Handling the rejected state of adding a transaction
    [addTransaction.rejected]: (state) => {
      state.addTransactionInProcess = false;
      console.log("Transaction Create failed");
      notifications.show({
        title: "Transaction Create failed",
        message: "Please try again!!",
        radius: "lg",
        color: "red",
      });
    },
    // Handling the pending state of editing a transaction
    [editTransaction.pending]: (state) => {
      state.editTransactionInProcess = true;
      console.log("Transaction Edit pending");
    },
    // Handling the fulfilled state of editing a transaction
    [editTransaction.fulfilled]: (state, action) => {
      state.editTransactionInProcess = false;
      if (action.payload.message === "success") {
        notifications.show({
          title: "Transaction Updated",
          message: "Your transaction updated successfully!!",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
        console.log("Transaction Updated");
      } else {
        notifications.show({
          title: action.payload.message,
          message: "Please try again!!",
          radius: "lg",
          color: "red",
        });
        console.log(action.payload.message);
      }
    },
    // Handling the rejected state of editing a transaction
    [editTransaction.rejected]: (state) => {
      state.editTransactionInProcess = false;
      notifications.show({
        title: "Transaction Update failed",
        message: "Please try again!!",
        radius: "lg",
        color: "red",
      });
    },
    // Handling the pending state of removing a transaction
    [removeTransaction.pending]: (state) => {
      console.log("Transaction Delete pending");
    },
    // Handling the fulfilled state of removing a transaction
    [removeTransaction.fulfilled]: (state, action) => {
      if (action.payload.message === "success") {
        notifications.show({
          title: "Transaction Deleted",
          message: "Your transaction deleted successfully!!",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
        console.log("Transaction Deleted");
      } else {
        notifications.show({
          title: action.payload.message,
          message: "Please try again!!",
          radius: "lg",
          color: "red",
        });
        console.log(action.payload.message);
      }
    },
    // Handling the rejected state of removing a transaction
    [removeTransaction.rejected]: (state) => {
      notifications.show({
        title: "Transaction Delete failed",
        message: "Please try again!!",
        radius: "lg",
        color: "red",
      });
    },
    // Handling the pending state of fetching transactions
    [fetchTransaction.pending]: (state) => {
      state.fetchTransactionInProcess = true;
      console.log("Transaction fetch pending");
    },
    // Handling the fulfilled state of fetching transactions
    [fetchTransaction.fulfilled]: (state, action) => {
      state.fetchTransactionInProcess = false;
      if (action.payload.message === "success") {
        state.transactionList = action.payload.data;
        console.log("Transaction fetched", state.transactionList);
      } else {
        console.log(action.payload.message);
      }
    },
    // Handling the rejected state of fetching transactions
    [fetchTransaction.rejected]: (state) => {
      state.fetchTransactionInProcess = false;
      console.log("Transaction fetch failed");
    },
  },
});

// Export actions to control transaction form visibility
export const { showTransactionForm, closeTransactionForm } = transactionSlice.actions;

// Export the reducer to be used in the store
export default transactionSlice;
