import { BrowserRouter, Routes, Route } from "react-router";
import { Home, Register, Login, Saves, Editor, PrivacyPolicy, TermsOfService } from "@/pages";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import AuthRoute from "@/pages/AuthRoute.tsx";
import PageRoute from "@/pages/PageRoute.tsx";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { fetchUser, refreshToken } from "./api/authApi";
import { useUserStore } from "./stores/userStore";

export default function App() {
  const { setUser } = useUserStore();

  useEffect(() => {
    const handleUser = async () => {
      const refreshed = await refreshToken();
      if (refreshed) {
        const user = await fetchUser();
        if (user) {
          setUser(user);
        }
      }
    };
    handleUser();
  }, []);

  return (
    <ThemeProvider defaultTheme={"light"} storageKey={"vite-ui-theme"}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageRoute />}>
            <Route index element={<Home />} />
            <Route path="/saves" element={<Saves />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Route>
          <Route path="/" element={<AuthRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
