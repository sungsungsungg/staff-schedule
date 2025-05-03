import TimeDropdown from "./dropdown_time";
import EmployeeModalView from "./employee_modal_view";
import React, {useState, useEffect, useRef} from 'react';
import EachDay from "./each_day";

function Employee_modal({employee, updateEmployeeInfo, deleteEmployee}){


    //FormData that will be updated to employee
    const [formData, setFormData] = useState(employee);

    //For rerendering purpose when the modal is exited and re-entered.
    const [isEscaped, setIsEscaped] = useState(true);



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
        updateEmployeeInfo(employee.id,formData);
    }

    //To check if the modal is exited and re-entered
    function handleClick(){
        setFormData(employee);
        setIsEscaped((prev)=>!prev);
    }

    //For rerendering purpose, so the default value is set to employee info.
    useEffect(()=>{
        setFormData({...employee});
    },[isEscaped])


    function onDelete(){
        deleteEmployee(employee.id);
    }

    return(
        <div>
            {/* Employee View Modal */}
            <EmployeeModalView
                key={employee.id}
                id={employee.id}
                employee={employee}
                handleClick={handleClick}
            />
            {/* Employee Edit Modal */}


            <div class="modal fade bd-example-modal-sm" id={`employee-delete-modal_${employee.id}`} tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                            <div className="modal-body">
                                Are you sure to delete {employee.firstName}?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" aria-label="Close" onClick={onDelete}>Delete</button>
                                <button className="btn btn-primary" data-bs-target={`#employee-edit-modal_${employee.id}`} data-bs-toggle="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="modal fade" id={`employee-edit-modal_${employee.id}`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">{employee.firstName}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            
                                <div className="row g-3">
                                    <div className="col-12 row row-cols-12 mb-4">
                                        <p><strong>Name</strong></p>
                                        <div className="col col-6">
                                            <label htmlFor="firstName" className="form-label">First name</label>
                                            <input name="firstName" type="text" className="form-control" id="firstName" placeholder="" onChange={onChange} value={formData.firstName} required/>
                                            <div className="invalid-feedback">
                                                Valid first name is required.
                                            </div>
                                        </div>


                                        <div className="col col-6">
                                            <label htmlFor="lastName" className="form-label">Last name</label>
                                            <input name="lastName" type="text" className="form-control" id="lastName" placeholder="" onChange={onChange} value={formData.lastName} required/>
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
                                        <input name="maxShifts" style={{maxWidth: "100px"}} type="text" className="form-control" id="maxShifts" placeholder="" onChange={onChange} value={formData.maxShifts} required/>

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
                                <button type="button" className="btn btn-outline-danger"data-bs-target={`#employee-delete-modal_${employee.id}`} data-bs-toggle="modal">Delete</button>
                                <button className="btn btn-primary" data-bs-target={`#employee-view-modal_${employee.id}`} data-bs-toggle="modal" type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <button className="btn btn-sm btn-outline-secondary" data-bs-target={`#employee-view-modal_${employee.id}`} data-bs-toggle="modal" onClick={handleClick}>View</button>
        </div>
    )
    
}




export default Employee_modal;