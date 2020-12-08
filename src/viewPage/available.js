import React, { useState } from 'react'
import Moment from 'moment-timezone'

import TableDragSelect from "./table";

import './styles.css'

export default function AvailabilityTable({ meetingData, userData, setUserData }) {

    const [state, setState] = useState({
        cells: userData.available
    })
    let handleChange = cells => {
        console.log("new cells: ", cells)
        setState({ cells });
    }

    function save() {
        console.log("saving changes!")
    }

    function timeTableCell(time) {
        return (
            <tr>
                <th className="table-time-cell">{time}</th>
            </tr>
        )
    }

    console.log("redrawing table!!!")
    let table = [], timeTable = []
    let hoursMoment = Moment(meetingData.localTimes[0])
    console.log("hours moment", hoursMoment, hoursMoment.format("ddd MMM y h:mm A"))
    let last = meetingData.numTimeslots - 1
    for (let time = 0; time < meetingData.numTimeslots; time++) {

        if (time == last) {
            timeTable.push((timeTableCell("")))
        }

        if (time % 4 == 0 || time == last) {
            timeTable.push(timeTableCell(hoursMoment.format("h:mm A")))
            hoursMoment.add(1, 'hours')
            
        }
        else {
            timeTable.push((timeTableCell("")))
        }
        let currRow = []
        for (let day = 0; day < meetingData.numDays; day++) {
            currRow.push(<td />)
        }
        table.push(<tr>{currRow}</tr>)
    }

    return (
        <div>
            <p>Signed in as {userData.name}</p>
            <div className="container">
                <table className="table-time">
                    <tbody>
                        <tr>
                            <th className="table-time-cell" style={{ lineHeight: "4rem", height: "3.5rem", width: "120px" }}></th>
                        </tr>
                        {timeTable}
                    </tbody>
                </table>

                <TableDragSelect value={state.cells} onChange={handleChange} days={meetingData.localTimes}>
                    {table}
                </TableDragSelect>
            </div>
            <button value="Save Changes" onClick={save}>Save Changes</button>
        </div>
    )
}