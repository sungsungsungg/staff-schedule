import * as bootstrap from 'bootstrap';
import Employee_modal from './employee_modal';
import EmployeeModalView from "./employee_modal_view";
import { useState } from 'react';

function EmployeeCard(props){

    const [modalOpen, setModalOpen] = useState(null);
    
    
    //Open View Modal
    function openModal1(){
        setModalOpen(1);
        document.root.classList.add('body-dimmed');
    }
    
    //Open Edit Modal
    function openModal2(){
        setModalOpen(2);
        document.body.classList.add('body-dimmed');
    }

    function closeModal(){
        setModalOpen(null);
    }


    return(
        <>
            <div className="col">
            <div className="card shadow-sm">
                <div className="card-body">
                    <p className="card-head"><strong>{props.firstName}</strong></p>
                    <div className="row row-cols-2">
                        <p className="col">Assigned Shifts : {props.assignedShifts}</p>
                        <p className="col">Max Shifts : {props.maxShifts}</p>
                    </div>
                    <div className="row row-cols-2">
                        <p className="col">Work alone : {props.workAlone?"✅":"❌"}</p>
                        <p className="col">Batch : {props.canBatch?"✅":"❌"}</p>
                    </div>
                    <p className="card-text"></p>
                    <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                    </div>
                    <button className="btn btn-sm btn-outline-secondary" onClick={openModal1}>Open first modal</button>
                    <small className="text-body-secondary">9 mins</small>
                    </div>
                </div>
            </div>
            </div>
                {

                modalOpen==1?(
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
                        openEditModal={openModal2}
                    />

                    
                ):null
                }
                {
                    modalOpen==2?(
                        <Employee_modal
                            key={props.id}
                            id={props.id}
                            firstName={props.firstName}
                            lastName={props.lastName}
                            availableTime={props.availableTime}
                            maxShifts={props.maxShifts}
                            assignedShifts={props.assignedShifts}
                            workAlone={props.workAlone}
                            canBatch={props.canBatch}
                            openViewModal={openModal1}
                        />
                    ):null   
                }
            </>
        
    )
}

export default EmployeeCard;