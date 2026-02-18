import React, { useEffect, useRef, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

const AllStaffsConstruction = () => {
    const { category } = useParams();
    const [mainData, setMainData] = useState([])
    const [staffsData, setStaffsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const from = location?.state?.pathname;
    useEffect(() => {
        setLoading(true);
        fetch(`https://active-interior-f9hq.onrender.com/construction_staffs`).then(res => res.json()).then(data => {
            const filterdData = data.filter(s => s.work_category === category);
            setStaffsData(filterdData);
            setMainData(filterdData);
            setLoading(false);
        })
    }, [category]);
    const handleSearch = (e) => {
        console.log(e)
        const filterdData = mainData.filter(s => s.staff_name?.includes(e));
        setStaffsData(filterdData);
    }
    const searchRef = useRef();
    return (
        <div className='h-full'>
            <div className={`${loading ? 'flex' : 'hidden'} items-center justify-center flex-1`}>
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
            <div className={`${loading ? 'hidden' : ''}`}>
                <div className='flex flex-col items-start w-full gap-2 my-4'>
                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                        <input onChange={(e) => { handleSearch(e.target.value) }} ref={searchRef} placeholder='Search By Staffs Name' type="text" className='outline-none w-full' />
                        <button onClick={() => {searchRef.current.value = ''; handleSearch('')}} className='border-l border-[#FFBF00] px-7 cursor-pointer text-nowrap'>Clear Text</button>
                    </div>
                </div>
                {
                    <div className="grid grid-cols-2 gap-5">
                        {
                            staffsData.filter(s => s.work_category === category).map((staff, index) =>
                                <div key={index}>
                                    <div className='p-3 border-2 border-[#FFBF00] rounded-xl h-fit shadow-md shadow-[#FFBF00] w-full flex items-center justify-between cursor-pointer'>
                                        <h1>{staff.staff_name?.charAt(0).toUpperCase() + staff.staff_name.slice(1)}</h1>
                                        <Link to={`/construction/staffs/all_staffs/profile/${staff._id}`} state={{ pathname: location.pathname }} className='border-2 border-[#FFBF00] px-8 py-2 rounded-full hover:text-[#FFBF00] hover:border-white duration-200'>View Profile</Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }

            </div>
        </div>
    );
};

export default AllStaffsConstruction;