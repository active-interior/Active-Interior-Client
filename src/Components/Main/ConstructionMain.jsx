import React from 'react';
import ConstructionNavbar from '../Navbar/ConstructionNavbar';
import { Outlet } from 'react-router-dom';

const ConstructionMain = () => {
    return (
        <div className='main_container px-5'>
            <ConstructionNavbar></ConstructionNavbar>
            <Outlet></Outlet>
        </div>
    );
};

export default ConstructionMain;