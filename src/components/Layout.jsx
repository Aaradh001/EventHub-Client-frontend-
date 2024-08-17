import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { useSelector } from 'react-redux';
import Loader from '../pages/common/Loader';

const Layout = () => {
    const authenticationUser = useSelector(state => state.authentication_user);
    return (
        <>
            {authenticationUser.loader ? <Loader /> : (
                <main>
                    <div className='w-full lg:max-w-[1500px] mx-auto'>
                        <Header />
                        {<Outlet />}
                        <Footer />
                    </div>
                </main>
            )}
        </>
    )
}

export default Layout
