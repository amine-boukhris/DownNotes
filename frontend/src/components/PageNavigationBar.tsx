import {Link, NavLink} from "react-router";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {pageNavigationBarLinks} from "@/lib/constants.ts";

export default function PageNavigationBar() {
  return <div
      className='sticky mb-4 top-0 left-0 right-0 z-10 bg-secondary py-3 px-4 flex items-center justify-between'>
    <div className='flex gap-6 items-center'>
      <Link to={'/'}><h1 className={'text-xl'}>DownNotes</h1></Link>
      <div className='flex gap-2.5 items-center'>
        {pageNavigationBarLinks.map((link, index) => (<NavLink key={index} to={link.link}
                                                               className={({isActive}) => isActive ? 'underline' : ''}>/{link.label}</NavLink>))}
      </div>
    </div>
    <ModeToggle/>
  </div>
}