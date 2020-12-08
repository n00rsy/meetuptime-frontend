import React from 'react'

import './styles.css'

export default function TimeTable({ hoursMoment, numTimeslots }) {

    function TimeTableCell({time, count}) {
        console.log("received args: ", time, count)
        return (
            <tr key = {count}>
                <th className="table-time-cell">{time}</th>
            </tr>
        )
    }

    console.log("generating timetable", hoursMoment, hoursMoment.format("ddd MMM y h:mm A"), numTimeslots)
    let timeTable = [], last = numTimeslots-1
    for (let time = 0; time < numTimeslots; time++) {

        if (time === last) {
            timeTable.push(<TimeTableCell time={""} count = {time} />)
        }

        if (time % 4 === 0 || time === last) {
            let currentTime = hoursMoment.format("h:mm A")
            console.log("sending time: ", currentTime)

            timeTable.push(<tr >
                <th className="table-time-cell">{currentTime}</th>
            </tr>)
            
            console.log(timeTable[timeTable.length-1])
            hoursMoment.add(1, 'hours')
            
        }
        else {
            timeTable.push(<TimeTableCell time={""} count = {time} />)
        }
    }
    return (
        <table className="table-time">
            <tbody>
                <tr key = {0} >
                    <th className="table-time-cell" style={{ lineHeight: "4rem", height: "0.75rem", width: "120px" }}></th>
                </tr>
                {timeTable}
            </tbody>
        </table>
    )
}