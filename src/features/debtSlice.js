import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';
import { ReactComponent as SuccessIcon } from '../assets/success-icon.svg';

// Sample API functions for managing debts (replace with your actual implementation)
import { createDebt, updateDebt, deleteDebt, fetchDebts } from '../api/debtService';

export const addDebt = createAsyncThunk('debt/addDebt', async (body) => {
    return createDebt(body).then((res) => {
        return res.data;
    }).catch((err) => {
        return err.response.data;
    });
});

export const editDebt = createAsyncThunk('debt/editDebt', async (body) => {
    return updateDebt(body.id, body).then((res) => {
        return res.data;
    }).catch((err) => {
        return err.response.data;
    });
});

export const removeDebt = createAsyncThunk('debt/removeDebt', async (id) => {
    return deleteDebt(id).then((res) => {
        return res.data;
    }).catch((err) => {
        return err.response.data;
    });
});

export const fetchDebt = createAsyncThunk('debt/fetchDebt', async () => {
    return fetchDebts().then((res) => {
        return res.data;
    }).catch((err) => {
        return err.response.data;
    });
});

const debtSlice = createSlice({
    name: 'debt',
    initialState: {
        displayDebtForm: false,
        debtList: [],
        loading: false,
        error: null,
    },
    reducers: {
        showDebtForm: (state) => {
            state.displayDebtForm = true;
        },
        closeDebtForm: (state) => {
            state.displayDebtForm = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addDebt.pending, (state) => {
                state.loading = true;
            })
            .addCase(addDebt.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.message === 'success') {
                    notifications.show({
                        title: 'Debt Added',
                        message: 'Your debt has been added successfully!',
                        icon: <SuccessIcon />,
                        radius: 'lg',
                        autoClose: 5000,
                    });
                    state.debtList.push(action.payload.data);
                } else {
                    notifications.show({
                        title: action.payload?.message,
                        message: 'Please try again!',
                        radius: 'lg',
                        color: 'red',
                        autoClose: 5000,
                    });
                }
            })
            .addCase(addDebt.rejected, (state) => {
                state.loading = false;
                notifications.show({
                    title: 'Error',
                    message: 'Failed to add debt, please try again.',
                    color: 'red',
                    autoClose: 5000,
                });
            })
            .addCase(editDebt.pending, (state) => {
                state.loading = true;
            })
            .addCase(editDebt.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.debtList.findIndex((debt) => debt.id === action.payload.id);
                if (index !== -1) {
                    state.debtList[index] = action.payload.data; // Update the debt in the list
                    notifications.show({
                        title: 'Debt Updated',
                        message: 'Your debt has been updated successfully!',
                        icon: <SuccessIcon />,
                        radius: 'lg',
                        autoClose: 5000,
                    });
                }
            })
            .addCase(editDebt.rejected, (state) => {
                state.loading = false;
                notifications.show({
                    title: 'Error',
                    message: 'Failed to update debt, please try again.',
                    color: 'red',
                    autoClose: 5000,
                });
            })
            .addCase(removeDebt.fulfilled, (state, action) => {
                const index = state.debtList.findIndex((debt) => debt.id === action.payload.id);
                if (index !== -1) {
                    state.debtList.splice(index, 1); // Remove the debt from the list
                    notifications.show({
                        title: 'Debt Removed',
                        message: 'Your debt has been removed successfully!',
                        icon: <SuccessIcon />,
                        radius: 'lg',
                        autoClose: 5000,
                    });
                }
            })
            .addCase(fetchDebt.fulfilled, (state, action) => {
                state.debtList = action.payload.data; // Update the list of debts
            });
    },
});

export const { showDebtForm, closeDebtForm } = debtSlice.actions;
export default debtSlice.reducer;
