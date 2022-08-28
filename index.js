// Your code here
function createEmployeeRecord (Record){
    return {
        firstName: Record[0],
        familyName: Record[1], 
        title:  Record[2],
        payPerHour: Record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(ArrayRecords){
    return ArrayRecords.map(function(Array){
        return createEmployeeRecord(Array);
    });
}


function createTimeInEvent(newObject, dates){
    let [date, hour] = dates.split(' ');

    newObject.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return newObject;
}


function createTimeOutEvent(newObject, dates){
    let [date, hour] = dates.split(' ');

    newObject.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return newObject;
}


function hoursWorkedOnDate(newObject, formDate){
    let inEvent = newObject.timeInEvents.find(function(emp){
        return emp.date === formDate;
    })

    let outEvent = newObject.timeOutEvents.find(function(emp){
        return emp.date === formDate;
    })

    return (outEvent.hour - inEvent.hour) / 100;
}


function wagesEarnedOnDate (employee, newObject){
    let rawWage = hoursWorkedOnDate(employee, newObject)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}


function allWagesFor(employee){
    let eligibleDates = employee.timeInEvents.map(function(emp){
        return emp.date
    })

    let payable = eligibleDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)

    return payable
}


function calculatePayroll (arrayRecords){
    return arrayRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}