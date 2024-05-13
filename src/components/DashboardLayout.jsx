import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    const [open, setOpen] = useState(false);
    const handleBlur = () => {
        // Delay closing the dropdown to allow time for the click event to trigger
        setTimeout(() => {
            setOpen(false);
        }, 100);
    };

    return (
        <section className="pt-40 md:pt-32 w-full bg-gray-100">
            <div className="container px-5 md:max-w-2xl bg-transparent mt-7 mx-auto flex justify-center items-center  md:h-12">
                <div className="hidden md:block border border-gray-100 h-11" style={{
                    flex: "none",
                    width: "0",
                    borderTop: "22px solid transparent",
                    borderBottom: "22px solid transparent",
                    borderRight: "48px solid white"
                }}>
                </div>
                <div className="w-full text-lg flex justify-center items-center kotta-one-regular border-y-2 border-gray-100 md:bg-white grow h-full">
                    <div className="w-full px-4">
                        <div className="flex md:items-center md:justify-center justify-between flex-col w-full md:flex-row md:w-auto" id="navbar-sticky">
                            <ul className="hidden md:flex p-4 md:p-0 mt-4  text-sm font-semibold border text-gray-800 border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <NavLink to="/dashboard" activeclassname="active" className="block py-2 px-3 rounded md:hover:text-blue-700" aria-current="page">Account Overview</NavLink>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:text-blue-700">My Events</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:text-blue-700">Services</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:text-blue-700">Contact</a>
                                </li>
                            </ul>
                            <div className='md:hidden flex justify-end  w-full'>
                                <button className="md:hidden rounded-full p-2 bg-white shadow-lg focus:outline-none focus:shadow-outline" onClick={() => setOpen(prev => prev = !prev)} onBlur={handleBlur}>
                                    <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                        <path style={{ display: !open ? 'block' : 'none' }} fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                        <path style={{ display: open ? 'block' : 'none' }} fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                            <nav className={`flex-col ${open ? 'flex' : 'hidden'} pb-4 md:pb-0 md:hidden bg-white`}>
                                {/* <a className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Blog</a> */}
                                <NavLink activeclassname="active" className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" to="/dashboard">Home</NavLink>
                                <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Services</a>
                                <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Contact</a>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block border border-gray-100 h-11" style={{
                    flex: "none",
                    width: "0",
                    borderTop: "22px solid transparent",
                    borderBottom: "22px solid transparent",
                    borderLeft: "48px solid white"
                }}>
                </div>
            </div>
            <Outlet />
        </section>

    )
}

export default DashboardLayout
