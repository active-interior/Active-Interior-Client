import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Accounts = () => {
    return (
        <div className='grid grid-cols-12 gap-5 h-[85vh]'>
            <div className='flex flex-col shadow-lg shadow-amber-400 col-span-2 rounded-2xl overflow-scroll scrollbar-handle'>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/accounts/dashboard'}>Accounts</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/accounts/create_new_voucher'}>Create New Voucher</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/accounts/cash_in/project'}>Cash In</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/accounts/cash_out'}>Cash Out</NavLink>
                </div>
            </div>
            <div className='col-span-10 shadow-lg shadow-amber-400 px-5 rounded-2xl overflow-y-scroll scrollbar-handle h-full'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Accounts;