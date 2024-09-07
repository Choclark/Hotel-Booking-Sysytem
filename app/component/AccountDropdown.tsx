"use client"
import { useState } from 'react';
import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { FaCalendarCheck, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useVirtualizerScrollInstance } from 'sanity';
const AccountDropdown = ({user}:{user:any}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(user)
  return (
    <div className="relative inline-block text-left">
      <div className=''>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex mt-2 justify-center w-full rounded-md   px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <div aria-label="avatar" className="flex mr-auto items-center space-x-4">
        <img
          src={user.picture}
          alt="avatar"
          className="w-12 h-12 shrink-0 rounded-full"
        />
        <div className="space-y-2 flex flex-col flex-1 truncate">
          <div className="font-medium relative text-md leading-tight text-gray-900">
            <span className="flex">
              <span className="truncate relative pr-8">
                {user.given_name} {user.family_name}
              </span>
            </span>
          </div>
          <p className="font-normal text-sm leading-tight text-gray-500 truncate">
            {user.email}
          </p>
        </div>
      </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right z-[999] md:mr-10 lg:mr-0 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <span className=" px-4 py-2 font-bold text-xl">My Account</span>
            <Link
              href="/"
              className="flex items-center justify-between px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex={-1}
            >
              <span>Homepage</span>
              <FaHome color='#28a745'/>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-between px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex={-1}
            >
              <span>My Bookings</span>
              <FaCalendarCheck color='#28a745'/>
            </Link>
            <LogoutLink
            className="flex items-center justify-between px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <span>Log out</span>
              <FaSignOutAlt color='#28a745'/>
            </LogoutLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
