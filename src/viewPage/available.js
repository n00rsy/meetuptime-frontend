import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import './tableStyles.css'

let style = {
    color: "red",
    backgroundColor: "blue",
    width: "120px"
}

export default function AvailabilityTable({ meetingData }) {
    
    const [selecting, setSelecting] = useState(false)
    const [startpoint, setStartpoint] = useState(null)
    const [endpoint, setEndpoint] = useState(null)

    function Column({ day, time, availableCount, className }) {
        return (
            <Col onMouseDown={down} onMouseUp={up} onMouseEnter={hover} id={time + "-" + day} className={className} >{availableCount}</Col>
        )
    }
    function hover(data) {
        if(selecting) {
            console.log("selecting")
            setEndpoint(parseId(data.target.id))
        }
        else {
            console.log("hovering")
        }
    }
    function down(data) {
        console.log("down!!!")
        setSelecting(true)
        let coords = parseId(data.target.id)
        setStartpoint(coords)
        setStartpoint(coords)
    }
    function up(data) {
        console.log("up!!!")
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
    useEffect(() => {
        console.log("raw points: ",startpoint, endpoint)
        if(startpoint != null && endpoint != null) {
            let topLeft = [Math.min(startpoint[0], endpoint[0]), Math.min(startpoint[1], endpoint[1])]
            let bottomRight = [Math.max(startpoint[0], endpoint[0]), Math.max(startpoint[1], endpoint[1])]
            console.log("processed: ",topLeft[0], topLeft[1])
            for(let row = topLeft[0]; row <= bottomRight[0]; row++) {
                for(let col = topLeft[1]; col <= bottomRight[1]; col++) {
                    document.getElementById(row + "-" + col).className = "selected"
                }
            }
        }
    });

    let table = []

    for (let time = 0; time < meetingData.numTimeslots; time++) {
        let currRow = []
        for (let day = 0; day < meetingData.numDays; day++) {

            let index = (day * meetingData.numTimeslots) + time
            let availableCount = 0
            meetingData.people.forEach(person => {
                availableCount += person.available[index] === '1' ? 1 : 0
            });
            currRow.push(<Column day={day} time={time} availableCount={availableCount} className = "table-col" />)
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