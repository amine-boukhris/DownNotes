import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { loginUser, registerUser, logoutUser } from "../api/authApi";

interface AuthContextType {
  user: { id: string; email: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check for existing token on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Verify token and fetch user data
      setToken(storedToken);
      // You might want to add an API call to validate token
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem("token", response.token);
  };

  const register = async (email: string, password: string) => {
    const response = await registerUser(email, password);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem("token", response.token);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
