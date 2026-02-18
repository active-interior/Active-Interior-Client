import React, { useEffect, useRef, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CashInInvestment = () => {
    const [loading, setLoading] = useState(false);
    const [transactionSL, setTransactionSL] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        fetch('https://active-interior-f9hq.onrender.com/transaction_sl_no')
            .then(res => res.json())
            .then(data => {
                setTransactionSL(data.sl_no + 1);
                setLoading(false);
            })
    }, []);

    const now = new Date();
    const currentDate = now.toLocaleDateString('en-BD', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
    });

    const handleSubmit = () => {
        setLoading(true);
        const payer_name = payerName.current.value;
        const source_of_income = sourceOfIncome.current.value;
        const purpose = purposeRef.current.value;
        const payment_method = paymentMethod.current.value;
        const amount = transactionAmount.current.value * 1;
        const date = currentDate;
        const transaction_no = transactionSL;

        const transactionData = { transaction_no, date, payer_name, source_of_income, payment_method, purpose, amount };
        const reveneuData = { date, category: 'Personal Investment', reference: [transaction_no], amount, type: "Cash In" };
        const revenueTransaction = { transaction_no, date: currentDate, transaction_with: payer_name, description: purpose, category: 'Personal Investment', amount }

        if (!payer_name || !purpose || !source_of_income || !payment_method || !amount) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "You Missed Any Field to Fill Up",
                showConfirmButton: false,
                timer: 1500
            });
            setLoading(false);
            return
        }
        Swal.fire({
            title: `${amount} Taka?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://active-interior-f9hq.onrender.com/personal_investments`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(transactionData)
                })
                    .then(res => res.json())
                    .then(data => {
                        fetch(`https://active-interior-f9hq.onrender.com/revenue_transactions`, {
                            method: 'PATCH',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(reveneuData)
                        }).then(res => res.json()).then(() => {
                            fetch(`https://active-interior-f9hq.onrender.com/revenues`, {
                                method: 'PATCH',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(revenueTransaction)
                            }).then(res => res.json()).then(() => {
                                fetch(`https://active-interior-f9hq.onrender.com/transaction_sl_no`, { method: 'PATCH' }).then(() => {
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "Payment Received Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    }).then(() => {
                                        setLoading(false);
                                        navigate(0);
                                    })
                                })
                            })
                        })
                    })
            }
        });
    }

    const payerName = useRef();
    const sourceOfIncome = useRef();
    const purposeRef = useRef();
    const paymentMethod = useRef();
    const transactionAmount = useRef();
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
                <h1 className='text-xl text-[#FFBF00] text-center font-semibold'>Cash In</h1>
                <h1 className='text-xl text-[#FFBF00] text-center font-semibold'>From Personal Investment</h1>
                <div>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1>Transaction No: {transactionSL}</h1>
                        </div>
                        <div>
                            <h1>Date: {currentDate}</h1>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-14'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Payer Name (Myself / Others)</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={payerName} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Source of Income</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={sourceOfIncome} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-14'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Payment Method (Bank / Cash / Others)</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={paymentMethod} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Purpose of</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={purposeRef} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-14'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Amount</p>
                            <div className='flex items-center w-full gap-14'>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                    <NumericFormat
                                        getInputRef={transactionAmount}
                                        className="outline-none w-full h-full"
                                        placeholder="Enter Amount"
                                        allowNegative={false}
                                        decimalScale={2}
                                        fixedDecimalScale={false}
                                        thousandSeparator={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-center mt-10'>
                            <button onClick={handleSubmit} className='border-2 border-[#FFBF00] px-8 py-2 rounded-full hover:text-[#FFBF00] hover:border-white duration-200 text-xl'>Confirm</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CashInInvestment;