import React, { useEffect, useRef, useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { BallTriangle, Watch } from 'react-loader-spinner';
import { Link, useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const StaffsProfileConstruction = () => {
    const { staff_id } = useParams();
    const [staff, setStaff] = useState({});
    const [projectModal, setProjectModal] = useState(false);
    const [shiftModal, setShiftModal] = useState(false);
    const [projectsData, setProjectsData] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [transectionData, setransectionData] = useState('');
    const [loadingTr, setLoadingTr] = useState(false);
    const [transectionModal, setransectionModal] = useState(false);
    const location = useLocation();
    const from = location?.state?.pathname;
    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3000/construction_staffs/${staff_id}`)
            .then(res => res.json())
            .then(data => {
                setStaff(data);
                fetch(`http://localhost:3000/construction_projects`).then(res => res.json()).then(data => {
                    setProjectsData(data);
                    setLoading(false)
                }).then(() => {
                    setLoading(false);
                })
            })
    }, [reload])


    // -------------------------- Weekly Experiment ----------------------------

    const WEEKS = Array.from({ length: 52 }, (_, i) => i + 1);

    function getFirstFridayOfYear(year) {
        const d = new Date(year, 0, 1); // Jan 1
        const day = d.getDay();        // 0–6
        const diff = (5 - day + 7) % 7; // 5 = Friday
        d.setDate(d.getDate() + diff);
        return d;
    }

    function getCurrentWeekFridayStart(year) {
        const today = new Date();
        const firstFriday = getFirstFridayOfYear(year);

        if (today < firstFriday) return 1;

        const diffDays = Math.floor(
            (today - firstFriday) / (1000 * 60 * 60 * 24)
        );

        return Math.floor(diffDays / 7) + 1;
    }
    function getWeekDaysFridayStart(year, weekNumber) {
        const firstFriday = getFirstFridayOfYear(year);

        const weekStart = new Date(firstFriday);
        weekStart.setDate(firstFriday.getDate() + (weekNumber - 1) * 7);

        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(weekStart);
            d.setDate(weekStart.getDate() + i);
            return d;
        });
    }

    // --------------------------- End Weekly Experiment -------------------------

    // Experement
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // 0–11
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const MONTHS = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getMonthDays = (year, month) => {
        const days = [];
        const date = new Date(year, month, 1);

        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return days;
    };
    const monthDays = getMonthDays(selectedYear, selectedMonth);

    const normalizeAttendance = (workingDetails, year, month) => {
        return workingDetails?.reduce((acc, item) => {
            const date = new Date(item.date);

            if (
                date.getFullYear() === year &&
                date.getMonth() === month
            ) {
                const key = date.toLocaleDateString("en-CA");
                acc[key] = item;
            }

            return acc;
        }, {});
    };

    const [selectedWeek, setSelectedWeek] = useState(
        getCurrentWeekFridayStart(selectedYear)
    );
    const weekDays = getWeekDaysFridayStart(selectedYear, selectedWeek);



    const attendanceMap =
        normalizeAttendance(
            staff?.staff_working_details,
            selectedYear,
            selectedMonth
        ) || {};

    const getAttendanceMark = (data) => {
        if (!data) return "";
        if (data.shift === "Single") return "S";
        if (data.shift === "Half") return "H";
        if (data.shift === "Double") return "D";
        return "P";
    };

    const formatDate = (value) => {
        const date = new Date(value);
        return new Intl.DateTimeFormat('en-BD', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    const getAttendanceData = (value, click) => {
        if (click === 'first_click') {
            setAttendanceData([]);
            const currentDate = new Date();
            const gottedDate = new Date(value);
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
            else {
                setProjectModal(!projectModal);
            }
        }

        setAttendanceData([...attendanceData, value]);
    }
    const handleAttendanceData = (shift) => {
        const id = attendanceData[0];
        const staffSalary = staff.staff_salary;
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
        const workingDate = attendanceData[0];

        const attendance_data = { attendance_data: { date: workingDate, project: attendanceData[1].p_name, shift, income: staffIncome } };
        const cost_data = { date: workingDate, cost_category: staff?.work_category, cost_description: 'Worker Bill', amount: staffIncome }
        Swal.fire({
            title: `In "${workingDate}" ${staff.staff_name} worked at ${attendanceData[1].p_name}`,
            text: "Are You Sure?",
            icon: "warning",
            showCancelButton: true,
            background: "#1A3A4A",
            color: "#fff",
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn-style',
                cancelButton: 'btn-cancel'
            },
            confirmButtonColor: "#ffbf00",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yeah, Sure"
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                fetch(`http://localhost:3000/construction_staffs/${staff._id}`, {
                    method: 'PATCH',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(attendance_data)
                }).then(res => res.json()).then(data => {
                    setProjectModal(false);
                    setShiftModal(false);
                    fetch(`http://localhost:3000/construction_projects/${attendanceData[1].p_id}`, {
                        method: 'PUT',
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
                            setAttendanceData([]);
                            setLoading(false)
                            setReload(!reload);
                        })
                    })
                })
            }
        })

    }

    // Transection Section----------------------------------------------------

    const getTransectionData = (id) => {
        setransectionData([])

        setransectionModal(!transectionModal);
        setransectionData(id);
    }

    const handletransectionData = (id) => {
        setLoadingTr(true);
        const previousData = staff.staff_transections;
        const transection_amount = transectionAmmountRef.current.value;
        const transection_comment = transectionCommentRef.current.value;
        const now = new Date();
        const currentDate = now.toLocaleDateString('en-BD', {
            day: 'numeric',
            year: 'numeric',
            month: 'long',
        });
        const transection_data = { transection_data: { date: currentDate, amount: transection_amount * 1, comment: transection_comment } }
        const expenseData = { date: currentDate, category: 'Staff Payment', reference: staff?.staff_name, amount: transection_amount * 1 };
        fetch(`http://localhost:3000/construction_staffs/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(transection_data)
        }).then(res => res.json()).then(data => {
            fetch(`http://localhost:3000/expense_transactions`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(expenseData)
            }).then(res => res.json()).then(rvData => {
                setransectionModal(false);
                setLoadingTr(false);
                transectionAmmountRef.current.value = '';
                transectionCommentRef.current.value = '';
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Transection Complete Successfully",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setReload(!reload);
                })
            })
        })
    }
    const handleClosing = (id) => {
        setLoading(true);
        const previousData = staff;
        const now = new Date();
        const currentDate = now.toLocaleDateString('en-BD', {
            day: 'numeric',
            year: 'numeric',
            month: 'long',
        });
        const previousDue = previousData.due;
        const previousAvailableBalance = previousData.available_balance;

        const newDue = previousAvailableBalance;
        const newIncome = 0;
        const newWithdraw = 0;

        const updateData = { due: newDue, income: newIncome, withdraw: newWithdraw, last_closing_date: currentDate };
        console.log(updateData)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Close"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/close_construction_staffs/${id}`, {
                    method: 'PATCH',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(updateData)
                }).then(res => res.json()).then(data => {
                    Swal.fire({
                        title: "Previous Account Closed Successfully",
                        icon: "success"
                    }).then(() => {
                        setLoading(false);
                        setReload(!reload);
                    })
                })
            }
        })
    }

    const handleFinanceDetails = (id) => {
        if (!staff) {
            return;
        }
        const income = staff.staff_working_details.reduce(
            (sum, item) => sum + item.income,
            0
        );

        const received = staff.staff_transections.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        const available_balance = income - received;
        setStaffFinance({ income, received, available_balance })

    }

    const transectionAmmountRef = useRef();
    const transectionCommentRef = useRef();




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
            <div className={`relative ${loading ? 'hidden' : ''}`}>
                <div className='flex items-center gap-10 text-xl my-10'>
                    <Link to={from || '/construction/staffs'} className={`min-w-fit px-3 py-1 rounded-full text-sm transition-all duration-300 border border-[#FFBF00] bg-[#FFBF00] text-black shadow-md flex items-center gap-2 cursor-pointer`}>
                        <FaLongArrowAltLeft /> Back
                    </Link>
                    <h1><span className='text-[#FFBF00]'>Name:</span> {staff?.staff_name?.charAt(0).toUpperCase() + staff?.staff_name?.slice(1)}</h1>
                    <h1><span className='text-[#FFBF00]'>Staff Category:</span> {staff?.staff_category}</h1>
                    <h1><span className='text-[#FFBF00]'>Due :</span> {staff?.due}</h1>
                    <h1><span className='text-[#FFBF00]'>Income:</span> {staff?.income}</h1>
                    <h1><span className='text-[#FFBF00]'>Withdraw:</span> {staff?.withdraw}</h1>
                    <h1><span className='text-[#FFBF00]'>Available Balance:</span> {staff?.available_balance}</h1>
                </div>

                <div className='fixed w-full  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className={`w-full ${projectModal ? 'flex' : 'hidden'} items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-screen`}>
                        <div className='w-[30%] h-60 p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative'>
                            <IoMdCloseCircle className='text-4xl text-[#FFBF00] absolute top-1 right-1 cursor-pointer' onClick={() => { setProjectModal(!projectModal); setAttendanceData([]); }} />
                            <h1 className='text-2xl text-center text-[#FFBF00]'>THIS WORKER WILL WORK IN</h1>
                            <div className='h-fit overflow-y-scroll grid grid-cols-2 gap-5 mt-5 scrollbar-handle'>
                                {
                                    projectsData.filter(p => p.status === true).map((project, index) =>
                                        <div key={index} onClick={() => { setProjectModal(!projectModal); setShiftModal(!shiftModal) }}>
                                            <div onClick={() => { getAttendanceData({ p_id: project._id, p_name: project.project_name }, 'second_click') }} className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                                <h1 className='text-center w-full'>{project.project_name}</h1>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`w-full ${shiftModal ? 'flex' : 'hidden'} items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <div className='w-[30%] p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative'>
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
                    <div className={`w-full ${transectionModal ? 'flex' : 'hidden'} items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 h-screen`}>
                        <div id='scrollbar-handle' className={`${loadingTr ? 'hidden' : ''} w-[30%] p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative`}>
                            <IoMdCloseCircle className='text-4xl text-[#FFBF00] absolute top-1 right-1 cursor-pointer' onClick={() => { setransectionModal(!transectionModal); transectionAmmountRef.current.value = ''; transectionCommentRef.current.value = ''; }} />
                            <h1 className='text-2xl text-center text-[#FFBF00]'>ENTER TRANSACTION DETAILS</h1>
                            <div className='h-60 overflow-y-scroll scrollbar-handle grid grid-cols-1 gap-5 mt-5'>
                                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                    <p className='text-[#FFBF00]'>Transaction Ammount</p>
                                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                        <input ref={transectionAmmountRef} type="number" className='outline-none w-full' />
                                    </div>
                                </div>
                                <div className='flex flex-col items-start w-full gap-2'>
                                    <p className='text-[#FFBF00]'>Comment (Purpose / Place / Date)</p>
                                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                        <input ref={transectionCommentRef} type="text" className='outline-none w-full' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <button onClick={() => { handletransectionData(transectionData) }} className='border-2 border-[#FFBF00] px-8 py-1 rounded-full hover:text-[#FFBF00] hover:border-white duration-200 text-lg'>Submit The transection</button>
                            </div>
                        </div>
                        <div className={`${loadingTr ? 'flex' : 'hidden'} items-center justify-center w-[30%] p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative`}>
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
                    </div>
                </div>

                <div className='mt-5'>
                    <div id='scrollbar-x' className="flex gap-2 overflow-x-auto mb-4 pb-2">
                        {WEEKS.map(week => {
                            const isActive = selectedWeek === week;

                            return (
                                <button
                                    key={week}
                                    onClick={() => setSelectedWeek(week)}
                                    className={`cursor-pointer min-w-fit px-3 py-1 rounded-full text-sm transition-all duration-300 border border-[#FFBF00] ${isActive ? "bg-[#FFBF00] text-black shadow-md" : " text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"
                                        }`}
                                >
                                    Week {week}
                                </button>
                            );
                        })}
                    </div>
                    <div id='scrollbar-x' className={`transition-all duration-500 ease-in-out pb-5 h-fit overflow-x-scroll grid`}>
                        <table className="border-collapse min-w-max text-md">
                            <thead>
                                <tr className="text-[#FFBF00]">
                                    {weekDays.map(day => (
                                        <th key={day.toISOString()} className="border p-2">
                                            {day.getDate()} {MONTHS[day.getMonth()].slice(0, 3)}
                                        </th>
                                    ))}
                                    <th className="border p-2">Total Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {weekDays.map(day => {
                                        // day.toLocaleDateString("en-BD")
                                        const dateKey = [
                                            day.getFullYear(),
                                            String(day.getMonth() + 1).padStart(2, "0"),
                                            String(day.getDate()).padStart(2, "0"),
                                        ].join("-")
                                        const attendance = attendanceMap[dateKey];
                                        return (
                                            <td onClick={() => {
                                                if (!getAttendanceMark(attendance)) {
                                                    getAttendanceData(formatDate(dateKey), "first_click")
                                                }
                                            }}
                                                key={dateKey}
                                                className={`border border-[#FFBF00] p-2 text-center ${getAttendanceMark(attendance) ? 'cursor-default' : 'cursor-pointer'}`}
                                            >
                                                {getAttendanceMark(attendance)}
                                            </td>
                                        );
                                    })}

                                    {/* Weekly total */}
                                    <td className="border border-[#FFBF00] p-2 text-center font-semibold">
                                        {
                                            weekDays.filter(day => {
                                                const dateKey = [
                                                    day.getFullYear(),
                                                    String(day.getMonth() + 1).padStart(2, "0"),
                                                    String(day.getDate()).padStart(2, "0"),
                                                ].join("-")
                                                return attendanceMap[dateKey];
                                            }).length
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <section className=''>
                        <h1 className='text-center text-xl'><span className='text-[#FFBF00]'>Last Closing Date:</span> {staff?.last_closing_date}</h1>
                        <div className='col-span-4 flex gap-5 items-center justify-center mb-12 mt-7'>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    getTransectionData(staff._id);
                                }}
                                className="border-2 border-[#FFBF00] px-8 py-1 rounded-full hover:text-[#FFBF00] hover:border-white duration-200 cursor-pointer"
                            >
                                Make a transaction
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClosing(staff._id);
                                }}
                                className="border-2 border-[#FFBF00] px-8 py-1 rounded-full hover:text-[#FFBF00] hover:border-white duration-200 cursor-pointer"
                            >
                                Closing The Week
                            </button>

                        </div>
                        <h1 className='text-2xl text-center text-[#FFBF00] mt-5'>TRANSACTION DETAILS</h1>
                        <div className='grid mt-5'>
                            <table className="border-collapse min-w-max text-md">
                                <thead className='border'>
                                    <tr>
                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Description</th>
                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        staff.staff_transections?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((transection, index) => {
                                            return (
                                                <tr key={index} className='border'>
                                                    <td className='border border-[#FFBF00] px-5 py-2'>{transection?.date}</td>
                                                    <td className='border border-[#FFBF00] px-5 py-2'>{transection?.comment}</td>
                                                    <td className='border border-[#FFBF00] px-5 py-2'>{transection?.amount}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>


            </div>
        </div>
    );
};

export default StaffsProfileConstruction;