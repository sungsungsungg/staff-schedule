import 'bootstrap/dist/css/bootstrap.min.css';
import Employee from "../utils/employee"



function ScheduleByDate({finalShift, employees}){

    let count =0;
    let count1 =0;




    function createRowData(employee){
        let result =[employee.firstName,"","","","","","",""];
        for(const[day,shifts] of Object.entries(finalShift)){
            for(const[shift, emps] of Object.entries(shifts)){
                if(shift=="isBusy") continue;
                if(emps.includes(employee)) result[day]=shift;
            }
        };
        // console.log(result);
        return result;
    }


    


    function createRow(employee){

        let rowData = createRowData(employee);

        for(let i=0;i<8;i++){
            if(rowData[i]=="AM") rowData[i] = "10:00-17:00";
            else if(rowData[i]=="mid") rowData[i] = "13:00-21:00"
            else if(rowData[i]=="mid1") rowData[i] = "12:00-21:00"
            else if(rowData[i]=="mid2") rowData[i] = "13:00-22:00"
            else if(rowData[i]=="PM"){
                rowData[i] = "17:00-24:30";
                if(i==5||i==6) rowData[i] = "17:00-26:00";
            }
        }

        // console.log(rowData);

        return(
            <tr key={count1++}>
                {rowData.map(createCell)}
            </tr>
        )
    }
    
    function createCell(time){
        return(
            <td key={count++}>{time}</td>
        )
    }

    return(
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Date\Name</th>
              <th scope="col">Mon</th>
              <th scope="col">Tues</th>
              <th scope="col">Weds</th>
              <th scope="col">Thurs</th>
              <th scope="col">Fri</th>
              <th scope="col">Sat</th>
              <th scope="col">Sun</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(createRow)}
          </tbody>
        </table>
    )
}

export default ScheduleByDate;