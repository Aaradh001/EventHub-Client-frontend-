import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userimg from "../assets/images/user1.png";
import logo2 from "../assets/images/homePage/logo2.svg"
import { toast } from 'react-toastify';


function LoginHeader() {
    const authentication_user = useSelector((state) => state.authentication_user);
    const [open, setOpen] = useState(false);
    const [dropDownOpen, setDropDownOpen] = useState(false);

    return (
        <>
            <nav className="bg-black transition-all  w-full text-gray-700 dark-mode:text-gray-200 ">
                {/* <nav className={"bg-gray-100 fixed transition-opacity z-10 transition w-screen text-gray-700 dark-mode:text-gray-200 dark-mode:bg-gray-800"}> */}
                <div className="max-w-7xl flex flex-col px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                    <div className=" p-4 flex flex-row items-center justify-between">
                        <img className="w-64" src={logo2} alt="" />
                        <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline" onClick={() => setOpen(prev => prev = !prev)}>
                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                <path style={{ display: !open ? 'block' : 'none' }} fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                <path style={{ display: open ? 'block' : 'none' }} fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>

                    <nav className={`text-white flex-col ${open ? 'flex' : 'hidden'} pb-4 md:pb-0 md:flex md:justify-end md:items-center md:flex-row`}>
                        <Link className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" to="/">Home</Link>
                        <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Services</a>
                        <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Contact</a>
                    </nav>
                </div>
            </nav>
        </>
    );
}

export default LoginHeader;