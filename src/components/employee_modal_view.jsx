function EmployeeModalView({id,firstName,lastName,availableTime,maxShifts, assignedShifts, workAlone, canBatch, openEditModal}){



    function timeRange(time){

        if(!time) return;

        let timeString = "";

        if(time[0]==time[1]){
            timeString = "Unavailable"
            return timeString;
        }
        if(time[0]==0 && time[1]==24){
            timeString = "Available all day";
            return timeString;
        }

        if(time[0]==0) timeString += "Available until ";
        else{timeString += convertToTime(time[0]) + " - " }
        if(time[1]==24) timeString += "Close of business";
        else timeString += convertToTime(time[1]);

        return timeString;
    }

    function convertToTime(time){
        let result = "";
        if((time>=0 && time<12)) result+=time+ " AM"
        else if(time==24) result+= 12 + " AM"
        else if(time==12) result+= 12 + " PM"
        else{
            result += (time-12) +" PM"
        }
        return result
    }

    return(
        <div className="modal show" id={`employee-view-modal_${id}`} style={{display:"block", zIndex:1}}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modal-title">{firstName}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className="row g-3">

            <div className="col-12 row row-cols-12">
                <p><strong>Name</strong></p>
                <div className="col col-6">
                    <label htmlFor="firstName" className="form-label"><strong>First name</strong></label>
                    <p>{firstName}</p>
                </div>

                <div className="col col-6">
                    <label htmlFor="lastName" className="form-label"><strong>Last name</strong></label>
                    <p>{lastName}</p>
                </div>
            </div>
            
            

            <p></p>

            <div className="col-12 row row-cols-12">
                <p><strong>Availability</strong></p>
                <div className="col col-6">
                    
                    <label htmlFor="mon" className="form-label"><strong>Mon</strong></label>
                    <p>{timeRange(availableTime[1])}</p>
                    <label htmlFor="tues" className="form-label"><strong>Tues</strong></label>
                    <p>{timeRange(availableTime[2])}</p>
                    <label htmlFor="weds" className="form-label"><strong>Weds</strong></label>
                    <p>{timeRange(availableTime[3])}</p>
                    <label htmlFor="thurs" className="form-label"><strong>Thurs</strong></label>
                    <p>{timeRange(availableTime[4])}</p>
                </div>
                <div className="col col-6">
                    <label htmlFor="fri" className="form-label"><strong>Fri</strong></label>
                    <p>{timeRange(availableTime[5])}</p>
                    <label htmlFor="sat" className="form-label"><strong>Sat</strong></label>
                    <p>{timeRange(availableTime[6])}</p>
                    <label htmlFor="sun" className="form-label"><strong>Sun</strong></label>
                    <p>{timeRange(availableTime[7])}</p>
                </div>
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label"><strong>Max Shift</strong></label>
              <p>{maxShifts} days</p>
            </div>

            <div className="col-12">
                <label><strong>Can Work Alone: </strong>{workAlone?"✅":"❌"}</label>
            </div>
            <div className="col-12">
                <label><strong>Can Batch: </strong>{canBatch?"✅":"❌"}</label>
            </div>


          </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" onClick={openEditModal}>Open second modal</button>
                </div>
                </div>
            </div>
            </div>
    )
}

export default EmployeeModalView;