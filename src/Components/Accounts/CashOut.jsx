import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const CashOut = () => {
    const [loading, setLoading] = useState(false);
    const [tabs, setTabs] = useState('')
    const location = useLocation();
    return (
        <div className='pt-5 h-full'>
            <h1 className='text-xl text-[#FFBF00] text-center font-semibold'>Cash Out</h1>
            <div className='flex items-center gap-8 mt-5 px-7'>
                <NavLink onClick={() => { setTabs('project') }} className={({ isActive }) => isActive && location.pathname === '/construction/accounts/cash_out' ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'} to={'/construction/accounts/cash_out'}>Material Purchase</NavLink>
                <NavLink onClick={() => { setTabs('loan') }} className={({ isActive }) => isActive ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'} to={'/construction/accounts/cash_out/payback_loan'}>Payback Loan</NavLink>
                <NavLink onClick={() => { setTabs('personal investment') }} className={({ isActive }) => isActive ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'} to={'/construction/accounts/cash_out/office_expenses'}>Office Expenses</NavLink>
                <NavLink onClick={() => { setTabs('others') }} className={({ isActive }) => isActive ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'} to={'/construction/accounts/cash_out/personal_expenses'}>Personal Expenses</NavLink>
                <NavLink onClick={() => { setTabs('others') }} className={({ isActive }) => isActive ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'} to={'/construction/accounts/cash_out/others'}>To Others</NavLink>
            </div>
            <div className='h-full'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default CashOut;