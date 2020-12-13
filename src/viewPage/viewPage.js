import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import SigninForm from './signinForm'
import SignoutForm from './signoutForm'
import AvailabilityTable from './available'
import { convert1dTo2dArray, initialize2dIntArray, add2dArrays, map2dArray } from './utils'
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

                    //let availableCount = initialize2dIntArray(data.numTimeslots, data.numDays)
                    data.availableCount = initialize2dIntArray(data.numTimeslots, data.numDays)
                    data.numRespondents = data.people.length
                    data.people.forEach(person => {
                        person.available = convert1dTo2dArray(person.available, data.numTimeslots, data.numDays)
                        data.availableCount = add2dArrays(data.availableCount, person.available)
                        //console.log("converted available array: " + person.name, person.available)
                    })
                    data.colors = map2dArray(data.availableCount, data.numRespondents)
                    if (data.surveyUsing === "Dates") data.localTimes = setTimezone(data.days, timezone)
                    console.log("processed data: ", data)
                    setMeetingData(data)
                    return data
                }
            })
    }

    function setTimezone(days, usertz) {
        let localTimes = []
        days.forEach(day => {
            localTimes.push(Moment.utc(day).tz(usertz))
        })
        _setTimezone(usertz)
        return localTimes
    }

    function handleTimezone(e) {
        console.log("changing timezone to ", e.target.value)
        let localTimes = setTimezone(meetingData.days, e.target.value)
        console.log(meetingData.localTimes)
        setMeetingData({ ...meetingData, localTimes: localTimes })
    }

    function SignInSignOut() {
        if(userData == null) return <SigninForm meetingData={meetingData} setMeetingData={setMeetingData} userData={userData} setUserData={setUserData} />
        else return <SignoutForm userData={userData} setUserData={setUserData} getMeeting = {() => getMeeting('/' + meetingData.id)} meetingId = {meetingData.id}/>
    }

    useEffect(() => handlePath(), [])
    useEffect(() => {
        console.log("new meeting data: ", meetingData)
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
        <div className = "wrapper">
            <div className = "header-container">
            <h1>{meetingData.name}</h1>
            <h2>{meetingData.description}</h2>
            <SignInSignOut />
            </div>
            {meetingData.surveyUsing === "Dates" && <select name="timezone" defaultValue={timezone} onChange={handleTimezone}>{Moment.tz.names().map(tz => <option >{tz}</option>)}</select>}
            {<AvailabilityTable meetingData={meetingData} userData={userData} setUserData={setUserData} />}
            <p>Create your own!</p>
        </div>
    )
}