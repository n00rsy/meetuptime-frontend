import React from 'react'

export default function GroupAvailable({numRespondants, people, currentCoords}) {

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
            <div>Group Availability</div>
            <div className = "group-container">
                <div>
                    <div className = "group-header">
                        Available
                    </div>
                    <div className = "group-list-container">{available.map(name => <div>{name}</div>)} </div>
                </div>
                <div className = "divider">

                </div>
                <div>
                    <div className = "group-header">
                        Unavailable
                    </div>
                    <div className = "group-list-container">{unavailable.map(name => <div>{name}</div>)} </div>
                </div>
            </div>
        </div>
    )

}