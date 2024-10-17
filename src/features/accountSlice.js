import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    showForm: false,
  },
  reducers: {
    showAccountForm: (state) => {
      state.showForm = true;
    },
    // Thêm các reducer khác nếu cần
  },
});

export const { showAccountForm } = accountSlice.actions;
export default accountSlice.reducer;
