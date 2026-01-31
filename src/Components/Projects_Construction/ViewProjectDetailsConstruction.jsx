import React, { useEffect, useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
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
    useEffect(() => {
        setLoading(true)

        fetch(`http://localhost:3000/work_category`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.work_categories);
                setTab(data.work_categories[0]);
            })
            .then(() => {
                fetch(`http://localhost:3000/construction_projects/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        setProject(data);
                        setFilteredCosts(data.project_cost.filter(ct => ct.cost_category === tab))
                        setLoading(false);
                    })
            })
    }, [])
    const location = useLocation();
    const from = location?.state?.pathname;
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
                <div className='grid grid-cols-4 gap-20 mb-10'>
                    <div className='h-30 w-full border-2 border-[#FFBF00] rounded-2xl p-3 flex flex-col items-center justify-center gap-2'>
                        <h1 className='text-xl text-[#FFBF00] text-center'>Project Budget</h1>
                        <h1 className='text-xl'>{project?.project_budget} Taka</h1>
                    </div>
                    <div className='h-30 w-full border-2 border-[#FFBF00] rounded-2xl p-3 flex flex-col items-center justify-center gap-2'>
                        <h1 className='text-xl text-[#FFBF00] text-center'>Total Invest</h1>
                        <h1 className='text-xl'>{project?.project_cost?.reduce((sum, item) => sum + item.amount, 0)} Taka</h1>
                    </div>
                    <div className='h-30 w-full border-2 border-[#FFBF00] rounded-2xl p-3 flex flex-col items-center justify-center gap-2'>
                        <h1 className='text-xl text-[#FFBF00] text-center'>Received Amount</h1>
                        <h1 className='text-xl'>{project?.project_transaction?.reduce((sum, item) => sum + item.amount, 0)} Taka</h1>
                    </div>
                    <div className='h-30 w-full border-2 border-[#FFBF00] rounded-2xl p-3 flex flex-col items-center justify-center gap-2'>
                        <h1 className='text-xl text-[#FFBF00] text-center'>Available Balance</h1>
                        <h1 className='text-xl'>{(project?.project_transaction?.reduce((sum, item) => sum + item.amount, 0)) - (project?.project_cost?.reduce((sum, item) => sum + item.amount, 0))} Taka</h1>
                    </div>
                </div>
                <h1 className='text-2xl text-center text-[#FFBF00]'>{project?.project_name?.toUpperCase()} DETAILS</h1>
                <div className={`flex flex-col items-start w-full gap-2 mt-4`}>
                    <div className="flex gap-5 overflow-x-auto mb-4 px-2 pb-2">
                        <Link to={from || '/construction/staffs'} className={`min-w-fit px-3 py-1 rounded-full text-sm transition-all duration-300 border border-[#FFBF00] bg-[#FFBF00] text-black shadow-md flex items-center gap-2 cursor-pointer`}>
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
                            categories?.map((cat, index) => <NavLink key={index} onClick={() => { setTab(cat); setFilteredCosts(project.project_cost.filter(cost => cost.cost_category === cat)) }} className={(tab === cat) ? ' relative border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 bg-[#FFBF00] text-black' : 'relative border-2 border-[#FFBF00] px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 text-[#FFBF00] hover:bg-[#FFBF00] hover:text-black'}>{cat} <span className={`absolute z-10 -top-4 -right-4 text-[8px] ${project?.project_cost?.filter(cost => cost.cost_category === cat).length === 0 ? 'hidden' : 'flex'} items-center justify-center border-2 bg-[#0E2433] rounded-full w-8 h-8 text-center text-[#FFBF00]`}>{project?.project_cost?.filter(cost => cost.cost_category === cat).length}</span></NavLink>)
                        }
                    </div>
                    <div className='grid mt-8'>
                        <table className='col-span-3'>
                            <thead className='border'>
                                <tr>
                                    <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Date</th>
                                    <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Description</th>
                                    <th className='border border-[#FFBF00] px-5 py-2 text-[#FFBF00]'>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredCosts?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(cost => {
                                        return (
                                            <tr className='border'>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{cost?.date}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{cost?.cost_description}</td>
                                                <td className='border border-[#FFBF00] px-5 py-2'>{cost?.amount}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
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
                                    project.project_transaction?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(tran => {
                                        return (
                                            <tr className='border'>
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
    );
};

export default ViewProjectDetailsConstruction;