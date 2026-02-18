import React, { useEffect, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { BallTriangle } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';
const ExpensesMaterialPurchase = () => {
    const [loading, setLoading] = useState(false);
    const [expense, setExpense] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [voucherInfo, setVoucherInfo] = useState({});
    const [voucherModal, setVoucherModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`https://active-interior-f9hq.onrender.com/accounts`)
            .then(res => res.json())
            .then(data => {
                setExpense(data?.materials_purchase);
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
    return (
        <div className='p-7 h-full relative'>
            <div className={`w-full h-screen ${voucherModal ? 'flex' : 'hidden'} items-center justify-center fixed z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                <div className='w-[50%] h-[70%] p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative'>
                    <IoMdCloseCircle className='text-4xl text-[#FFBF00] absolute top-1 right-1 cursor-pointer' onClick={() => { setVoucherModal(!voucherModal) }} />
                    <h1 className='text-2xl text-center text-[#FFBF00]'>EXPENSE VOUCHER</h1>
                    {
                        voucherInfo ?
                            <div className='border border-[#FFBF00] p-5 rounded-lg mt-5 text-sm w-full max-h-[90%] overflow-y-scroll scrollbar-handle'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <h1>Transaction No: {voucherInfo?.transaction_no}</h1>
                                    </div>
                                    <div>
                                        <h1>Date: {voucherInfo?.date}</h1>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-14'>
                                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                        <p className='text-[#FFBF00]'>Receiver Name: {voucherInfo?.receiver_name}</p>
                                        {/* <h1>Date: {voucherInfo?.receiver_name}</h1> */}
                                    </div>
                                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                        <p className='text-[#FFBF00]'>Payment Method: {voucherInfo?.payment_method}</p>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-14'>
                                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                        <p className='text-[#FFBF00]'>Address: {voucherInfo?.address}</p>
                                    </div>
                                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                        <p className='text-[#FFBF00]'>Expense Catetgory: {voucherInfo?.cost_category}</p>
                                    </div>
                                </div>
                                <div className={`${voucherInfo?.service_and_laborer?.length !== 0 ? 'grid' : 'hidden'} mt-5`}>
                                    <table>
                                        <thead>
                                            <tr className="text-white">
                                                <th className="border-2 border-[#FFBF00] p-2">Service And Laborer Description</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-32">How Many</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-28">Rate</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-28">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                voucherInfo?.service_and_laborer?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="border-2 border-[#FFBF00] p-2">
                                                            {item?.description}
                                                        </td>
                                                        <td className="border-2 border-[#FFBF00] p-2 text-center">
                                                            {item?.number_of_laborer}
                                                        </td>
                                                        <td className="border-2 border-[#FFBF00] p-2 text-right">
                                                            {item?.rate}
                                                        </td>
                                                        <td className="border-2 border-[#FFBF00] p-2 text-right">
                                                            {item?.amount}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {/* ------------------- Materials ---------------------------- */}
                                <div className={`${voucherInfo?.parts_and_materials?.length !== 0 ? 'grid' : 'hidden'} mt-5`}>
                                    <table>
                                        <thead>
                                            <tr className="text-white">
                                                <th className="border-2 border-[#FFBF00] p-2">Parts And Materials Description</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-32">Quantity</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-28">Rate</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-28">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                voucherInfo?.parts_and_materials?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="border-2 border-[#FFBF00] p-2">
                                                            {item?.description}
                                                        </td>
                                                        <td className="border-2 border-[#FFBF00] p-2 text-center">
                                                            {item?.quantity}
                                                        </td>
                                                        <td className="border-2 border-[#FFBF00] p-2 text-right">
                                                            {item?.rate}
                                                        </td>
                                                        <td className="border-2 border-[#FFBF00] p-2 text-right">
                                                            {item?.amount}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {/* ----------------- End Materials -------------------------- */}

                                <div className='grid mt-5'>
                                    <table className="border-collapse min-w-max text-md">
                                        <tbody>
                                            <tr className='border'>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40'>
                                                    <div className='flex items-center gap-3 w-fit'>
                                                        <h1 className='w-full'>Other Cost</h1>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40'>
                                                    <div>
                                                        <h1 className='w-full'>{voucherInfo?.other_cost}</h1>
                                                    </div>
                                                </td>
                                                <td className='border border-transparent px-5 py-2'>

                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40 border-l-2'>
                                                    <div>
                                                        <h1>Subtotal</h1>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40'>
                                                    <div>
                                                        <h1 className='w-full'>{ }</h1>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='border'>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40'>
                                                    <div className='flex items-center gap-3 w-fit'>
                                                        <h1 className='w-full'>Tax Rate %</h1>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40'>
                                                    <div>
                                                        <h1 className='w-full'>{voucherInfo?.tax_rate}</h1>
                                                    </div>
                                                </td>
                                                <td className='border border-transparent px-5 py-2'>

                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40 border-l-2'>
                                                    <div>
                                                        <div>
                                                            <h1>Total Tax</h1>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40'>
                                                    <div>
                                                        <h1 className='w-full'>{voucherInfo?.tax}</h1>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='border'>
                                                <td className='border-2 border-transparent px-5 py-2 w-40'>
                                                    <div className='flex items-center gap-3 w-fit'>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-transparent px-5 py-2 w-40'>
                                                    <div>
                                                    </div>
                                                </td>
                                                <td className='border border-transparent px-5 py-2'>

                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40 border-l-2'>
                                                    <div>
                                                        <div>
                                                            <h1>Total</h1>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40'>
                                                    <div>
                                                        <h1 className='w-full'>{voucherInfo?.total}</h1>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className="border-collapse min-w-max text-md mt-5">
                                        <tbody>
                                            <tr className='border'>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40'>
                                                    <div className='flex items-center justify-between gap-3 w-full'>
                                                        <h1 className='w-full'>Paid</h1>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40'>
                                                    <div>
                                                        <h1 className='w-full'>{voucherInfo?.paid}</h1>
                                                    </div>
                                                </td>
                                                <td className='border border-transparent px-5 py-2'>

                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40 border-l-2'>
                                                    <div>
                                                        <div>
                                                            <h1>Due</h1>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-2 py-2 w-40'>
                                                    <div>
                                                        <h1 className='w-full'>{voucherInfo?.due}</h1>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mt-5'>
                                    <div className={`${voucherInfo?.transactions?.length !== 0 ? 'grid' : 'hidden'}`}>
                                        <h1 className='text-[#FFBF00] text-center text-xl mb-5'>Transactions</h1>
                                        <table>
                                            <thead>
                                                <tr className="text-white">
                                                    <th className="border-2 border-[#FFBF00] p-2 w-50">Date</th>
                                                    <th className="border-2 border-[#FFBF00] p-2 w-28">TRX No</th>
                                                    <th className="border-2 border-[#FFBF00] p-2">Receiver Name</th>
                                                    <th className="border-2 border-[#FFBF00] p-2 w-32">Payment Method</th>
                                                    <th className="border-2 border-[#FFBF00] p-2 w-32">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    voucherInfo?.transactions?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="border-2 border-[#FFBF00] p-2">
                                                                {item?.date}
                                                            </td>
                                                            <td className="border-2 border-[#FFBF00] p-2 text-center">
                                                                {item?.transaction_no}
                                                            </td>
                                                            <td className="border-2 border-[#FFBF00] p-2">
                                                                {item?.receiver_name}
                                                            </td>
                                                            <td className="border-2 border-[#FFBF00] p-2">
                                                                {item?.payment_method}
                                                            </td>
                                                            <td className="border-2 border-[#FFBF00] p-2 text-right">
                                                                {item?.amount}
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            : ''
                    }
                </div>
            </div>
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

                    <div className='grid mt-8 text-xs'>
                        <table className='col-span-3'>
                            <thead className='border'>
                                <tr>
                                    <th className='border border-[#FFBF00] px-2 py-2 text-[#FFBF00] w-40'>Date</th>
                                    <th className='border border-[#FFBF00] px-2 py-2 text-[#FFBF00]'>Trx No</th>
                                    <th className='border border-[#FFBF00] px-2 py-2 text-[#FFBF00]'>Receiver Name</th>
                                    <th className='border border-[#FFBF00] px-2 py-2 text-[#FFBF00]'>Purchase For</th>
                                    <th className='border border-[#FFBF00] px-2 py-2 text-[#FFBF00]'>Cost Category</th>
                                    <th className='border border-[#FFBF00] px-2 py-2 text-[#FFBF00] w-40'>Payment Method</th>
                                    <th className='border border-[#FFBF00] px-2 py-2 text-[#FFBF00] w-20'>Amount</th>
                                    <th className='border border-[#FFBF00] px-2 py-2 text-[#FFBF00] w-20'>Paid</th>
                                    <th className='border border-[#FFBF00] px-2 py-2 text-[#FFBF00] w-20'>Due</th>
                                    <th className='border border-[#FFBF00] px-2 py-2 text-[#FFBF00] min-w-58'>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    sortedData.length > 0 || selectedStartDate ?
                                        sortedData?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((tr, index) => {
                                            return (
                                                <tr key={index} className='border'>
                                                    <td className='border border-[#FFBF00] px-2 py-2'>{tr?.date}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2'>{tr?.transaction_no}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2'>{tr?.receiver_name?.charAt(0).toUpperCase() + tr?.receiver_name.slice(1)}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2'>{tr?.purchase_for}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2'>{tr?.cost_category}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2 text-center'>{tr?.payment_method}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2 text-right'>{tr?.total}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2 text-right'>{tr?.paid}</td>
                                                    <td className={`border border-[#FFBF00] px-2 py-2 text-right ${tr?.due > 0 ? 'text-red-500' : 'text-green-500'}`}>{tr?.due}</td>
                                                    <td className='border border-[#FFBF00] px-5 w-60 py-2'>
                                                        <Link onClick={() => { setVoucherInfo(tr); setVoucherModal(!voucherModal); }} className='flex justify-center w-full text-center border-2 border-[#FFBF00] px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black'>Voucher & Transactions</Link>
                                                    </td>
                                                </tr>
                                            )
                                        }) :

                                        expense?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((tr, index) => {
                                            return (
                                                <tr key={index} className='border'>
                                                    <td className='border border-[#FFBF00] px-2 py-2'>{tr?.date}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2'>{tr?.transaction_no}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2'>{tr?.receiver_name?.charAt(0).toUpperCase() + tr?.receiver_name.slice(1)}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2'>{tr?.purchase_for}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2'>{tr?.cost_category}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2 text-center'>{tr?.payment_method}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2 text-right'>{tr?.total}</td>
                                                    <td className='border border-[#FFBF00] px-2 py-2 text-right'>{tr?.paid}</td>
                                                    <td className={`border border-[#FFBF00] px-2 py-2 text-right ${tr?.due > 0 ? 'text-red-500' : 'text-green-500'}`}>{tr?.due}</td>
                                                    <td className='border border-[#FFBF00] px-5 w-60 py-2'>
                                                        <Link onClick={() => { setVoucherInfo(tr); setVoucherModal(!voucherModal); }} className='flex justify-center w-full text-center border-2 border-[#FFBF00] px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black'>Voucher & Transactions</Link>
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
    );
};

export default ExpensesMaterialPurchase;