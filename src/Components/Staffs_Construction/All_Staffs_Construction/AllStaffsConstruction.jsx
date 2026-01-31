import React, { useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

const AllStaffsConstruction = () => {
    const { category } = useParams();
    const [staffsData, setStaffsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const from = location?.state?.pathname;
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/construction_staffs`).then(res => res.json()).then(data => {
            setStaffsData(data);
        }).then(() => {
            setLoading(false);
        })
    }, [])
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
                {
                    <div className="grid grid-cols-2 gap-5">
                        {
                            staffsData.filter(s => s.work_category === category).map((staff, index) =>
                                <div key={index}>
                                    <div className='p-3 border-2 border-[#FFBF00] rounded-xl h-fit shadow-md shadow-[#FFBF00] w-full flex items-center justify-between cursor-pointer'>
                                        <h1>{staff.staff_name.charAt(0).toUpperCase() + staff.staff_name.slice(1)}</h1>
                                        <Link to={`/construction/staffs/profile/${staff._id}`} state={{pathname: location.pathname}} className='border-2 border-[#FFBF00] px-8 py-2 rounded-full hover:text-[#FFBF00] hover:border-white duration-200'>View Profile</Link>
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