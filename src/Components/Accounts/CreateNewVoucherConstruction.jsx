import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const CreateNewVoucherConstruction = () => {
    const [tabs, setTabs] = useState('custom')
    return (
        <div className='p-7'>
            <div className='flex items-center gap-8'>
                <NavLink onClick={() => {setTabs('custom')}} className={tabs === 'custom' ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'} to={'/construction/accounts/create_new_voucher/'}>Custom Voucher</NavLink>
                <NavLink onClick={() => {setTabs('project')}} className={tabs === 'project' ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'} to={'/construction/accounts/create_new_voucher/projects_voucher'}>Projects Voucher</NavLink>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default CreateNewVoucherConstruction;