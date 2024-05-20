import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { set_Authentication } from "../redux/authentication/authenticationSlice";
import userimg from "../assets/images/user1.png";
import logo from "../assets/images/homePage/eventHubLogo.png"
import logo2 from "../assets/images/homePage/logo2.svg"
import "../assets/styles/customStyle.css"
import { toast } from 'react-toastify';
import { TInfo } from "./subFeatureComponents/Toastify";


function Header() {
  const authentication_user = useSelector((state) => state.authentication_user);
  const [open, setOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [isOpaque, setIsOpaque] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPath = useLocation()

  const logout = () => {
    localStorage.clear();
    dispatch(
      set_Authentication({
        name: null,
        isAuthenticated: false,
      })
    );
    navigate("/");
    // sessionStorage.clear()
    TInfo("You have logged out")
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsOpaque(scrollY !== 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  }, []);

  return (
    <>
      <nav className={`${isOpaque ? 'bg-gray-100 shadow-lg' : currentPath.pathname === '/' ? open? 'bg-gray-100' : 'bg-transparent' : 'bg-gray-100 shadow-lg'} fixed transition-all md:h-32 z-40 md:h-32 h-44 transition w-full lg:max-w-[1500px] text-gray-700 dark-mode:text-gray-200 `}>
        <div className={`w-full h-8 z-40 text-end bg-black ${authentication_user.isAuthenticated ? 'lg:py-1  text-gray-300' : 'lg:py-4'}`}>
          <span className="mr-8">{authentication_user.isAuthenticated && `Welcome ${authentication_user.name}`}</span></div>
        {/* <nav className={"bg-gray-100 fixed transition-opacity z-10 transition w-screen text-gray-700 dark-mode:text-gray-200 dark-mode:bg-gray-800"}> */}
        <div className="flex flex-col px-4 md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className=" p-4 flex flex-row items-center justify-between">
            <img className="w-64" src={`${isOpaque ? logo : currentPath.pathname === '/' ? open? logo : logo2 : logo}`} alt="" />
            <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline" onClick={() => setOpen(prev => prev = !prev)}>
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path style={{ display: !open ? 'block' : 'none' }} fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                <path style={{ display: open ? 'block' : 'none' }} fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>

          {/* search bar */}

          {/* <div className="max-w-screen mx-auto h-8 flex items-center justify-center"> */}

          <div className="mx-auto md:mx-0 w-1/2">
            <div className={`h-9 flex items-center ${isOpaque ? 'bg-gradient-to-r from-gray-800 to-gray-200' : currentPath.pathname === '/' ? open? 'bg-gradient-to-r from-gray-800 to-gray-200' : 'bg-transparent' : 'bg-gradient-to-r from-gray-800 to-gray-200'}  mx-4 relative rounded-md`}>
              <input type="text" placeholder="Search..." className={`${isOpaque ? 'border-gray-300 placeholder:text-slate-400' : currentPath.pathname === '/' ? open ? 'border-gray-300 placeholder:text-slate-400' :'border-2 border-white placeholder:text-white font-bold' : 'border-gray-300 placeholder:text-slate-400'} placeholder-middle focus:ring-1 bg-transparent rounded-md rounded-e-none focus:outline-0 h-9 pl-4 flex-1 w-full cursor-text text-white`} />
              <button className={`${isOpaque ? 'bg-gray-700' : currentPath.pathname === '/' ? open?'bg-gray-700' : 'bg-transparent border-2 border-s-0 border-white' : 'bg-gray-700'}  hover:bg-gray-200 hover:ring-2 text-white hover:text-black w-10 h-9 flex justify-center items-center rounded-s-none rounded-md`} type="button">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"
                  style=
                  {{
                    fill: "none",
                    height: "13px",
                    width: "13px",
                    stroke: "currentColor",
                    strokeWidth: "5.33333",
                    overflow: "visible"
                  }}
                >
                  <g fill="none">
                    <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                  </g>
                </svg>
              </button>
              {/* </div> */}
            </div>
          </div>
          {/* </div> */}
          <nav className={`${isOpaque ? 'bg-transparent' : currentPath.pathname === '/' ? open?'text-black' : 'text-white' : 'bg-transparent'} flex-col ${open ? 'flex bg-gray-100' : 'hidden'} pb-4 md:pb-0 md:flex md:justify-end md:items-center md:flex-row`}>
            {/* <a className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Blog</a> */}
            <NavLink exact='true' to={'/'} activeclassname="navlink-active" className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:m  l-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Home</NavLink>
            <NavLink  to={'event/venues'} activeclassname="navlink-active" className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:m  l-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Venues</NavLink>
            {/* <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Services</a> */}
            <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Contact</a>
            <div className="relative" onClick={() => setDropDownOpen((prev) => prev = !prev)}>
              <div className="flex flex-row gap-4 justify-between items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <div className="">
                  <img src={authentication_user.isAuthenticated ? authentication_user.profileImage ? authentication_user.profileImage : userimg : userimg} className="min-w-8 w-8
                   object-contain rounded-full" alt="" />
                </div>
                <div>
                  <svg fill="currentColor" viewBox="0 0 20 20" className={`${dropDownOpen ? 'rotate-180' : 'rotate-0'} inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1`}><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </div>
              </div>
              <div className={`absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 ${dropDownOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 py-2 text-black bg-white rounded-md shadow dark-mode:bg-gray-800">

                  <Link type="button" to={`${authentication_user.isAuthenticated ? "/dashboard" : "/register"}`} className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">{`${authentication_user.isAuthenticated ? "My Profle" : "Create an account"}`}</Link>
                  {authentication_user.isAuthenticated ? (
                    <Link type="button" onClick={logout} className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Logout</Link>
                  ) : (
                    <Link type="button" to="/login" className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Login</Link>
                  )
                  }
                </div>
              </div>
            </div>
          </nav>
        </div>



        {/* <div className="p-2 flex justify-center">
          <div className="">
            <input type="text" className="outline" />

          </div>

        </div> */}
      </nav>
    </>
  );
}

export default Header;