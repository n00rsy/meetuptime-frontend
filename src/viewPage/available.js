import React, { useState, useMemo } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import TableDragSelect from "./table";
import MemoizedTimeTable from "./timeTable"
import { convert2dTo1dArray } from './utils'
import GroupAvailable from './groupAvailable'
import Legend from './legend'

import './styles.css'

export default function AvailabilityTable({ meetingData, userData, setUserData }) {

    const [saving, setSaving] = useState(false)
    const [currentCoords, setCurrentCoords] = useState(null)
    let handleChange = cells => {
        //console.log("new cells: ", cells)
        setUserData({ ...userData, available: cells });
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
                currRow.push(<td key={day}></td>)
            }
            table.push(<tr key={time}>{currRow}</tr>)
        }
        return table
    }

    let startingMoment = meetingData.surveyUsing === "Dates" ? meetingData.localTimes[0].format("H") : meetingData.startTime
    const table = useMemo(() => generateTableCells(meetingData.numTimeslots, meetingData.numDays), [meetingData.numTimeslots, meetingData.numDays])
    return (
        <div>
            <Container fluid>
                <Row>
                    {meetingData.numRespondents > 0 && <Col><Legend numRespondents = {meetingData.numRespondents} /></Col>}
                    <Col>
                        <div className="container">
                            <MemoizedTimeTable startingMoment={startingMoment} numTimeslots={meetingData.numTimeslots} surveyUsing={meetingData.surveyUsing} />
                            <TableDragSelect
                                value={userData === null ? null : userData.available}
                                onChange={handleChange}
                                days={meetingData.surveyUsing === "Dates" ? meetingData.localTimes : meetingData.days}
                                colors={meetingData.colors}
                                setCurrentCoords={setCurrentCoords}>
                                {table}
                            </TableDragSelect>
                        </div>
                    </Col>
                    <Col>
                        <GroupAvailable
                            numRespondents={meetingData.numRespondents}
                            people={meetingData.people}
                            currentCoords={currentCoords} />
                    </Col>
                </Row>
            </Container>
            <div className="container-bottom">
                { userData &&<button style = {{marginTop: "2rem"}} className="button-important" value="Save" onClick={save}>{saving ? "SAVING..." : " Save"}</button>}
            </div>
        </div>
    )
}
