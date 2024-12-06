import { createSlice } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import accountSlice from "./accountSlice";
import categorySlice from "./categorySlice";
import transactionSlice from "./transactionSlice";
import budgetSlice from "./budgetSlice";

// Logout slice to reset states
const logoutSlice = createSlice({
  name: "logout",
  initialState: {},
  reducers: {
    // Logout action that resets all the slices
    logout: () => {
      try {
        console.log("Logging out..."); // Debug log to trace logout action

        // Resetting all the slices to their initial state
        return {
          user: userSlice.reducer(undefined, {}),
          account: accountSlice.reducer(undefined, {}),
          category: categorySlice.reducer(undefined, {}),
          transaction: transactionSlice.reducer(undefined, {}),
          budget: budgetSlice.reducer(undefined, {}),
        };
      } catch (error) {
        // Catch and log any errors that might occur during logout
        console.error("Error during logout:", error);
        // Optionally, you can return a default state or error message here if needed
        return {};
      }
    },
  },
});

// Export the logout action
export const { logout } = logoutSlice.actions;

// Export the reducer to be used in the store
export default logoutSlice;
