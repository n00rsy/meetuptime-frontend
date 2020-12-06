import React, { useState } from 'react'

import './tableStyles.css'
import './styles.css'
import TableDragSelect from "./table";

export default function AvailabilityTable({ meetingData, userAvailable, setUserAvailable }) {

    const [state, setState] = useState({
        cells: userAvailable
    })
    let handleChange = cells => setState({ cells });

    function save() {
        console.log("saving changes!")
    }

    console.log("redrawing table!!!")
    let table = []

    for (let time = 0; time < meetingData.numTimeslots; time++) {
        let currRow = []
        for (let day = 0; day < meetingData.numDays; day++) {
            currRow.push(<td />)
        }
        table.push(<tr>{currRow}</tr>)
    }

    return (
        <div>
            <p>AvailabilityTable</p>
            <TableDragSelect value={state.cells} onChange={handleChange}>
                {table}
            </TableDragSelect>
            <button value="Save Changes" onClick={save}>Save Changes</button>
        </div>
    )
}