import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const Projects_Construction = () => {
    const location = useLocation();
    return (
        <div className='grid grid-cols-12 gap-5 h-[85vh]'>
            <div className='flex flex-col shadow-lg shadow-amber-400 col-span-2 rounded-2xl overflow-scroll scrollbar-handle'>
                {/* <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/'}>Home</NavLink> */}
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive && location?.pathname === '/construction/projects' ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/projects'}>All Projects</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/projects/create_new_project'}>Create New Project</NavLink>
                </div>
                
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/projects/running_projects'}>Running Projects</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/projects/completed_projects'}>Completed Projects</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/projects/change_projects_status'}>Change Projects Status</NavLink>
                </div>
                {/* <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/projects/edit_projects_data'}>Edit Projects Data</NavLink>
                </div> */}
                {/* <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/staffs/staffs_transections'}>Staffs transections</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/staffs/staffs_status'}>Staffs Status</NavLink>
                </div>
                <div className='py-7 shadow-md shadow-amber-400 text-center text-lg'>
                    <NavLink className={({ isActive }) => isActive ? 'text-[#FFBF00]' : 'hover:text-[#FFBF00] duration-300'} to={'/construction/staffs/edit_staffs_data'}>Edit Staffs Data</NavLink>
                </div> */}
            </div>
            <div className='col-span-10 shadow-lg shadow-amber-400 px-5 rounded-2xl overflow-y-scroll scrollbar-handle'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Projects_Construction;