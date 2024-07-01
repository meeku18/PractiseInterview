"use client"
import React from 'react'
import Logo from './Logo'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {

    const path = usePathname();

  return (
    <div className='flex justify-between bg-secondary shadow-md p-2 px-4 items-center'>
        <div>
            <Logo/>
        </div>
        <div className='flex gap-8 items-center hidden md:flex'>
            <div className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                ${path=='/dashboard' && "text-primary font-bold"}`}>DashBoard</div>
            <div className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                ${path=='/dashboard/questions' && "text-primary font-bold"}`}>Questions</div>
            <div className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                ${path=='/dashboard/upgrade' && "text-primary font-bold"}`}>Upgrade</div>
            <div className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
                ${path=='/dashboard/works' && "text-primary font-bold"}`}>How it Works?</div>
        </div>
        <div>
            <UserButton afterSignOutUrl='/sign-in'/>
        </div>
    </div>
  )
}

export default Header
