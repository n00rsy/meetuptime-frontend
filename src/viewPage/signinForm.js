import React from 'react'
import { useForm } from 'react-hook-form';

export default function SigninForm({ signedIn, setSignedIn, meetingData }) {

    const { register, handleSubmit } = useForm()

    function onSubmit(userInfo) {

        let count = Math.max(meetingData.days.length, meetingData.dates.length)
        let hours = meetingData.endTime - meetingData.startTime
        let available = '0'.repeat(count * hours * 4)
        console.log(available)
        let data = {
            name: userInfo.username,
            password: userInfo.password === "" ? null : userInfo.password,
            available: available
        }

        fetch('/api/people/' + meetingData.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log('raw server response: ', res)
            return res.status === 404 ? res : res.json()
        })
        .then(data => {
            console.log("processed data", data)
            if(data == null) console.log("null res")
            else if(data.status != undefined || data.value != undefined) {
                console.log(data.status, data.statusText, data.value)
            }
            else setSignedIn(true)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="username" name="username" ref={register({required: true, minLength:1, maxLength:20})}/>
            <input type="password" placeholder="password" name="password" ref={register({required: false, maxLength:20})} />
            <input type="submit" value="Login" />
        </form>
    )
}
