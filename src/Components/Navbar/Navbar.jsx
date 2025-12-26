import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex gap-5 text-xl justify-center items-center px-5 h-[10vh]'>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/'}>Home</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/staffs'}>Staffs</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/projects'}>Projects</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/accounts'}>Accounts</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/settings'}>Settings</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'}>Login</NavLink>
        </div>
    );
};

export default Navbar;