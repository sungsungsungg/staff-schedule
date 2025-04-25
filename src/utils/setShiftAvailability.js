import Employee from "./employee.js";

//Checker[0] => Starting Time
//Checker[1] => End Time
let amShiftChecker = [10,17];
let midShiftChecker = [12,20];
let mid1ShiftChecker = [12,21];
let mid2ShiftChecker = [13,22];
let pmShiftChecker = [17,24];



//1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday, 7: Sunday
let shiftAvailability = {
    1: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:false},
    2: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:false},
    3: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:false},
    4: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:false},
    5: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:true},
    6: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:true},
    7: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:false},
}





//Set Available Shift
function setAvailableShift(employees){
    shiftAvailability = {
        1: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:false},
        2: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:false},
        3: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:false},
        4: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:false},
        5: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:true},
        6: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:true},
        7: {AM:[],mid:[],mid1:[],mid2:[],PM:[], isBusy:false},
    }
    employees.forEach(setAvailableShiftForEachEmployee);
    return shiftAvailability;
}


//Checks each employee and sets saves them in available shift
function setAvailableShiftForEachEmployee(employee){
    for(const[key,value] of Object.entries(employee.getAvailableTime())){
        if(checkAM(value)) shiftAvailability[key].AM.push(employee);
        if(checkMid(value)&&!shiftAvailability[key].isBusy) shiftAvailability[key].mid.push(employee);
        if(checkMid1(value)&&shiftAvailability[key].isBusy) shiftAvailability[key].mid1.push(employee);
        if(checkMid2(value)&&shiftAvailability[key].isBusy) shiftAvailability[key].mid2.push(employee);
        if(checkPM(value)) shiftAvailability[key].PM.push(employee);
    }

}


//Checks if the employee can work for AM(Mroning shift)
function checkAM(employee_availability){
    if(employee_availability[0]<= amShiftChecker[0] && employee_availability[1]>=amShiftChecker[1]){
        return true;
    }
    return false;
}

//Checks if the employee can work for Mid(Middle Shift)
function checkMid(employee_availability){
    if(employee_availability[0]<= midShiftChecker[0] && employee_availability[1]>=midShiftChecker[1]){
        return true;
    }
    return false;
}


//Checks if the employee can work for Mid1(Middle Shift 1)
function checkMid1(employee_availability){
    if(employee_availability[0]<= mid1ShiftChecker[0] && employee_availability[1]>=mid1ShiftChecker[1]){
        return true;
    }
    return false;
}

//Checks if the employee can work for Mid2(Middle Shift 2)
function checkMid2(employee_availability){
    if(employee_availability[0]<= mid2ShiftChecker[0] && employee_availability[1]>=mid2ShiftChecker[1]){
        return true;
    }
    return false;
}

//Checks if the employee can work for PM(closing shift)
function checkPM(employee_availability){
    if(employee_availability[0]<= pmShiftChecker[0] && employee_availability[1]>=pmShiftChecker[1]){
        return true;
    }
    return false;
}


export function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    // let shuffled = array
    // .map(value => ({ value, sort: Math.random() }))
    // .sort((a, b) => a.sort - b.sort)
    // .map(({ value }) => value)
    
}

export function randomSort(shiftAvailability){
    for(const[days,shifts] of Object.entries(shiftAvailability)){
        for(const[shift,emps] of Object.entries(shifts)){
            if(shift!="isBusy") shuffle(emps);
        }
    }
    return shiftAvailability;
}


//Printing availability
export function printAvailability(shiftAvailability) {
    for (const [key, value] of Object.entries(shiftAvailability)) {
        let valueString = "";
        if (key != "isBusy") {
        valueString = valueString + key + " :{";
        
            for (const [shift, emps] of Object.entries(value)) {
                valueString += shift + ": [";
                if (Array.isArray(emps)) {
                    // Only call forEach if emps is an array
                    emps.forEach((emp, index) => {
                        valueString += emp.getFirstName(); // Call toString() on the employee
                        if (index < emps.length - 1) {
                            valueString += ", "; // Add a comma if it's not the last element
                        }
                    });
                } else {
                    valueString += "Invalid data"; // Handle the case if emps is not an array
                }
                valueString += "] "; // Close the array for this shift
            }
        }
        valueString += "}"; // Close the object for this key
        console.log(valueString);
    }
}



export default setAvailableShift;