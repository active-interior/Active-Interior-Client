import React, { useEffect, useRef, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { Watch } from 'react-loader-spinner';
import { NavLink, replace, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const StaffsTransectionsConstruction = () => {
    const [loading, setLoading] = useState(false);
    const [loadingTr, setLoadingTr] = useState(false);
    const [transectionModal, setransectionModal] = useState(false);
    const [reload, setReload] = useState(false);
    const [staffFinance, setStaffFinance] = useState({ income: 0, received: 0, available_balance: 0 })
    const testref = useRef();
    const [staffsData, setStaffsData] = useState([]);
    const [transectionData, setransectionData] = useState('');
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


    const [selectedStaffId, setSelectedStaffId] = useState(null);


    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3000/construction_staffs`).then(res => res.json()).then(data => {
            setStaffsData(data);
            setLoading(false)
        })
    }, [reload])

    const getTransectionData = (id) => {
        setransectionData([])

        setransectionModal(!transectionModal);
        setransectionData(id);
    }

    const handletransectionData = (id) => {
        setLoadingTr(true);
        const previousData = staffsData.filter(st => st._id === id)[0].staff_transections;
        const transection_amount = transectionAmmountRef.current.value;
        const transection_comment = transectionCommentRef.current.value;
        const now = new Date();
        const currentDate = now.toLocaleDateString('en-BD', {
            day: 'numeric',
            year: 'numeric',
            month: 'long',
        });
        const transection_data = { transection_data: { date: currentDate, amount: transection_amount * 1, comment: transection_comment } }
        fetch(`http://localhost:3000/construction_staffs/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(transection_data)
        }).then(res => res.json()).then(data => {
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
                setReload(!reload)
            })
        })
    }
    const handleClosing = (id) => {
        const previousData = staffsData.filter(st => st._id === id)[0];
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
                        setReload(!reload);
                    })
                })
            }
        })
    }

    const handleFinanceDetails = (id) => {
        const staff = staffsData.find(staff => staff._id === id);

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
        <div className='p-7 h-full relative'>
            <div className='flex flex-col h-full'>
                <h1 className='text-2xl text-center text-[#FFBF00]'>STAFFS TRANSACTIONS</h1>
                <div className={`${selectedStaffId ? 'hidden' : 'flex'} flex-col items-start w-full gap-2 mt-4`}>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
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
                </div>
                <div className={`w-full ${transectionModal ? 'flex' : 'hidden'} items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 min-h-95`}>
                    <div id='scrollbar-handle' className={`${loadingTr ? 'hidden' : ''} w-[50%] p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative`}>
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
                    <div className={`${loadingTr ? 'flex' : 'hidden'} items-center justify-center w-[50%] p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative`}>
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
                <div className={`${loading ? "hidden" : ""} mt-8 relative transition-all duration-500 ease-in-out ${selectedStaffId ? 'h-full' : 'h-fit'}`}>
                    <div onClick={() => { setSelectedStaffId(null) }} className={`z-50 right-1 top-1 cursor-pointer ${selectedStaffId ? 'absolute' : 'hidden'}`}>
                        <IoMdCloseCircle className="text-4xl text-[#FFBF00] cursor-pointer" />
                    </div>
                    <div className={`${tabs === 'Electric' ? 'grid' : 'hidden'} grid-cols-2 gap-5`}>
                        {Electric.map((staff) => {
                            const isSelected = selectedStaffId === staff._id;

                            return (
                                <div
                                    key={staff._id}
                                    onClick={() => {
                                        setSelectedStaffId(staff._id);
                                        handleFinanceDetails(staff._id);
                                    }}
                                    className={`border-2 border-[#FFBF00] transition-all duration-500 ease-in-out ${selectedStaffId && !isSelected ? "hidden" : ""} ${isSelected ? "absolute inset-0 z-0 bg_theme rounded-2xl shadow-md shadow-[#FFBF00] p-10 overflow-auto" : "p-3 h-fit rounded-xl border-2 border-[#FFBF00] cursor-pointer"} scrollbar-handle`}>
                                    {/* STAFF NAME (always visible) */}
                                    {/* CLOSE BUTTON */}
                                    <h1 className="text-center text-[#FFBF00] text-xl">
                                        {staff.staff_name}
                                    </h1>
                                    {/* EXPANDED CONTENT */}
                                    {isSelected && (
                                        <div className="mt-10 grid grid-cols-4 gap-6 text-lg">
                                            <h1>
                                                <span className="text-[#FFBF00]">Last Week Due:</span>{" "}
                                                {staff.due || 0}
                                            </h1>
                                            <h1>
                                                <span className="text-[#FFBF00]">Total Income:</span>{" "}
                                                {staff.income || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Total Received:</span>{" "}
                                                {staff.withdraw || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Available Balance:</span>{" "}
                                                {staff.available_balance || 0}
                                            </h1>
                                            <div className='col-span-4 flex gap-5 items-center justify-center mt-7'>
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
                                            <h1 className='text-2xl text-center text-[#FFBF00] col-span-4 mt-5'>TRANSACTION DETAILS</h1>
                                            <table className='col-span-4'>
                                                <thead className='border'>
                                                    <tr>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Description</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        staff.staff_transections?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(transection => {
                                                            return (
                                                                <tr className='border'>
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
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className={`${tabs === 'Sanitary' ? 'grid' : 'hidden'} grid-cols-2 gap-5`}>
                        {Sanitary.map((staff) => {
                            const isSelected = selectedStaffId === staff._id;

                            return (
                                <div
                                    key={staff._id}
                                    onClick={() => {
                                        setSelectedStaffId(staff._id);
                                        handleFinanceDetails(staff._id);
                                    }}
                                    className={`border-2 border-[#FFBF00] transition-all duration-500 ease-in-out ${selectedStaffId && !isSelected ? "hidden" : ""} ${isSelected ? "absolute inset-0 z-0 bg_theme rounded-2xl shadow-md shadow-[#FFBF00] p-10 overflow-auto" : "p-3 h-fit rounded-xl border-2 border-[#FFBF00] cursor-pointer"} scrollbar-handle`}>
                                    {/* STAFF NAME (always visible) */}
                                    {/* CLOSE BUTTON */}
                                    <h1 className="text-center text-[#FFBF00] text-xl">
                                        {staff.staff_name}
                                    </h1>
                                    {/* EXPANDED CONTENT */}
                                    {isSelected && (
                                        <div className="mt-10 grid grid-cols-4 gap-6 text-lg">
                                            <h1>
                                                <span className="text-[#FFBF00]">Last Week Due:</span>{" "}
                                                {staff.due || 0}
                                            </h1>
                                            <h1>
                                                <span className="text-[#FFBF00]">Total Income:</span>{" "}
                                                {staff.income || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Total Received:</span>{" "}
                                                {staff.withdraw || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Available Balance:</span>{" "}
                                                {staff.available_balance || 0}
                                            </h1>
                                            <div className='col-span-4 flex gap-5 items-center justify-center mt-7'>
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
                                            <h1 className='text-2xl text-center text-[#FFBF00] col-span-4 mt-5'>TRANSACTION DETAILS</h1>
                                            <table className='col-span-4'>
                                                <thead className='border'>
                                                    <tr>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Description</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        staff.staff_transections?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(transection => {
                                                            return (
                                                                <tr className='border'>
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
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className={`${tabs === 'Gril' ? 'grid' : 'hidden'} grid-cols-2 gap-5`}>
                        {Gril.map((staff) => {
                            const isSelected = selectedStaffId === staff._id;

                            return (
                                <div
                                    key={staff._id}
                                    onClick={() => {
                                        setSelectedStaffId(staff._id);
                                        handleFinanceDetails(staff._id);
                                    }}
                                    className={`border-2 border-[#FFBF00] transition-all duration-500 ease-in-out ${selectedStaffId && !isSelected ? "hidden" : ""} ${isSelected ? "absolute inset-0 z-0 bg_theme rounded-2xl shadow-md shadow-[#FFBF00] p-10 overflow-auto" : "p-3 h-fit rounded-xl border-2 border-[#FFBF00] cursor-pointer"} scrollbar-handle`}>
                                    {/* STAFF NAME (always visible) */}
                                    {/* CLOSE BUTTON */}
                                    <h1 className="text-center text-[#FFBF00] text-xl">
                                        {staff.staff_name}
                                    </h1>
                                    {/* EXPANDED CONTENT */}
                                    {isSelected && (
                                        <div className="mt-10 grid grid-cols-4 gap-6 text-lg">
                                            <h1>
                                                <span className="text-[#FFBF00]">Last Week Due:</span>{" "}
                                                {staff.due || 0}
                                            </h1>
                                            <h1>
                                                <span className="text-[#FFBF00]">Total Income:</span>{" "}
                                                {staff.income || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Total Received:</span>{" "}
                                                {staff.withdraw || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Available Balance:</span>{" "}
                                                {staff.available_balance || 0}
                                            </h1>
                                            <div className='col-span-4 flex gap-5 items-center justify-center mt-7'>
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
                                            <h1 className='text-2xl text-center text-[#FFBF00] col-span-4 mt-5'>TRANSACTION DETAILS</h1>
                                            <table className='col-span-4'>
                                                <thead className='border'>
                                                    <tr>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Description</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        staff.staff_transections?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(transection => {
                                                            return (
                                                                <tr className='border'>
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
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className={`${tabs === 'Thai' ? 'grid' : 'hidden'} grid-cols-2 gap-5`}>
                        {Thai.map((staff) => {
                            const isSelected = selectedStaffId === staff._id;

                            return (
                                <div
                                    key={staff._id}
                                    onClick={() => {
                                        setSelectedStaffId(staff._id);
                                        handleFinanceDetails(staff._id);
                                    }}
                                    className={`border-2 border-[#FFBF00] transition-all duration-500 ease-in-out ${selectedStaffId && !isSelected ? "hidden" : ""} ${isSelected ? "absolute inset-0 z-0 bg_theme rounded-2xl shadow-md shadow-[#FFBF00] p-10 overflow-auto" : "p-3 h-fit rounded-xl border-2 border-[#FFBF00] cursor-pointer"} scrollbar-handle`}>
                                    {/* STAFF NAME (always visible) */}
                                    {/* CLOSE BUTTON */}
                                    <h1 className="text-center text-[#FFBF00] text-xl">
                                        {staff.staff_name}
                                    </h1>
                                    {/* EXPANDED CONTENT */}
                                    {isSelected && (
                                        <div className="mt-10 grid grid-cols-4 gap-6 text-lg">
                                            <h1>
                                                <span className="text-[#FFBF00]">Last Week Due:</span>{" "}
                                                {staff.due || 0}
                                            </h1>
                                            <h1>
                                                <span className="text-[#FFBF00]">Total Income:</span>{" "}
                                                {staff.income || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Total Received:</span>{" "}
                                                {staff.withdraw || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Available Balance:</span>{" "}
                                                {staff.available_balance || 0}
                                            </h1>
                                            <div className='col-span-4 flex gap-5 items-center justify-center mt-7'>
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
                                            <h1 className='text-2xl text-center text-[#FFBF00] col-span-4 mt-5'>TRANSACTION DETAILS</h1>
                                            <table className='col-span-4'>
                                                <thead className='border'>
                                                    <tr>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Description</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        staff.staff_transections?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(transection => {
                                                            return (
                                                                <tr className='border'>
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
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className={`${tabs === 'Stainless Steel' ? 'grid' : 'hidden'} grid-cols-2 gap-5`}>
                        {Stainless_Steel.map((staff) => {
                            const isSelected = selectedStaffId === staff._id;

                            return (
                                <div
                                    key={staff._id}
                                    onClick={() => {
                                        setSelectedStaffId(staff._id);
                                        handleFinanceDetails(staff._id);
                                    }}
                                    className={`border-2 border-[#FFBF00] transition-all duration-500 ease-in-out ${selectedStaffId && !isSelected ? "hidden" : ""} ${isSelected ? "absolute inset-0 z-0 bg_theme rounded-2xl shadow-md shadow-[#FFBF00] p-10 overflow-auto" : "p-3 h-fit rounded-xl border-2 border-[#FFBF00] cursor-pointer"} scrollbar-handle`}>
                                    {/* STAFF NAME (always visible) */}
                                    {/* CLOSE BUTTON */}
                                    <h1 className="text-center text-[#FFBF00] text-xl">
                                        {staff.staff_name}
                                    </h1>
                                    {/* EXPANDED CONTENT */}
                                    {isSelected && (
                                        <div className="mt-10 grid grid-cols-4 gap-6 text-lg">
                                            <h1>
                                                <span className="text-[#FFBF00]">Last Week Due:</span>{" "}
                                                {staff.due || 0}
                                            </h1>
                                            <h1>
                                                <span className="text-[#FFBF00]">Total Income:</span>{" "}
                                                {staff.income || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Total Received:</span>{" "}
                                                {staff.withdraw || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Available Balance:</span>{" "}
                                                {staff.available_balance || 0}
                                            </h1>
                                            <div className='col-span-4 flex gap-5 items-center justify-center mt-7'>
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
                                            <h1 className='text-2xl text-center text-[#FFBF00] col-span-4 mt-5'>TRANSACTION DETAILS</h1>
                                            <table className='col-span-4'>
                                                <thead className='border'>
                                                    <tr>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Description</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        staff.staff_transections?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(transection => {
                                                            return (
                                                                <tr className='border'>
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
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className={`${tabs === 'Tails' ? 'grid' : 'hidden'} grid-cols-2 gap-5`}>
                        {Tails.map((staff) => {
                            const isSelected = selectedStaffId === staff._id;

                            return (
                                <div
                                    key={staff._id}
                                    onClick={() => {
                                        setSelectedStaffId(staff._id);
                                        handleFinanceDetails(staff._id);
                                    }}
                                    className={`border-2 border-[#FFBF00] transition-all duration-500 ease-in-out ${selectedStaffId && !isSelected ? "hidden" : ""} ${isSelected ? "absolute inset-0 z-0 bg_theme rounded-2xl shadow-md shadow-[#FFBF00] p-10 overflow-auto" : "p-3 h-fit rounded-xl border-2 border-[#FFBF00] cursor-pointer"} scrollbar-handle`}>
                                    {/* STAFF NAME (always visible) */}
                                    {/* CLOSE BUTTON */}
                                    <h1 className="text-center text-[#FFBF00] text-xl">
                                        {staff.staff_name}
                                    </h1>
                                    {/* EXPANDED CONTENT */}
                                    {isSelected && (
                                        <div className="mt-10 grid grid-cols-4 gap-6 text-lg">
                                            <h1>
                                                <span className="text-[#FFBF00]">Last Week Due:</span>{" "}
                                                {staff.due || 0}
                                            </h1>
                                            <h1>
                                                <span className="text-[#FFBF00]">Total Income:</span>{" "}
                                                {staff.income || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Total Received:</span>{" "}
                                                {staff.withdraw || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Available Balance:</span>{" "}
                                                {staff.available_balance || 0}
                                            </h1>
                                            <div className='col-span-4 flex gap-5 items-center justify-center mt-7'>
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
                                            <h1 className='text-2xl text-center text-[#FFBF00] col-span-4 mt-5'>TRANSACTION DETAILS</h1>
                                            <table className='col-span-4'>
                                                <thead className='border'>
                                                    <tr>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Description</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        staff.staff_transections?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(transection => {
                                                            return (
                                                                <tr className='border'>
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
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className={`${tabs === 'Interior' ? 'grid' : 'hidden'} grid-cols-2 gap-5`}>
                        {Interior.map((staff) => {
                            const isSelected = selectedStaffId === staff._id;

                            return (
                                <div
                                    key={staff._id}
                                    onClick={() => {
                                        setSelectedStaffId(staff._id);
                                        handleFinanceDetails(staff._id);
                                    }}
                                    className={`border-2 border-[#FFBF00] transition-all duration-500 ease-in-out ${selectedStaffId && !isSelected ? "hidden" : ""} ${isSelected ? "absolute inset-0 z-0 bg_theme rounded-2xl shadow-md shadow-[#FFBF00] p-10 overflow-auto" : "p-3 h-fit rounded-xl border-2 border-[#FFBF00] cursor-pointer"} scrollbar-handle`}>
                                    {/* STAFF NAME (always visible) */}
                                    {/* CLOSE BUTTON */}
                                    <h1 className="text-center text-[#FFBF00] text-xl">
                                        {staff.staff_name}
                                    </h1>
                                    {/* EXPANDED CONTENT */}
                                    {isSelected && (
                                        <div className="mt-10 grid grid-cols-4 gap-6 text-lg">
                                            <h1>
                                                <span className="text-[#FFBF00]">Last Week Due:</span>{" "}
                                                {staff.due || 0}
                                            </h1>
                                            <h1>
                                                <span className="text-[#FFBF00]">Total Income:</span>{" "}
                                                {staff.income || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Total Received:</span>{" "}
                                                {staff.withdraw || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Available Balance:</span>{" "}
                                                {staff.available_balance || 0}
                                            </h1>
                                            <div className='col-span-4 flex gap-5 items-center justify-center mt-7'>
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
                                            <h1 className='text-2xl text-center text-[#FFBF00] col-span-4 mt-5'>TRANSACTION DETAILS</h1>
                                            <table className='col-span-4'>
                                                <thead className='border'>
                                                    <tr>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Description</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        staff.staff_transections?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(transection => {
                                                            return (
                                                                <tr className='border'>
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
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className={`${tabs === 'Painting' ? 'grid' : 'hidden'} grid-cols-2 gap-5`}>
                        {Painting.map((staff) => {
                            const isSelected = selectedStaffId === staff._id;

                            return (
                                <div
                                    key={staff._id}
                                    onClick={() => {
                                        setSelectedStaffId(staff._id);
                                        handleFinanceDetails(staff._id);
                                    }}
                                    className={`border-2 border-[#FFBF00] transition-all duration-500 ease-in-out ${selectedStaffId && !isSelected ? "hidden" : ""} ${isSelected ? "absolute inset-0 z-0 bg_theme rounded-2xl shadow-md shadow-[#FFBF00] p-10 overflow-auto" : "p-3 h-fit rounded-xl border-2 border-[#FFBF00] cursor-pointer"} scrollbar-handle`}>
                                    {/* STAFF NAME (always visible) */}
                                    {/* CLOSE BUTTON */}
                                    <h1 className="text-center text-[#FFBF00] text-xl">
                                        {staff.staff_name}
                                    </h1>
                                    {/* EXPANDED CONTENT */}
                                    {isSelected && (
                                        <div className="mt-10 grid grid-cols-4 gap-6 text-lg">
                                            <h1>
                                                <span className="text-[#FFBF00]">Last Week Due:</span>{" "}
                                                {staff.due || 0}
                                            </h1>
                                            <h1>
                                                <span className="text-[#FFBF00]">Total Income:</span>{" "}
                                                {staff.income || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Total Received:</span>{" "}
                                                {staff.withdraw || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Available Balance:</span>{" "}
                                                {staff.available_balance || 0}
                                            </h1>
                                            <div className='col-span-4 flex gap-5 items-center justify-center mt-7'>
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
                                            <h1 className='text-2xl text-center text-[#FFBF00] col-span-4 mt-5'>TRANSACTION DETAILS</h1>
                                            <table className='col-span-4'>
                                                <thead className='border'>
                                                    <tr>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Description</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        staff.staff_transections?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(transection => {
                                                            return (
                                                                <tr className='border'>
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
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className={`${tabs === 'Others' ? 'grid' : 'hidden'} grid-cols-2 gap-5`}>
                        {Others.map((staff) => {
                            const isSelected = selectedStaffId === staff._id;

                            return (
                                <div
                                    key={staff._id}
                                    onClick={() => {
                                        setSelectedStaffId(staff._id);
                                        handleFinanceDetails(staff._id);
                                    }}
                                    className={`border-2 border-[#FFBF00] transition-all duration-500 ease-in-out ${selectedStaffId && !isSelected ? "hidden" : ""} ${isSelected ? "absolute inset-0 z-0 bg_theme rounded-2xl shadow-md shadow-[#FFBF00] p-10 overflow-auto" : "p-3 h-fit rounded-xl border-2 border-[#FFBF00] cursor-pointer"} scrollbar-handle`}>
                                    {/* STAFF NAME (always visible) */}
                                    {/* CLOSE BUTTON */}
                                    <h1 className="text-center text-[#FFBF00] text-xl">
                                        {staff.staff_name}
                                    </h1>
                                    {/* EXPANDED CONTENT */}
                                    {isSelected && (
                                        <div className="mt-10 grid grid-cols-4 gap-6 text-lg">
                                            <h1>
                                                <span className="text-[#FFBF00]">Last Week Due:</span>{" "}
                                                {staff.due || 0}
                                            </h1>
                                            <h1>
                                                <span className="text-[#FFBF00]">Total Income:</span>{" "}
                                                {staff.income || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Total Received:</span>{" "}
                                                {staff.withdraw || 0}
                                            </h1>

                                            <h1>
                                                <span className="text-[#FFBF00]">Available Balance:</span>{" "}
                                                {staff.available_balance || 0}
                                            </h1>
                                            <div className='col-span-4 flex gap-5 items-center justify-center mt-7'>
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
                                            <h1 className='text-2xl text-center text-[#FFBF00] col-span-4 mt-5'>TRANSACTION DETAILS</h1>
                                            <table className='col-span-4'>
                                                <thead className='border'>
                                                    <tr>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Description</th>
                                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        staff.staff_transections?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(transection => {
                                                            return (
                                                                <tr className='border'>
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
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffsTransectionsConstruction;