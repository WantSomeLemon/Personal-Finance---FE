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
    options.color = "red"; // Màu đỏ cho thông báo lỗi
  }

  notifications.show(options); // Hiển thị thông báo
};

// Thunks (Async action creators)
export const addBudget = createAsyncThunk("budget/addBudget", async (body) => {
  try {
    const res = await createBudget(body.token, body.categoryId, body.amount);
    return res.data; // Trả về dữ liệu sau khi tạo ngân sách thành công
  } catch (err) {
    // Xử lý lỗi nếu có
    console.error("Error creating budget:", err);
    return err.response?.data || { message: "Unknown error" }; // Trả về thông báo lỗi nếu có
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
      return res.data; // Trả về dữ liệu sau khi cập nhật ngân sách thành công
    } catch (err) {
      // Xử lý lỗi nếu có
      console.error("Error updating budget:", err);
      return err.response?.data || { message: "Unknown error" }; // Trả về thông báo lỗi nếu có
    }
  }
);

export const removeBudget = createAsyncThunk(
  "budget/removeBudget",
  async (body) => {
    try {
      const res = await deleteBudget(body.token, body.budgetId);
      return res.data; // Trả về dữ liệu sau khi xóa ngân sách thành công
    } catch (err) {
      // Xử lý lỗi nếu có
      console.error("Error removing budget:", err);
      return err.response?.data || { message: "Unknown error" }; // Trả về thông báo lỗi nếu có
    }
  }
);

export const fetchBudget = createAsyncThunk(
  "budget/fetchBudget",
  async (body) => {
    try {
      const res = await getBudget(body.token);
      return res.data; // Trả về dữ liệu sau khi lấy danh sách ngân sách thành công
    } catch (err) {
      // Xử lý lỗi nếu có
      console.error("Error fetching budget:", err);
      return err.response?.data || { message: "Unknown error" }; // Trả về thông báo lỗi nếu có
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
    // Hiển thị form ngân sách
    showBudgetForm: (state) => {
      state.displayBudgetForm = true;
    },
    // Đóng form ngân sách
    closeBudgetForm: (state) => {
      state.displayBudgetForm = false;
    },
  },
  extraReducers: {
    // Khi action addBudget đang được thực thi
    [addBudget.pending]: (state) => {
      state.addBudgetInProcess = true; // Đặt trạng thái đang xử lý
    },
    // Khi action addBudget thành công
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
      state.displayBudgetForm = false; // Đóng form sau khi thêm ngân sách thành công
    },
    // Khi action addBudget bị lỗi
    [addBudget.rejected]: (state) => {
      state.addBudgetInProcess = false;
      showNotification(
        "error",
        "Error",
        "Failed to create budget. Please try again."
      );
    },
    // Khi action editBudget đang được thực thi
    [editBudget.pending]: (state) => {
      state.addBudgetEditInProcess = true; // Đặt trạng thái đang xử lý
    },
    // Khi action editBudget thành công
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
    // Khi action editBudget bị lỗi
    [editBudget.rejected]: (state) => {
      state.addBudgetEditInProcess = false;
      showNotification(
        "error",
        "Error",
        "Failed to update budget. Please try again."
      );
    },
    // Khi action removeBudget thành công
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
    // Khi action removeBudget bị lỗi
    [removeBudget.rejected]: (state) => {
      showNotification(
        "error",
        "Error",
        "Failed to remove budget. Please try again."
      );
    },
    // Khi action fetchBudget đang được thực thi
    [fetchBudget.pending]: (state) => {
      state.fetchBudgetInProcess = true; // Đặt trạng thái đang xử lý
    },
    // Khi action fetchBudget thành công
    [fetchBudget.fulfilled]: (state, action) => {
      state.fetchBudgetInProcess = false;
      if (action.payload?.message === "success") {
        state.budgetList = action.payload.data || [];
        console.log("Budget fetched:", state.budgetList); // In ra danh sách ngân sách đã lấy
      } else {
        showNotification(
          "error",
          "Error",
          action.payload?.message || "Failed to fetch budgets"
        );
      }
    },
    // Khi action fetchBudget bị lỗi
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

// Export các hành động và reducer
export const { showBudgetForm, closeBudgetForm } = budgetSlice.actions;

export default budgetSlice;
