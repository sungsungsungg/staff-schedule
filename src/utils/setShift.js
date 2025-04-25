import setAvailableShift, {printAvailability, randomSort, shuffle} from "./setShiftAvailability.js"
import Employee from "./employee.js";

//Example
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
    6:[0,0],
    7:[15,24]
})
employee_2.setCanWorkAlone(true);
employee_2.setMaxShifts(4);
employee_2.setCanProcessBatch(true);
employees.push(employee_2);

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
employees.push(employee_5);

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
employees.push(employee_6);

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
employees.push(employee_7);

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
employees.push(employee_8);


// let shiftAvailability = setAvailableShift(employees);
let shiftAvailability;

// console.log(shiftAvailability);

// printAvailability(shiftAvailability);


let finalShift = {
    1: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
    2: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
    3: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
    4: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
    5: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: true },
    6: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: true },
    7: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
};


function setShift(prevPM=null,batchRequired=true){
    shiftAvailability = randomSort(shiftAvailability);
    // console.log(shiftAvailability);
    // printAvailability(shiftAvailability);

    
    for(const[day,shifts] of Object.entries(shiftAvailability)){
        [prevPM,batchRequired] = setDailyShift(day,prevPM, batchRequired);
    }
}

function setDailyShift(day,prevPM = null,batchRequired=true){
    setAMshift(day, prevPM, batchRequired);
    [prevPM,batchRequired] = setPMshift(day);
    setMidShift(day);

    return [prevPM,batchRequired];
}


function setAMshift(day, prevPM, batchRequired){
    let available = shiftAvailability[day].AM;
    if(prevPM){
        available.filter(item => !prevPM.includes(item));
    }
    for(let i=0; i<available.length;i++){
        const tempEmp = available[i];
        if(canWork(tempEmp,day,prevPM,batchRequired, true)){
            finalShift[day].AM.push(tempEmp);
            tempEmp.incrementAS();
            break;
        }
    }
}

function setPMshift(day){
    let available = shiftAvailability[day].PM;
    available.filter(item=> !shiftAvailability[day].AM.includes(item));

    let needWorkAlone = false;
    let count = 0;
    let needBatch = true;
    for(let i=0; i<available.length;i++){
        if(count>=2) return [finalShift[day].PM,needBatch]; 
        const tempEmp = available[i];
        if(canWork(tempEmp,day, null, false, needWorkAlone)){
            finalShift[day].PM.push(tempEmp);
            tempEmp.incrementAS();
            count++;
            //If the first person cannot work alone, the second will need to be able to work alone
            if(!tempEmp.getCanWorkAlone()) needWorkAlone = true;
            if(tempEmp.getCanProcessBatch()) needBatch = false;
        }
    }

    return [finalShift[day].PM,needBatch];
}

function setMidShift(day){
    if(shiftAvailability[day].isBusy){
        setMid1Shift(day);
        setMid2Shift(day);
        return;
    }
    let available = shiftAvailability[day].mid;
    for(let i=0; i<available.length;i++){
        const tempEmp = available[i];
        if(canWork(tempEmp,day)){
            finalShift[day].mid.push(tempEmp);
            tempEmp.incrementAS();
            break;
        }
    }
}

function setMid1Shift(day){
    let available = shiftAvailability[day].mid1;
    for(let i=0; i<available.length;i++){
        const tempEmp = available[i];
        if(canWork(tempEmp,day)){
            finalShift[day].mid1.push(tempEmp);
            tempEmp.incrementAS();
            break;
        }
    }
}

function setMid2Shift(day){
    let available = shiftAvailability[day].mid2;
    for(let i=0; i<available.length;i++){
        const tempEmp = available[i];
        if(canWork(tempEmp,day)){
            finalShift[day].mid2.push(tempEmp);
            tempEmp.incrementAS();
            break;
        }
    }
}


function canWork(employee, day, prevPM=null, needBatch=false, workAlone=false){
    //Worked more than maxShifts
    if(employee.getAssignedShifts() >= employee.getMaxShifts()){
        return false;
    }
    for(const[shift,emps] of Object.entries(finalShift[day])){
        if(shift!="isBusy"&&emps.includes(employee)) return false;
    }
    if(needBatch&&!employee.getCanProcessBatch()){
        return false;
    }
    if(workAlone&&!employee.getCanWorkAlone()){
        return false;
    }
    return true;

}

function shiftIsCorrect(finalShift){
    for(const[day,shifts] of Object.entries(finalShift)){
        if(shifts.isBusy){
            if(!(shifts.mid1.length==1)||!(shifts.mid2.length==1)){
                // console.log(day, ": mid12 not filled");
                return false;
            }
        }else{
            if(!(shifts.mid.length==1)){
                // console.log(day,": mid not filled");
                return false;
            }
        }
        if(!shifts.AM.length==1){
            // console.log(day, ": AM not filled");
            return false;
        }
        if(!shifts.PM.length==2){
            // console.log(day, ": PM not filled");
            return false;
        }
        
    }
    return true;
}

let success = false;


export function createShift(employees){
    
    shiftAvailability = setAvailableShift(employees);
    if(shiftAvailability){
        shiftAvailability[1]["mid"] = [employee_3];
    shiftAvailability[1]["PM"] = [employee_3];
    shiftAvailability[2]["mid"] = [employee_3];
    shiftAvailability[6]["AM"]= [employee_3];
    }
    
    

    for(let tries =0; tries<100000; tries++){
        finalShift = {
            1: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
            2: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
            3: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
            4: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
            5: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: true },
            6: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: true },
            7: { AM: [], mid: [], mid1: [], mid2: [], PM: [], isBusy: false },
        };
        employees.forEach((emp)=>{
            emp.setAssignedShifts(0);
        });
        setShift();
        if(shiftIsCorrect(finalShift)){
            // printAvailability(finalShift);
            return finalShift;
        };
    }
    
    console.log("Try Again");
    // printAvailability(finalShift);
    // printAvailability(shiftAvailability);
    return false;
}


