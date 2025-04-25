import TimeDropdown from "./dropdown_time";
import EmployeeModalView from "./employee_modal_view";
import React, {useState} from 'react';

function Employee_modal(props){


    function timeRange(time){

        if(!time) return;

        let timeString = "";

        if(time[0]==time[1]){
            timeString = "Unavailable"
            return timeString;
        }
        if(time[0]==0 && time[1]==24){
            timeString = "Available all day";
            return timeString;
        }

        if(time[0]==0) timeString += "Available until ";
        else{timeString += convertToTime(time[0]) + " - " }
        if(time[1]==24) timeString += "Close of business";
        else timeString += convertToTime(time[1]);

        return timeString;
    }

    function convertToTime(time){
        let result = "";
        if((time>=0 && time<12)) result+=time+ " AM"
        else if(time==24) result+= 12 + " AM"
        else if(time==12) result+= 12 + " PM"
        else{
            result += (time-12) +" PM"
        }
        return result
    }

    function onChange(){
        
    }

    // State to track the checkbox status (whether it's checked or not)
    const [isChecked, setIsChecked] = useState(false);

    // Function to handle checkbox change
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };


    return(
        <div>
            <EmployeeModalView
                key={props.id}
                id={props.id}
                firstName={props.firstName}
                lastName={props.lastName}
                availableTime={props.availableTime}
                maxShifts={props.maxShifts}
                assignedShifts={props.assignedShifts}
                workAlone={props.workAlone}
                canBatch={props.canBatch}
            />
            <div className="modal fade" id={`employee-edit-modal_${props.id}`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">{props?.firstName}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className="row g-3">
                    <div className="col-12 row row-cols-12">
                        <p><strong>Name</strong></p>
                        <div className="col col-6">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input type="text" className="form-control" id="firstName" placeholder="" onChange={onChange} defaultValue={props?.firstName} required=""/>
                            <div className="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>


                        <div className="col col-6">
                            <label htmlFor="lastName" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="lastName" placeholder="" onChange={onChange} defaultValue={props?.lastName} required=""/>
                            <div className="invalid-feedback">
                                Valid last name is required.
                            </div>
                        </div>
                    </div>
                
                    <div className="col-12 row row-cols-12">
                        <p><strong>Availability</strong></p>
                            
                        <EachDay day="Mon"/>
                        <EachDay day="Tues"/>
                        <EachDay day="Weds"/>
                        <EachDay day="Thurs"/>
                        <EachDay day="Fri"/>
                        <EachDay day="Sat"/>
                        <EachDay day="Sun"/>


            </div>

          </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" data-bs-target={`#employee-view-modal_${props.id}`} data-bs-toggle="modal">Back to first</button>
                </div>
                </div>
            </div>
            </div>
            <button className="btn btn-sm btn-outline-secondary" data-bs-target={`#employee-view-modal_${props.id}`} data-bs-toggle="modal">Open first modal</button>
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
    <label htmlFor={day} className="form-label">
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
    {!isChecked && (
        <div className="d-flex align-items-center">
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