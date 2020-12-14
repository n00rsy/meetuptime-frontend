import React from 'react'

export default function GroupAvailable({numRespondents, people, currentCoords}) {

    console.log(currentCoords)

    let available = []
    let unavailable = []
    if(currentCoords != null)
    people.forEach(person => {
        if(person.available[currentCoords.row][currentCoords.col]) available.push(person.name)
        else unavailable.push(person.name)
    })
    console.log(available, unavailable)
    return (
        <div>
            <h3>Group Availability</h3>
            <h6>{numRespondents} {numRespondents === 1 ? "Respondent" : "Respondents"}</h6>
            <p>Hover over or touch time slots to see who's available.</p>
            <div className = "group-container">
                <div>
                    <div className = "group-header">
                        {currentCoords && available.length} Available
                    </div>
                    <div className = "group-list-container">{available.map(name => <div>{name}</div>)} </div>
                </div>
                <div className = "divider">

                </div>
                <div>
                    <div className = "group-header">
                    {currentCoords && unavailable.length} Unavailable
                    </div>
                    <div className = "group-list-container">{unavailable.map(name => <div>{name}</div>)} </div>
                </div>
            </div>
        </div>
    )

}