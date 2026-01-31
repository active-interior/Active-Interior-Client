import React, { useEffect, useRef, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CashInProject = () => {
    const [loading, setLoading] = useState(false);
    const [transactionSL, setTransactionSL] = useState(0);
    const [projects, setProjects] = useState([]);
    const [selectedProjectName, setSelectedProjectName] = useState('');
    const [totalReceivedAmount, setTotalReceivedAmount] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3000/transaction_sl_no')
            .then(res => res.json())
            .then(data => {
                setTransactionSL(data.sl_no + 1);
                setLoading(false);
            })
    }, []);
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/construction_projects`)
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
    }, [])

    const now = new Date();
    const currentDate = now.toLocaleDateString('en-BD', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
    });

    const getSelectedProejectData = (pn) => {
        setSelectedProjectName(pn);
        const projectData = projects.find(project => project.project_name === pn);
        const tillNowReceived = projectData?.project_transaction.reduce((sum, item) => sum + item.amount, 0);
        setTotalReceivedAmount(tillNowReceived);
    }

    const handleSubmit = () => {
        setLoading(true);
        const payer_name = payerName.current.value;
        const project_name = projectName.current.value;
        const receiving_place = receivingPlace.current.value;
        const payment_method = paymentMethod.current.value;
        const amount = transactionAmount.current.value * 1;
        const date = currentDate;
        const transaction_no = transactionSL;
        const project = projects.find(prn => prn.project_name === project_name);
        const transactionData = { transaction_no, date, payer_name, payment_method, receiving_place, amount };
        const reveneuData = { date, category: 'Project Payment', reference: project_name, amount };
        if (!payer_name || !project_name || !receiving_place || !payment_method || !amount) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "You Missed Any Field to Fill Up",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }
        fetch(`http://localhost:3000/project_cash_in/${project?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        })
            .then(res => res.json())
            .then(data => {
                fetch(`http://localhost:3000/revenue_transactions`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(reveneuData)
                }).then(res => res.json()).then(rvData => {
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

        // console.log(project, transactionData);
    }

    const payerName = useRef();
    const projectName = useRef();
    const receivingPlace = useRef();
    const paymentMethod = useRef();
    const transactionAmount = useRef();
    const additionalComments = useRef();
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
                            <p className='text-[#FFBF00]'>Payer Name</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={payerName} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Project Name</p>
                            <div className=' pr-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <select ref={projectName} onChange={(e) => { getSelectedProejectData(e.target.value); }} name="project_name" id="project_name" className='outline-none w-full bg-[#0E2433] rounded-xl px-3'>
                                    <option value=""></option>
                                    {
                                        projects.map((pn, index) => <option key={index} value={pn?.project_name}>{pn?.project_name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-14'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Payment Method</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={paymentMethod} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Receiving Place</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={receivingPlace} type="text" className='outline-none w-full' />
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
                                <p className='text-[#FFBF00] w-full'>Till Now Total Received Amount: {totalReceivedAmount}</p>
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

export default CashInProject;