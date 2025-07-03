const API_URL = import.meta.env.VITE_API_URL;

interface AuthResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

export const registerUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
  });
};
