import React from 'react';
import { NavLink } from 'react-router-dom';

const InteriorNavbar = () => {
    return (
        <div className='flex gap-5 text-xl justify-center items-center px-5 h-[10vh]'>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/'}>Home</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/interior/staffs'}>Staffs</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/interior/projects'}>Projects</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/interior/accounts'}>Accounts</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/interior/settings'}>Settings</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'}>Login</NavLink>
        </div>
    );
};

export default InteriorNavbar;