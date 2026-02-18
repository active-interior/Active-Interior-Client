import React, { useEffect, useRef, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { BallTriangle } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';

const ExpensesPaybackLoans = () => {
    const [loading, setLoading] = useState(false);
    const [expense, setExpense] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [loans, setLoans] = useState([]);
    const [isSortByName, setIsSortByName] = useState(false);
    // const [reload, setReload] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(`https://active-interior-f9hq.onrender.com/accounts`)
            .then(res => res.json())
            .then(data => {
                setExpense(data?.payback_loans);
                setLoans(data?.loans)
                setLoading(false);
            })
    }, [])

    const formatDate = (value) => {
        const date = new Date(value);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    const handleDateChange = (e, category) => {
        setIsSortByName(false); setSelectedLoan("");
        const currentDate = new Date();
        const gottedDate = new Date(e);
        const rawValue = e;        // 2026-01-22
        const formatted = formatDate(rawValue); // January 22, 2026
        if (category === 'start') {
            setSelectedStartDate(formatted);
            const sortedData = expense?.filter(rvn => {
                return new Date(rvn?.date) >= new Date(formatted)
            });
            setSortedData(sortedData);
        }
        else if (category === 'end') {
            if (gottedDate < new Date(selectedStartDate)) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "End Date Can't be less than Start Date",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    return;
                })
            }
            else if (!selectedStartDate) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "At First Select Start Date",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    return;
                })
            }
            else {
                setSelectedEndDate(formatted);
                const sortedData = expense?.filter(rvn => { return new Date(rvn?.date) >= new Date(selectedStartDate) && new Date(rvn?.date) <= new Date(formatted) });
                setSortedData(sortedData);
            }
        }
    };
    const sortByWhoseLoan = (value) => {
        setIsSortByName(true);
        const sortedData = expense?.filter(exp => exp?.whose_loan === value);
        if (sortedData.length > 0) {
            setSortedData(sortedData);
        } else {
            setSortedData([]);
        }
    }
    const whoseLoanRef = useRef();
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
                <div className='flex w-full items-end gap-8'>
                    <div className='flex items-center justify-between gap-14 flex-1'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Show From</p>
                            <div className="relative inline-block px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full">
                                <input
                                    type="date"
                                    onChange={(e) => { handleDateChange(e.target.value, 'start') }}
                                    className="loan-date opacity-0 z-20 absolute"
                                />
                                <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center'>{selectedStartDate ? selectedStartDate : 'Select Date'}</h1>
                                <Link onClick={(e) => { handleDateChange(new Date(), 'start') }} className='absolute top-1/2 right-2 transform -translate-y-1/2 z-20 text-center border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black'>Today Date</Link>
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Show To</p>
                            <div className="relative inline-block px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full">
                                {/* Native input – visually hidden but focusable */}
                                <input
                                    type="date"
                                    onChange={(e) => { handleDateChange(e.target.value, 'end') }}
                                    className="loan-date opacity-0 z-20 absolute"
                                />
                                <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center'>{selectedEndDate ? selectedEndDate : 'Select Date'}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <Link onClick={() => { setSortedData([]); setSelectedStartDate(""); setSelectedEndDate(""); setIsSortByName(false); setSelectedLoan(""); }} className=' w-80 text-center border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black'>Clear Filter</Link>
                    </div>
                </div>

                <div className='grid mt-8'>
                    <table className='col-span-3'>
                        <thead className='border'>
                            <tr>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00] w-60'>Date</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Trx No</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Receiver Name</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>
                                    <div className='flex items-center gap-4'>
                                        <h1>Whose Loan</h1>
                                        <select
                                            value={selectedLoan}
                                            onChange={(e) => {
                                                setSelectedLoan(e.target.value);
                                                sortByWhoseLoan(e.target.value);
                                            }}
                                            className="outline-none bg-[#0E2433] rounded-xl px-3"
                                        >
                                            <option value=""></option>
                                            {loans.map(data => (
                                                <option key={data.transaction_no} value={data?.payer_name}>
                                                    {data?.payer_name?.charAt(0).toUpperCase() + data?.payer_name.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00] max-w-40'>Payment Method</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00] max-w-40'>Paid Amount</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00] max-w-40'>Till Then Paid</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00] max-w-40'>Due</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                sortedData.length > 0 || selectedStartDate || isSortByName ?
                                    sortedData?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((tr, index) => {
                                        return (
                                            <tr key={index} className='border'>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.date}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.transaction_no}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.receiver_name?.charAt(0).toUpperCase() + tr?.receiver_name.slice(1)}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.whose_loan?.charAt(0).toUpperCase() + tr?.whose_loan.slice(1)}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.payment_method}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2 text-right'>{tr?.amount}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2 text-right'>{tr?.paid_amount}</td>
                                                <td className={`border border-[#FFBF00] px-5 py-2 ${tr?.due !== 0 ? 'text-red-500 text-right' : 'text-green-500 text-center'}`}>{tr?.due !== 0 ? tr?.due : 'Clear'}</td>
                                            </tr>
                                        )
                                    }) :

                                    expense?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((tr, index) => {
                                        return (
                                            <tr key={index} className='border'>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.date}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.transaction_no}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.receiver_name?.charAt(0).toUpperCase() + tr?.receiver_name.slice(1)}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.whose_loan?.charAt(0).toUpperCase() + tr?.whose_loan.slice(1)}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.payment_method}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2 text-right'>{tr?.amount}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2 text-right'>{tr?.paid_amount}</td>
                                                <td className={`border border-[#FFBF00] px-5 py-2 ${tr?.due !== 0 ? 'text-red-500 text-right' : 'text-green-500 text-center'}`}>{tr?.due !== 0 ? tr?.due : 'Clear'}</td>
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExpensesPaybackLoans;