import React, { useEffect, useRef, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import Swal from 'sweetalert2';

const CreateNewStaffsConstruction = () => {
    const [loading, setLoading] = useState(false);
    const [WC, setWC] = useState([]);
    useEffect(() => {
        fetch('https://active-interior-f9hq.onrender.com/work_category')
            .then(res => res.json())
            .then(data => {
                setWC(data.work_categories);
            })
    }, [])
    const wcjoin = (WC.map(wc => wc.split(' ').join('_').toLowerCase()))
    console.log(wcjoin);
    const handleSubmit = () => {
        const staff_name = staffName.current.value;
        const staff_address = staffAddress.current.value;
        const staff_number = staffNumber.current.value;
        const work_category = workCategory.current.value;
        const staff_category = staffCategory.current.value;
        const staff_nid = staffNid.current.value;
        const staff_emergency = staffEmergecy.current.value;
        const staff_blood = staffBlood.current.value;
        const staff_salary = staffSalary.current.value * 1;
        const staff_working_details = [];
        const staff_transections = [];
        const staff_reference = staffReference.current.value;
        const due = 0;
        const income = 0;
        const withdraw = 0;
        const available_balance = 0;
        const weekly_info = [];
        const last_closing_date = "";
        const staffData = { staff_name, staff_address, staff_number, work_category, staff_category, staff_nid, staff_emergency, staff_blood, staff_salary, staff_working_details, staff_transections, staff_reference, due, income, withdraw, available_balance, weekly_info, last_closing_date }

        if (staff_salary === 0 || work_category === '') {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "You Did Not Enter Staff Salary or Work Category",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }
        else {
            setLoading(true);
            fetch(`https://active-interior-f9hq.onrender.com/construction_staffs`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(staffData)
            }).then(res => res.json()).then(data => {
                if (data.acknowledged) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Staff Create Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        setLoading(false)
                    })
                    staffName.current.value = '';
                    staffNumber.current.value = '';
                    staffAddress.current.value = '';
                    workCategory.current.value = '';
                    staffCategory.current.value = '';
                    staffNid.current.value = '';
                    staffEmergecy.current.value = '';
                    staffBlood.current.value = '';
                    staffSalary.current.value = '';
                    staffReference.current.value = '';
                }
            })
        }
    }

    const staffName = useRef();
    const staffNumber = useRef();
    const staffAddress = useRef();
    const workCategory = useRef();
    const staffCategory = useRef();
    const staffNid = useRef();
    const staffEmergecy = useRef();
    const staffBlood = useRef();
    const staffSalary = useRef();
    const staffReference = useRef();

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
            <div className={`p-7 ${loading ? 'hidden' : ''}`}>
                <h1 className='text-2xl text-center text-[#FFBF00]'>CREATE A NEW STAFF</h1>
                <div className='grid grid-cols-2 gap-x-10 gap-y-5'>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Staff Name</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input ref={staffName} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Staff Phone Number</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input ref={staffNumber} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Address</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input ref={staffAddress} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-8'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Work Catetgory</p>
                            <div className=' pr-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <select ref={workCategory} name="work_category" id="work_category" className='outline-none w-full bg-[#0E2433] rounded-xl px-3'>
                                    <option value=""></option>
                                    {
                                        WC.map(wc => <option value={wc}>{wc}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Staff Catetgory</p>
                            <div className=' pr-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <select ref={staffCategory} name="staff_category" id="staff_category" className='outline-none w-full bg-[#0E2433] rounded-xl px-3'>
                                    <option value=""></option>
                                    <option value="Mechanic" className=''>Mechanic</option>
                                    <option value="Assistant Mechanic">Assistant Mechanic</option>
                                    <option value="Laborer">Laborer</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>NID Number</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input ref={staffNid} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Emergency Contact</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input ref={staffEmergecy} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-10'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Blood Group</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={staffBlood} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Salary per Day</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={staffSalary} type="number" className='outline-none w-full' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Reference</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input ref={staffReference} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center mt-10'>
                    <button onClick={handleSubmit} className='border-2 border-[#FFBF00] px-8 py-2 rounded-full hover:text-[#FFBF00] hover:border-white duration-200 text-xl cursor-pointer'>Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewStaffsConstruction;