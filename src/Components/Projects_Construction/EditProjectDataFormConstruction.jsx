import React, { useEffect, useRef, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditProjectDataFormConstruction = () => {
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState([]);
    const { id } = useParams();
    const [usedMaterials, setUsedMaterials] = useState([]);
    const [usedMaterialsOther, setUsedMaterialsOther] = useState('');
    const [whatNeed, setWhatNeed] = useState([]);
    const [whatNeedOther, setWhatNeedOther] = useState('');
    const [reload, setReload] = useState(false);
    useEffect(() => {
        setLoading(true)
        fetch(`https://active-interior-f9hq.onrender.com/construction_projects/${id}`).then(res => res.json()).then(data => { setProject(data); setUsedMaterials(data.used_materials); setLoading(false) })
    }, [reload])

    console.log(project)
    const navigate = useNavigate();
    const location = useLocation();




    const handleSubmit = () => {
        const project_sl = projectSL.current.value;
        const project_name = projectName.current.value;
        const project_location = projectLocation.current.value;
        const survey_date = surveyDate.current.value;
        const owner_name = ownerName.current.value;
        const owner_number = ownerNumber.current.value;
        const officer_name = officerName.current.value;
        const officer_number = officerNumber.current.value;
        const supervisor_name = supervisorName.current.value;
        const supervisor_number = supervisorNumber.current.value;
        const project_related_person_name = prpName.current.value;
        const project_related_person_number = prpNumber.current.value;
        const construction_type = constructionType.current.value;
        const current_work_position = currentWorkPosition.current.value;
        const foundation_number = foundationNumber.current.value;
        const roofing_number = roofingNumber.current.value;
        const floor_number = floorNumber.current.value;
        const project_budget = projectBudget.current.value;
        const project_cost = [];
        const projectData = { project_sl, project_name, project_location, survey_date, owner_name, owner_number, officer_name, officer_number, supervisor_name, supervisor_number, project_related_person_name, project_related_person_number, construction_type, current_work_position, foundation_number, roofing_number, floor_number, used_materials: usedMaterials, whats_need: whatNeed, status: true, project_budget, project_cost }

        if (project_name === '') {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "You Did Not Enter Project Name",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }
        else {
            setLoading(true);
            fetch(`https://active-interior-f9hq.onrender.com/construction_projects`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(projectData)
            }).then(res => res.json()).then(data => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Project Created Successfully",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setLoading(false);
                    navigate('/construction/projects');
                })
            })
        }
    }

    const handleUsedMaterialsCheckbox = (e) => {
        const value = e.target.value;

        if (e.target.checked) {
            setUsedMaterials([...usedMaterials, value]);
        } else {
            setUsedMaterials(usedMaterials.filter((item) => item !== value));
        }
    };
    const handleWhatNeedCheckbox = (e) => {
        const value = e.target.value;

        if (e.target.checked) {
            setWhatNeed([...whatNeed, value]);
        } else {
            setWhatNeed(whatNeed.filter((item) => item !== value));
        }
    };

    const projectSL = useRef();
    const projectName = useRef();
    const projectLocation = useRef();
    const surveyDate = useRef();
    const ownerName = useRef();
    const ownerNumber = useRef();
    const officerName = useRef();
    const officerNumber = useRef();
    const supervisorName = useRef();
    const supervisorNumber = useRef();
    const prpName = useRef();
    const prpNumber = useRef();
    const constructionType = useRef();
    const currentWorkPosition = useRef();
    const foundationNumber = useRef();
    const roofingNumber = useRef();
    const floorNumber = useRef();
    const projectBudget = useRef();


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
                <h1 className='text-2xl text-center text-[#FFBF00]'>CREATE A NEW PROJECT</h1>
                <div className='grid grid-cols-2 gap-x-10 gap-y-5'>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Project SL Number</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={project?.project_sl} ref={projectSL} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Project Name</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={project?.project_name} ref={projectName} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Project Location</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={project?.project_location} ref={projectLocation} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Survey date</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={project?.survey_date} ref={surveyDate} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Project Owner Name</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={project?.owner_name} ref={ownerName} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Project Owner Mobile Number</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={project?.owner_number} ref={ownerNumber} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Project Officer Name</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={project?.officer_name} ref={officerName} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Project Officer Mobile Number</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={project?.officer_number} ref={officerNumber} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Project Supervisor Name</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={project?.supervisor_name} ref={supervisorName} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Project Supervisor Mobile Number</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={project?.supervisor_number} ref={supervisorNumber} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Project Related Person Name</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={project?.project_related_person_name} ref={prpName} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Project Related Person Mobile Number</p>
                        <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <input defaultValue={project?.project_related_person_number} ref={prpNumber} type="text" className='outline-none w-full' />
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Construction Type</p>
                        <div className=' pr-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <select ref={constructionType} name="staff_category" id="staff_category" className='outline-none w-full bg-[#0E2433] rounded-xl px-3'>
                                <option value={project?.construction_type}>{project?.construction_type}</option>
                                <option value=""></option>
                                <option value="Residential">Residential</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Industrial Area">Industrial Area</option>
                                <option value="Government">Government</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col items-start w-full gap-2 mt-4'>
                        <p className='text-[#FFBF00]'>Current Work Position</p>
                        <div className=' pr-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                            <select ref={currentWorkPosition} name="staff_category" id="staff_category" className='outline-none w-full bg-[#0E2433] rounded-xl px-3'>
                                <option value={project?.current_work_position}>{project?.current_work_positon}</option>
                                <option value=""></option>
                                <option value="Finishing">Finishing</option>
                                <option value="Survey">Survey</option>
                                <option value="Foundation">Foundation</option>
                                <option value="Roofing">Roofing</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-8'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Foundation Number</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input defaultValue={project?.foundation_number} ref={foundationNumber} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Roofing Number</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input defaultValue={project?.roofing_number} ref={roofingNumber} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-8'>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Floor Number</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input defaultValue={project?.floor_number} ref={floorNumber} type="text" className='outline-none w-full' />
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full gap-2 mt-4'>
                            <p className='text-[#FFBF00]'>Project Budget</p>
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-10 shadow-md shadow-[#FFBF00] w-full flex'>
                                <input defaultValue={project?.project_budget} ref={projectBudget} type="number" className='outline-none w-full' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                    <p className='text-[#FFBF00]'>Supply of Used Materials</p>
                    <div className='w-full flex items-center gap-5'>
                        <div className='flex items-center gap-2'>
                            <input checked={usedMaterials.includes("Bricks")} onChange={handleUsedMaterialsCheckbox} type="checkbox" id="Bricks" name="Bricks" value="Bricks" />
                            <label for="Bricks">Bricks</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input checked={usedMaterials.includes("Sand")} onChange={handleUsedMaterialsCheckbox} type="checkbox" id="Sand" name="Sand" value="Sand" />
                            <label for="Sand">Sand</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input checked={usedMaterials.includes("Cement")} onChange={handleUsedMaterialsCheckbox} type="checkbox" id="Cement" name="Cement" value="Cement" />
                            <label for="Cement">Cement</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input checked={usedMaterials.includes("Rods")} onChange={handleUsedMaterialsCheckbox} type="checkbox" id="Rods" name="Rods" value="Rods" />
                            <label for="Rods">Rods</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input checked={usedMaterials.includes("Stones")} onChange={handleUsedMaterialsCheckbox} type="checkbox" id="Stones" name="Stones" value="Stones" />
                            <label for="Stones">Stones</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input checked={usedMaterials.includes("Silicone")} onChange={handleUsedMaterialsCheckbox} type="checkbox" id="Silicone" name="Silicone" value="Silicone" />
                            <label for="Silicone">Silicone</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input checked={usedMaterials.includes("Electrical Items")} onChange={handleUsedMaterialsCheckbox} type="checkbox" id="Electrical_Items" name="Electrical_Items" value="Electrical Items" />
                            <label for="Electrical_Items">Electrical Items</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input checked={usedMaterials.includes("Sanitary Items")} onChange={handleUsedMaterialsCheckbox} type="checkbox" id="Sanitary_Items" name="Sanitary_Items" value="Sanitary Items" />
                            <label for="Sanitary_Items">Sanitary Items</label><br />
                        </div>
                        {
                            usedMaterials.filter(m => m !== 'Bricks' && 'Sand' && 'Cement' && 'Rods' && 'Stones' && 'Silicone' && 'Electrical Items' && 'Sanitary Items').map(hwm => <div className='flex items-center gap-2'>
                                <input checked={usedMaterials.includes(hwm)} onChange={handleUsedMaterialsCheckbox} type="checkbox" id={hwm} name="Sanitary_Items" value={hwm} />
                                <label for="Sanitary_Items">{hwm}</label><br />
                            </div>)
                        }
                        <div className='flex items-center gap-2'>
                            <input onChange={handleUsedMaterialsCheckbox} type="checkbox" id="usedMaterialsOther" name="usedMaterialsOther" value={usedMaterialsOther} />
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-6 w-full flex'>
                                <input onChange={(e) => { setUsedMaterialsOther(e.target.value) }} for="usedMaterialsOther" type="text" className='outline-none w-full' />
                            </div><br />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-start w-full gap-2 mt-4'>
                    <p className='text-[#FFBF00]'>What Work is Needed</p>
                    <div className='w-full flex items-center gap-5'>
                        <div className='flex items-center gap-2'>
                            <input onChange={handleWhatNeedCheckbox} type="checkbox" id="Electric" name="Electric" value="Electric" />
                            <label for="Electric">Electric</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handleWhatNeedCheckbox} type="checkbox" id="Sanitary" name="Sanitary" value="Sanitary" />
                            <label for="Sanitary">Sanitary</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handleWhatNeedCheckbox} type="checkbox" id="Gril" name="Gril" value="Gril" />
                            <label for="Gril">Gril</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handleWhatNeedCheckbox} type="checkbox" id="Thai" name="Thai" value="Thai" />
                            <label for="Thai">Thai</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handleWhatNeedCheckbox} type="checkbox" id="Stainless_Steel" name="Stainless_Steel" value="Stainless Steel" />
                            <label for="Stainless_Steel">Stainless Steel</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handleWhatNeedCheckbox} type="checkbox" id="Tails" name="Tails" value="Tails" />
                            <label for="Tails">Tails</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handleWhatNeedCheckbox} type="checkbox" id="Interior" name="Interior" value="Interior" />
                            <label for="Interior">Interior</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handleWhatNeedCheckbox} type="checkbox" id="Painting" name="Painting" value="Painting" />
                            <label for="Painting">Painting</label><br />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handleWhatNeedCheckbox} type="checkbox" id="whatNeedOther" name="whatNeedOther" value={whatNeedOther} />
                            <div className='px-3 border-2 border-[#FFBF00] rounded-xl h-6 w-full flex'>
                                <input onChange={(e) => { setWhatNeedOther(e.target.value) }} for="whatNeedOther" type="text" className='outline-none w-full' />
                            </div><br />
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center mt-10'>
                    <button onClick={() => { console.log(usedMaterials) }} className='border-2 border-[#FFBF00] px-8 py-2 rounded-full hover:text-[#FFBF00] hover:border-white duration-200 text-xl cursor-pointer'>Create</button>
                </div>
            </div>
        </div>
    );
};

export default EditProjectDataFormConstruction;