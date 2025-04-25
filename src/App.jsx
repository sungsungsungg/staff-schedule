import { useState } from 'react'
import Employee from "./utils/employee.js"
import Employees_section from './components/employees_section.jsx'
import {createShift} from "./utils/setShift.js";
import ScheduleByDate from './components/shift_schedule.jsx';


function App() {
  

  let employee_1 = new Employee(1,"Sunghoon","Kang");
  employee_1.setAvailableTime({
      1:[0,24],
      2:[0,24],
      3:[0,24],
      4:[0,24],
      5:[0,24],
      6:[0,24],
      7:[0,24]
  })
  employee_1.setCanWorkAlone(true);
  employee_1.setMaxShifts(3);
  employee_1.setCanProcessBatch(true);
  // employees.push(employee_1);

  let employee_2 = new Employee(2,"Yeongwoo","Jeon");
  employee_2.setAvailableTime({
      1:[0,24],
      2:[0,24],
      3:[0,24],
      4:[0,24],
      5:[0,24],
      6:[0,0],
      7:[15,24]
  })
  employee_2.setCanWorkAlone(true);
  employee_2.setMaxShifts(4);
  employee_2.setCanProcessBatch(true);
  // employees.push(employee_2);

  let employee_3 = new Employee(3,"Jamin","Han");
  employee_3.setAvailableTime({
      1:[11,20], //mid
      2:[15,24], //closing
      3:[11,22], //mid
      4:[0,24],
      5:[0,24],
      6:[0,15], //open
      7:[0,24]
  })
  employee_3.setCanWorkAlone(true);
  employee_3.setMaxShifts(4);
  employee_3.setCanProcessBatch(true);
  // employees.push(employee_3);

  let employee_4 = new Employee(4,"Snow","Aung");
  employee_4.setAvailableTime({
      1:[0,24],
      2:[0,24],
      3:[0,24],
      4:[0,24],
      5:[0,24],
      6:[0,24],
      7:[0,24]
  })
  employee_4.setCanWorkAlone(true);
  employee_4.setMaxShifts(5);
  employee_4.setCanProcessBatch(true);
  // employees.push(employee_4);

  let employee_5 = new Employee(5,"Thant","Win");
  employee_5.setAvailableTime({
      1:[0,24],
      2:[0,0],
      3:[0,0],
      4:[0,24],
      5:[0,24],
      6:[0,24],
      7:[0,24]
  })
  employee_5.setCanWorkAlone(true);
  employee_5.setMaxShifts(5);
  employee_5.setCanProcessBatch(false);
  // employees.push(employee_5);

  let employee_6 = new Employee(6,"Junseo","Choi");
  employee_6.setAvailableTime({
      1:[0,24],
      2:[15,24],
      3:[0,0],
      4:[0,0],
      5:[0,20], //mid
      6:[0,0], 
      7:[15,24] //closing
  })
  employee_6.setCanWorkAlone(true);
  employee_6.setMaxShifts(3);
  employee_6.setCanProcessBatch(false);
  // employees.push(employee_6);

  let employee_7 = new Employee(7,"Sungjae","Yun");
  employee_7.setAvailableTime({
      1:[24,24],
      2:[24,24],
      3:[24,24],
      4:[12,24],
      5:[0,24],
      6:[0,24],
      7:[0,24]
  })
  employee_7.setCanWorkAlone(false);
  employee_7.setMaxShifts(2);
  employee_7.setCanProcessBatch(false);
  // employees.push(employee_7);

  let employee_8 = new Employee(8,"Okto","Sim");
  employee_8.setAvailableTime({
      1:[15,24],
      2:[15,24],
      3:[15,24],
      4:[15,24],
      5:[15,24],
      6:[0,24],
      7:[15,24]
  })
  employee_8.setCanWorkAlone(false);
  employee_8.setMaxShifts(3);
  employee_8.setCanProcessBatch(false);
  // employees.push(employee_8);


  const[employees,setEmployees] = useState([employee_1,employee_2,employee_3,employee_4,employee_5,employee_6,employee_7,employee_8]);

  const[finalShift, setFinalShift] = useState({
    1: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
    2: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
    3: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
    4: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
    5: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: true },
    6: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: true },
    7: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
  })

  function createShiftPage(){
    setFinalShift(createShift(employees));
  }
  

  return (
      <div>
        <Employees_section employees={employees}/>
        <div className ="d-flex justify-content-center align-items-center my-3">
          <button type="button" onClick={createShiftPage} className="btn btn-outline-secondary mx-auto">Create Shift</button>
        </div>
        <ScheduleByDate finalShift={finalShift} employees={employees}/>
      </div>
  )
}

export default App
