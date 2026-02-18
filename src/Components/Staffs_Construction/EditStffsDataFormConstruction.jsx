import React, { useEffect, useRef, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditStffsDataFormConstruction = () => {
    const [loading, setLoading] = useState(false);
    const [staff, setStaff] = useState([])
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true)
        fetch(`https://active-interior-f9hq.onrender.com/construction_staffs/${id}`)
            .then(res => res.json())
            .then(data => {
                setStaff(data)
                setLoading(false);
            })
    }, [])
    

    const handleSubmit = (id) => {
        const staff_name = staffName.current.value;
        const staff_address = staffAddress.current.value;
        const staff_number = staffNumber.current.value;
        const work_category = workCategory.current.value;
        const staff_category = staffCategory.current.value;
        const staff_nid = staffNid.current.value;
        const staff_emergency = staffEmergecy.current.value;
        const staff_blood = staffBlood.current.value;
        const staff_salary = staffSalary.current.value * 1;
        const staff_reference = staffReference.current.value;
        const staffData = { staff_name, staff_address, staff_number, work_category, staff_category, staff_nid, staff_emergency, staff_blood, staff_salary, staff_reference }

        if (staff_salary === 0 || work_category === '') {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "You Did Not Enter Staff Salary Or Work Category",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }
        else {
            setLoading(true);
            fetch(`https://active-interior-f9hq.onrender.com/construction_staffs_edit_form/${id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(staffData)
            }).then(res => res.json()).then(data => {
                if (data.acknowledged) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Data Updated Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        setLoading(false)
                        navigate('/construction/staffs/edit_staffs_data')
                    })
                    
                }
            })
        }
    }

    const staffName = useRef();
    const staffNumber = useRef();
    const staffAddress = useRef();
    const workCategory = useRef();
    const staffCategory = useRef();
    const staffNid = useRef();
    const staffEmergecy = useRef();
    const staffBlood = useRef();
    const staffSalary = useRef();
    const staffReference = useRef();
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
                <h1 className='text-2xl text-center text-[#FFBF00]'>EDIT {staff.staff_name} Data</h1>
                <div className='grid grid-cols-2 gap-x-10 gap-y-5'>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Staff Name</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={staff.staff_name} ref={staffName} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Staff Phone Number</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={staff.staff_number} ref={staffNumber} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Address</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={staff.staff_address} ref={staffAddress} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-8'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Work Catetgory</p>
                            <div className=' pr-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <select defaultValue={staff.work_category} ref={workCategory} name="work_category" id="work_category" className='outline-none w-full bg-[#0E2433] rounded-xl px-3'>
                                    <option value={staff.work_category}>{staff.work_category}</option>
                                    <option value="Electirc">Electirc</option>
                                    <option value="Sanitary">Sanitary</option>
                                    <option value="Gril">Gril</option>
                                    <option value="Thai">Thai</option>
                                    <option value="Stainless Steel">Stainless Steel</option>
                                    <option value="Tails">Tails</option>
                                    <option value="Interior">Interior</option>
                                    <option value="Painting">Painting</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Staff Catetgory</p>
                            <div className=' pr-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <select ref={staffCategory} name="staff_category" id="staff_category" className='outline-none w-full bg-[#0E2433] rounded-xl px-3'>
                                    <option value={staff.staff_category}>{staff.staff_category}</option>
                                    <option value="Mechanic" className=''>Mechanic</option>
                                    <option value="Assistant Mechanic">Assistant Mechanic</option>
                                    <option value="Laborer">Laborer</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>NID Number</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={staff.staff_nid} ref={staffNid} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Emergency Contact</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={staff.staff_emergency} ref={staffEmergecy} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-10'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Blood Group</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input defaultValue={staff.staff_blood} ref={staffBlood} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Salary per Day</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input defaultValue={staff.staff_salary} ref={staffSalary} type="number" className='outline-none w-full' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Reference</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={staff.staff_reference} ref={staffReference} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center mt-10'>
                    <button onClick={() => {handleSubmit(id)}} className='border-2 border-[#FFBF00] px-8 py-2 rounded-full hover:text-[#FFBF00] hover:border-white duration-200 text-xl cursor-pointer'>Update Data</button>
                </div>
            </div>
        </div>
    );
};

export default EditStffsDataFormConstruction;