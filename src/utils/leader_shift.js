// Example data
const employees = {
    'A': { max_shifts: 3, assigned_shifts: 0 },
    'B': { max_shifts: 3, assigned_shifts: 0 },
    'C': { max_shifts: 3, assigned_shifts: 0 },
    'D': { max_shifts: 3, assigned_shifts: 0 },
    'E': { max_shifts: 2, assigned_shifts: 0 }
};

// Shift availability (this would be a representation of which employees are available for each shift)
const shiftAvailability = {
    'shift_1': ['A', 'B', 'C'].sort(() => Math.random() - 0.5), //Mon AM
    'shift_2': ['A', 'C', 'D'].sort(() => Math.random() - 0.5), //Mon PM
    'shift_3': ['A', 'B', 'E'].sort(() => Math.random() - 0.5), //Tues AM
    'shift_4': ['B', 'D', 'E'].sort(() => Math.random() - 0.5), //Tues PM
    'shift_5': ['A', 'C', 'D'].sort(() => Math.random() - 0.5), //Weds AM
    'shift_6': ['B', 'D', 'E'].sort(() => Math.random() - 0.5), //Weds PM
    'shift_7': ['A', 'B', 'E'].sort(() => Math.random() - 0.5), //Thurs AM
    'shift_8': ['A', 'C', 'D'].sort(() => Math.random() - 0.5), //Thurs PM
    'shift_9': ['A', 'B', 'C'].sort(() => Math.random() - 0.5), //Fri AM
    'shift_10': ['A', 'D', 'E'].sort(() => Math.random() - 0.5), //Fri PM
    'shift_11': ['B', 'C', 'E'].sort(() => Math.random() - 0.5), //Sat AM
    'shift_12': ['A', 'C', 'D'].sort(() => Math.random() - 0.5), //Sat PM
    'shift_13': ['B', 'D', 'E'].sort(() => Math.random() - 0.5), //Sun AM
    'shift_14': ['A', 'C', 'D'].sort(() => Math.random() - 0.5) //Sun PM
};

// Global variable to store the shift assignments
const shiftAssignments = {};

// Helper function to check if an employee can be assigned to a shift
function canAssign(employee, shift, prevShift = null) {
    // Check if the employee is available for this shift
    if (!shiftAvailability[shift].includes(employee)) {
        return false;
    }

    // Check if the employee already reached their max shift limit
    if (employees[employee].assigned_shifts >= employees[employee].max_shifts) {
        return false;
    }

    // Check if the employee is assigned to the previous shift (can't work consecutive shifts)
    if (prevShift && shiftAssignments[prevShift] === employee) {
        return false;
    }

    return true;
}

// Function to get next available employees for a given shift
function getNextAvailableEmployees(shift) {
    const availableEmployees = shiftAvailability[shift];
    const nextAvailableEmployees = [];

    for (let employee of availableEmployees) {
        if (canAssign(employee, shift)) {
            nextAvailableEmployees.push(employee);
        }
    }

    return nextAvailableEmployees;
}

// Backtracking function to assign shifts
function assignShifts(shiftIdx = 1, prevShift = null) {
    // Base case: if all shifts are assigned, return true
    if (shiftIdx > 14) {
        return true;
    }

    // Get the next available employees for the current shift
    const currentShift = `shift_${shiftIdx}`;
    const nextAvailable = getNextAvailableEmployees(currentShift);

    // Display the next available options
    // console.log(`Next available options for ${currentShift}: ${nextAvailable.join(', ')}`);

    // Try all employees for the current shift
    for (let employee of nextAvailable) {
        // Check if the employee can be assigned to this shift
        if (canAssign(employee, currentShift, prevShift)) {
            // Assign the employee to the shift
            shiftAssignments[currentShift] = employee;
            employees[employee].assigned_shifts += 1;

            // Recursively assign the next shift
            if (assignShifts(shiftIdx + 1, currentShift)) {
                return true;
            }

            // Backtrack: remove the assignment
            delete shiftAssignments[currentShift];
            employees[employee].assigned_shifts -= 1;
        }
    }

    // If no valid assignment, return false
    return false;
}

// Start assigning shifts
assignShifts();

// Output the shift assignments
console.log("Final shift assignments:", shiftAssignments);
console.log(employees);