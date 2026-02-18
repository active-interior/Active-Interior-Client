import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { BallTriangle } from 'react-loader-spinner';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

const ViewProjectDetailsConstruction = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState([]);
    const [filteredCosts, setFilteredCosts] = useState([]);
    const [tabs, setTabs] = useState('Project Cost Details');
    const [tab, setTab] = useState('');
    const [loading, setLoading] = useState(false);
    const [voucherInfo, setVoucherInfo] = useState({});
    const [voucherModal, setVoucherModal] = useState(false);
    const [detailsInfo, setDetailsInfo] = useState([]);
    const [detailsModal, setDetailsModal] = useState(false);
    useEffect(() => {
        setLoading(true)

        fetch(`https://active-interior-f9hq.onrender.com/work_category`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.work_categories);
                setTab(data.work_categories[0]);
                fetch(`https://active-interior-f9hq.onrender.com/construction_projects/${id}`)
                    .then(res => res.json())
                    .then(projectData => {
                        setProject(projectData);
                        setFilteredCosts([...projectData?.project_cost?.filter(cost => cost.cost_category === data?.work_categories[0]), ...projectData?.materials_purchase?.filter(cost => cost.cost_category === data?.work_categories[0])])
                    })
                setLoading(false);
            })
    }, [])
    const location = useLocation();
    const from = location?.state?.pathname;

    const handleGetCategoryData = (cat) => {
        setTab(cat);
        setFilteredCosts([...project.project_cost.filter(cost => cost.cost_category === cat), ...project.materials_purchase.filter(cost => cost.cost_category === cat)])
    }

    return (
        <div className='p-7 h-full relative'>
            <div className={`w-full h-screen ${voucherModal ? 'flex' : 'hidden'} items-center justify-center fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                <div className='w-[50%] h- p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative'>
                    <IoMdCloseCircle className='text-4xl text-[#FFBF00] absolute top-1 right-1 cursor-pointer' onClick={() => { setVoucherModal(!voucherModal) }} />
                    <h1 className='text-2xl text-center text-[#FFBF00]'>EXPENSE VOUCHER</h1>
                    <div className='h-fit overflow-y-scroll grid gap-5 mt-5 scrollbar-handle'>
                        {
                            voucherInfo ?
                                <div className='border-2 border-[#FFBF00] p-5 rounded-lg mt-5 text-sm'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h1>Transaction No: {voucherInfo?.transaction_no}</h1>
                                        </div>
                                        <div>
                                            <h1>Date: {voucherInfo?.date}</h1>
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
                                                            <td className="border border-[#FFBF00] p-2">
                                                                {item?.description}
                                                            </td>
                                                            <td className="border border-[#FFBF00] p-2 text-center">
                                                                {item?.number_of_laborer}
                                                            </td>
                                                            <td className="border border-[#FFBF00] p-2 text-right">
                                                                {item?.rate}
                                                            </td>
                                                            <td className="border border-[#FFBF00] p-2 text-right">
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
                                                            <td className="border border-[#FFBF00] p-2">
                                                                {item?.description}
                                                            </td>
                                                            <td className="border border-[#FFBF00] p-2 text-center">
                                                                {item?.quantity}
                                                            </td>
                                                            <td className="border border-[#FFBF00] p-2 text-right">
                                                                {item?.rate}
                                                            </td>
                                                            <td className="border border-[#FFBF00] p-2 text-right">
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
                                        <table className="text-md">
                                            <tbody>
                                                <tr className='border'>
                                                    <td className='border-2 border-transparent px-5 py-2 w-60 border-l-2'></td>
                                                    <td className='border border-transparent px-5 py-2'></td>
                                                    <td className='border-2 border-[#FFBF00] px-5 py-2 w-60 border-l-2'>
                                                        <div>
                                                            <h1>Other Cost</h1>
                                                        </div>
                                                    </td>
                                                    <td className='border-2 border-[#FFBF00] px-5 py-2 w-60 border-l-2'>
                                                        {voucherInfo?.other_cost}
                                                    </td>
                                                </tr>
                                                <tr className='border'>
                                                    <td className='border-2 border-transparent px-5 py-2 w-60 border-l-2'></td>
                                                    <td className='border border-transparent px-5 py-2'></td>
                                                    <td className='border-2 border-[#FFBF00] px-5 py-2 w-60 border-l-2'>
                                                        <div>
                                                            <h1>Tax</h1>
                                                        </div>
                                                    </td>
                                                    <td className='border-2 border-[#FFBF00] px-5 py-2 w-60 border-l-2'>
                                                        {voucherInfo?.tax}
                                                    </td>
                                                </tr>
                                                <tr className='border'>
                                                    <td className='border-2 border-transparent px-5 py-2 w-60 border-l-2'></td>
                                                    <td className='border border-transparent px-5 py-2'></td>
                                                    <td className='border-2 border-[#FFBF00] px-5 py-2 w-60 border-l-2'>
                                                        <div>
                                                            <h1>Total</h1>
                                                        </div>
                                                    </td>
                                                    <td className='border-2 border-[#FFBF00] px-5 py-2 w-60 border-l-2'>
                                                        {voucherInfo?.total}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                : ''
                        }
                    </div>
                </div>
            </div>
            <div className={`w-full h-screen ${detailsModal ? 'flex' : 'hidden'} items-center justify-center fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                <div className='w-[50%] h- p-5 shadow-md shadow-[#FFBF00] rounded-2xl bg-[#0E2433] relative'>
                    <IoMdCloseCircle className='text-4xl text-[#FFBF00] absolute top-1 right-1 cursor-pointer' onClick={() => { setDetailsModal(!detailsModal) }} />
                    <h1 className='text-2xl text-center text-[#FFBF00]'>WORKER DETAILS</h1>
                    <div className='h-fit overflow-y-scroll grid gap-5 mt-5 scrollbar-handle'>
                        {
                            detailsInfo ?
                                <div className={`grid mt-5`}>
                                    <table>
                                        <thead>
                                            <tr className="text-[#FFBF00] ">
                                                <th className="border border-[#FFBF00] p-2">Staff Name</th>
                                                <th className="border border-[#FFBF00] p-2 w-32">Shift</th>
                                                <th className="border border-[#FFBF00] p-2 w-28">Bill</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                detailsInfo?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="border border-[#FFBF00] p-2">
                                                            {item?.name}
                                                        </td>
                                                        <td className="border border-[#FFBF00] p-2 text-center">
                                                            {item?.shift}
                                                        </td>
                                                        <td className="border border-[#FFBF00] p-2 text-right">
                                                            {item?.bill}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td className="border-transparent p-2"></td>
                                                <td className="border border-[#FFBF00] p-2 text-center">
                                                    Total
                                                </td>
                                                <td className="border border-[#FFBF00] p-2 text-right">
                                                    {detailsInfo?.reduce((sum, item) => sum + item.bill,0)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                : ''
                        }
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
                <div className={`p-7 ${loading ? 'hidden' : ''}`}>
                    <div className='grid grid-cols-4 gap-20 mb-10'>
                        <div className='h-30 w-full border-2 border-[#FFBF00] rounded-2xl p-3 flex flex-col items-center justify-center gap-2'>
                            <h1 className='text-xl text-[#FFBF00] text-center'>Project Budget</h1>
                            <h1 className='text-xl'>
                                <CountUp
                                    start={project?.project_budget - 5000 || 0}
                                    end={project?.project_budget || 0}
                                    duration={2}
                                />  {' '} Taka
                            </h1>
                        </div>
                        <div className='h-30 w-full border-2 border-[#FFBF00] rounded-2xl p-3 flex flex-col items-center justify-center gap-2'>
                            <h1 className='text-xl text-[#FFBF00] text-center'>Total Cost</h1>
                            <h1 className='text-xl'>
                                <CountUp
                                    start={(project?.project_cost?.reduce((sum, item) => sum + item.amount, 0) + project?.materials_purchase?.reduce((sum, item) => sum + item.total, 0)) - 5000 || 0}
                                    end={(project?.project_cost?.reduce((sum, item) => sum + item.amount, 0) + project?.materials_purchase?.reduce((sum, item) => sum + item.total, 0)) || 0}
                                    duration={3}
                                />  {' '} Taka
                            </h1>
                        </div>
                        <div className='h-30 w-full border-2 border-[#FFBF00] rounded-2xl p-3 flex flex-col items-center justify-center gap-2'>
                            <h1 className='text-xl text-[#FFBF00] text-center'>Received Amount</h1>
                            <h1 className='text-xl'>
                                <CountUp
                                    start={project?.project_transaction?.reduce((sum, item) => sum + item.amount, 0) - 5000 || 0}
                                    end={project?.project_transaction?.reduce((sum, item) => sum + item.amount, 0) || 0}
                                    duration={4}
                                />  {' '} Taka
                            </h1>
                        </div>
                        <div className='h-30 w-full border-2 border-[#FFBF00] rounded-2xl p-3 flex flex-col items-center justify-center gap-2'>
                            <h1 className='text-xl text-[#FFBF00] text-center'>Available Balance</h1>
                            <h1 className='text-xl'>
                                <CountUp
                                    start={(project?.project_transaction?.reduce((sum, item) => sum + item.amount, 0)) - ((project?.project_cost?.reduce((sum, item) => sum + item.amount, 0) + project?.materials_purchase?.reduce((sum, item) => sum + item.total, 0))) - 5000 || 0}
                                    end={(project?.project_transaction?.reduce((sum, item) => sum + item.amount, 0)) - ((project?.project_cost?.reduce((sum, item) => sum + item.amount, 0) + project?.materials_purchase?.reduce((sum, item) => sum + item.total, 0))) || 0}
                                    duration={5}
                                />  {' '} Taka
                            </h1>
                        </div>
                    </div>
                    <h1 className='text-2xl text-center text-[#FFBF00]'>{project?.project_name?.toUpperCase()} DETAILS</h1>
                    <div className={`flex flex-col items-start w-full gap-2 mt-4`}>
                        <div className="flex gap-5 overflow-x-auto mb-4 px-2 pb-2">
                            <Link to={from || '/construction/projects'} className={`min-w-fit px-3 py-1 rounded-full text-sm transition-all duration-300 border border-[#FFBF00] bg-[#FFBF00] text-black shadow-md flex items-center gap-2 cursor-pointer`}>
                                <FaLongArrowAltLeft /> Back
                            </Link>
                            <NavLink onClick={() => { setTabs('Project Cost Details') }} className={`border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Project Cost Details' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Project Cost Details</NavLink>
                            <NavLink onClick={() => { setTabs('Project Information') }} className={`border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Project Information' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Project Information</NavLink>
                            <NavLink onClick={() => { setTabs('Project Transaction') }} className={`border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${tabs === 'Project Transaction' ? "bg-[#FFBF00] text-black" : "text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black"}`}>Project Transaction</NavLink>
                        </div>
                    </div>
                    <div className={`${tabs === 'Project Information' ? '' : 'hidden'}`}>
                        <h1 className='text-2xl text-center text-[#FFBF00] mt-10'>{project?.project_name?.toUpperCase()} INFORMATION</h1>
                        <div className='grid grid-cols-2 gap-x-10 gap-y-5'>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Project SL Number</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.project_sl}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Project Name</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.project_name}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Project Location</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.project_location}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Survey date</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.survey_date}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Project Owner Name</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.owner_name}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Project Owner Mobile Number</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.owner_number}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Project Officer Name</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.officer_name}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Project Officer Mobile Number</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.officer_number}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Project Supervisor Name</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.supervisor_name}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Project Supervisor Mobile Number</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.supervisor_number}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Project Related Person Name</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.project_related_person_name}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Project Related Person Mobile Number</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.project_related_person_number}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Construction Type</p>
                                <div className=' px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.construction_type}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Current Work Position</p>
                                <div className=' px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project.current_work_position}</h1>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-8'>
                                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                    <p className='text-[#FFBF00]'>Foundation Number</p>
                                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                        <h1>{project.foundation_number}</h1>
                                    </div>
                                </div>
                                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                    <p className='text-[#FFBF00]'>Roofing Number</p>
                                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                        <h1>{project.roofing_number}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-8'>
                                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                    <p className='text-[#FFBF00]'>Floor Number</p>
                                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                        <h1>{project.floor_number}</h1>
                                    </div>
                                </div>
                                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                    <p className='text-[#FFBF00]'>Project Budget</p>
                                    <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                        <h1>{project.project_budget}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-8'>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>Supply of Used Materials</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project?.used_materials?.join(", ")}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col items-start w-full gap-2 mt-4'>
                                <p className='text-[#FFBF00]'>What Work is Needed</p>
                                <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex items-center'>
                                    <h1>{project?.whats_need?.join(", ")}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${tabs === 'Project Cost Details' ? '' : 'hidden'}`}>
                        <h1 className='text-2xl text-center text-[#FFBF00] mt-5'>{project?.project_name?.toUpperCase()} COST DETAILS</h1>
                        <div className="flex gap-5 mb-4 px-2 pb-2 mt-5">
                            {
                                categories?.map((cat, index) => <NavLink key={index} onClick={() => { handleGetCategoryData(cat) }} className={(tab === cat) ? ' relative border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'relative border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>{cat} <span className={`absolute z-10 -top-4 -right-4 text-[8px] ${project?.project_cost?.filter(cost => cost.cost_category === cat).length + project?.materials_purchase?.filter(cost => cost.cost_category === cat).length === 0 ? 'hidden' : 'flex'} items-center justify-center border-2 bg-[#0E2433] rounded-full w-8 h-8 text-center text-[#FFBF00]`}>{(project?.project_cost?.filter(cost => cost.cost_category === cat).length || 0) + (project?.materials_purchase?.filter(cost => cost.cost_category === cat).length || 0)}</span></NavLink>)
                            }
                            {/* <NavLink onClick={() => { setTab('materials'); setFilteredCosts(project?.materials_purchase) }} className={(tab === 'materials') ? ' relative border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'relative border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>Materials Purchase <span className={`absolute z-10 -top-4 -right-4 text-[8px] ${project?.materials_purchase?.length === 0 ? 'hidden' : 'flex'} items-center justify-center border-2 bg-[#0E2433] rounded-full w-8 h-8 text-center text-[#FFBF00]`}>{project?.materials_purchase?.length}</span></NavLink> */}
                        </div>
                        {
                            <div className='grid mt-8'>
                                <table className='col-span-3'>
                                    <thead className='border'>
                                        <tr>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Description</th>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                            <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>More Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredCosts?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((cost, index) => {
                                                return (
                                                    <tr key={index} className='border'>
                                                        <td className='border border-[#FFBF00] px-5 py-2'>{cost?.date}</td>
                                                        <td className='border border-[#FFBF00] px-5 py-2'>{cost?.cost_description ? `${cost?.staff_details?.length || 0} ${cost?.cost_description}` : cost?.service_and_laborer?.length > 0 ? 'Laborer And' : ''} {cost?.parts_and_materials?.length > 0 ? 'Materials' : ''}</td>
                                                        <td className='border border-[#FFBF00] px-5 py-2 text-right'>{cost?.amount ? cost?.amount : cost?.total}</td>
                                                        <td className='border border-[#FFBF00] px-5 py-2 w-50'>
                                                            {cost?.amount ?
                                                                <Link onClick={() => { setDetailsInfo(cost?.staff_details); setDetailsModal(!detailsModal); }} className='flex justify-center w-full text-center border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black'>Show Details</Link>
                                                                : <Link onClick={() => { setVoucherInfo(cost); setVoucherModal(!voucherModal); }} className='flex justify-center w-fulltext-center border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#FFBF00] text-[#FFBF00] hover:text-black'>Show Voucher</Link>}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                    <div className={`${tabs === 'Project Transaction' ? '' : 'hidden'}`}>
                        <h1 className='text-2xl text-center text-[#FFBF00] mt-5'>{project?.project_name?.toUpperCase()} TRANSACTIONS DETAILS</h1>

                        <div className='grid mt-8'>
                            <table className='col-span-3'>
                                <thead className='border'>
                                    <tr>
                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Transaction No</th>
                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Payer Name</th>
                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Payment Method</th>
                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Receiving Place</th>
                                        <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        project.project_transaction?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((tran, index) => {
                                            return (
                                                <tr key={index} className='border'>
                                                    <td className='border border-[#FFBF00] px-5 py-2'>{tran?.date}</td>
                                                    <td className='border border-[#FFBF00] px-5 py-2'>{tran?.transaction_no}</td>
                                                    <td className='border border-[#FFBF00] px-5 py-2'>{tran?.payer_name}</td>
                                                    <td className='border border-[#FFBF00] px-5 py-2'>{tran?.payment_method}</td>
                                                    <td className='border border-[#FFBF00] px-5 py-2'>{tran?.receiving_place}</td>
                                                    <td className='border border-[#FFBF00] px-5 py-2'>{tran?.amount}</td>
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

export default ViewProjectDetailsConstruction;