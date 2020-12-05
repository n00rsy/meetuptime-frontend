import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import SigninForm from './signinForm'
import AvailabilityTable from './available'

function getIndexFromCoords(row, col, numTimeslots) {
    return (col * numTimeslots) + row
}

export default function ViewPage() {

    const [meetingData, setMeetingData] = useState(null)
    const [signedIn, setSignedIn] = useState(false)
    const [fetchErr, setFetchErr] = useState(false)
    const [userAvailable, setUserAvailable] = useState(null)

    const location = useLocation()
    const history = useHistory()
    function handlePath() {
        console.log("handling path!!!")
        let path = location.pathname
        if (path.length === 9) {
            fetch('/api/meetings' + path, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => {
                    console.log('raw server response: ', res)
                    return res.status === 404 ? null : res.json()
                })
                .then(data => {
                    if(data == null) {
                        setFetchErr(true)
                    }
                    else {
                        if(data.days.length == 0) data.days = [...data.dates]
                        data.availableCount = []
                        for (let time = 0; time < data.numTimeslots; time++) {
                            let currRow = []
                            for (let day = 0; day < data.numDays; day++) {
                                let index = getIndexFromCoords(time, day, data.numTimeslots)
                                let availableCount = 0
                                data.people.forEach(person => {
                                    availableCount += person.available[index] ? 1 : 0
                                });
                                currRow.push(availableCount)
                            }
                            data.availableCount.push(currRow)
                        }
                        console.log("processed data: ", data)
                        setMeetingData(data)
                    }
                })
        }
        else {
            console.log("invalid path")
            setFetchErr(true)
        }
    }

    useEffect(() => handlePath(), [])

    if(fetchErr) {
        return (
            <p>Invalid URL!!!</p>
        )
    }

    if (meetingData == null) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div>
            <h1>{meetingData.name}</h1>
            <h2>{meetingData.description}</h2>
            {!signedIn && <SigninForm signedIn={signedIn} setSignedIn={setSignedIn} meetingData={meetingData} userAvailable= {userAvailable} setUserAvailable={setUserAvailable}/>}
            <AvailabilityTable meetingData={meetingData} userAvailable = {userAvailable} setUserAvailable = {setUserAvailable}/>
        </div>
    )

}