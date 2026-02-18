import React, { useEffect, useRef, useState } from 'react';
import { Watch } from 'react-loader-spinner';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CompletedProjectsConstruction = () => {
    const [loading, setLoading] = useState(false);
    const [projectsData, setProjectsData] = useState([]);
    const testref = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setLoading(true)
        fetch(`https://active-interior-f9hq.onrender.com/construction_projects`).then(res => res.json()).then(data => {
            setProjectsData(data);
            setLoading(false)
        })
    }, [])

    return (
        <div className='p-7 h-full relative flex flex-col'>
            <h1 className='text-2xl text-center text-[#FFBF00]'>ALL PROJECTS</h1>
            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                    <input ref={testref} type="text" className='outline-none w-full' />
                    <button className='border-l border-[#FFBF00] px-7 cursor-pointer'>Search</button>
                </div>
            </div>
            <div className={`${loading ? 'flex' : 'hidden'} items-center justify-center w-full flex-1`}>
                <Watch
                    visible={true}
                    height="80"
                    width="80"
                    radius="48"
                    color="#FFBF00"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
            <div className={`${loading ? 'hidden' : 'grid'} grid-cols-2 gap-5 mt-8`}>
                {
                    projectsData.filter(p => p.status === false).map((project, index) =>
                        <div key={index}>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl py-2 shadow-md shadow-[#FFBF00] w-full flex items-center justify-between gap-7 cursor-pointer'>
                                <h1>{project.project_name}</h1>
                                <Link to={`/construction/projects/view_project_details/${project._id}`} state={{ pathname: location.pathname }} className='border-2 border-[#FFBF00] px-8 py-2 rounded-full hover:text-[#FFBF00] hover:border-white duration-200'>View Details</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CompletedProjectsConstruction;