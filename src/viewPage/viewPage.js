import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import SigninForm from './signinForm'
import AvailabilityTable from './available'
import {getIndexFromCoords} from './utils'
import Moment from 'moment-timezone'


export default function ViewPage() {

    const [meetingData, setMeetingData] = useState(null)
    const [signedIn, setSignedIn] = useState(false)
    const [fetchErr, setFetchErr] = useState(false)
    const [userAvailable, setUserAvailable] = useState(null)
    const [timezone, setTimezone] = useState(Moment.tz.guess())

    function getMeeting(path) {
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
                    if(data.days.length === 0) data.days = [...data.dates]
                    data.availableCount = []
                    for (let time = 0; time < data.numTimeslots; time++) {
                        let currRow = []
                        for (let day = 0; day < data.numDays; day++) {
                            let index = getIndexFromCoords(time, day, data.numTimeslots)
                            let availableCount = 0
                            data.people.forEach(person => {
                                availableCount += person.available[index] ? 1 : 0
                            })
                            currRow.push(availableCount)
                        }
                        data.availableCount.push(currRow)
                    }
                    console.log("processed data: ", data)
                    setMeetingData(data)
                }
            })
    }

    function handleTimezone(e) {
        console.log("changing timezone to: ", e.target.value)
        setTimezone(e.target.value)
    }

    const location = useLocation()
    const history = useHistory()
    function handlePath() {
        console.log("handling path!!!")
        let path = location.pathname
        if (path.length === 9) {
            getMeeting(path)
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
    function buildOption(x) {
        return <option >{x}</option>
    }

    return (
        <div>
            <h1>{meetingData.name}</h1>
            <h2>{meetingData.description}</h2>
            {!signedIn && <SigninForm signedIn={signedIn} setSignedIn={setSignedIn} meetingData={meetingData} userAvailable= {userAvailable} setUserAvailable={setUserAvailable}/>}
            {signedIn && <AvailabilityTable meetingData={meetingData} userAvailable = {userAvailable} setUserAvailable = {setUserAvailable} />}
            <select name="timezone" defaultValue={timezone} onChange={handleTimezone}>{Moment.tz.names().map(buildOption)}</select>
        </div>
    )

}