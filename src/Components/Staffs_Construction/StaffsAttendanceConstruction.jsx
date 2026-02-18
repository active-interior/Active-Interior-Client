import React, { useEffect, useRef, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { Watch } from 'react-loader-spinner';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const StaffsAttendanceConstruction = () => {
    const [loading, setLoading] = useState(false);
    const [projectModal, setProjectModal] = useState(false);
    const [shiftModal, setShiftModal] = useState(false);
    const [dateModal, setDateModal] = useState(false);
    const [reload, setReload] = useState(false);
    const testref = useRef();
    const [staffsData, setStaffsData] = useState([]);
    const [projectsData, setProjectsData] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const navigate = useNavigate();
    const [tabs, setTabs] = useState('Electric');
    const Electric = staffsData.filter(s => s.work_category === 'Electric');
    const Sanitary = staffsData.filter(s => s.work_category === 'Sanitary');
    const Gril = staffsData.filter(s => s.work_category === 'Gril');
    const Thai = staffsData.filter(s => s.work_category === 'Thai');
    const Stainless_Steel = staffsData.filter(s => s.work_category === 'Stainless Steel');
    const Tails = staffsData.filter(s => s.work_category === 'Tails');
    const Interior = staffsData.filter(s => s.work_category === 'Interior');
    const Painting = staffsData.filter(s => s.work_category === 'Painting');
    const Others = staffsData.filter(s => s.work_category === 'Others');

    useEffect(() => {
        setLoading(true)
        fetch(`https://active-interior-f9hq.onrender.com/construction_staffs`).then(res => res.json()).then(data => {
            setStaffsData(data);
            setLoading(false)
        })
        fetch(`https://active-interior-f9hq.onrender.com/construction_projects`).then(res => res.json()).then(data => {
            setProjectsData(data);
            setLoading(false)
        })
    }, [reload]);
    // ---------------------------------------------------------------------------
    const formatDate = (value) => {
        const date = new Date(value);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };
    const handleDateChange = (e) => {
        const currentDate = new Date();
        const gottedDate = new Date(e.target.value);
        const rawValue = e.target.value;        // 2026-01-22
        if (gottedDate > currentDate && gottedDate !== currentDate) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "The Date Still A Future ",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                return;
            })
        }
        else{
            const formatted = formatDate(rawValue); // January 22, 2026
            setSelectedDate(formatted);
    
            setAttendanceData([...attendanceData, formatted])
            setDateModal(!dateModal);
            setShiftModal(!shiftModal);
        }
    };
    const handleTodayDate = () => {
        const now = new Date();
        const currentDate = now.toLocaleDateString('en-BD', {
            day: 'numeric',
            year: 'numeric',
            month: 'long',
        });
        setAttendanceData([...attendanceData, currentDate])
        setDateModal(!dateModal);
        setShiftModal(!shiftModal);
    }

    // -----------------------------------------------------------------------------

    const getAttendanceData = (value, click) => {
        if (click === 'first_click') {
            setAttendanceData([])
        }
        setProjectModal(!projectModal);
        setAttendanceData([...attendanceData, value]);
    }

    const handleAttendanceData = (shift) => {
        const id = attendanceData[0];
        // const previousData = staffsData.filter(st => st._id === id)[0].staff_working_details;
        const staffSalary = staffsData.filter(st => st._id === id)[0].staff_salary;
        const cost_category = staffsData.filter(st => st._id === id)[0].work_category;
        const staff_income = (sft) => {
            if (sft === 'Single') {
                return staffSalary * 1;
            }
            else if (sft === 'Double') {
                return staffSalary * 2;
            }
            else if (sft === 'Half') {
                return staffSalary * 0.5;
            }
        };
        const staffIncome = staff_income(shift);
        const workingDate = attendanceData[2];

        const attendance_data = { attendance_data: { date: workingDate, project: attendanceData[1].p_name, shift, income: staffIncome } };
        const cost_data = { date: workingDate, cost_category: staff?.work_category, staff_details: [{name: staff?.staff_name, shift, bill: staffIncome}], cost_description: 'Worker Bill', amount: staffIncome }

        fetch(`https://active-interior-f9hq.onrender.com/construction_staffs/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(attendance_data)
        }).then(res => res.json()).then(data => {
            setProjectModal(false);
            setShiftModal(false);
            fetch(`https://active-interior-f9hq.onrender.com/construction_projects/${attendanceData[1].p_id}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cost_data)
            }).then(res => res.json()).then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Attendance Set Successfully",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setReload(!reload);
                })
            })
        })

    }

    const dateRef = useRef();

    return (
        <div className='p-7 h-full relative'>
            <div className='flex flex-col h-full'>
                <h1 className='text-2xl text-center text-[#FFBF00]'>STAFFS ATTENDANCE</h1>
                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                    {/* <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                        <input ref={testref} type="text" className='outline-none w-full' />
                        <button className='border-l border-[#FFBF00] px-7 cursor-pointer'>Search</button>
                    </div> */}
                    <div className={`flex flex-col items-start w-full gap-2 mt-4`}>
                        <div className="flex gap-5 overflow-x-auto mb-4 px-2 pb-2">
                            <NavLink onClick={() => { setTabs('Electric') }} className={`border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Electric' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Electric</NavLink>
                            <NavLink onClick={() => { setTabs('Sanitary') }} className={`border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Sanitary' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Sanitary</NavLink>
                            <NavLink onClick={() => { setTabs('Gril') }} className={`border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Gril' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Gril</NavLink>
                            <NavLink onClick={() => { setTabs('Thai') }} className={`border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Thai' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Thai</NavLink>
                            <NavLink onClick={() => { setTabs('Stainless Steel') }} className={`border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Stainless Steel' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Stainless Steel</NavLink>
                            <NavLink onClick={() => { setTabs('Tails') }} className={`border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Tails' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Tails</NavLink>
                            <NavLink onClick={() => { setTabs('Interior') }} className={`border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Interior' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Interior</NavLink>
                            <NavLink onClick={() => { setTabs('Painting') }} className={`border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Painting' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Painting</NavLink>
                            <NavLink onClick={() => { setTabs('Others') }} className={`border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Others' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Others</NavLink>
                        </div>
                    </div>
                </div>
                <div className={`w-full ${projectModal ? 'flex' : 'hidden'} items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                    <div className='w-[50%] h-60 p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative'>
                        <IoMdCloseCircle className='text-4xl text-[#FFBF00] absolute top-1 right-1 cursor-pointer' onClick={() => { setProjectModal(!projectModal); setAttendanceData([]); }} />
                        <h1 className='text-2xl text-center text-[#FFBF00]'>THIS WORKER WILL WORK IN</h1>
                        <div className='h-fit overflow-y-scroll grid grid-cols-2 gap-5 mt-5 scrollbar-handle'>
                            {
                                projectsData.filter(p => p.status === true).map((project, index) =>
                                    <div key={index} onClick={() => { setProjectModal(!projectModal); setDateModal(!dateModal) }}>
                                        <div onClick={() => { getAttendanceData({ p_id: project._id, p_name: project.project_name }, 'second_click') }} className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                            <h1 className='text-center w-full'>{project.project_name}</h1>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className={`w-full ${dateModal ? 'flex' : 'hidden'} items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                    <div className='w-[50%] p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative'>
                        <IoMdCloseCircle className='text-4xl text-[#FFBF00] absolute top-1 right-1 cursor-pointer' onClick={() => { setDateModal(!dateModal); setAttendanceData([]); }} />
                        <h1 className='text-2xl text-center text-[#FFBF00]'>Working Date</h1>
                        <div className='h-60 overflow-y-scroll flex items-center justify-center gap-20 mt-5 scrollbar-handle'>
                            <div className="relative inline-block border-2 border-[#FFBF00] rounded-full shadow-md w-30 h-30">
                                {/* Native input – visually hidden but focusable */}
                                <input
                                    ref={dateRef}
                                    type="date"
                                    onChange={handleDateChange}
                                    className="custom-date opacity-0 z-20 absolute"
                                />
                                <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center'>Manual Date</h1>
                            </div>
                            <div onClick={handleTodayDate} className='px-3 border-2 border-[#FFBF00] rounded-full w-30 h-30 shadow-md shadow-[#FFBF00] flex items-center cursor-pointer'>
                                <h1 className='text-center w-full'>Today Date</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`w-full ${shiftModal ? 'flex' : 'hidden'} items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                    <div className='w-[50%] p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative'>
                        <IoMdCloseCircle className='text-4xl text-[#FFBF00] absolute top-1 right-1 cursor-pointer' onClick={() => { setShiftModal(!shiftModal); setAttendanceData([]); }} />
                        <h1 className='text-2xl text-center text-[#FFBF00]'>Working Shift</h1>
                        <div className='h-60 overflow-y-scroll flex items-center justify-center gap-20 mt-5 scrollbar-handle'>
                            <div onClick={() => { handleAttendanceData('Half') }} className='px-3 border-2 border-[#FFBF00] rounded-full w-30 h-30 shadow-md shadow-[#FFBF00] flex items-center cursor-pointer'>
                                <h1 className='text-center w-full'>Half Shift</h1>
                            </div>
                            <div onClick={() => { handleAttendanceData('Single') }} className='px-3 border-2 border-[#FFBF00] rounded-full w-30 h-30 shadow-md shadow-[#FFBF00] flex items-center cursor-pointer'>
                                <h1 className='text-center w-full'>Single Shift</h1>
                            </div>
                            <div onClick={() => { handleAttendanceData('Double') }} className='px-3 border-2 border-[#FFBF00] rounded-full w-30 h-30 shadow-md shadow-[#FFBF00] flex items-center cursor-pointer'>
                                <h1 className='text-center w-full'>Double Shift</h1>
                            </div>
                        </div>
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
                <div className={`${loading ? 'hidden' : ''}`}>
                    <div className={`${tabs === 'Electric' ? 'grid' : 'hidden'} grid-cols-2 gap-5 mt-8`}>
                        {
                            Electric.map((staff, index) =>
                                <div key={index}>
                                    <div onClick={() => { getAttendanceData(staff._id, 'first_click') }} className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                        <h1>{staff.staff_name}</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={`${tabs === 'Sanitary' ? 'grid' : 'hidden'} grid-cols-2 gap-5 mt-8`}>
                        {
                            Sanitary.map((staff, index) =>
                                <div key={index}>
                                    <div onClick={() => { getAttendanceData(staff._id, 'first_click') }} className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                        <h1>{staff.staff_name}</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={`${tabs === 'Gril' ? 'grid' : 'hidden'} grid-cols-2 gap-5 mt-8`}>
                        {
                            Gril.map((staff, index) =>
                                <div key={index}>
                                    <div onClick={() => { getAttendanceData(staff._id, 'first_click') }} className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                        <h1>{staff.staff_name}</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={`${tabs === 'Thai' ? 'grid' : 'hidden'} grid-cols-2 gap-5 mt-8`}>
                        {
                            Thai.map((staff, index) =>
                                <div key={index}>
                                    <div onClick={() => { getAttendanceData(staff._id, 'first_click') }} className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                        <h1>{staff.staff_name}</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={`${tabs === 'Stainless Steel' ? 'grid' : 'hidden'} grid-cols-2 gap-5 mt-8`}>
                        {
                            Stainless_Steel.map((staff, index) =>
                                <div key={index}>
                                    <div onClick={() => { getAttendanceData(staff._id, 'first_click') }} className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                        <h1>{staff.staff_name}</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={`${tabs === 'Tails' ? 'grid' : 'hidden'} grid-cols-2 gap-5 mt-8`}>
                        {
                            Tails.map((staff, index) =>
                                <div key={index}>
                                    <div onClick={() => { getAttendanceData(staff._id, 'first_click') }} className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                        <h1>{staff.staff_name}</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={`${tabs === 'Interior' ? 'grid' : 'hidden'} grid-cols-2 gap-5 mt-8`}>
                        {
                            Interior.map((staff, index) =>
                                <div key={index}>
                                    <div onClick={() => { getAttendanceData(staff._id, 'first_click') }} className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                        <h1>{staff.staff_name}</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={`${tabs === 'Painting' ? 'grid' : 'hidden'} grid-cols-2 gap-5 mt-8`}>
                        {
                            Painting.map((staff, index) =>
                                <div key={index}>
                                    <div onClick={() => { getAttendanceData(staff._id, 'first_click') }} className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                        <h1>{staff.staff_name}</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={`${tabs === 'Others' ? 'grid' : 'hidden'} grid-cols-2 gap-5 mt-8`}>
                        {
                            Others.map((staff, index) =>
                                <div key={index}>
                                    <div onClick={() => { getAttendanceData(staff._id, 'first_click') }} className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                        <h1>{staff.staff_name}</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffsAttendanceConstruction;