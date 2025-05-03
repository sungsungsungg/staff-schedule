import {useState, useEffect} from "react"
import TimeDropdown from "./dropdown_time";

function EachDay({day, setFormData, formData, isEscaped}){

    // State to track the checkbox status (whether it's checked or not)
    const [isChecked, setIsChecked] = useState(
        (formData.availableTime[day].length === 2 && formData.availableTime[day].every((value, index) => value === [0,24][index]))
    );

    // Function to handle checkbox change
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    useEffect(()=>{
        if(isChecked){
            setFormData(prev=>({
                ...prev,
                availableTime: {
                    ...prev.availableTime,
                    [day]:[0,24]
                }
            }));
        }else{

        }

    },[isChecked])


    useEffect(()=>{
        setIsChecked((formData.availableTime[day].length === 2 && formData.availableTime[day].every((value, index) => value === [0,24][index])));
    },[isEscaped])

    return(
    <>
    <label htmlFor={day} className="form-label mb-1">
        <strong>{day.charAt(0).toUpperCase()+day.slice(1)} &nbsp;&nbsp;&nbsp;</strong>
        <input 
            type="checkbox" 
            id={day} 
            name={day}
            checked={isChecked} // Bind checkbox to state
            onChange={handleCheckboxChange} // Update state when checkbox is toggled
        />
        <span className="text-secondary"> &nbsp;all day</span>
    </label>
    {isChecked?(
        <div className="d-flex align-items-center mb-3">
            <div className="me-3">
                {/* "From" text */}
                <span className="me-2">From</span>
                <div>
                    <input
                    id={`${day}From`}
                    disabled={true}
                    defaultValue={"open"}
                    style={{
                        maxWidth: '4rem'
                    }}
                    />
                </div>
                
            </div>
            <div>
                {/* "To" text */}
                <span className="me-2">To</span>
                <div>
                    <input
                    id={`${day}To`}
                    disabled={true}
                    defaultValue={"close"}
                    style={{
                        maxWidth: '4rem'
                    }}
                    />
                </div>
                
            </div>
        </div>
    )
    :(
        <div className="d-flex align-items-center mb-3">
            <div className="me-3">
                {/* "From" text */}
                <span className="me-2">From</span>
                <TimeDropdown day={day} setFormData={setFormData} formData={formData} which="start" isEscaped={isEscaped}/>
            </div>
            <div>
                {/* "To" text */}
                <span className="me-2">To</span>
                <TimeDropdown day={day} setFormData={setFormData} formData={formData} which="end" isEscaped={isEscaped}/>
            </div>
        </div>
    )}
    </>
    )
    
}

export default EachDay;