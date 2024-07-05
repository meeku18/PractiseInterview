"use client";
import React, { useState } from 'react';
import Logo from './Logo';
import { UserButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

function Header() {
  const path = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (url: string) => {
    router.push(url);
    setIsMobileMenuOpen(false); // Close the mobile menu after navigation
  };

  return (
    <div className="flex justify-between bg-secondary shadow-md p-2 px-4 items-center">
      <div>
        <Logo />
      </div>
      <div className="flex gap-10 items-center hidden md:flex mr-20 text-md">
        <div
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
          ${path === '/dashboard' && 'text-primary font-bold'}`}
          onClick={() => handleNavigation('/dashboard')}
        >
          Dashboard
        </div>
        <div
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
          ${path === '/dashboard/interviewBitQues' && 'text-primary font-bold'}`}
          onClick={() => handleNavigation('/dashboard/interviewBitQues')}
        >
          InterviewBitQues
        </div>
        <div
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
          ${path === '/dashboard/works' && 'text-primary font-bold'}`}
          onClick={() => handleNavigation('/dashboard/works')}
        >
          How it Works?
        </div>
      </div>
      <div className="flex items-center md:hidden">
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 cursor-pointer" onClick={toggleMobileMenu} />
        ) : (
          <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMobileMenu} />
        )}
      </div>
      <div className="hidden md:block">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 md:hidden">
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4 w-3/4">
            <div
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
              ${path === '/dashboard' && 'text-primary font-bold'}`}
              onClick={() => handleNavigation('/dashboard')}
            >
              Dashboard
            </div>
            <div
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
              ${path === '/dashboard/interviewBitQues' && 'text-primary font-bold'}`}
              onClick={() => handleNavigation('/dashboard/interviewBitQues')}
            >
              InterviewBitQues
            </div>
            <div
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
              ${path === '/dashboard/works' && 'text-primary font-bold'}`}
              onClick={() => handleNavigation('/dashboard/works')}
            >
              How it Works?
            </div>
            <div className="mt-4">
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
