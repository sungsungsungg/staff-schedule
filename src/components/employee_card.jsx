import * as bootstrap from 'bootstrap';
import Employee_modal from './employee_modal';

function EmployeeCard(props){

    return(
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
                        />
                    </div>
                    <small className="text-body-secondary">9 mins</small>
                    </div>
                </div>
            </div>
      </div>
    )
}

export default EmployeeCard;