"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { menuItems } from "../../config/navConfig";

const Navbar: FC = () => {
    const [open, setOpen] = useState(false);


    return (
        <>
            <div className="flex items-center  max-md:w-full  justify-between border-slate-700 px-6 py-4  text-black text-sm relative">
                <Link href="/" className="text-xl font-semibold text-black tracking-wide">Vynspire</Link>
                <div className="hidden md:flex gap-8 text-black font-bold text-lg ">
                    {menuItems.map((item) => (
                        <Link key={item.label} href={item.href} className="relative overflow-hidden h-6 group">
                            <span className="">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="hidden ml-14 md:flex items-center gap-4">
                    {/* {actionButtons.map((btn) => (
                    <button key={btn.label} className={btn.className}>{btn.label}</button>
                ))} */}
                </div>

                <button className="md:hidden text-gray-300" onClick={() => setOpen(!open)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {open && (
                    <div className="absolute top-15 -left-[5px] bg-black w-full flex flex-col bg-gradient-to-r from-blue-300 to-blue-100 items-center gap-4 py-4 text-base md:hidden">
                        {menuItems.map((item) => (
                            <Link key={item.label} href={item.href} className="hover:text-indigo-600">
                                {item.label}
                            </Link>
                        ))}


                        {/* {actionButtons.map((btn) => (
                        <button key={btn.label} className={btn.className}>{btn.label}</button>
                    ))} */}
                    </div>
                )}
            </div></>
    );
};


export default Navbar;