import React, { useState } from 'react'

import './tableStyles.css'
import './styles.css'
import TableDragSelect from "./table";

export default function AvailabilityTable({ meetingData, userAvailable, setUserAvailable }) {

    const [state, setState] = useState({
        cells: userAvailable
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
    let hourCount = 0, last = meetingData.numTimeslots-1
    for (let time = 0; time < meetingData.numTimeslots; time++) {
        let timeText = ""
        if(time % 4 == 0) {
            let currentHour = meetingData.startTime + hourCount
            if(currentHour < 12) timeText = currentHour + " am"
            else timeText = (currentHour == 12 ? 12 : currentHour % 12) + " pm"
            hourCount++
        }

    let currRow = [<th className="table-time">{timeText}</th>]
        for (let day = 0; day < meetingData.numDays; day++) {
            currRow.push(<td />)
        }
        table.push(<tr>{currRow}</tr>)
    }

    return (
        <div>
            <TableDragSelect value={state.cells} onChange={handleChange}days={meetingData.days}>
                {table}
            </TableDragSelect>
            <button value="Save Changes" onClick={save}>Save Changes</button>
        </div>
    )
}