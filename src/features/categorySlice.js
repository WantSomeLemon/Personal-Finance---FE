import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCategory, getCategory } from "../api/categoryService";
import { notifications } from "@mantine/notifications";
import { ReactComponent as SuccessIcon } from "../assets/success-icon.svg";

// Async thunk to add a category
export const addCategory = createAsyncThunk('category/addCategory', async (body) => {
  try {
    // API call to create a category
    const res = await createCategory(body.token, body.name, body.description, body.type);
    return res.data;
  } catch (err) {
    // Log and return the error response if it fails
    console.error("Error adding category:", err);
    return err.response?.data || { message: "Unknown error occurred" };
  }
});

// Async thunk to fetch categories
export const fetchCategory = createAsyncThunk('category/fetchCategory', async (body) => {
  try {
    // API call to fetch categories
    const res = await getCategory(body.token);
    return res.data;
  } catch (err) {
    // Log and return the error response if it fails
    console.error("Error fetching categories:", err);
    return err.response?.data || { message: "Unknown error occurred" };
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    displayCategoryForm: false,
    addCategoryInProcess: false,
    fetchCategoryInProcess: false,
    categoryList: [],
  },
  reducers: {
    // Action to show category form
    showCategoryForm: (state) => {
      state.displayCategoryForm = true;
    },
    // Action to close category form
    closeCategoryForm: (state) => {
      state.displayCategoryForm = false;
    },
  },
  extraReducers: {
    // When addCategory is pending (before API call)
    [addCategory.pending]: (state) => {
      state.addCategoryInProcess = true;
      console.log("Adding category - pending");
    },
    // When addCategory is successful (API call succeeded)
    [addCategory.fulfilled]: (state, action) => {
      if (action.payload.message === "success") {
        // Show success notification if category is added successfully
        notifications.show({
          title: 'Category Added',
          message: 'Your category was added successfully!',
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
      } else {
        // Show error notification if there was an issue
        notifications.show({
          title: action.payload.message,
          message: 'Please try again!',
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      }
      state.addCategoryInProcess = false;
      state.displayCategoryForm = false;
    },
    // When addCategory fails (API call failed)
    [addCategory.rejected]: (state) => {
      state.addCategoryInProcess = false;
      // Show error notification for failed category creation
      notifications.show({
        title: "Category Creation Failed",
        message: 'Please try again!',
        radius: "lg",
        color: "red",
        autoClose: 5000,
      });
    },
    // When fetchCategory is pending (before API call)
    [fetchCategory.pending]: (state) => {
      state.fetchCategoryInProcess = true;
      console.log("Fetching categories - pending");
    },
    // When fetchCategory is successful (API call succeeded)
    [fetchCategory.fulfilled]: (state, action) => {
      if (action.payload.message === "success") {
        state.categoryList = action.payload.data || [];
        console.log("Categories fetched:", state.categoryList);
      } else {
        console.error("Failed to fetch categories:", action.payload.message);
      }
      state.fetchCategoryInProcess = false;
    },
    // When fetchCategory fails (API call failed)
    [fetchCategory.rejected]: (state) => {
      state.fetchCategoryInProcess = false;
      console.error("Category fetch failed");
      // Show notification for failed category fetch
      notifications.show({
        title: "Fetch Categories Failed",
        message: 'Please try again!',
        radius: "lg",
        color: "red",
        autoClose: 5000,
      });
    },
  },
});

// Export actions
export const { showCategoryForm, closeCategoryForm } = categorySlice.actions;

export default categorySlice;
