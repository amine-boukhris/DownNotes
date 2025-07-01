import {Link} from "react-router";
import {ModeToggle} from "@/components/mode-toggle.tsx";

export default function AuthNavigationBar() {
  return <div className='fixed top-0 left-0 right-0 z-10 bg-secondary py-3 px-4 flex items-center justify-between'>
    <Link to={'/'}><h1 className={'text-xl'}>DownNotes</h1></Link>
    <ModeToggle />
  </div>
}