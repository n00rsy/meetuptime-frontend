import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import SigninForm from './signinForm'

export default function ViewPage() {

    const [meetingData, setMeetingData] = useState(null)
    const [signedIn, setSignedIn] = useState(false)
    const [fetchErr, setFetchErr] = useState(false)

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
                    console.log(res)
                    return res.status === 404 ? null : res.json()
                })
                .then(data => {
                    if(data == null) {
                        setFetchErr(true)
                    }
                    else {
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
            <SigninForm signedIn={signedIn} setSignedIn={setSignedIn}/>
        </div>
    )

}