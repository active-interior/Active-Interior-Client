import React, { useEffect, useRef, useState } from 'react';
import { Watch } from 'react-loader-spinner';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditProjectsDataConstruction = () => {
    const [loading, setLoading] = useState(false);
    const [projectsData, setProjectsData] = useState([]);
    const testref = useRef();
    const navigate = useNavigate();
    const locaiton = useLocation();
    const [reload, setReload] = useState(false);
    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3000/construction_projects`).then(res => res.json()).then(data => {
            setProjectsData(data);
            setLoading(false)
        })
    }, [reload])
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/construction_projects/${id}`, {
                    method: 'DELETE'
                }).then(res => res.json()).then(data => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    }).then(() => {
                        setReload(!reload);
                    })
                })
            }
        })
    }
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
                    projectsData.map((project, index) =>
                        <div key={index}>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl py-2 shadow-md shadow-[#FFBF00] w-full flex items-center justify-between gap-7 cursor-pointer'>
                                <h1>{project.project_name}</h1>
                                <div className='flex items-center gap-5'>
                                    <Link to={`/construction/projects/edit_projects_data/${project._id}`} className='border-2 border-[#FFBF00] px-8 py-2 rounded-full hover:text-[#FFBF00] hover:border-white duration-200'>Edit</Link>
                                    <button onClick={() => { handleDelete(project._id) }} className='border-2 border-[#FFBF00] px-8 py-2 rounded-full hover:text-[#FFBF00] hover:border-white duration-200'>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default EditProjectsDataConstruction;