import React from 'react'

export default function SignoutForm({ meetingData, setMeetingData, userData, setUserData }) {

    function signout() {
        console.log("signing out")
    }

    function deleteResponse() {
        console.log("deleting response")
    }

    return (
        <div>
            <p>Signed in as {userData.name}</p>
            <button value="signout" onClick={signout} >sign out</button>
            <button value="delete" onClick={deleteResponse} >delete response</button>
        </div>
    )
}