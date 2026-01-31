import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowRoundForward, IoMdCloseCircle } from 'react-icons/io';
import { Watch } from 'react-loader-spinner';
import { NavLink, replace, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const StaffsSummaryConstruction = () => {
    const [loading, setLoading] = useState(false);
    const testref = useRef();
    const [staffsData, setStaffsData] = useState([]);
    const navigate = useNavigate();
    const [tabs, setTabs] = useState('Weekly');


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


    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3000/construction_staffs`).then(res => res.json()).then(data => {
            setStaffsData(data);
            setLoading(false)
        })
    }, [])

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

    const formatDate = (value) => {
        if (!value) return "";

        const date = new Date(value);

        const updateDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(date);
        const updateDateFormet = updateDate.split(' ')
        console.log(updateDateFormet[0], updateDateFormet[1], ',', updateDateFormet[2])
    };

    const dateRef = useRef();
    const [selectedWeek, setSelectedWeek] = useState(
        getCurrentWeekFridayStart(selectedYear)
    );
    const weekDays = getWeekDaysFridayStart(selectedYear, selectedWeek);
    const weekStart = weekDays[0];              // Friday
    const weekEnd = weekDays[6];                // Thursday

    // normalize time
    weekStart.setHours(0, 0, 0, 0);
    weekEnd.setHours(23, 59, 59, 999);

    const prevWeekStart = new Date(weekStart);
    prevWeekStart.setDate(prevWeekStart.getDate() - 7);

    const prevWeekEnd = new Date(weekEnd);
    prevWeekEnd.setDate(prevWeekEnd.getDate() - 7);

    return (
        <div className='p-7 h-full relative'>
            <div className='flex flex-col h-full'>
                <h1 className='text-2xl text-center text-[#FFBF00]'>STAFFS SUMMARY</h1>
                <div className={`flex flex-col items-start w-full gap-2 mt-4`}>
                    <div className="flex gap-5 overflow-x-auto mb-4 px-2 pb-2">
                        <NavLink onClick={() => { setTabs('Weekly') }} className={`border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Weekly' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Weekly Summary</NavLink>
                        <NavLink onClick={() => { setTabs('Monthly') }} className={`border border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Monthly' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Monthly Summary</NavLink>
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

                    <div className={`${tabs === 'Weekly' ? '' : 'hidden'}`}>
                        <div id='scrollbar-x' className="flex gap-2 overflow-x-auto mb-4 px-2 pb-2">
                            {WEEKS.map(week => {
                                const isActive = selectedWeek === week;

                                return (
                                    <button
                                        key={week}
                                        onClick={() => setSelectedWeek(week)}
                                        className={`min-w-fit px-3 py-1 rounded-full text-sm transition-all duration-300 border border-[#FFBF00] ${isActive ? "bg-[#FFBF00] text-black shadow-md" : " text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"
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
                                        <th className="border p-2">Name</th>
                                        <th className="border p-2">Work</th>
                                        <th className="border p-2">Category</th>
                                        <th className="border p-2">Salary</th>

                                        {weekDays.map(day => (
                                            <th key={day.toISOString()} className="border p-2">
                                                {day.getDate()} {MONTHS[day.getMonth()].slice(0, 3)}
                                            </th>
                                        ))}

                                        <th className="border p-2">Days</th>
                                        <th className={`border p-2`}>Due</th>
                                        <th className={`border p-2`}>Income</th>
                                        <th className={`border p-2`}>Withdraw</th>
                                        <th className={`border p-2`}>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffsData.map(staff => {
                                        const attendanceMap = normalizeAttendance(
                                            staff.staff_working_details,
                                            selectedYear,
                                            selectedMonth
                                        );

                                        const getAttendanceMark = (data) => {
                                            if (!data) return "";
                                            if (data.shift === "Single") return "S";
                                            if (data.shift === "Half") return "H";
                                            if (data.shift === "Double") return "D";
                                            return "P";
                                        };

                                        return (
                                            <tr key={staff._id}>
                                                <td className="border p-2">{staff.staff_name}</td>
                                                <td className="border p-2">{staff.work_category}</td>
                                                <td className="border p-2">{staff.staff_category}</td>
                                                <td className="border p-2">{staff.staff_salary}</td>

                                                {weekDays.map(day => {
                                                    const dateKey = [
                                                        day.getFullYear(),
                                                        String(day.getMonth() + 1).padStart(2, "0"),
                                                        String(day.getDate()).padStart(2, "0"),
                                                    ].join("-")
                                                    const attendance = attendanceMap[dateKey];
                                                    return (
                                                        <td key={dateKey} className="border border-[#FFBF00] text-center">
                                                            {getAttendanceMark(attendance)}
                                                        </td>
                                                    );
                                                })}
                                                <td className="border p-2 text-center">
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
                                                <td className="border p-2">
                                                    {
                                                        (staff?.staff_working_details || []).reduce(
                                                            (sum, item) => {
                                                                const d = new Date(item.date);

                                                                if (d <= prevWeekEnd) {
                                                                    return sum + Number(item.income || 0);
                                                                }
                                                                return sum;
                                                            }, 0) -
                                                        (staff?.staff_transections || []).reduce(
                                                            (sum, item) => {
                                                                const d = new Date(item.date);

                                                                if (d <= prevWeekEnd) {
                                                                    return sum + Number(item.amount || 0);
                                                                }
                                                                return sum;
                                                            },
                                                            0
                                                        )
                                                    }
                                                </td>
                                                <td className={`border p-2 `}>
                                                    {
                                                        (staff?.staff_working_details || []).reduce(
                                                            (sum, item) => {
                                                                const d = new Date(item.date);

                                                                if (d >= weekStart && d <= weekEnd) {
                                                                    return sum + Number(item.income || 0);
                                                                }
                                                                return sum;
                                                            }, 0)
                                                    }
                                                </td>
                                                <td className={`border p-2`}>
                                                    {
                                                        (staff?.staff_transections || []).reduce(
                                                            (sum, item) => {
                                                                const d = new Date(item.date);

                                                                if (d >= weekStart && d <= weekEnd) {
                                                                    return sum + Number(item.amount || 0);
                                                                }
                                                                return sum;
                                                            },
                                                            0
                                                        )
                                                    }
                                                </td>
                                                <td className={`border p-2`}>
                                                    {
                                                        (staff?.staff_working_details || []).reduce(
                                                            (sum, item) => {
                                                                const d = new Date(item.date);

                                                                if (d >= weekStart && d <= weekEnd) {
                                                                    return sum + Number(item.income || 0);
                                                                }
                                                                return sum;
                                                            }, 0) -
                                                        (staff?.staff_transections || []).reduce(
                                                            (sum, item) => {
                                                                const d = new Date(item.date);

                                                                if (d >= weekStart && d <= weekEnd) {
                                                                    return sum + Number(item.amount || 0);
                                                                }
                                                                return sum;
                                                            },
                                                            0
                                                        ) + (
                                                            (staff?.staff_working_details || []).reduce(
                                                                (sum, item) => {
                                                                    const d = new Date(item.date);

                                                                    if (d <= prevWeekEnd) {
                                                                        return sum + Number(item.income || 0);
                                                                    }
                                                                    return sum;
                                                                }, 0) -
                                                            (staff?.staff_transections || []).reduce(
                                                                (sum, item) => {
                                                                    const d = new Date(item.date);

                                                                    if (d <= prevWeekEnd) {
                                                                        return sum + Number(item.amount || 0);
                                                                    }
                                                                    return sum;
                                                                },
                                                                0
                                                            )
                                                        )
                                                    }
                                                </td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    {/* Monthly Data */}
                    <div className={`${tabs === 'Monthly' ? '' : 'hidden'}`}>
                        <div className="mt-6 overflow-x-auto">
                            <div className="flex gap-2 overflow-x-auto mb-4 px-2 pb-2 border-b border-[#FFBF00]">
                                {MONTHS.map((month, index) => {
                                    const isActive = selectedMonth === index;

                                    return (
                                        <button
                                            key={month}
                                            onClick={() => setSelectedMonth(index)}
                                            className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "bg-[#FFBF00] text-black shadow-md scale-105" : "border border-[#FFBF00] text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>
                                            {month}
                                        </button>
                                    );
                                })}
                            </div>
                            <h2 className="text-xl text-[#FFBF00] text-center mb-3">
                                {MONTHS[selectedMonth]} {selectedYear}
                            </h2>

                        </div>
                        <div id='scrollbar-x' className={`transition-all duration-500 ease-in-out pb-5 h-fit overflow-x-scroll`}>
                            <table className="border-collapse min-w-max text-md">
                                <thead>
                                    <tr className='text-[#FFBF00]'>
                                        <th className="border border-white p-2">Name</th>
                                        <th className="border border-white p-2">Work</th>
                                        <th className="border border-white p-2">Category</th>
                                        <th className="border border-white p-2">Salary</th>

                                        {monthDays.map((day) => (
                                            <th key={day.toISOString()} className="border border-white p-2">
                                                {day.getDate()}
                                            </th>
                                        ))}

                                        <th onClick={() => { console.log(selectedMonth) }} className="border border-white p-2">Days</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {

                                        staffsData.map(staff => {
                                            const attendanceMap = normalizeAttendance(
                                                staff.staff_working_details,
                                                selectedYear,
                                                selectedMonth
                                            );

                                            const getAttendanceMark = (data) => {
                                                if (!data) return "";
                                                if (data.shift === "Single") return "S";
                                                if (data.shift === "Half") return "H";
                                                if (data.shift === "Double") return "D";
                                                return "P";
                                            };
                                            return (
                                                <tr key={staff._id}>
                                                    <td className="border border-[#FFBF00] p-2">{staff.staff_name}</td>
                                                    <td className="border border-[#FFBF00] p-2">{staff.work_category}</td>
                                                    <td className="border border-[#FFBF00] p-2">{staff.staff_category}</td>
                                                    <td className="border border-[#FFBF00] p-2">{staff.staff_salary}</td>

                                                    {monthDays.map((day) => {
                                                        const key = day.toISOString().split("T")[0];
                                                        const attendance = attendanceMap[key];
                                                        return (
                                                            <td key={key} className="border border-[#FFBF00] text-center">
                                                                {getAttendanceMark(attendance)}
                                                            </td>
                                                        );
                                                    })}

                                                    <td className="border border-[#FFBF00] p-2 text-center">
                                                        {staff.staff_working_details.filter(m => m.date.split(' ')[0] === MONTHS[selectedMonth]).length}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffsSummaryConstruction;