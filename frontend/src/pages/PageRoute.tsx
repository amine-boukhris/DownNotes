import {Outlet} from "react-router";
import PageNavigationBar from "@/components/PageNavigationBar.tsx";

export default function PageRoute() {
  return <div className='relative'>
    <PageNavigationBar />
    <Outlet/>
  </div>
}