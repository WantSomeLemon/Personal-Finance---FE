import { notifications } from "@mantine/notifications";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createAccountService,
  editEmailService,
  editImageService,
  editNameService,
  editPasswordService,
  loginAccountService,
  resetPassword,
  sendVerificationSecurityCode,
  sendVerificationSecurityCodeForFP,
  validateTokenService,
  verifySecurityCode,
} from "../api/userService";
import { ReactComponent as SuccessIcon } from "../assets/success-icon.svg";

// Async action to create an account
export const createAccount = createAsyncThunk(
  "user/createAccount",
  async (body) => {
    try {
      const response = await createAccountService(
        body.firstName,
        body.lastName,
        body.email,
        body.password
      );
      return response.data;
    } catch (error) {
      // Handle errors and return error data
      return error.response.data;
    }
  }
);

// Async action for login
export const loginAccount = createAsyncThunk(
  "user/loginAccount",
  async (body) => {
    try {
      const response = await loginAccountService(body.email, body.password);
      console.log(response);
      return response.data;
    } catch (error) {
      // Handle errors and return error data
      console.log(error.response.data);
      return error.response.data;
    }
  }
);

// Validate token for session validation
export const validateToken = createAsyncThunk(
  "user/validateToken",
  async (token) => {
    try {
      const response = await validateTokenService(token);
      console.log(response);
      return response.data;
    } catch (error) {
      // Handle errors
      console.log(error);
      return error.response.data;
    }
  }
);

// Send verification code for registration
export const sendVerificationCode = createAsyncThunk(
  "user/sendVerificationCode",
  async (body) => {
    try {
      const response = await sendVerificationSecurityCode(body.email);
      console.log(response);
      return response;
    } catch (error) {
      // Handle errors
      console.log(error);
      return error.response;
    }
  }
);

// Send verification code for forgotten password
export const sendVerificationCodeForFP = createAsyncThunk(
  "user/sendVerificationCodeForFP",
  async (body) => {
    try {
      const response = await sendVerificationSecurityCodeForFP(body.email);
      console.log(response);
      return response;
    } catch (error) {
      // Handle errors
      console.log(error);
      return error.response;
    }
  }
);

// Reset the password
export const newPassword = createAsyncThunk(
  "user/newPassword",
  async (body) => {
    try {
      const response = await resetPassword(body.email, body.password);
      console.log(response);
      return response;
    } catch (error) {
      // Handle errors
      console.log(error);
      return error.response;
    }
  }
);

// Verify the security code
export const verifyCode = createAsyncThunk("user/verifyCode", async (body) => {
  try {
    const response = await verifySecurityCode(body.email, body.otp);
    console.log(response);
    return response;
  } catch (error) {
    // Handle errors
    console.log(error);
    return error.response;
  }
});

// Edit user name
export const editName = createAsyncThunk("user/editName", async (body) => {
  try {
    const res = await editNameService(body.token, body.firstName, body.lastName);
    return res.data;
  } catch (err) {
    // Handle errors
    return err.response;
  }
});

// Edit user email
export const editEmail = createAsyncThunk("user/editEmail", async (body) => {
  try {
    const res = await editEmailService(body.token, body.email);
    return res.data;
  } catch (err) {
    // Handle errors
    return err.response.data;
  }
});

// Edit user password
export const editPassword = createAsyncThunk(
  "user/editPassword",
  async (body) => {
    try {
      const res = await editPasswordService(body.token, body.oldPassword, body.password);
      console.log(res.data);
      return res.data;
    } catch (err) {
      // Handle errors
      console.log(err.response.data.message);
      return err.response.data.message;
    }
  }
);

// Edit user profile image
export const editImage = createAsyncThunk("user/editImage", async (body) => {
  try {
    const res = await editImageService(body.token, body.image);
    console.log(res.data);
    return res.data;
  } catch (err) {
    // Handle errors
    console.log(err.response.data.message);
    return err.response.data.message;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      firstName: "",
      lastName: "",
      email: "",
      userId: "",
    },
    token: null,
    isMobile: false,
    displaySignupForm: false,
    displaySigninForm: false,
    displayForgotPasswordForm: false,
    signupInProgress: false,
    signinInProgress: false,
    displayUserDetailsForm: true,
    displayOtpForm: false,
    displayPasswordForm: false,
    displayMailForm: true,
    forgotPasswordInProgress: false,
    signupError: null,
    loginError: null,
  },
  reducers: {
    logoutAccount: (state) => {
      state.token = null;
      state.currentUser = {
        firstName: "",
        lastName: "",
        email: "",
        profileImage: "",
        userId: "",
      };
    },
    openSignupForm: (state) => {
      state.displaySignupForm = true;
      state.signupInProgress = false;
    },
    openSigninForm: (state) => {
      state.displaySigninForm = true;
      state.signinInProgress = false;
    },
    openForgotPasswordForm: (state) => {
      state.displaySigninForm = false;
      state.displayForgotPasswordForm = true;
      state.displayMailForm = true;
      state.displayOtpForm = false;
      state.displayPasswordForm = false;
    },
    closeForgotPasswordForm: (state) => {
      state.displayForgotPasswordForm = false;
    },
    closeSignupForm: (state) => {
      state.displaySignupForm = false;
      state.signupInProgress = false;
    },
    closeSigninForm: (state) => {
      state.displaySigninForm = false;
      state.signinInProgress = false;
    },
    changeIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setCredentials: (state, { payload }) => {
      state.token = payload;
    },
  },
  extraReducers: {
    // Handle all async actions with state changes
    [createAccount.pending]: (state) => {
      state.signupInProgress = true;
      console.log("pending");
    },
    [createAccount.fulfilled]: (state, action) => {
      state.signupInProgress = false;
      if (action.payload.message === "success") {
        state.displaySignupForm = false;
        state.displayUserDetailsForm = true;
        state.displayOtpForm = false;
        state.displayPasswordForm = false;
        console.log("Account Created");
        notifications.show({
          title: "Account Created Successfully",
          message: "Now you can login to your account with signin option",
          icon: <SuccessIcon />,
          radius: "lg",
          autoClose: 5000,
        });
      } else {
        console.log(action.payload);
        notifications.show({
          title: action.payload.message,
          message: "Please try again!!",
          radius: "lg",
          color: "red",
          autoClose: 5000,
        });
      }
      state.displaySignupForm = false;
    },
    [createAccount.rejected]: (state) => {
      state.signupInProgress = false;
      notifications.show({
        title: "Request Failed",
        message: "Please try again!!",
        radius: "lg",
        color: "red",
        autoClose: 5000,
      });
    },

    // Add other extra reducers as needed following the same pattern...
  },
});

export const {
  openSignupForm,
  openSigninForm,
  closeSignupForm,
  closeSigninForm,
  openForgotPasswordForm,
  closeForgotPasswordForm,
  changeIsMobile,
  setCredentials,
} = userSlice.actions;

export default userSlice.reducer;
