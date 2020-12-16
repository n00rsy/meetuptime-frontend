import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { isMobile } from "react-device-detect";
import Moment from 'moment-timezone'

import SigninForm from './signinForm'
import SignoutForm from './signoutForm'
import AvailabilityTable from './available'
import { convert1dTo2dArray, initialize2dIntArray, add2dArrays, map2dArray } from './utils'
import loading from '../img/loading.gif'

export default function ViewPage() {

    const [meetingData, setMeetingData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [timezone, _setTimezone] = useState(Moment.tz.guess())
    const [fetchErr, setFetchErr] = useState(false)
    const [copied, setCopied] = useState(false)

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
        if (userData == null) return <SigninForm meetingData={meetingData} setMeetingData={setMeetingData} userData={userData} setUserData={setUserData} />
        else return <SignoutForm userData={userData} setUserData={setUserData} getMeeting={() => getMeeting('/' + meetingData.id)} meetingId={meetingData.id} />
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
            <div className="wrapper">
                <div className="background">
                    <Background />
                </div>
                <div className="loading-wrapper">
                    <h4>Loading Event...</h4>
                    <img src={loading}></img>
                </div>
            </div>
        )
    }
    function Background() {
        if (isMobile) {
            return (
                <div style={{ height: "60vh", width: "100%", backgroundColor: "#d1a7a7", overflow: "hidden" }} />
            )
        }
        return (
            <div style={{ height: "100vh", width: "100%", overflow: "hidden" }} >
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
                    <path d="M-3.72,74.30 C161.62,106.88 289.16,34.82 524.49,91.07 L500.00,0.00 L0.00,0.00 Z" style={{ stroke: "none", fill: "#d1a7a7" }}>
                    </path>
                </svg>
            </div>
        )
    }

    function shareMeeting() {
        let shareData = {
            url: "https://whenmeet.io/" + meetingData.code,
            title: meetingData.name
        }
        console.log("sharing meeting", shareData)
        navigator.clipboard.writeText(shareData.url).then(function () {
            setCopied(true)
        }, function () {

        });
    }

    function Share() {
        return (
            <div>
                <h6 style={{ fontWeight: "normal" }}>
                    Event Link: <span onClick={shareMeeting} className={"share"}>{"whenmeet.io/" + meetingData.code}</span>
                </h6>
                <div style={{ opacity: copied ? "1" : "0", marginTop: "1rem", paddingBottom: "1rem", fontWeight: "bold", fontStyle: "italic" }}>Link Copied!</div>
            </div>
        )
    }

    return (
        <div className="wrapper">
            <div className="background">
                <Background />
            </div>
            <div className="header-container">
                <div className = "title-container">
                    <h1 >{meetingData.name}</h1>
                    <h2 >{meetingData.description}</h2>
                    <Share />
                </div>
                <div className="sign-form">
                    <SignInSignOut />
                </div>
                {meetingData.surveyUsing === "Dates" && <div>
                    <span style={{ paddingRight: "1rem" }}>Your timezone:</span>
                    <Form.Control as="select" style={{ maxWidth: "20rem", display: "inline" }} name="timezone" defaultValue={timezone} onChange={handleTimezone}>
                        {Moment.tz.names().map(tz => <option >{tz}</option>)}
                    </Form.Control>
                </div>}
            </div>
            {<AvailabilityTable meetingData={meetingData} userData={userData} setUserData={setUserData} getMeeting={getMeeting} />}
            <a style={{ color: "var(--highlight)", paddingTop: "1.5rem", width: "10rem", margin: "auto" }} href="/">Create Your Own</a>
        </div>
    )
}