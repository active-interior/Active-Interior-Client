import React, { useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Expenses = () => {
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
                    <NavLink to={`/construction/accounts/expenses/material_purchase`} onClick={() => { setTab('Material Purchase') }} className={({ isActive }) => isActive || (tab === 'Material Purchase') ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>Material Purchase</NavLink>

                    <NavLink to={`/construction/accounts/expenses/payback_loans`} onClick={() => { setTab('Payback Loan') }} className={({ isActive }) => isActive || (tab === 'Payback Loan') ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>Payback Loan</NavLink>

                    <NavLink to={`/construction/accounts/expenses/office_expenses`} onClick={() => { setTab('Office Expense') }} className={({ isActive }) => isActive || (tab === 'Office Expense') ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>Office Expense</NavLink>

                    <NavLink to={`/construction/accounts/expenses/personal_expenses`} onClick={() => { setTab('Personal Expense') }} className={({ isActive }) => isActive || (tab === 'Personal Expense') ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>Personal Expense</NavLink>

                    <NavLink to={`/construction/accounts/expenses/others`} onClick={() => { setTab('To Others') }} className={({ isActive }) => isActive || (tab === 'To Others') ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>To Others</NavLink>
                </div>


                <div className={`${loading ? 'hidden' : ''} h-full`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div >
    );
};

export default Expenses;