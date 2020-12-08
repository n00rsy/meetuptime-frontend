import React, { useState, useEffect, useMemo } from 'react'
import Moment from 'moment-timezone'

import TableDragSelect from "./table";
import MemoizedTimeTable from "./timeTable"

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
   
    function computeTimeTableValues(hm, numTimeslots) {
        console.log("computing time table values!!!!!!")
        let timeTableValues = [], last = meetingData.numTimeslots-1, hoursMoment = Moment(hm, "h")
        for (let time = 0; time < numTimeslots; time++) {

            if (time === last) {
                timeTableValues.push("")
            }
    
            if (time % 4 === 0 || time === last) {
                let currentTime = hoursMoment.format("h:mm A")
                console.log("sending time: ", currentTime)
                timeTableValues.push(currentTime)
                hoursMoment.add(1, 'hours')
            }
            else {
                timeTableValues.push("")
            }
        }
        return timeTableValues
    }

    function generateTableCells(numTimeslots, numDays) {
        console.log("redrawing table!!!")
        let table = []
        for (let time = 0; time < numTimeslots; time++) {
            let currRow = []
            for (let day = 0; day < numDays; day++) {
                currRow.push(<td />)
            }
            table.push(<tr>{currRow}</tr>)
        }
        return table
    }

    let hoursMoment = meetingData.surveyUsing === "Dates" ? meetingData.localTimes[0].format("h") : meetingData.startTime
    const table = useMemo(() => generateTableCells(meetingData.numTimeslots, meetingData.numDays), [meetingData.numTimeslots, meetingData.numDays])
    const timeTableValues = useMemo(() => computeTimeTableValues(hoursMoment, meetingData.numTimeslots), [hoursMoment, meetingData.numTimeslots])

    return (
        <div>
            <p>Signed in as {userData.name}</p>
            <div className="container">
                <MemoizedTimeTable values = {timeTableValues}/>

                <TableDragSelect value={state.cells} onChange={handleChange} days={meetingData.surveyUsing === "Dates" ? meetingData.localTimes : meetingData.days}>
                    {table}
                </TableDragSelect>
            </div>
            <button value="Save Changes" onClick={save}>Save Changes</button>
        </div>
    )
}
