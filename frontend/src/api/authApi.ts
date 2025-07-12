import type { User } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (email: string, password: string): Promise<User | undefined> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (email: string, password: string): Promise<User | undefined> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data.message);
  } catch (error) {
    console.error(error);
  }
};

export const fetchUser = async (): Promise<User | undefined> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data.message);

    return data.user;
  } catch (error) {
    console.error(error);
  }
};

export const refreshToken = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    console.log(data.message);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const fetchWithRefreshTry = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const response = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (response.status == 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      return fetch(input, {
        ...init,
        credentials: "include",
      });
    }
  }

  return response;
};
