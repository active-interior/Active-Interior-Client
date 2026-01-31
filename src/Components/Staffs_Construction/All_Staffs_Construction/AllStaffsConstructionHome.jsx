import React, { useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const AllStaffsConstructionHome = () => {
    const [categories, setCategories] = useState([]);
    const [staffsData, setStaffsData] = useState([]);
    const [projectsData, setProjectsData] = useState([]);
    const [tab, setTab] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3000/work_category').then(res => res.json()).then(data => {
            setCategories(data.work_categories);
            if(!tab && location.pathname === '/construction/staffs') {
                setTab(data.work_categories[0])
            }
        }).then(() => {
            fetch(`http://localhost:3000/construction_staffs`).then(res => res.json()).then(data => {
                setStaffsData(data);
            }).then(() => {
                fetch(`http://localhost:3000/construction_projects`).then(res => res.json()).then(data => {
                    setProjectsData(data);
                }).then(() => {
                    setLoading(false)
                })
            })
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
                <h1 className='text-2xl text-center text-[#FFBF00]'>ALL STAFFS</h1>

                <div className="flex gap-5 overflow-x-auto mb-4 px-2 pb-2 mt-5">
                    {
                        categories.map((cat, index) => <NavLink key={index} to={`/construction/staffs/${cat}`} onClick={() => { setTab(cat) }} className={({ isActive }) => isActive || (tab === cat) ? 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>{cat}</NavLink>)
                    }
                </div>


                <div className={`${loading ? 'hidden' : ''} h-full`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AllStaffsConstructionHome;