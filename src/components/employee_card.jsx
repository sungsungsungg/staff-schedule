import * as bootstrap from 'bootstrap';
import Employee_modal from './employee_modal';

function EmployeeCard({employee,updateEmployeeInfo}){

    return(
        <div className="col">
            <div className="card shadow-sm">
                <div className="card-body">
                    <p className="card-head"><strong>{employee.firstName}</strong></p>
                    <div className="row row-cols-2">
                        <p className="col">Assigned Shifts : {employee.assignedShifts}</p>
                        <p className="col">Max Shifts : {employee.maxShifts}</p>
                    </div>
                    <div className="row row-cols-2">
                        <p className="col">Work alone : {employee.canWorkAlone?"✅":"❌"}</p>
                        <p className="col">Batch : {employee.canProcessBatch?"✅":"❌"}</p>
                    </div>
                    <p className="card-text"></p>
                    <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <Employee_modal
                            key={employee.id}
                            id={employee.id}
                            employee={employee}
                            updateEmployeeInfo={updateEmployeeInfo}
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