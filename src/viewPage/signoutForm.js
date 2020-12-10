import React from 'react'

export default function SignoutForm({userData, setUserData, getMeeting }) {

    function signout() {
        console.log("signing out")
        getMeeting()
        setUserData(null)
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