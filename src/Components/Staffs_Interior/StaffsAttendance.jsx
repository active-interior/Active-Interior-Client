import React, { useRef, useState } from 'react';

const StaffsAttendanceInterior = () => {
    const [modal, setModal] = useState(false)
    const testref = useRef();
    const staffData = [
        {
            name: 'Staff A'
        },
        {
            name: 'Staff B'
        },
        {
            name: 'Staff C'
        },
        {
            name: 'Staff D'
        },
        {
            name: 'Staff E'
        },
        {
            name: 'Staff F'
        }
    ]
    const ProjectData = [
        {
            name: 'Project A'
        },
        {
            name: 'Project B'
        },
        {
            name: 'Project C'
        },
        {
            name: 'Project D'
        },
        {
            name: 'Project E'
        },
        {
            name: 'Project F'
        }
    ]

    return (
        <div className='p-7 h-full relative'>
            <h1 className='text-2xl text-center text-[#FFBF00]'>STAFFS ATTENDANCE</h1>
            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                    <input ref={testref} type="text" className='outline-none w-full' />
                    <button className='border-l border-[#FFBF00] px-7 cursor-pointer'>Search</button>
                </div>
            </div>
            <div className={`w-full ${modal ? 'flex' : 'hidden'} items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                <div className='w-[50%] p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433]'>
                    <h1 className='text-2xl text-center text-[#FFBF00]'>THIS WORKER WILL WORK IN</h1>
                    <div className='h-60 overflow-y-scroll grid gap-5 mt-5'>
                        {
                            ProjectData.map(project =>
                                <div>
                                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                        <h1 className='text-center w-full'>{project.name}</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-5 mt-8'>
                {
                    staffData.map(staff =>
                        <div>
                            <div onClick={()=> {setModal(!modal)} } className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                <h1>{staff.name}</h1>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default StaffsAttendanceInterior;