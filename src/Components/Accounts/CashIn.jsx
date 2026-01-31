import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const CashIn = () => {
    const [loading, setLoading] = useState(false);
    const [tabs, setTabs] = useState('project')


    return (
        <div className='pt-5 h-full'>
            <h1 className='text-xl text-[#FFBF00] text-center font-semibold'>Cash In</h1>
            <div className='flex items-center gap-8 mt-5'>
                <NavLink onClick={() => { setTabs('project') }} className={tabs === 'project' ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'} to={'/construction/accounts/cash_in/project'}>From Project</NavLink>
                <NavLink onClick={() => { setTabs('loan') }} className={tabs === 'loan' ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'} to={'/construction/accounts/cash_in/loan'}>From Loan</NavLink>
                <NavLink onClick={() => { setTabs('personal investment') }} className={tabs === 'personal investment' ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'} to={'/construction/accounts/cash_in/investment'}>From Personal Investment</NavLink>
                <NavLink onClick={() => { setTabs('others') }} className={tabs === 'others' ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'} to={'/construction/accounts/cash_in/others'}>From Others</NavLink>
            </div>
            <div className='h-full'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default CashIn;