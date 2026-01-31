import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const StaffsConstruction = () => {
    return (
        <div className='grid grid-cols-12 gap-5 h-[85vh]'>
            <div className='flex flex-col shadow-lg shadow-amber-400 col-span-2 rounded-2xl overflow-scroll scrollbar-handle'>
                {/* <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/'}>Home</NavLink> */}
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/staffs'}>All Staffs</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/staffs/create_new_staffs'}>Create New Staff</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/staffs/staffs_attendance'}>Staffs Attendance</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/staffs/staffs_transections'}>Staffs transections</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/staffs/staffs_summary'}>Staffs Summary</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/staffs/staffs_status'}>Staffs Status</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/staffs/edit_staffs_data'}>Edit Staffs Data</NavLink>
                </div>
            </div>
            <div className='col-span-10 shadow-lg shadow-amber-400 px-5 rounded-2xl overflow-y-scroll scrollbar-handle'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default StaffsConstruction;