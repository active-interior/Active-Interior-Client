import React from 'react';
import {
    createBrowserRouter
} from "react-router-dom";
import Main from '../Main/Main';
import Home from '../Home/Home';
import Staffs from '../Staffs/Staffs';
import Projects from '../Projects/Projects';
import Accounts from '../Accounts/Accounts';
import Settings from '../Settings/Settings';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/staffs',
                element: <Staffs></Staffs>
            },
            {
                path: '/projects',
                element: <Projects></Projects>
            },
            {
                path: '/accounts',
                element: <Accounts></Accounts>
            },
            {
                path: '/settings',
                element: <Settings></Settings>
            }
        ]
    }
])

export default router;