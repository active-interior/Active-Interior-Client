import React from 'react';
import InteriorNavbar from '../Navbar/InteriorNavbar';
import { Outlet } from 'react-router-dom';

const InteriorMain = () => {
    return (
        <div className='main_container px-5'>
            <InteriorNavbar></InteriorNavbar>
            <Outlet></Outlet>
        </div>
    );
};

export default InteriorMain;