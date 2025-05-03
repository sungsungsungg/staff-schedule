import { useState } from 'react'
import Employee from "./utils/employee.js"
import Employees_section from './components/employees_section.jsx'
import {createShift} from "./utils/setShift.js";
import ScheduleByDate from './components/shift_schedule.jsx';


function App() {
  
  //Setting employees for test run
  let employee_1 = new Employee(1,"Sunghoon","Kang");
  employee_1.setAvailableTime({
      "mon":[0,24],
      "tues":[0,24],
      "weds":[0,24],
      "thurs":[0,24],
      "fri":[0,24],
      "sat":[0,24],
      "sun":[0,24]
  })
  employee_1.setCanWorkAlone(true);
  employee_1.setMaxShifts(3);
  employee_1.setCanProcessBatch(true);
  // employees.push(employee_1);

  let employee_2 = new Employee(2,"Yeongwoo","Jeon");
  employee_2.setAvailableTime({
      "mon":[0,24],
      "tues":[0,24],
      "weds":[0,24],
      "thurs":[0,24],
      "fri":[0,24],
      "sat":[0,0],
      "sun":[15,24]
  })
  employee_2.setCanWorkAlone(true);
  employee_2.setMaxShifts(4);
  employee_2.setCanProcessBatch(true);
  // employees.push(employee_2);

  let employee_3 = new Employee(3,"Jamin","Han");
  employee_3.setAvailableTime({
      "mon":[11,20], //mid
      "tues":[15,24], //closing
      "weds":[11,22], //mid
      "thurs":[0,24],
      "fri":[0,24],
      "sat":[0,15], //open
      "sun":[0,24]
  })
  employee_3.setCanWorkAlone(true);
  employee_3.setMaxShifts(4);
  employee_3.setCanProcessBatch(true);
  // employees.push(employee_3);

  let employee_4 = new Employee(4,"Snow","Aung");
  employee_4.setAvailableTime({
      "mon":[0,24],
      "tues":[0,24],
      "weds":[0,24],
      "thurs":[0,24],
      "fri":[0,24],
      "sat":[0,24],
      "sun":[0,24]
  })
  employee_4.setCanWorkAlone(true);
  employee_4.setMaxShifts(5);
  employee_4.setCanProcessBatch(true);
  // employees.push(employee_4);

  let employee_5 = new Employee(5,"Thant","Win");
  employee_5.setAvailableTime({
      "mon":[0,24],
      "tues":[0,0],
      "weds":[0,0],
      "thurs":[0,24],
      "fri":[0,24],
      "sat":[0,24],
      "sun":[0,24]
  })
  employee_5.setCanWorkAlone(true);
  employee_5.setMaxShifts(5);
  employee_5.setCanProcessBatch(false);
  // employees.push(employee_5);

  let employee_6 = new Employee(6,"Junseo","Choi");
  employee_6.setAvailableTime({
      "mon":[0,24],
      "tues":[15,24],
      "weds":[0,0],
      "thurs":[0,0],
      "fri":[0,20], //mid
      "sat":[0,0], 
      "sun":[15,24] //closing
  })
  employee_6.setCanWorkAlone(true);
  employee_6.setMaxShifts(3);
  employee_6.setCanProcessBatch(false);
  // employees.push(employee_6);

  let employee_7 = new Employee(7,"Sungjae","Yun");
  employee_7.setAvailableTime({
      "mon":[24,24],
      "tues":[24,24],
      "weds":[24,24],
      "thurs":[12,24],
      "fri":[0,24],
      "sat":[0,24],
      "sun":[0,24]
  })
  employee_7.setCanWorkAlone(false);
  employee_7.setMaxShifts(2);
  employee_7.setCanProcessBatch(false);
  // employees.push(employee_7);

  let employee_8 = new Employee(8,"Okto","Sim");
  employee_8.setAvailableTime({
      "mon":[15,24],
      "tues":[15,24],
      "weds":[15,24],
      "thurs":[15,24],
      "fri":[15,24],
      "sat":[0,24],
      "sun":[15,24]
  })
  employee_8.setCanWorkAlone(false);
  employee_8.setMaxShifts(3);
  employee_8.setCanProcessBatch(false);
  // employees.push(employee_8);

  //Example set of employees
  const[employees,setEmployees] = useState([employee_1,employee_2,employee_3,employee_4,employee_5,employee_6,employee_7,employee_8]);

  // const[finalShift, setFinalShift] = useState({
  //   "mon": { AM: [], mid: [], mid"mon": [], mid"tues": [], PM: [], isBusy: false },
  //   "tues": { AM: [], mid: [], mid"mon": [], mid"tues": [], PM: [], isBusy: false },
  //   "weds": { AM: [], mid: [], mid"mon": [], mid"tues": [], PM: [], isBusy: false },
  //   "thurs": { AM: [], mid: [], mid"mon": [], mid"tues": [], PM: [], isBusy: false },
  //   "fri": { AM: [], mid: [], mid"mon": [], mid"tues": [], PM: [], isBusy: true },
  //   "sat": { AM: [], mid: [], mid"mon": [], mid"tues": [], PM: [], isBusy: true },
  //   "sun": { AM: [], mid: [], mid"mon": [], mid"tues": [], PM: [], isBusy: false },
  // })

  // function createShiftPage(){
  //   setFinalShift(createShift(employees));
  // }


  //Update Employee Info
  /*
  * @param
  * employeeId  correspoding ID of the employee
  * update      Updated employee
  */
  function updateEmployeeInfo(employeeId, update){
    
    setEmployees(prevEmployees=>
      prevEmployees.map(employee =>
        employee.id === employeeId ? {...update}:
        employee
      )
    )
  }

  //Delete Employee with corresponding ID
  function deleteEmployee(employeeId){
    setEmployees(prev=>
      prev.filter(employee=>
        employee.id!== employeeId
      )
    )
  }

  function addEmployee(newEmployee){
    setEmployees(prev=>
      [
        ...prev,
        newEmployee
      ]
    )
  }
  
  

  return (
      <div>
        <Employees_section employees={employees} updateEmployeeInfo={updateEmployeeInfo} deleteEmployee={deleteEmployee} addEmployee={addEmployee}/>
        {/* <div className ="d-flex justify-content-center align-items-center my-3">
          <button type="button" onClick={createShiftPage} className="btn btn-outline-secondary mx-auto">Create Shift</button>
        </div> */}
        {/* <ScheduleByDate finalShift={finalShift} employees={employees}/> */}
      </div>
  )
}

export default App
