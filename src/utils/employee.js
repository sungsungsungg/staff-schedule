class Employee{
    constructor(id, firstName, lastName){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.availableTime = {1:[0,0],2:[0,0],3:[0,0],4:[0,0],5:[0,0],6:[0,0],7:[0,0]};
        this.maxShifts = 0;
        this.canWorkAlone = false;
        this.canProcessBatch = false;
        this.assignedShifts = 0;
    }

    getId(){
        return this.id;
    }

    getFirstName(){
        return this.firstName;
    }

    getLastName(){
        return this.lastName;
    }

    setRest(availableTime, maxShifts, canWorkAlone){
        this.setAvailableTime(availableTime);
        this.setMaxShifts(maxShifts);
        this.setCanWorkAlone(canWorkAlone);
    }

    setAvailableTime(availableTime){
        this.availableTime = availableTime;
    }

    getAvailableTime(){
        return this.availableTime;
    }

    setMaxShifts(maxShifts){
        if(Number(maxShifts)>=5){
            this.maxShifts = 5;
        }else if(Number(maxShifts)<=0){
            this.maxShifts = 0;
        }
        else{
            this.maxShifts = maxShifts;
        }
    }



    getMaxShifts(){
        return this.maxShifts;
    }

    getAssignedShifts(){
        return this.assignedShifts;
    }
    
    setAssignedShifts(assignedShifts){
        this.assignedShifts = assignedShifts;
    }

    incrementAS(){
        this.assignedShifts++;
    }
    decrementAS(){
        this.assignedShifts--;
    }


    setCanWorkAlone(canWorkAlone){
        this.canWorkAlone = canWorkAlone;
    }

    getCanWorkAlone(){
        return this.canWorkAlone;
    }

    setCanProcessBatch(canProcessBatch){
        this.canProcessBatch = canProcessBatch;
    }

    getCanProcessBatch(){
        return this.canProcessBatch;
    }


}

export default Employee;