import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import SigninForm from './signinForm'
import AvailabilityTable from './available'
import { sum1dAvailabilityArrays } from './utils'
import Moment from 'moment-timezone'

export default function ViewPage() {

    const [meetingData, setMeetingData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [timezone, _setTimezone] = useState(Moment.tz.guess())
    const [fetchErr, setFetchErr] = useState(false)

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
                if (data == null) {
                    setFetchErr(true)
                }
                else {
                    if (data.days.length === 0) data.days = [...data.dates]
                    data.availableCount = sum1dAvailabilityArrays(data.people, data.numTimeslots, data.numDays)
                    console.log("processed data: ", data)
                    
                    if(data.surveyUsing === "Dates") data.localTimes = setTimezone(data.days, timezone) 
                    setMeetingData(data)            
                
                }
            })
    }

    function setTimezone(days, usertz) {
        let localTimes = []
        days.forEach(day => {
            console.log(Moment.utc(day).tz(usertz).toString())
            localTimes.push(Moment.utc(day).tz(usertz))
        })
        _setTimezone(usertz)
        return localTimes
    }

    function handleTimezone(e) {
        console.log("changing timezone to ", e.target.value)
        let localTimes = setTimezone(meetingData.days, e.target.value)
        console.log(meetingData.localTimes)
        setMeetingData({...meetingData, localTimes: localTimes})
    }

    useEffect(() => handlePath(), [])
    useEffect(() => {
        console.log("new meeting data: ",meetingData)
    }, [meetingData])

    if (fetchErr) {
        return (
            <p>404 Invalid URL!!!</p>
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
            {userData == null && <SigninForm meetingData={meetingData} setMeetingData={setMeetingData} userData={userData} setUserData={setUserData} />}
            {userData && <AvailabilityTable meetingData={meetingData} userData={userData} setUserData={setUserData} />}
            {meetingData.surveyUsing == "Dates" && <select name="timezone" defaultValue={timezone} onChange={handleTimezone}>{Moment.tz.names().map(tz => <option >{tz}</option>)}</select>}
        </div>
    )

}