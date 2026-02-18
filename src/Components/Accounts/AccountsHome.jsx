import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'

const AccountsHome = () => {
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(`https://active-interior-f9hq.onrender.com/accounts`)
            .then(res => res.json())
            .then(data => {
                setAccounts(data);
                setLoading(false);
            })
    }, []);


    // ===============================================================================================================================================
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

    const weekStart = weekDays[0];              // Friday
    const weekEnd = weekDays[6];



    // const attendanceMap =
    //     normalizeAttendance(
    //         staff?.staff_working_details,
    //         selectedYear,
    //         selectedMonth
    //     ) || {};

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
    // ===============================================================================================================================================


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
                <div className='grid grid-cols-3 gap-20'>
                    <div className='h-30 w-full border-2 border-[#FFBF00] rounded-2xl p-3 flex flex-col items-center justify-center gap-2'>
                        <h1 className='text-xl text-[#FFBF00] text-center'>Total Cash In</h1>
                        <h1 className='text-xl'>
                            <CountUp
                                start={(accounts?.total_cash_in) - 500 || 0}
                                end={accounts?.total_cash_in || 0}
                                duration={3}
                            />  {' '} Taka
                        </h1>
                    </div>
                    <div className='h-30 w-full border-2 border-[#FFBF00] rounded-2xl p-3 flex flex-col items-center justify-center gap-2'>
                        <h1 className='text-xl text-[#FFBF00] text-center'>Total Cash Out</h1>
                        <h1 className='text-xl'>
                            <CountUp
                                start={(accounts?.total_cash_out) - 500 || 0}
                                end={accounts?.total_cash_out || 0}
                                duration={4}
                            />  {' '} Taka
                        </h1>
                    </div>
                    <div className='h-30 w-full border-2 border-[#FFBF00] rounded-2xl p-3 flex flex-col items-center justify-center gap-2'>
                        <h1 className='text-xl text-[#FFBF00] text-center'>Available Balance</h1>
                        <h1 className='text-xl'>
                            <CountUp
                                start={(accounts?.current_balance) - 5000 || 0}
                                end={accounts?.current_balance || 0}
                                duration={5}
                            />  {' '} Taka
                        </h1>
                    </div>
                </div>
            </div>


            {/* ============================================================================================= */}
            <div className='mt-5'>
                <h1 className='text-2xl text-center text-[#FFBF00] mb-5'>ALL WEEKS SUMMARY</h1>
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
                    <table className="border-collapse min-w-max text-sm cursor-default">
                        <thead>
                            <tr className="text-[#FFBF00]">
                                {weekDays.map(day => (
                                    <th key={day.toISOString()} className="border p-2 font-normal">
                                        {day.getDate()} {MONTHS[day.getMonth()].slice(0, 3)}
                                    </th>
                                ))}
                                <th className="border p-2">Total</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr className="text-[#FFBF00]">
                                {weekDays.map(day => (
                                    <th key={day.toISOString()} className={`border`}>
                                        <div className='flex items-center w-full text-xs font-normal'>
                                            <div className="border-r border-[#FFBF00] p-3 text-center w-full">
                                                Revenue
                                            </div>
                                            <div className="border-l border-[#FFBF00] p-3 text-center w-full">
                                                Expense
                                            </div>
                                        </div>
                                    </th>
                                ))}
                                <th className={`border`}>
                                    <div className='flex items-center w-full text-xs font-normal'>
                                        <div className="border-r border-[#FFBF00] p-3 text-center w-full">
                                            Revenue
                                        </div>
                                        <div className="border-l border-[#FFBF00] p-3 text-center w-full">
                                            Expense
                                        </div>
                                    </div>
                                </th>
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
                                    // const attendance = attendanceMap[dateKey];
                                    const date = `${MONTHS[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()}`
                                    const revenueAmount = accounts?.revenue_transactions?.filter((rt => rt.date === date)).reduce((sum, item) => sum + item.amount, 0)
                                    const expenseAmount = accounts?.expense_transactions?.filter((et => et.date === date)).reduce((sum, item) => sum + item.amount, 0)
                                    return (
                                        <td
                                            key={dateKey}
                                            className={`border border-[#FFBF00] text-center`}
                                        >
                                            <div className='flex items-center w-full text-xs'>
                                                <div className="border-r border-[#FFBF00] p-2 text-center w-full">
                                                    {revenueAmount}
                                                </div>
                                                <div className="border-l border-[#FFBF00] p-2 text-center w-full">
                                                    {expenseAmount}
                                                </div>
                                            </div>
                                        </td>
                                    );
                                })}

                                {/* Weekly total */}
                                <td className="border border-[#FFBF00] text-center text-[#FFBF00]">
                                    <div className='flex items-center w-full text-xs'>
                                        <div className="border-r border-[#FFBF00] p-2 text-center w-full">
                                            {
                                                (accounts?.revenue_transactions || []).reduce(
                                                    (sum, item) => {
                                                        const d = new Date(item.date);

                                                        if (d >= weekStart && d <= weekEnd) {
                                                            return sum + Number(item.amount || 0);
                                                        }
                                                        return sum;
                                                    }, 0)
                                            }
                                        </div>
                                        <div className="border-l border-[#FFBF00] p-2 text-center w-full">
                                            {
                                                (accounts?.expense_transactions || []).reduce(
                                                    (sum, item) => {
                                                        const d = new Date(item.date);

                                                        if (d >= weekStart && d <= weekEnd) {
                                                            return sum + Number(item.amount || 0);
                                                        }
                                                        return sum;
                                                    }, 0)
                                            }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* ============================================================================================= */}



            {/* ================================================================================================ */}
            <section className='pb-12'>
                <div>
                    <h1 className='text-2xl text-center text-[#FFBF00] mb-5'>LAST 20 TRANSACTIONS</h1>
                </div>
                <div className='grid mt-8'>
                    <table className='col-span-3'>
                        <thead className='border'>
                            <tr>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Category</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Reference (Trx No)</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Type</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                accounts?.last_20_transaction?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((cost, index) => {
                                    return (
                                        <tr key={index} className='border'>
                                            <td className='border border-[#FFBF00] px-5 py-2'>{cost?.date}</td>
                                            <td className='border border-[#FFBF00] px-5 py-2'>{cost?.category}</td>
                                            <td className='border border-[#FFBF00] px-5 py-2'><Link to={``} className='underline hover:text-[#FFBF00] duration-150'>{cost?.reference[0]}</Link> {(cost?.reference.slice(1).map((refe, ind) => <Link key={ind} to={``}>, <span className='underline hover:text-[#FFBF00] duration-150'>{refe}</span></Link>))}</td>
                                            <td className={`border border-[#FFBF00] px-5 py-2 ${cost?.type === 'Cash In' ? 'text-green-500' : 'text-red-500'}`}>{cost?.type}</td>
                                            <td className='border border-[#FFBF00] px-5 py-2'>{cost?.amount}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
            {/* ================================================================================================ */}
        </div>
    );
};

export default AccountsHome;