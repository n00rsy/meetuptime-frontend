import React, { useState, useMemo } from 'react'

import TableDragSelect from "./table";
import MemoizedTimeTable from "./timeTable"
import { convert2dTo1dArray } from './utils'

import './styles.css'

export default function AvailabilityTable({ meetingData, userData, setUserData }) {

    const [saving, setSaving] = useState(false)
    let handleChange = cells => {
        //console.log("new cells: ", cells)
        setUserData({...userData, available: cells });
    }

    function save() {
        setSaving(true)
        let data = {
            name: userData.name,
            available: convert2dTo1dArray(userData.available)
        }
        console.log("saving changes!", data, meetingData.id)
        fetch('/api/people/' + meetingData.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .catch(err => {
                console.log("fetch error!", err)
                setSaving(false)
            })
            .then(res => {
                setSaving(false)
                console.log('raw server response: ', res)
                return res.status === 204
            })

    }

    function generateTableCells(numTimeslots, numDays) {
        console.log("generating raw table rows and cols!!!")
        let table = []
        for (let time = 0; time < numTimeslots; time++) {
            let currRow = []
            for (let day = 0; day < numDays; day++) {
                currRow.push(<td key = {day}></td>)
            }
            table.push(<tr key={time}>{currRow}</tr>)
        }
        return table
    }

    let startingMoment = meetingData.surveyUsing === "Dates" ? meetingData.localTimes[0].format("h") : meetingData.startTime
    const table = useMemo(() => generateTableCells(meetingData.numTimeslots, meetingData.numDays), [meetingData.numTimeslots, meetingData.numDays])
    return (
        <div>
            <div className="container">
                <MemoizedTimeTable startingMoment={startingMoment} numTimeslots={meetingData.numTimeslots} surveyUsing={meetingData.surveyUsing} />

                <TableDragSelect 
                value={userData === null ? null : userData.available} 
                onChange={handleChange} 
                days={meetingData.surveyUsing === "Dates" ? meetingData.localTimes : meetingData.days}
                colors={meetingData.colors}
                >
                    {table}
                </TableDragSelect>
            </div>
            <div className="container-bottom">
                <button value="Save" onClick={save} className="myButton">{saving ? "SAVING..." : " Save"}</button>
            </div>
        </div>
    )
}
