import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const ConstructionNavbar = () => {
    const location = useLocation();
        const [WC, setWC] = useState('');
        const [loading, setLoading] = useState(false);
        useEffect(() => {
            setLoading(true);
            fetch('https://active-interior-f9hq.onrender.com/work_category').then(res => res.json()).then(data => {
                setWC(data.work_categories[0]);
            })
            setLoading(false);
        }, [])
    return (
        <div className='flex gap-5 text-xl justify-center items-center px-5 h-[10vh]'>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/'}>Home</NavLink>
            <NavLink className={({ isActive }) => isActive || location.pathname?.includes('staffs') ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={`/construction/staffs/all_staffs/${WC}`}>Staffs</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/projects'}>Projects</NavLink>
            <NavLink className={({ isActive }) => isActive || location.pathname.includes('accounts') ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/accounts/dashboard'}>Accounts</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/settings'}>Settings</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'}>Login</NavLink>
        </div>
    );
};

export default ConstructionNavbar;