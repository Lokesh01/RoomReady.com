import { RegisterFormData } from "../pages/Register";
import { SignInFormData } from "../pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || ""; //* in production we don't need server base url bcoz everything is served from backend itself

export const registerAPI = async (FormData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include", //* ensures that the browser includes the necessary cookies with the request
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(FormData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signInAPI = async (FormData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(FormData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const validateTokenAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid!");
  }
  return response.json();
};

export const signOutAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error during sign out!");
};
