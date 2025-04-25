
import * as bootstrap from 'bootstrap';
import EmployeeCard from "./employee_card.jsx";
import Employee from "../utils/employee.js"


function Employees_section({employees}){


  function createEmployeeList(emp){
    return(
      <EmployeeCard
      key={emp.getId()}
      id={emp.getId()}
      firstName={emp.getFirstName()}
      lastName={emp.getLastName()}
      availableTime={emp.getAvailableTime()}
      maxShifts={emp.getMaxShifts()}
      assignedShifts={emp.getAssignedShifts()}
      workAlone={emp.getCanWorkAlone()}
      canBatch={emp.getCanProcessBatch()}
    />
    )
    
  }

    return(
        <div className="album py-5 bg-body-tertiary">
          <div className="container">

            <div className="row row-cols-3 row-cols-sm-3 row-cols-md-3 g-3">

              {employees.map(createEmployeeList)}
                  <div className="col">
                    <div className="card shadow-sm d-flex align-items-center justify-content-center" style={{height:"100%"}}>
                        <div className="card-body d-flex align-items-center justify-content-center" >
                            <button type="button" className="btn btn-outline-secondary my-auto">+</button>
                        </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Employees_section;