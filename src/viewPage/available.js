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
    const [startpint, setStartpoint] = useState(null)
    const [endpoint, setEndpoint] = useState(null)

    function Column({ day, time, availableCount, style }) {
        return (
            <Col onMouseDown={down} onMouseUp={up} onMouseEnter={hover} id={time + "-" + day} className="table-col" >{availableCount}</Col>
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
        setStartpoint(parseId(data.target.id))

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
        return id.split('-')
    }
    useEffect(() => {
        console.log("use state!",startpint, endpoint)
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
            currRow.push(<Column day={day} time={time} availableCount={availableCount} style={style} />)
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