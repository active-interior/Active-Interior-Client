import React from 'react';
import Home from '../Home/Home';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Main = () => {
    return (
        <div className='main_container'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;