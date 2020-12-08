import React, { useState } from 'react'
import Moment from 'moment-timezone'

import TableDragSelect from "./table";
import TimeTable from "./timeTable"

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
   
    console.log("redrawing table!!!")
    let table = []
    let hoursMoment = meetingData.surveyUsing === "Dates" ? Moment(meetingData.localTimes[0]) : Moment(meetingData.startTime, "h")
    console.log("hours moment", hoursMoment, hoursMoment.format("ddd MMM y h:mm A"))

    for (let time = 0; time < meetingData.numTimeslots; time++) {

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
                <TimeTable hoursMoment={hoursMoment} numTimeslots={meetingData.numTimeslots}/>

                <TableDragSelect value={state.cells} onChange={handleChange} days={meetingData.surveyUsing === "Dates" ? meetingData.localTimes : meetingData.days}>
                    {table}
                </TableDragSelect>
            </div>
            <button value="Save Changes" onClick={save}>Save Changes</button>
        </div>
    )
}
