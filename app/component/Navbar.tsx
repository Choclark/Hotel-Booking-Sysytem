"use client"
import { useState } from 'react'
import Link from 'next/link'
import { FaBars, FaCross, FaXing } from 'react-icons/fa'
const Navbar = () => {
    const [OpenNav,setOpenNav] =  useState(false)
  return (
    <div className="flex ">
        <div className="flex  md:hidden text-xl justify-between items-center w-full">
            {
                !OpenNav ? (
                    <FaBars  className='cursor-pointer' onClick={() => setOpenNav(!OpenNav)} color='#28a745'/>
                ):(
                    <FaXing className='cursor-pointer' onClick={() => setOpenNav(!OpenNav)} color='#28a745'/>
                )
            }
        </div>
        <nav className={`absolute  shadow-md ${OpenNav ? "block" : "hidden md:flex md:relative"} md:relative z-[998] md:h-full md:p-0 md:shadow-none md:w-fit md:top-0   shadow-gray-200 right-0 top-[5rem]  w-[35%] bg-white rounded-md `}>
            <ul className="flex md:h-full md:items-center md:w-full md:flex-row md:gap-1 lg:gap-3 flex-col mx-1 my-1 gap-2">
                <Link href={"/"}>
                    <li className="hover:bg-slate-200 md:hover:bg-white md:hover:text-green-300 pl-3 rounded-md   py-2">
                        Home
                    </li>
                </Link>
                <Link href={"/restaurant"}>
                        <li className="hover:bg-slate-200 md:hover:bg-white md:hover:text-green-300 pl-3 rounded-md   py-2">
                            Restaurant
                        </li>
                </Link>
                <Link href={"/best-deal"}>
                    <li className="hover:bg-slate-200 md:hover:bg-white md:hover:text-green-300 pl-3 rounded-md   py-2">
                        Best deals
                    </li>
                </Link>
                <Link href={"/faq"}>
                    <li className="hover:bg-slate-200 md:hover:bg-white md:hover:text-green-300 pl-3 rounded-md   py-2">
                        FAQ
                    </li>
                </Link>
            </ul>
          </nav>

    </div>
  )
}

export default Navbar