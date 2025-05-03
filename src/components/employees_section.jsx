
import * as bootstrap from 'bootstrap';
import EmployeeCard from "./employee_card.jsx";
import Employee from "../utils/employee.js"
import AddEmployeeModal from "./add_employee_modal.jsx"
import {useState} from "react"

function Employees_section({employees, updateEmployeeInfo, deleteEmployee, addEmployee}){

  const nextId = employees.length+1;

  //If + button is clicked, it gets resetted
  const [isEscaped, setIsEscaped] = useState(true);

  function handleClick(){
    setIsEscaped((prev)=>!prev);
}

  //Create Employee card for each employee
  function createEmployeeList(emp){
    const id = emp.id;

    
    return(
      <EmployeeCard
        key={id}
        employee= {emp}
        id={id}
        updateEmployeeInfo={updateEmployeeInfo}
        deleteEmployee={deleteEmployee}
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
                        <div className="card-body d-flex align-items-center justify-content-center">
                            <button type="button" className="btn btn-outline-secondary my-auto" data-bs-target={`#employee-add-modal`} data-bs-toggle="modal" onClick={handleClick}>+</button>
                        </div>
                    </div>
              </div>
            </div>
            <AddEmployeeModal
              addID={nextId}
              addEmployee={addEmployee}
              isEscaped={isEscaped}
            />
          </div>
        </div>
    );
}

export default Employees_section;