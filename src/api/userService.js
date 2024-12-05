import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl } from "./config";

// Create Account Service - chuyển đổi các giá trị sang lowercase trước khi gửi
export async function createAccountService(
  firstName,
  lastName,
  email,
  password
) {
  return await axios.post(`${baseUrl}/auth/register`, {
    first_name: firstName.toLowerCase(),
    last_name: lastName.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });
}

// Login Account Service - chuyển đổi email sang lowercase
export async function loginAccountService(email, password) {
  return await axios.post(`${baseUrl}/auth/login`, {
    email: email.toLowerCase(),
    password,
  });
}

// Validate Token Service
export async function validateTokenService() {
  const localToken = localStorage.getItem("token");
  return await axios.get(`${baseUrl}/auth/validateToken`, {
    headers: { Authorization: `Bearer ${localToken}` },
  });
}

// Send Verification Security Code (Email) - chuyển đổi email sang lowercase
export async function sendVerificationSecurityCode(email) {
  return await axios.post(
    `${baseUrl}/auth/send-verification-email?email=${email.toLowerCase()}`
  );
}

// Send Verification Security Code for Forgot Password (Email) - chuyển đổi email sang lowercase
export async function sendVerificationSecurityCodeForFP(email) {
  return await axios.post(
    `${baseUrl}/auth/forgot-password/send-verification-email?email=${email.toLowerCase()}`
  );
}

// Reset Password - chuyển đổi email sang lowercase
export async function resetPassword(email, password) {
  return await axios.put(
    `${baseUrl}/auth/new-password?email=${email.toLowerCase()}&password=${password}`
  );
}

// Verify Security Code (Email) - chuyển đổi email sang lowercase
export async function verifySecurityCode(email, otp) {
  return await axios.post(
    `${baseUrl}/auth/verify-security-code?email=${email.toLowerCase()}&otp=${otp}`
  );
}

// Edit Name - chuyển đổi tên và họ sang lowercase trước khi gửi
export async function editNameService(firstName, lastName) {
  const localToken = localStorage.getItem("token");

  return await axios.post(
    `${baseUrl}/profile/name`,
    {
      first_name: firstName.toLowerCase(),
      last_name: lastName.toLowerCase(),
    },
    {
      headers: { Authorization: `Bearer ${localToken}` },
    }
  );
}

// Edit Email - chuyển đổi email sang lowercase
export async function editEmailService(inemail) {
  const localToken = localStorage.getItem("token");

  return await axios.post(
    `${baseUrl}/profile/email`,
    {
      email: inemail.toLowerCase(),
    },
    {
      headers: { Authorization: `Bearer ${localToken}` },
    }
  );
}

// Edit Password
export async function editPasswordService(oldPassword, password) {
  const localToken = localStorage.getItem("token");

  return await axios.put(
    `${baseUrl}/profile/password`,
    {
      oldPassword,
      password,
    },
    {
      headers: { Authorization: `Bearer ${localToken}` },
    }
  );
}

// Edit Image
export async function editImageService(image) {
  const localToken = localStorage.getItem("token");

  return await axios.post(
    `${baseUrl}/profile/image`,
    {
      image,
    },
    {
      headers: {
        Authorization: `Bearer ${localToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

// Redux API for getting user details
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    // Query to get user details
    getUserDetails: build.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      transformResponse: (response) => {
        // Chuyển tất cả các trường trong response thành lowercase
        const normalizedResponse = {};
        Object.keys(response).forEach((key) => {
          normalizedResponse[key.toLowerCase()] = response[key];
        });
        return normalizedResponse;
      },
    }),
  }),
});

// Export React hook to use the `getUserDetails` endpoint
export const { useGetUserDetailsQuery } = authApi;
