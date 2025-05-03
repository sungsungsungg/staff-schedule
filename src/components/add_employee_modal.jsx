import {useState, useEffect} from "react"
import EachDay from "./each_day"


export default function AddEmployeeModal({addID, addEmployee, isEscaped}){

    const newEmployeeFormat = {
        id: addID,
        firstName:"",
        lastName:"",
        availableTime: {"mon":[0,0],"tues":[0,0],"weds":[0,0],"thurs":[0,0],"fri":[0,0],"sat":[0,0],"sun":[0,0]},
        maxShifts: 0,
        canWorkAlone: false,
        canProcessBatch: false,
        assignedShifts: 0
    }




    //FormData that will be updated to employee
    const [formData, setFormData] = useState(newEmployeeFormat);


    // Function to handle checkbox change
    const handleCheckboxChange = (e) => {
        const {name, checked} = e.target;
        setFormData(prev=>({...prev, [name]: checked}))
    };


    //Updating input change
    function onChange(event){
        const {name,value} = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    //When Submitted, updates the employee information
    function handleSubmit(e){
        e.preventDefault();
        addEmployee(formData);
        // console.log(formData);
    }



    //For rerendering purpose, so the default value is set to employee info.
    useEffect(()=>{
        setFormData(newEmployeeFormat);
    },[isEscaped])


    return(
        <div className="modal fade" id={`employee-add-modal`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <form onSubmit={handleSubmit}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">Add an Employee</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        
                            <div className="row g-3">
                                <div className="col-12 row row-cols-12 mb-4">
                                    <p><strong>Name</strong></p>
                                    <div className="col col-6">
                                        <label htmlFor="firstName" className="form-label">First name</label>
                                        <input name="firstName" type="text" className="form-control" id="firstName" placeholder="" onChange={onChange} value={formData.firstName} autoComplete="off" required/>
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                    </div>


                                    <div className="col col-6">
                                        <label htmlFor="lastName" className="form-label">Last name</label>
                                        <input name="lastName" type="text" className="form-control" id="lastName" placeholder="" onChange={onChange} value={formData.lastName} autoComplete="off" required/>
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="col-12 row row-cols-12">
                                    <p><strong>Availability</strong></p>
                                    <div className="col col-6">
                                        <EachDay day="mon" setFormData={setFormData} formData={formData} isEscaped={isEscaped}/>
                                        <EachDay day="tues" setFormData={setFormData} formData={formData} isEscaped={isEscaped}/>
                                        <EachDay day="weds" setFormData={setFormData} formData={formData} isEscaped={isEscaped}/>
                                        <EachDay day="thurs" setFormData={setFormData} formData={formData} isEscaped={isEscaped}/>
                                    </div>
                                    <div className="col col-6">
                                        <EachDay day="fri" setFormData={setFormData} formData={formData} isEscaped={isEscaped}/>
                                        <EachDay day="sat" setFormData={setFormData} formData={formData} isEscaped={isEscaped}/>
                                        <EachDay day="sun" setFormData={setFormData} formData={formData} isEscaped={isEscaped}/>
                                    </div>

                                </div>

                                <div className="col-12 mb-4">
                                    <p><strong>Max Shifts</strong></p>
                                    <input name="maxShifts" style={{maxWidth: "100px"}} type="text" className="form-control" id="maxShifts" placeholder="" autoComplete="off" onChange={onChange} value={formData.maxShifts} required/>
                                </div>

                                <div className="col-12">
                                    <label><strong>Can Work Alone: </strong>
                                    <input 
                                        type="checkbox" 
                                        id="canWorkAloneCheck" 
                                        name="canWorkAlone"
                                        checked={formData.canWorkAlone} // Bind checkbox to state
                                        onChange={handleCheckboxChange} // Update state when checkbox is toggled
                                    />
                                    </label>
                                </div>
                                <div className="col-12">
                                    <label><strong>Can Batch: </strong>
                                    <input 
                                        type="checkbox" 
                                        id="canProcessBatchCheck" 
                                        name="canProcessBatch"
                                        checked={formData.canProcessBatch} // Bind checkbox to state
                                        onChange={handleCheckboxChange} // Update state when checkbox is toggled
                                    />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onSubmit={handleSubmit}>Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}