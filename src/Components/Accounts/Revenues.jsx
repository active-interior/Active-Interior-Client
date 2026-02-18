import React, { useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Revenues = () => {
    const [loading, setLoading] = useState(false);
    const [revenues, setRevenues] = useState([]);
    const [tab, setTab] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch(`https://active-interior-f9hq.onrender.com/revenues`)
            .then(res => res.json())
            .then(data => {
                setRevenues(data[0]);
                setLoading(false);
            })
    }, [])
    return (
        <div className='h-full'>
            <div className={`${loading ? 'flex' : 'hidden'} items-center justify-center w-full h-full`}>
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#ffbf00"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
            <div className={`${loading ? 'hidden' : ''} p-7`}>
                <h1 className='text-2xl text-center text-[#FFBF00]'>ALL REVENUES TRANSACTIONS</h1>

                <div className="flex gap-5 overflow-x-auto mb-4 px-2 pb-2 mt-5">
                    <NavLink to={`/construction/accounts/revenues/project_payment`} onClick={() => { setTab('Project Payment') }} className={({ isActive }) => isActive || (tab === 'Project Payment') ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>Project Payment</NavLink>
                    <NavLink to={`/construction/accounts/revenues/loan`} onClick={() => { setTab('From Loans') }} className={({ isActive }) => isActive || (tab === 'From Loans') ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>From Loans</NavLink>
                    <NavLink to={`/construction/accounts/revenues/personal_investments`} onClick={() => { setTab('Personal Investments') }} className={({ isActive }) => isActive || (tab === 'Personal Investments') ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>Personal Investments</NavLink>
                    <NavLink to={`/construction/accounts/revenues/others`} onClick={() => { setTab('From Others') }} className={({ isActive }) => isActive || (tab === 'From Others') ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>From Others</NavLink>
                </div>


                <div className={`${loading ? 'hidden' : ''} h-full`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div >
    );
};

export default Revenues;