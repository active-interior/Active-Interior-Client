import React, { useEffect, useRef, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { NumericFormat } from 'react-number-format';
import Swal from 'sweetalert2';

const CreateCustomVoucherConstruction = () => {

    const [service, setService] = useState(false);
    const [materials, setMaterials] = useState(false);
    const [laborer, setLaborer] = useState([
        { description: '', number_of_laborer: '', rate: '', amount: 0 },
    ]);
    const [partsAndMaterials, setPartsAndMaterials] = useState([
        { description: '', quantity: '', rate: '', amount: 0 }
    ])
    const [cashReceived, setCashReceived] = useState();
    const [subtotal, setSubtotal] = useState((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)));
    const [taxRate, setTaxRate] = useState();
    const [tax, setTax] = useState(0);
    const [otherCost, setOtherCost] = useState()
    const [total, setTotal] = useState((parseFloat(otherCost || 0) + parseFloat(tax) + parseFloat(subtotal)).toFixed(2));
    const [due, setDue] = useState((total - parseFloat(cashReceived || 0)).toFixed(2));
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [voucherSL, setVoucherSL] = useState(0);

    useEffect(() => {
        setLoading(true);
        setSubtotal((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))
        setTax(((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)).toFixed(2));
        setTotal((parseFloat(otherCost || 0) + ((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)) + parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))).toFixed(2));
        setDue(((parseFloat(otherCost || 0) + ((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)) + parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))) - parseFloat(cashReceived || 0)).toFixed(2));
        setLoading(false);
    }, [reload])

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3000/voucher_sl_no')
            .then(res => res.json())
            .then(data => {
                setVoucherSL(data.sl_no + 1);
                setLoading(false);
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
        setDue(((parseFloat(otherCost || 0) + ((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)) + parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))) - parseFloat(cashReceived || 0)).toFixed(2));
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
        setDue(((parseFloat(otherCost || 0) + ((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)) + parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))) - parseFloat(cashReceived || 0)).toFixed(2));
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

    const clientName = useRef();
    const clientPhone = useRef();
    const expectedStartDate = useRef();
    const expectedEndDate = useRef();
    const workDescription = useRef();
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
                <h1 className='text-xl text-[#FFBF00] text-center font-semibold'>Custom Voucher</h1>
                <div className='border-2 border-[#FFBF00] p-5 rounded-lg mt-5'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1>Voucher No: {voucherSL}</h1>
                        </div>
                        <div>
                            <h1>Date: {currentDate}</h1>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-14'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Client Name</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={clientName} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Client Phone</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={clientPhone} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-14'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Expected Start Date</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={expectedStartDate} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Expected End Date</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={expectedEndDate} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Work Description</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={workDescription} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Additional Comments</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input ref={additionalComments} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Part of Cost</p>
                        <div className='w-full flex items-center gap-5'>
                            <div className='flex items-center gap-2'>
                                <input onChange={() => { setService(!service) }} type="checkbox" id="Service_And_Laborer" name="Service_And_Laborer" value="Service And Laborer" />
                                <label for="Service_And_Laborer">Service And Laborer</label><br />
                            </div>
                            <div className='flex items-center gap-2'>
                                <input onChange={() => { setMaterials(!materials) }} type="checkbox" id="Parts_And_Materials" name="Parts_And_Materials" value="Parts And Materials" />
                                <label for="Parts_And_Materials">Parts And Materials</label><br />
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
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3 w-fit'>
                            <h1 className='w-full'>Cash Received: </h1>
                            <NumericFormat
                                value={cashReceived}
                                onChange={(e) => { setCashReceived(e.target.value); setDue(((parseFloat(otherCost || 0) + ((parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)) || 0) / 100) * parseFloat(taxRate || 0)) + parseFloat((laborer.reduce((sum, item) => sum + item.amount, 0) + partsAndMaterials.reduce((sum, item) => sum + item.amount, 0)))).toFixed(2) - parseFloat(e.target.value)).toFixed(2)) }}
                                className="outline-none w-full h-full"
                                placeholder="Enter Rate"
                                allowNegative={false}
                                decimalScale={2}
                                fixedDecimalScale={false}
                                thousandSeparator={false}
                            />
                        </div>
                        <div>
                            <h1>Subtotal: {subtotal}</h1>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3 w-fit'>
                            <h1 className='w-full'>Tax Rate %</h1>
                            <NumericFormat
                                onChange={(e) => {
                                    setTaxRate(e.target.value);
                                    setTax(((subtotal / 100) * e.target.value).toFixed(2));
                                    setTotal((parseFloat(otherCost || 0) + parseFloat(subtotal) + ((subtotal / 100) * e.target.value)).toFixed(2));
                                    setDue(((parseFloat(otherCost || 0) + parseFloat(subtotal) + ((subtotal / 100) * e.target.value)) - parseFloat(cashReceived || 0)).toFixed(2));
                                }}
                                className="outline-none w-full h-full"
                                placeholder="Enter Rate"
                                allowNegative={false}
                                decimalScale={2}
                                fixedDecimalScale={false}
                                thousandSeparator={false}
                            />
                        </div>
                        <div>
                            <h1>Total Tax: {tax}</h1>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3 w-fit'>
                            <h1 className='w-full'>Other Cost</h1>
                            <NumericFormat
                                value={otherCost}
                                onChange={(e) => {
                                    setOtherCost(e.target.value);
                                    setTotal((parseFloat(e.target.value || 0) + parseFloat(tax) + parseFloat(subtotal)).toFixed(2));
                                    setDue(((parseFloat(e.target.value || 0) + parseFloat(tax) + parseFloat(subtotal)) - parseFloat(cashReceived || 0)).toFixed(2));
                                }}
                                className="outline-none w-full h-full"
                                placeholder="Enter Rate"
                                allowNegative={false}
                                decimalScale={2}
                                fixedDecimalScale={false}
                                thousandSeparator={false}
                            />
                        </div>
                        <div>
                            <h1>Total: {total}</h1>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1>Due: {due}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCustomVoucherConstruction;