import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import './tableStyles.css'

let style = {
    color: "red",
    backgroundColor: "blue",
    width: "120px"
}

export default function AvailabilityTable({ meetingData, userAvailable, setUserAvailable }) {

    const [deleting, setDeleting] = useState(false)
    const [selecting, setSelecting] = useState(false)
    const [startpoint, setStartpoint] = useState(null)
    const [endpoint, setEndpoint] = useState(null)

    function Column({ day, time, availableCount, className }) {
        return (
            <Col onMouseDown={down} onMouseUp={up} onMouseEnter={hover} id={time + "-" + day} className={className} >{availableCount}</Col>
        )
    }
    function hover(data) {
        if (selecting) {
            console.log("selecting")
            let coords = parseId(data.target.id)
            if (endpoint == null || endpoint[0] != coords[0] || endpoint[1] != coords[1]) setEndpoint(coords)
        }
        else {
            console.log("hovering")
        }
    }
    function down(data) {
        console.log("down!!!")
        let coords = parseId(data.target.id)
        setSelecting(true)
        setDeleting(userAvailable[getIndexFromCoords(coords[0], coords[1])])
        setStartpoint(coords)
        setEndpoint(coords)
    }
    function up(data) {
        console.log("up!!!")
        if (startpoint != null && endpoint != null) {
            let topLeft = [Math.min(startpoint[0], endpoint[0]), Math.min(startpoint[1], endpoint[1])]
            let bottomRight = [Math.max(startpoint[0], endpoint[0]), Math.max(startpoint[1], endpoint[1])]
            let newUserAvailable = []
            console.log("processed: ", topLeft[0], topLeft[1])
            for (let row = topLeft[0]; row <= bottomRight[0]; row++) {
                for (let col = topLeft[1]; col <= bottomRight[1]; col++) {
                    if (deleting) userAvailable[getIndexFromCoords(row, col)] = false
                    else userAvailable[getIndexFromCoords(row, col)] = true
                }
            }
        }
        setSelecting(false)
        setStartpoint(null)
        setEndpoint(null)
    }
    function save() {
        console.log("saving changes")
    }
    function parseId(id) {
        return id.split('-').map(n => parseInt(n))
    }
    function getIndexFromCoords(row, col) {
        return (col * meetingData.numTimeslots) + row
    }
    useEffect(() => {
        console.log("raw points: ", startpoint, endpoint, deleting)

    }, [selecting, startpoint, endpoint]);

    let table = []

    let topLeft = [-1, -1]
    let bottomRight = [-1, -1]
    if (startpoint != null && endpoint != null) {
        topLeft = [Math.min(startpoint[0], endpoint[0]), Math.min(startpoint[1], endpoint[1])]
        bottomRight = [Math.max(startpoint[0], endpoint[0]), Math.max(startpoint[1], endpoint[1])]
    }

    console.log("redrawing table!!!")
    for (let time = 0; time < meetingData.numTimeslots; time++) {
        let currRow = []
        for (let day = 0; day < meetingData.numDays; day++) {
            let index = getIndexFromCoords(time, day)

            if (time >= topLeft[0] && time <= bottomRight[0] && day >= topLeft[1] && day <= bottomRight[1]) {
                currRow.push(<Column day={day} time={time} availableCount={meetingData.availableCount[time][day]} className={!deleting ? "selected" : "table-col"} />)
            }
            else {
                currRow.push(<Column day={day} time={time} availableCount={meetingData.availableCount[time][day]} className={(userAvailable && userAvailable[index]) ? "selected" : "table-col"} />)
            }

        }
        table.push(<Row>{currRow}</Row>)
    }

    return (
        <div>
            <p>AvailabilityTable</p>
            <Container>
                {table}
            </Container>
            <button value="Save Changes" onClick={save}></button>
        </div>
    )
}