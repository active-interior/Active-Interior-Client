import React, { useRef } from 'react';

const CreateNewStaffsInterior = () => {

    const testref = useRef();

    return (
        <div className='p-7'>
            <h1 className='text-2xl text-center text-[#FFBF00]'>CREATE A NEW STAFF</h1>
            <div className='grid grid-cols-2 gap-x-10 gap-y-5'>
                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                    <p className='text-[#FFBF00]'>Staff Name</p>
                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                        <input ref={testref} type="text" className='outline-none w-full' />
                    </div>
                </div>
                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                    <p className='text-[#FFBF00]'>Staff Phone Number</p>
                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                        <input ref={testref} type="text" className='outline-none w-full' />
                    </div>
                </div>
                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                    <p className='text-[#FFBF00]'>Address</p>
                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                        <input ref={testref} type="text" className='outline-none w-full' />
                    </div>
                </div>
                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                    <p className='text-[#FFBF00]'>Staff Catetgory</p>
                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                        <select name="staff_category" id="staff_category" className='outline-none w-full bg-[#0E2433] rounded-xl'>
                            <option value="Worker type 1" className=''>Worker type 1</option>
                            <option value="Worker type 2">Worker type 2</option>
                            <option value="Worker type 3">Worker type 3</option>
                            <option value="Worker type 4">Worker type 4</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                    <p className='text-[#FFBF00]'>NID Number</p>
                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                        <input ref={testref} type="text" className='outline-none w-full' />
                    </div>
                </div>
                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                    <p className='text-[#FFBF00]'>Emergency Contact</p>
                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                        <input ref={testref} type="text" className='outline-none w-full' />
                    </div>
                </div>
                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                    <p className='text-[#FFBF00]'>Blood Group</p>
                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                        <input ref={testref} type="text" className='outline-none w-full' />
                    </div>
                </div>
                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                    <p className='text-[#FFBF00]'>Reference</p>
                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                        <input ref={testref} type="text" className='outline-none w-full' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewStaffsInterior;