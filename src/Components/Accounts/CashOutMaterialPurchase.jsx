import React, { useEffect, useRef, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { BallTriangle } from 'react-loader-spinner';
import { NumericFormat } from 'react-number-format';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CashOutMaterialPurchase = () => {
    const [loading, setLoading] = useState(false);
    const [transactionSL, setTransactionSL] = useState(0);
    const navigate = useNavigate();
    const [service, setService] = useState(false);
    const [materials, setMaterials] = useState(false);
    const [laborer, setLaborer] = useState([
        { description: '', number_of_laborer: '', rate: '', amount: 0 },
    ]);
    const [partsAndMaterials, setPartsAndMaterials] = useState([
        { description: '', quantity: '', rate: '', amount: 0 }
    ])
    const [paid, setPaid] = useState(0);
    const [subtotal, setSubtotal] = useState((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)));
    const [taxRate, setTaxRate] = useState(0);
    const [tax, setTax] = useState(0);
    const [otherCost, setOtherCost] = useState(0)
    const [total, setTotal] = useState((parseFloat(otherCost || 0) + parseFloat(tax) + parseFloat(subtotal)).toFixed(2));
    const [due, setDue] = useState((total - parseFloat(paid || 0)).toFixed(2));
    const [reload, setReload] = useState(false);
    const [projectModal, setProjectModal] = useState(false);
    const [projectsData, setProjectsData] = useState([]);
    const [WC, setWC] = useState([]);
    const [tab, setTab] = useState('New Purchase');
    const [expense, setExpense] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [payDueModal, setPayDueModal] = useState(false);
    const [voucherInfo, setVoucherInfo] = useState({});

    useEffect(() => {
        setLoading(true);
        setSubtotal((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))
        setTax(((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)).toFixed(2));
        setTotal((parseFloat(otherCost || 0) + ((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)) + parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))).toFixed(2));
        setDue(((parseFloat(otherCost || 0) + ((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)) + parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))) - parseFloat(paid || 0)).toFixed(2));
        setLoading(false);
    }, [reload])

    useEffect(() => {
        setLoading(true);
        fetch('https://active-interior-f9hq.onrender.com/transaction_sl_no')
            .then(res => res.json())
            .then(data => {
                setTransactionSL(data.sl_no + 1);
                setLoading(false);
            })
    }, []);
    useEffect(() => {
        setLoading(true);
        fetch(`https://active-interior-f9hq.onrender.com/accounts`)
            .then(res => res.json())
            .then(data => {
                const sortDuePurchase = data?.materials_purchase?.filter(p => p?.due > 0)
                setExpense(sortDuePurchase);
                setLoading(false);
            })
    }, [])
    useEffect(() => {
        setLoading(true);
        fetch(`https://active-interior-f9hq.onrender.com/construction_projects`).then(res => res.json()).then(data => {
            setProjectsData(data);
            setLoading(false)
        })
    }, []);
    useEffect(() => {
        fetch('https://active-interior-f9hq.onrender.com/work_category')
            .then(res => res.json())
            .then(data => {
                setWC(data.work_categories);
            })
    }, [])

    const now = new Date();
    const currentDate = now.toLocaleDateString('en-BD', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
    });

    const handleChange = (index, field, value) => {
        const newLaborer = [...laborer];
        newLaborer[index][field] = value;

        // auto-calculate total
        const quantity = parseFloat(newLaborer[index].number_of_laborer || 0);
        const rate = parseFloat(newLaborer[index].rate || 0);
        newLaborer[index].amount = parseFloat((quantity * rate).toFixed(2));

        setLaborer(newLaborer);
        setSubtotal((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))
        setTax(((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)).toFixed(2));
        setTotal((parseFloat(otherCost || 0) + ((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)) + parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))).toFixed(2));
        setDue(((parseFloat(otherCost || 0) + ((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)) + parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))) - parseFloat(paid || 0)).toFixed(2));
    };
    const handleMaterialChange = (index, field, value) => {
        const newLaborer = [...partsAndMaterials];
        newLaborer[index][field] = value;

        // auto-calculate total
        const quantity = parseFloat(newLaborer[index].quantity || 0);
        const rate = parseFloat(newLaborer[index].rate || 0);
        newLaborer[index].amount = parseFloat((quantity * rate).toFixed(2));

        setPartsAndMaterials(newLaborer);
        setSubtotal((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))
        setTax(((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)).toFixed(2));
        setTotal((parseFloat(otherCost || 0) + ((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)) + parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))).toFixed(2));
        setDue(((parseFloat(otherCost || 0) + ((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)) + parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))) - parseFloat(paid || 0)).toFixed(2));
    };

    const addLaborerItem = (index) => {
        if ((laborer?.length - 1) == index) {
            setLaborer([...laborer, { description: '', number_of_laborer: '', rate: '', amount: 0 }]);
        }
    };
    const addMaterialItem = (index) => {
        if ((partsAndMaterials?.length - 1) == index) {
            setPartsAndMaterials([...partsAndMaterials, { description: '', quantity: '', rate: '', amount: 0 }]);
        }
    };

    const handleDeleteRow = (indexNo) => {
        if (laborer?.length !== 1) {
            Swal.fire({
                title: "Are you sure?",
                text: `You Are Deleting A Row`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, I am Sure"
            }).then((result) => {
                if (result.isConfirmed) {
                    const allLaborer = [...laborer]
                    allLaborer.splice(parseInt(indexNo), 1);
                    setLaborer(allLaborer)
                    setReload(!reload);
                }
            })
        }
    }
    const handleDeleteMaterialsRow = (indexNo) => {
        if (partsAndMaterials?.length !== 1) {
            Swal.fire({
                title: "Are you sure?",
                text: `You Are Deleting A Row`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, I am Sure"
            }).then((result) => {
                if (result.isConfirmed) {
                    const allMaterials = [...partsAndMaterials]
                    allMaterials.splice(parseInt(indexNo), 1);
                    setPartsAndMaterials(allMaterials)
                    setReload(!reload);
                }
            })
        }
    }

    const handleSubmit = (purpose) => {
        setLoading(true);
        const receiver_name = receiverName.current.value;
        const payment_method = paymentMethod.current.value;
        const address = addressRef.current.value;
        const amount = total * 1;
        const date = currentDate;
        const transaction_no = transactionSL;
        const cost_category = expenseCategory.current.value;

        const loanTransaction = { transaction_no, date, receiver_name, payment_method, paid }
        const transactionData = { date: currentDate, transaction_no: transactionSL, receiver_name: receiverName.current.value, payment_method: paymentMethod.current.value, address: addressRef.current.value, service_and_laborer: service ? laborer : [], parts_and_materials: materials ? partsAndMaterials : [], other_cost: otherCost * 1, tax_rate: taxRate * 1, tax: tax * 1, total: total * 1, paid: paid * 1, due: due * 1, purchase_for: purpose, cost_category, transactions: (paid * 1) === 0 ? [] : [loanTransaction] };
        const expenseData = { date, category: 'Materials Purchase', reference: [transaction_no], amount: paid * 1, type: "Cash Out" };
        const expenseTransaction = { transaction_no, date: currentDate, transaction_with: receiver_name, description: purpose, category: 'Materials Purchase', amount: paid * 1 }

        if (!receiver_name || !payment_method || !cost_category || !address || amount === 0) {
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
            title: `${amount} Taka's Materials?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://active-interior-f9hq.onrender.com/materials_purchase`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(transactionData)
                })
                    .then(res => res.json())
                    .then(data => {
                        fetch(`https://active-interior-f9hq.onrender.com/expenses`, {
                            method: 'PATCH',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(expenseTransaction)
                        }).then(res => res.json()).then(() => {
                            fetch(`https://active-interior-f9hq.onrender.com/transaction_sl_no`, { method: 'PATCH' }).then(() => {
                                if (paid !== 0) {
                                    fetch(`https://active-interior-f9hq.onrender.com/expense_transactions`, {
                                        method: 'PATCH',
                                        headers: {
                                            'content-type': 'application/json'
                                        },
                                        body: JSON.stringify(expenseData)
                                    }).then(res => res.json()).then(() => {
                                        Swal.fire({
                                            position: "center",
                                            icon: "success",
                                            title: "Expense Recorded Successfully",
                                            showConfirmButton: false,
                                            timer: 1500
                                        }).then(() => {
                                            setLoading(false);
                                            navigate(0);
                                        })
                                    })
                                } else {
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "Expense Recorded Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    }).then(() => {
                                        setLoading(false);
                                        navigate(0);
                                    })
                                }
                            })
                        })
                    })
            }
        });
    }


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

    const handlePayDueSubmit = () => {
        setLoading(true);
        const receiver_name = payDueReceiverName.current.value;
        const payment_method = payDuePaymentMethod.current.value;
        const amount = payDueTransactionAmount.current.value * 1;
        const date = currentDate;
        const transaction_no = transactionSL;

        const transactionData = { main_transaction_no: voucherInfo?.transaction_no, transaction_no, date, receiver_name, payment_method, amount };
        const expenseData = { date, category: 'Pay Due', reference: [transaction_no], amount, type: "Cash Out" };
        const expenseTransaction = { transaction_no, date: currentDate, transaction_with: receiver_name, description: `Pay Due To ${voucherInfo?.receiver_name}`, category: 'Pay Due', amount }

        if (!receiver_name || !payment_method || !amount) {
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
                fetch(`https://active-interior-f9hq.onrender.com/pay_due`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(transactionData)
                })
                    .then(res => res.json())
                    .then(data => {
                        fetch(`https://active-interior-f9hq.onrender.com/expense_transactions`, {
                            method: 'PATCH',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(expenseData)
                        }).then(res => res.json()).then(() => {
                            fetch(`https://active-interior-f9hq.onrender.com/expenses`, {
                                method: 'PATCH',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(expenseTransaction)
                            }).then(res => res.json()).then(() => {
                                fetch(`https://active-interior-f9hq.onrender.com/transaction_sl_no`, { method: 'PATCH' }).then(() => {
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "Expense Recorded Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    }).then(() => {
                                        setLoading(false);
                                        setPayDueModal(false);
                                        navigate(0);
                                    })
                                })
                            })
                        })
                    })
            }
        });
    }

    const receiverName = useRef();
    const addressRef = useRef();
    const paymentMethod = useRef();
    const expenseCategory = useRef();
    // --------------
    const payDueReceiverName = useRef();
    const payDuePaymentMethod = useRef();
    const payDueTransactionAmount = useRef();
    return (
        <div className='p-7 h-full relative'>
            <div className={`w-full h-screen ${projectModal ? 'flex' : 'hidden'} items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                <div className='w-[50%] h-60 p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative'>
                    <IoMdCloseCircle className='text-4xl text-[#FFBF00] absolute top-1 right-1 cursor-pointer' onClick={() => { setProjectModal(!projectModal) }} />
                    <h1 className='text-2xl text-center text-[#FFBF00]'>THIS EXPENSE WILL ADD TO</h1>
                    <div className='h-fit overflow-y-scroll grid grid-cols-2 gap-5 mt-5 scrollbar-handle'>
                        {
                            projectsData.filter(p => p.status === true).map((project, index) =>
                                <div key={index} onClick={() => { setProjectModal(!projectModal); setDateModal(!dateModal) }}>
                                    <div onClick={() => { handleSubmit(project.project_name) }} className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center cursor-pointer'>
                                        <h1 className='text-center w-full'>{project.project_name}</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={`w-full h-screen ${payDueModal ? 'flex' : 'hidden'} items-center justify-center fixed z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                <div className='w-[50%] h-fit p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative'>
                    <IoMdCloseCircle className='text-4xl text-[#FFBF00] absolute top-1 right-1 cursor-pointer' onClick={() => { setPayDueModal(!payDueModal) }} />
                    <h1 className='text-2xl text-center text-[#FFBF00]'>Pay <span className='text-green-500'>{voucherInfo?.receiver_name?.toUpperCase()}</span> Due Bill</h1>
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
                                <p className='text-[#FFBF00]'>Receiver Name</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                    <input ref={payDueReceiverName} type="text" className='outline-none w-full' />
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Payment Method (Bank / Cash / Others)</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                    <input ref={payDuePaymentMethod} type="text" className='outline-none w-full' />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-14'>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Amount</p>
                                <div className='flex items-center w-full gap-14'>
                                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                        <NumericFormat
                                            getInputRef={payDueTransactionAmount}
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
                                <button onClick={() => { handlePayDueSubmit() }} className='border-2 border-[#FFBF00] px-8 py-2 rounded-full hover:text-[#FFBF00] hover:border-white duration-200 text-xl'>Confirm</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
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
                <div className={`pb-7 ${loading ? 'hidden' : ''}`}>
                    <h1 className='text-xl text-[#FFBF00] text-center font-semibold'>Cash Out</h1>
                    <h1 className='text-xl text-[#FFBF00] text-center font-semibold'>Materials Purchase</h1>
                    <div className='flex items-center gap-10'>
                        <Link onClick={() => { setTab('New Purchase') }} className={`${tab === 'New Purchase' ? 'bg-[#FFBF00] text-black' : ''} text-nowrap text-center border-2 border-[#FFBF00] px-4 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black`}>New Purchase</Link>
                        <Link onClick={() => { setTab('Pay Due') }} className={`${tab === 'Pay Due' ? 'bg-[#FFBF00] text-black' : ''} text-nowrap text-center border-2 border-[#FFBF00] px-4 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black`}>Pay Due</Link>
                    </div>
                    <div className={`${tab === 'New Purchase' ? '' : 'hidden'}`}>
                        <div>
                            <div className='border-2 border-[#FFBF00] p-5 rounded-lg mt-5'>
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
                                        <p className='text-[#FFBF00]'>Receiver Name</p>
                                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                            <input ref={receiverName} type="text" className='outline-none w-full' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                        <p className='text-[#FFBF00]'>Payment Method (Bank / Cash / Others)</p>
                                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                            <input ref={paymentMethod} type="text" className='outline-none w-full' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-14'>
                                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                        <p className='text-[#FFBF00]'>Address</p>
                                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                            <input ref={addressRef} type="text" className='outline-none w-full' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                        <p className='text-[#FFBF00]'>Expense Catetgory</p>
                                        <div className=' pr-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                            <select ref={expenseCategory} name="work_category" id="work_category" className='outline-none w-full bg-[#0E2433] rounded-xl px-3'>
                                                <option value=""></option>
                                                {
                                                    WC.map((wc, index) => <option key={index} value={wc}>{wc}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                    <p className='text-[#FFBF00]'>Part of Cost</p>
                                    <div className='w-full flex items-center gap-5'>
                                        <div className='flex items-center gap-2'>
                                            <input onChange={() => { setService(!service) }} type="checkbox" id="Service_And_Laborer" name="Service_And_Laborer" value="Service And Laborer" />
                                            <label htmlFor="Service_And_Laborer">Service And Laborer</label><br />
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <input onChange={() => { setMaterials(!materials) }} type="checkbox" id="Parts_And_Materials" name="Parts_And_Materials" value="Parts And Materials" />
                                            <label htmlFor="Parts_And_Materials">Parts And Materials</label><br />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${service ? 'grid' : 'hidden'} mt-5`}>
                                    <table>
                                        <thead>
                                            <tr className="text-white">
                                                <th className="border-2 border-[#FFBF00] p-2 w-20"></th>
                                                <th className="border-2 border-[#FFBF00] p-2">Service And Laborer Description</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-32">How Many</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-28">Rate</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-28">Amount</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-20"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                laborer?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td onClick={() => { handleDeleteRow(index) }} className="border border-[#FFBF00] p-2 text-center hover:text-[#FFBF00] cursor-pointer duration-150"> {laborer?.length === 1 ? '' : '-'} </td>
                                                        <td className="border border-[#FFBF00] p-2">
                                                            <input
                                                                type="text"
                                                                value={item.description}
                                                                onChange={(e) => handleChange(index, 'description', e.target.value)}
                                                                className="w-full p-1 outline-none"
                                                            />
                                                        </td>
                                                        <td className="border border-[#FFBF00] p-2">
                                                            <NumericFormat
                                                                value={item.number_of_laborer}
                                                                onChange={(e) => handleChange(index, 'number_of_laborer', e.target.value)}
                                                                className='outline-none w-full h-full'
                                                                placeholder='0'
                                                                allowNegative={false}
                                                                decimalScale={2}
                                                                fixedDecimalScale={false}
                                                                thousandSeparator={false}
                                                            />
                                                        </td>
                                                        <td className="border border-[#FFBF00] p-2">
                                                            <NumericFormat
                                                                value={item.rate}
                                                                onChange={(e) => { handleChange(index, 'rate', e.target.value) }}
                                                                className="outline-none w-full h-full"
                                                                placeholder="Enter Rate"
                                                                allowNegative={false}
                                                                decimalScale={2}
                                                                fixedDecimalScale={false}
                                                                thousandSeparator={false}
                                                            />
                                                        </td>
                                                        <td className="border border-[#FFBF00] p-2 text-center">
                                                            {item?.amount.toFixed(2)}
                                                        </td>
                                                        <td onClick={() => { addLaborerItem(index) }} className="border border-[#FFBF00] p-2 text-center hover:text-[#FFBF00] cursor-pointer duration-150"> {(laborer?.length - 1) == index ? '+' : ''} </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {/* ------------------- Materials ---------------------------- */}
                                <div className={`${materials ? 'grid' : 'hidden'} mt-5`}>
                                    <table>
                                        <thead>
                                            <tr className="text-white">
                                                <th className="border-2 border-[#FFBF00] p-2 w-20"></th>
                                                <th className="border-2 border-[#FFBF00] p-2">Parts And Materials Description</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-32">Quantity</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-28">Rate</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-28">Amount</th>
                                                <th className="border-2 border-[#FFBF00] p-2 w-20"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                partsAndMaterials?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td onClick={() => { handleDeleteMaterialsRow(index) }} className={`border border-[#FFBF00] p-2 text-center hover:text-[#FFBF00] cursor-pointer duration-150`}> {partsAndMaterials?.length === 1 ? '' : '-'}</td>
                                                        <td className="border border-[#FFBF00] p-2">
                                                            <input
                                                                type="text"
                                                                value={item.description}
                                                                onChange={(e) => handleMaterialChange(index, 'description', e.target.value)}
                                                                className="w-full p-1 outline-none"
                                                            />
                                                        </td>
                                                        <td className="border border-[#FFBF00] p-2">
                                                            <NumericFormat
                                                                value={item.quantity}
                                                                onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
                                                                className='outline-none w-full h-full'
                                                                placeholder='0'
                                                                allowNegative={false}
                                                                decimalScale={2}
                                                                fixedDecimalScale={false}
                                                                thousandSeparator={false}
                                                            />
                                                        </td>
                                                        <td className="border border-[#FFBF00] p-2">
                                                            <NumericFormat
                                                                value={item.rate}
                                                                onChange={(e) => { handleMaterialChange(index, 'rate', e.target.value) }}
                                                                className="outline-none w-full h-full"
                                                                placeholder="Enter Rate"
                                                                allowNegative={false}
                                                                decimalScale={2}
                                                                fixedDecimalScale={false}
                                                                thousandSeparator={false}
                                                            />
                                                        </td>
                                                        <td className="border border-[#FFBF00] p-2 text-center">
                                                            {item?.amount.toFixed(2)}
                                                        </td>
                                                        <td onClick={() => { addMaterialItem(index) }} className="border border-[#FFBF00] p-2 text-center hover:text-[#FFBF00] cursor-pointer duration-150"> {(partsAndMaterials?.length - 1) == index ? '+' : ''} </td>
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
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60'>
                                                    <div className='flex items-center gap-3 w-fit'>
                                                        <h1 className='w-full'>Other Cost</h1>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60'>
                                                    <div>
                                                        <NumericFormat
                                                            onChange={(e) => {
                                                                setOtherCost(e.target.value || 0);
                                                                setTotal((parseFloat(e.target.value || 0) + parseFloat(tax) + parseFloat(subtotal)).toFixed(2));
                                                                setDue(((parseFloat(e.target.value || 0) + parseFloat(tax) + parseFloat(subtotal)) - parseFloat(paid || 0)).toFixed(2));
                                                            }}
                                                            className="outline-none w-full h-full"
                                                            placeholder="Enter Rate"
                                                            allowNegative={false}
                                                            decimalScale={2}
                                                            fixedDecimalScale={false}
                                                            thousandSeparator={false}
                                                        />
                                                    </div>
                                                </td>
                                                <td className='border border-transparent px-5 py-2'>

                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60 border-l-2'>
                                                    <div>
                                                        <h1>Subtotal</h1>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60'>
                                                    <div>
                                                        <h1>{subtotal}</h1>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='border'>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60'>
                                                    <div className='flex items-center gap-3 w-fit'>
                                                        <h1 className='w-full'>Tax Rate %</h1>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60'>
                                                    <div>
                                                        <NumericFormat
                                                            onChange={(e) => {
                                                                setTaxRate(e.target.value || 0);
                                                                setTax(((subtotal / 100) * (e.target.value || 0)).toFixed(2));
                                                                setTotal((parseFloat(otherCost || 0) + parseFloat(subtotal) + ((subtotal / 100) * (e.target.value || 0))).toFixed(2));
                                                                setDue(((parseFloat(otherCost || 0) + parseFloat(subtotal) + ((subtotal / 100) * (e.target.value || 0))) - parseFloat(paid || 0)).toFixed(2));
                                                            }}
                                                            className="outline-none w-full h-full"
                                                            placeholder="Enter Rate"
                                                            allowNegative={false}
                                                            decimalScale={2}
                                                            fixedDecimalScale={false}
                                                            thousandSeparator={false}
                                                        />
                                                    </div>
                                                </td>
                                                <td className='border border-transparent px-5 py-2'>

                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60 border-l-2'>
                                                    <div>
                                                        <div>
                                                            <h1>Total Tax</h1>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60'>
                                                    <div>
                                                        <h1>{tax}</h1>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='border'>
                                                <td className='border-2 border-transparent px-5 py-2 w-60'>
                                                    <div className='flex items-center gap-3 w-fit'>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-transparent px-5 py-2 w-60'>
                                                    <div>
                                                    </div>
                                                </td>
                                                <td className='border border-transparent px-5 py-2'>

                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60 border-l-2'>
                                                    <div>
                                                        <div>
                                                            <h1>Total</h1>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60'>
                                                    <div>
                                                        <h1>{total}</h1>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className="border-collapse min-w-max text-md mt-5">
                                        <tbody>
                                            <tr className='border'>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60'>
                                                    <div className='flex items-center justify-between gap-3 w-full'>
                                                        <h1 className='w-full'>Paid</h1>
                                                        <Link onClick={() => {
                                                            setPaid(total);
                                                            setDue(0)
                                                        }} className='text-nowrap text-center border-2 border-[#FFBF00] px-4 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black'>Full Paid</Link>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60'>
                                                    <div>
                                                        <NumericFormat
                                                            onChange={(e) => {
                                                                setPaid(e.target.value || 0);
                                                                setDue(((parseFloat(otherCost || 0) + ((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)) + parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))).toFixed(2) - parseFloat(e.target.value || 0)).toFixed(2) || 0)
                                                            }}
                                                            className="outline-none w-full h-full"
                                                            placeholder="Enter Rate"
                                                            allowNegative={false}
                                                            decimalScale={2}
                                                            fixedDecimalScale={false}
                                                            thousandSeparator={false}
                                                        />
                                                    </div>
                                                </td>
                                                <td className='border border-transparent px-5 py-2'>

                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60 border-l-2'>
                                                    <div>
                                                        <div>
                                                            <h1>Due</h1>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='border-2 border-[#FFBF00] px-5 py-2 w-60'>
                                                    <div>
                                                        <h1>{due}</h1>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center justify-center mt-10 gap-10'>
                                <button onClick={() => { handleSubmit('For Store') }} className='border-2 border-[#FFBF00] px-8 py-2 rounded-full hover:text-[#FFBF00] hover:border-white duration-200 text-xl'>To Store</button>
                                <button onClick={() => { setProjectModal(!projectModal) }} className='border-2 border-[#FFBF00] px-8 py-2 rounded-full hover:text-[#FFBF00] hover:border-white duration-200 text-xl'>To Project</button>
                            </div>
                        </div>
                    </div>
                    <div className={`${tab === 'Pay Due' ? '' : 'hidden'}`}>
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

                            <div className='grid mt-8 text-sm'>
                                <table className='col-span-3'>
                                    <thead className='border'>
                                        <tr>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00] w-60'>Date</th>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Trx No</th>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Receiver Name</th>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Purchase For</th>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Cost Category</th>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Payment Method</th>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00] w-40'>Amount</th>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00] w-40'>Due</th>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00] max-w-40'>Details</th>
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
                                                            <td className='border border-[#FFBF00] px-5 py-2'>{tr?.receiver_name?.charAt(0).toUpperCase() + tr?.receiver_name.slice(1)}</td>
                                                            <td className='border border-[#FFBF00] px-5 py-2'>{tr?.purchase_for}</td>
                                                            <td className='border border-[#FFBF00] px-5 py-2'>{tr?.cost_category}</td>
                                                            <td className='border border-[#FFBF00] px-5 py-2'>{tr?.payment_method}</td>
                                                            <td className='border border-[#FFBF00] px-5 py-2 text-right'>{tr?.total}</td>
                                                            <td className={`border border-[#FFBF00] px-5 py-2 text-right ${tr?.due > 0 ? 'text-red-500' : 'text-green-500'}`}>{tr?.due}</td>
                                                            <td className='border border-[#FFBF00] px-5 w-60 py-2'>
                                                                <Link onClick={() => { setVoucherInfo(tr); setPayDueModal(!payDueModal); }} className='flex justify-center w-fulltext-center border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black'>Pay Due</Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) :

                                                expense?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((tr, index) => {
                                                    return (
                                                        <tr key={index} className='border'>
                                                            <td className='border border-[#FFBF00] px-5 py-2'>{tr?.date}</td>
                                                            <td className='border border-[#FFBF00] px-5 py-2'>{tr?.transaction_no}</td>
                                                            <td className='border border-[#FFBF00] px-5 py-2'>{tr?.receiver_name?.charAt(0).toUpperCase() + tr?.receiver_name.slice(1)}</td>
                                                            <td className='border border-[#FFBF00] px-5 py-2'>{tr?.purchase_for}</td>
                                                            <td className='border border-[#FFBF00] px-5 py-2'>{tr?.cost_category}</td>
                                                            <td className='border border-[#FFBF00] px-5 py-2'>{tr?.payment_method}</td>
                                                            <td className='border border-[#FFBF00] px-5 py-2 text-right'>{tr?.total}</td>
                                                            <td className={`border border-[#FFBF00] px-5 py-2 text-right ${tr?.due > 0 ? 'text-red-500' : 'text-green-500'}`}>{tr?.due}</td>
                                                            <td className='border border-[#FFBF00] px-5 w-60 py-2'>
                                                                <Link onClick={() => { setVoucherInfo(tr); setPayDueModal(!payDueModal); }} className='flex justify-center w-fulltext-center border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black'>Pay Due</Link>
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
        </div>
    );
};

export default CashOutMaterialPurchase;