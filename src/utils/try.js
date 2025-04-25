import setAvailableShift, { printAvailability, randomSort } from "./setShiftAvailability.js"
import Employee from "./employee.js";

// Initialize employees (same as before)
let employees = [];
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
employees.push(employee_1);

let employee_2 = new Employee(2,"Yeongwoo","Jeon");
employee_2.setAvailableTime({
    1:[0,24],
    2:[0,24],
    3:[0,24],
    4:[0,24],
    5:[0,24],
    6:[0,18],
    7:[15,24]
})
employee_2.setCanWorkAlone(true);
employee_2.setMaxShifts(4);
employee_2.setCanProcessBatch(true);
employees.push(employee_2);

let employee_3 = new Employee(3,"Jamin","Han");
employee_3.setAvailableTime({
    1:[11,24],
    2:[11,24],
    3:[11,24],
    4:[11,24],
    5:[11,24],
    6:[0,24],
    7:[0,0]
})
employee_3.setCanWorkAlone(true);
employee_3.setMaxShifts(4);
employee_3.setCanProcessBatch(true);
employees.push(employee_3);

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
employees.push(employee_4);

let employee_5 = new Employee(5,"Thant","Win");
employee_5.setAvailableTime({
    1:[0,24],
    2:[0,24],
    3:[0,24],
    4:[0,24],
    5:[0,24],
    6:[0,24],
    7:[0,24]
})
employee_5.setCanWorkAlone(true);
employee_5.setMaxShifts(5);
employee_5.setCanProcessBatch(false);
employees.push(employee_5);

let employee_6 = new Employee(6,"Junseo","Choi");
employee_6.setAvailableTime({
    1:[12,24],
    2:[12,24],
    3:[12,24],
    4:[12,24],
    5:[0,24],
    6:[0,24],
    7:[0,24]
})
employee_6.setCanWorkAlone(true);
employee_6.setMaxShifts(3);
employee_6.setCanProcessBatch(false);
employees.push(employee_6);

let employee_7 = new Employee(7,"Sungjae","Yun");
employee_7.setAvailableTime({
    1:[12,24],
    2:[12,24],
    3:[12,24],
    4:[12,24],
    5:[0,24],
    6:[0,24],
    7:[0,24]
})
employee_7.setCanWorkAlone(false);
employee_7.setMaxShifts(3);
employee_7.setCanProcessBatch(false);
employees.push(employee_7);

let employee_8 = new Employee(8,"Okto","Sim");
employee_8.setAvailableTime({
    1:[0,24],
    2:[0,24],
    3:[0,24],
    4:[0,24],
    5:[0,24],
    6:[0,24],
    7:[0,24]
})
employee_8.setCanWorkAlone(false);
employee_8.setMaxShifts(3);
employee_8.setCanProcessBatch(false);
employees.push(employee_8);

let shiftAvailability = setAvailableShift(employees);

let finalShift = {
    1: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
    2: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
    3: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
    4: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
    5: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: true },
    6: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: true },
    7: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
};

function bfsShiftAssignment() {
    let queue = [{day: 1, shiftData: {...finalShift}, prevPM: null, batchRequired: true, tries: 0}];
    
    while (queue.length > 0) {
        let {day, shiftData, prevPM, batchRequired, tries} = queue.shift();
        
        // Assign the shifts for the current day
        let newPrevPM = setDailyShift(day, prevPM, batchRequired, shiftData);
        
        // Check if all shifts are correctly assigned
        if (shiftIsCorrect(shiftData)) {
            printAvailability(shiftData);
            return true;
        }
        
        // If not, move on to the next day and add the new state to the queue
        if (day < 7) {
            queue.push({day: day + 1, shiftData, prevPM: newPrevPM[0], batchRequired: newPrevPM[1], tries});
        }
        
        // Limit the number of tries
        if (tries >= 10000) {
            break;
        }
    }
    return false;
}

function setDailyShift(day, prevPM, batchRequired, shiftData) {
    setAMshift(day, prevPM, batchRequired, shiftData);
    let [newPrevPM, newBatchRequired] = setPMshift(day, shiftData);
    setMidShift(day, shiftData);
    
    return [newPrevPM, newBatchRequired];
}

function setAMshift(day, prevPM, batchRequired, shiftData) {
    let available = shiftAvailability[day].AM;
    if (prevPM) {
        available = available.filter(item => !prevPM.includes(item));
    }
    for (let i = 0; i < available.length; i++) {
        const tempEmp = available[i];
        if (canWork(tempEmp, day, prevPM, batchRequired, true)) {
            shiftData[day].AM.push(tempEmp);
            tempEmp.incrementAS();
            break;
        }
    }
}

function setPMshift(day, shiftData) {
    let available = shiftAvailability[day].PM;
    available = available.filter(item => !shiftAvailability[day].AM.includes(item));
    
    let needWorkAlone = false;
    let count = 0;
    let needBatch = true;
    for (let i = 0; i < available.length; i++) {
        if (count >= 2) break;
        const tempEmp = available[i];
        if (canWork(tempEmp, day, null, false, needWorkAlone)) {
            shiftData[day].PM.push(tempEmp);
            tempEmp.incrementAS();
            count++;
            if (!tempEmp.getCanWorkAlone()) needWorkAlone = true;
            if (tempEmp.getCanProcessBatch()) needBatch = false;
        }
    }
    return [shiftData[day].PM, needBatch];
}

function setMidShift(day, shiftData) {
    let available = shiftAvailability[day].mid;
    for (let i = 0; i < available.length; i++) {
        const tempEmp = available[i];
        if (canWork(tempEmp, day)) {
            shiftData[day].mid.push(tempEmp);
            tempEmp.incrementAS();
            break;
        }
    }
}

function canWork(employee, day, prevPM = null, needBatch = false, workAlone = false) {
    if (employee.getAssignedShifts() >= employee.getMaxShifts()) {
        return false;
    }
    for (const [shift, emps] of Object.entries(finalShift[day])) {
        if (shift !== "isBusy" && emps.includes(employee)) return false;
    }
    if (needBatch && !employee.getCanProcessBatch()) {
        return false;
    }
    if (workAlone && !employee.getCanWorkAlone()) {
        return false;
    }
    return true;
}

function shiftIsCorrect(shiftData) {
    for (const [day, shifts] of Object.entries(shiftData)) {
        if (shifts.isBusy) {
            if (!(shifts.mid1.length == 1) || !(shifts.mid2.length == 1)) return false;
        } else {
            if (!(shifts.mid.length == 1)) return false;
        }
        if (shifts.AM.length !== 1) return false;
        if (shifts.PM.length !== 2) return false;
    }
    return true;
}

if (!bfsShiftAssignment()) {
    console.log("Try Again");
}
