import React, { useEffect, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { BallTriangle } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';

const RevenuesLoan = () => {
    const [loading, setLoading] = useState(false);
    const [revenue, setRevenue] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(`https://active-interior-f9hq.onrender.com/accounts`)
            .then(res => res.json())
            .then(data => {
                setRevenue(data?.loans);
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
        const currentDate = new Date();
        const gottedDate = new Date(e);
        const rawValue = e;        // 2026-01-22
        const formatted = formatDate(rawValue); // January 22, 2026
        if (category === 'start') {
            setSelectedStartDate(formatted);
            const sortedData = revenue?.filter(rvn => {
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
                const sortedData = revenue?.filter(rvn => { return new Date(rvn?.date) >= new Date(selectedStartDate) && new Date(rvn?.date) <= new Date(formatted) });
                setSortedData(sortedData);
            }
        }
    };
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
                {/* <div className='fixed w-full  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className={`w-full ${modal ? 'flex' : 'hidden'} items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-screen`}>
                        <div className='w-[40%] h-fit p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative'>
                            <IoMdCloseCircle className='text-4xl text-[#FFBF00] absolute top-1 right-1 cursor-pointer' onClick={() => { setModal(!modal) }} />
                            <h1 className='text-2xl text-center text-[#FFBF00]'>TRANSACTION DETAILS</h1>
                            <h1 className='text-center'>{selectedData?.status ? <span className='text-red-500'>Unpaid</span> : <span className='text-green-500'>Paid</span>}</h1>
                            <div className='h-fit grid grid-cols-2 gap-5 overflow-y-scroll mt-5 scrollbar-handle w-full'>
                                <h1><span className='text-[#FFBF00]'>Trx No:</span> {selectedData?.transaction_no}</h1>
                                <h1><span className='text-[#FFBF00]'>Date:</span> {selectedData?.date}</h1>
                                <h1><span className='text-[#FFBF00]'>Payer Name:</span> {selectedData?.payer_name?.charAt(0).toUpperCase() + selectedData?.payer_name?.slice(1)}</h1>
                                <h1><span className='text-[#FFBF00]'>Payback Date:</span> {selectedData?.payback_date}</h1>
                                <h1><span className='text-[#FFBF00]'>Payment Method:</span> {selectedData?.payment_method}</h1>
                                <h1><span className='text-[#FFBF00]'>Receiving Place:</span> {selectedData?.receiving_place}</h1>
                                <h1><span className='text-[#FFBF00]'>Amount:</span> {selectedData?.amount}</h1>
                                <h1><span className='text-[#FFBF00]'>Paid Amount:</span> {selectedData?.paid_amount}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    <div className="grid grid-cols-3 gap-5">
                        {
                            revenue?.map((tr, index) =>
                                <div key={index}>
                                    <div className='py-1 px-3 text-sm border-2 border-[#FFBF00] rounded-xl h-fit shadow-md shadow-[#FFBF00] w-full flex items-center justify-between cursor-pointer'>
                                        <div>
                                            <h1><span className='text-[#FFBF00]'>Trx No:</span> {tr?.transaction_no}</h1>
                                            <h1><span className='text-[#FFBF00]'>Date:</span> {tr?.date}</h1>
                                            <h1><span className='text-[#FFBF00]'>Payer Name:</span> {tr?.payer_name?.charAt(0).toUpperCase() + tr?.payer_name.slice(1)}</h1>
                                        </div>
                                        <Link onClick={() => { setSelectedData(tr); setModal(!modal) }} className='border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black'>View Details</Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                } */}

                <div className='flex w-full items-end gap-8'>
                    <div className='flex items-center justify-between gap-14 flex-1'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Show From</p>
                            <div className="relative inline-block px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full">
                                {/* Native input – visually hidden but focusable */}
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
                        <Link onClick={() => { setSortedData([]); setSelectedStartDate(""); setSelectedEndDate(""); }} className=' w-80 text-center border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black'>Clear Filter</Link>
                    </div>
                </div>

                <div className='grid mt-8'>
                    <table className='col-span-3'>
                        <thead className='border'>
                            <tr>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Trx No</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Payer Name</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Payback Date</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Payment Method</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Receiving Place</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Paid Amount</th>
                                <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                sortedData.length > 0 || selectedStartDate ?
                                    sortedData?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((tr, index) => {
                                        return (
                                            <tr key={index} className='border'>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.date}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.transaction_no}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.payer_name?.charAt(0).toUpperCase() + tr?.payer_name.slice(1)}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.payback_date}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.payment_method}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.receiving_place}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.amount}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.paid_amount}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.status ? <span className='text-red-500'>Unpaid</span> : <span className='text-green-500'>Paid</span>}</td>
                                            </tr>
                                        )
                                    }) :

                                    revenue?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((tr, index) => {
                                        return (
                                            <tr key={index} className='border'>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.date}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.transaction_no}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.payer_name?.charAt(0).toUpperCase() + tr?.payer_name.slice(1)}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.payback_date}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.payment_method}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.receiving_place}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.amount}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.paid_amount}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{tr?.status ? <span className='text-red-500'>Unpaid</span> : <span className='text-green-500'>Paid</span>}</td>
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

export default RevenuesLoan;