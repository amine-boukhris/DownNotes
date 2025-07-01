import {Outlet} from "react-router";
import AuthNavigationBar from "@/components/AuthNavigationBar.tsx";

export default function AuthRoute() {
  return <div className='relative'>
    <AuthNavigationBar />
    <Outlet/>
  </div>
}