import React from 'react'

export default function SignoutForm({userData, setUserData, getMeeting, meetingId }) {

    function signout() {
        console.log("signing out")
        getMeeting()
        setUserData(null)
    }

    function deleteResponse() {
        console.log("deleting response")
        let data = {
            name: userData.name,
            password: userData.password === "" ? null : userData.password,
        }
        console.log("sending delete request with: ", data)
        fetch('/api/people/' + meetingId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                console.log('raw server login response: ', res, (Math.floor(res.status / 100)))
                return Math.floor(res.status / 100) != 2 ? null : res
            })
            .then(data => {
                if (data === null) {
                    console.log("Internal error occurred. Please try again later.")
                    return false
                }
                else {
                    console.log(data.status, data.statusText, data.value)
                    return true
                }
            })
            .then(success => {
                if(success) signout()
            })
    }

    return (
        <div className = "sign-form">
            <p>Signed in as <span style = {{fontWeight: "bold"}}>{userData.name}</span></p>
            <button value="signout" onClick={signout} >sign out</button>
            <button value="delete" onClick={deleteResponse} >delete response</button>
        </div>
    )
}