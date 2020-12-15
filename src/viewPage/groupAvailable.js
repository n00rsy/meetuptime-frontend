import React from 'react'
import Moment from 'moment-timezone'

export default function GroupAvailable({ numRespondents, people, currentCoords, moments, surveyUsing }) {

    let available = [], unavailable = [], time = " "

    if (currentCoords) {
        if (surveyUsing === 'Dates') {
            let moment = Moment(moments[currentCoords.col]).add(currentCoords.row * 15, "minutes")
            time = moment.format('dddd MMM D, y @ h:mm A')
        }
        else {
            let moment = Moment(moments.days[currentCoords.col] + " " + moments.startTime, 'ddd H').add(currentCoords.row * 15, "minutes")
            time = moment.format('dddd @ h:mm A')
        }
        people.forEach(person => {
            if (person.available[currentCoords.row][currentCoords.col]) available.push(person.name)
            else unavailable.push(person.name)

        })
    }
    return (
        <div>
            <h3>Group Availability</h3>
            <h6>{numRespondents} {numRespondents === 1 ? "Respondent" : "Respondents"}</h6>
            <p>Hover over or touch a time slot to see who's available.</p>
            <h6>{time}</h6>
            {currentCoords &&
                <div className="group-container">
                    <div>
                        <div className="group-header">
                            {available.length} Available
                    </div>
                        <div className="group-list-container">{available.map(name => <div>{name}</div>)} </div>
                    </div>
                    <div className="divider">

                    </div>
                    <div>
                        <div className="group-header">
                            {unavailable.length} Unavailable
                    </div>
                        <div className="group-list-container">{unavailable.map(name => <div>{name}</div>)} </div>
                    </div>
                </div>}
        </div>
    )

}