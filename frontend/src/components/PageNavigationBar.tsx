import { Link, NavLink, useNavigate } from "react-router";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { pageNavigationBarLinks } from "@/lib/constants.ts";
import { useUserStore } from "@/stores/userStore";
import { Button } from "./ui/button";
import { logoutUser } from "@/api/authApi";

export default function PageNavigationBar() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const handleLogout = async () => {
    await logoutUser();
    logout();
    navigate("/");
  };

  return (
    <div className="sticky mb-4 top-0 left-0 right-0 z-10 bg-secondary py-3 px-4 flex items-center justify-between">
      <div className="flex gap-6 items-center">
        <Link to={"/"}>
          <h1 className={"text-xl"}>DownNotes</h1>
        </Link>
        <div className="flex gap-2.5 items-center">
          {pageNavigationBarLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.link}
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              /{link.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Button onClick={handleLogout} variant={'outline'}>Logout</Button>
            <Button asChild>
              <Link to={"/saves"}>Profile</Link>
            </Button>
          </>
        ) : (
          <Button asChild>
            <Link to={"/login"}>Login</Link>
          </Button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}
