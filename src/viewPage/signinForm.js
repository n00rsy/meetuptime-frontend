import React from 'react'
import { useForm } from 'react-hook-form';
import { convert1dTo2dArray, subtract2dArrays, map2dArray } from './utils'

export default function SigninForm({ meetingData, setMeetingData, setUserData }) {

    const { register, errors, handleSubmit } = useForm()

    function onSubmit(userInfo) {

        let data = {
            name: userInfo.username,
            password: userInfo.password === "" ? null : userInfo.password,
        }

        fetch('/api/people/' + meetingData.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                console.log('raw server login response: ', res)
                return res.status / 100 != 2 ? res : res.json()
            })
            .then(data => {
                console.log("processed login data", data)
                if (data == null) console.log("null res")
                else if (data.status !== undefined || data.value !== undefined) {
                    console.log(data.status, data.statusText, data.value)
                }
                else {
                    data.available = convert1dTo2dArray(data.available, meetingData.numTimeslots, meetingData.numDays)
                    let newAvailableCount = subtract2dArrays([...meetingData.availableCount], data.available)
                    let numRespondents = meetingData.numRespondents + 1
                    meetingData.people.forEach(person => {
                        if (data.name === person.name) {
                            numRespondents--
                        }
                    })
                    console.log("created new person?", numRespondents - meetingData.numRespondents)
                    setMeetingData({
                        ...meetingData,
                        availableCount: newAvailableCount,
                        colors: map2dArray(newAvailableCount, numRespondents),
                        numRespondents: numRespondents
                    })
                    setUserData(data)
                }
            })
    }

    console.log(errors)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p style = {{width: "25rem"}}>New to this event? Make up a name and password. Returning? Use the same name/ password.</p>
            <input type="text" placeholder="Name" name="username" ref={register({ 
                required: {
                    value: true,
                    message: "Please enter a name to sign in."
                }, 
                minLength: {
                    value: 1,
                    message: "Name must be between 1-20 characters long."
                },
                maxLength: {
                    value: 20,
                    message: "Name must be between 1-20 characters long." } })} />
                <div className="error">{(errors.username && errors.username.message) ? errors.username.message : ""}</div>
            <input type="password" placeholder="Password (optional)" name="password" ref={register({ 
                required:false, 
                maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters long." } })} />
                    <div className="error">{(errors.password && errors.password.message) ? errors.password.message : ""}</div>
            <input type="submit" value="Login" className = "button-sign" />
        </form>
    )
}
