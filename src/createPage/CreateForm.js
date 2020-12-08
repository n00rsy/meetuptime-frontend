import React, { useState } from "react"
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom"
import Moment from 'moment-timezone'

import Calendar from './calendar'
import Week from './week'

let timezones = Moment.tz.names()

export default function CreateForm() {

    const [showCal, setShowCal] = useState(true)
    const [selectedDates, setselectedDates] = useState([])
    const [selectedDays, setSelectedDays] = useState([])

    const { register, errors, handleSubmit } = useForm({
        defaultValues: {
            timezone: Moment.tz.guess(),
            startTime: "9",
            endTime: "17",
            surveyUsing: "Dates"
        }
    })

    let history = useHistory()

    function processDates(dates, starttime, timezone) {
        let processedDates = []
        dates.forEach(date => {
            let utcDate = Moment(date).tz(timezone)
            utcDate.set({hour:starttime})
            processedDates.push(utcDate.toISOString())
        })
        return processedDates
    }

    const onSubmit = function (data) {
        data.startTime = parseInt(data.startTime)
        data.endTime = parseInt(data.endTime)
        console.log(data)
        if(data.startTime >= data.endTime) {
            alert("Start time must be before end time!")
        }

        else if (data.surveyUsing === "Dates") {
            if (selectedDates.length === 0) {
                // handle empty days
                alert("Please select at least one date.")
            }
            else if (selectedDates.length > 7) {
                alert("You may only selct up to 7 dates.")
            }
            else {
                data.dates = processDates(selectedDates, data.startTime, data.timezone)
                data.days = []
                sendMeeting(data)
            }
        }
        else {
            if (selectedDays.length === 0) {
                // handle empty days
                alert("Please select at least one day.")
            }
            else {
                data.days = selectedDays
                data.dates = []
                sendMeeting(data)
            }
        }
    }

    const onChange = function (data) {
        if (data.target.value === "Dates") {
            setShowCal(true)
        }
        else {
            setShowCal(false)
        }
    }

    function sendMeeting(meeting) {
        console.log("sending post request with: ", meeting)
        fetch('/api/meetings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meeting)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                history.push("/" + data.code);
            })
    }

    function buildOption(x) {
        return <option >{x}</option>
    }
    function TimeSelector() {
        if (showCal) return <Calendar selectedDates={selectedDates} setselectedDates={setselectedDates} />
        return <Week selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
    }
    console.log(errors)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Event Name" name="name" ref={register({ required: true, minLength:1, maxLength: 100 })} />
            <input type="text" placeholder="Description (optional)" name="description" ref={register({ maxLength: 200 })} />

            <div onChange={onChange}>
                <input name="surveyUsing" type="radio" value="Dates" ref={register({ required: true })} /> Dates
            <input name="surveyUsing" type="radio" value="Days" ref={register({ required: true })} />Days
              </div>

            <TimeSelector />

            <select name="timezone" ref={register({ required: true })}>{timezones.map(buildOption)}</select>
            <select name="startTime" ref={register({ required: true })}>
                <option value="0">midnight</option>
                <option value="1"> 1 am</option>
                <option value="2"> 2 am</option>
                <option value="3"> 3 am</option>
                <option value="4"> 4 am</option>
                <option value="5"> 5 am</option>
                <option value="6"> 6 am</option>
                <option value="7"> 7 am</option>
                <option value="8"> 8 am</option>
                <option value="9"> 9 am</option>
                <option value="10"> 10 am</option>
                <option value="11"> 11 am</option>
                <option value="12"> noon</option>
                <option value="13"> 1 pm</option>
                <option value="14"> 2 pm</option>
                <option value="15"> 3 pm</option>
                <option value="16"> 4 pm</option>
                <option value="17"> 5 pm</option>
                <option value="18"> 6 pm</option>
                <option value="19"> 7 pm</option>
                <option value="20"> 8 pm</option>
                <option value="21"> 9 pm</option>
                <option value="22"> 10 pm</option>
                <option value="23"> 11 pm</option>
                <option value="0"> midnight</option>
            </select>
            <select name="endTime" ref={register({ required: true })}>
                <option value="0">midnight</option>
                <option value="1"> 1 am</option>
                <option value="2"> 2 am</option>
                <option value="3"> 3 am</option>
                <option value="4"> 4 am</option>
                <option value="5"> 5 am</option>
                <option value="6"> 6 am</option>
                <option value="7"> 7 am</option>
                <option value="8"> 8 am</option>
                <option value="9"> 9 am</option>
                <option value="10"> 10 am</option>
                <option value="11"> 11 am</option>
                <option value="12"> noon</option>
                <option value="13"> 1 pm</option>
                <option value="14"> 2 pm</option>
                <option value="15"> 3 pm</option>
                <option value="16"> 4 pm</option>
                <option value="17"> 5 pm</option>
                <option value="18"> 6 pm</option>
                <option value="19"> 7 pm</option>
                <option value="20"> 8 pm</option>
                <option value="21"> 9 pm</option>
                <option value="22"> 10 pm</option>
                <option value="23"> 11 pm</option>
                <option value="0"> midnight</option>
            </select>

            <input type="submit" value="Create Event" />
        </form>
    );
}

