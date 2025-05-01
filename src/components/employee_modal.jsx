import TimeDropdown from "./dropdown_time";
import EmployeeModalView from "./employee_modal_view";
import React, {useState, useEffect, useRef} from 'react';

function Employee_modal({employee, updateEmployeeInfo}){


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
        console.log(formData);
        e.preventDefault();
        updateEmployeeInfo(employee.id,formData);
    }

    //To check if the modal is exited and re-entered
    function handleClick(){
        setIsEscaped((prev)=>!prev);
    }

    //For rerendering purpose, so the default value is set to employee info.
    useEffect(()=>{
        setFormData(employee);
    },[isEscaped])


    return(
        <div>
            {/* Employee View Modal */}
            <EmployeeModalView
                key={employee.id}
                id={employee.id}
                employee={employee}
            />
            {/* Employee Edit Modal */}
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
                                            <input name="lastName" type="text" className="form-control" id="lastName" placeholder="" onChange={onChange} defaultValue={employee.lastName} required/>
                                            <div className="invalid-feedback">
                                                Valid last name is required.
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="col-12 row row-cols-12">
                                        <p><strong>Availability</strong></p>
                                        <div className="col col-6">
                                            <EachDay day="Mon"/>
                                            <EachDay day="Tues"/>
                                            <EachDay day="Weds"/>
                                            <EachDay day="Thurs"/>
                                        </div>
                                        <div className="col col-6">
                                            <EachDay day="Fri"/>
                                            <EachDay day="Sat"/>
                                            <EachDay day="Sun"/>
                                        </div>

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
                                <button className="btn btn-primary" data-bs-target={`#employee-view-modal_${employee.id}`} data-bs-toggle="modal" type="submit">Back to first</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <button className="btn btn-sm btn-outline-secondary" data-bs-target={`#employee-view-modal_${employee.id}`} data-bs-toggle="modal" onClick={handleClick}>Open first modal</button>
        </div>
    )
    
}

function EachDay({day, startTime, endTime}){

    // State to track the checkbox status (whether it's checked or not)
    const [isChecked, setIsChecked] = useState(false);

    // Function to handle checkbox change
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    return(
    <>
    <label htmlFor={day} className="form-label mb-1">
        <strong>{day} &nbsp;&nbsp;&nbsp;</strong>
        <input 
            type="checkbox" 
            id={day} 
            name={day}
            checked={isChecked} // Bind checkbox to state
            onChange={handleCheckboxChange} // Update state when checkbox is toggled
        />
        <span className="text-secondary"> &nbsp;all day</span>
    </label>
    {isChecked?(
        <div className="d-flex align-items-center mb-3">
            <div className="me-3">
                {/* "From" text */}
                <span className="me-2">From</span>
                <div>
                    <input
                    id={`${day}From`}
                    disabled={true}
                    defaultValue={"open"}
                    style={{
                        maxWidth: '4rem'
                    }}
                    />
                </div>
                
            </div>
            <div>
                {/* "To" text */}
                <span className="me-2">To</span>
                <div>
                    <input
                    id={`${day}To`}
                    disabled={true}
                    defaultValue={"close"}
                    style={{
                        maxWidth: '4rem'
                    }}
                    />
                </div>
                
            </div>
        </div>
    )
    :(
        <div className="d-flex align-items-center mb-3">
            <div className="me-3">
                {/* "From" text */}
                <span className="me-2">From</span>
                <TimeDropdown />
            </div>
            <div>
                {/* "To" text */}
                <span className="me-2">To</span>
                <TimeDropdown />
            </div>
        </div>
    )}
    </>
    )
    
}


export default Employee_modal;