import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { postApi } from "./baseApi";

export async function registerApi(formData) {
  return postApi(`${BASE_PATH}/auth/local/register`, formData);
}

export async function loginApi(formData) {
  return postApi(`${BASE_PATH}/auth/local`, formData);
}

export async function resetPasswordApi(email) {
  return postApi(`${BASE_PATH}/auth/forgot-password`, {
    email,
  });
}

export async function getMeApi(logout) {
  const result = await authFetch(`${BASE_PATH}/users/me`, null, logout);
  return result ? result : null;
}

export async function updateNameApi(formData, id, logout) {
  const result = await authFetch(
    `${BASE_PATH}/users/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
    logout
  );
  return result ? result : null;
}
