import React, { useState, useEffect } from "react"
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
    const [daySelectionError, setDaySelectionError] = useState(null)
    const [loading, setLoading] = useState(false)

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
            utcDate.set({ hour: starttime })
            processedDates.push(utcDate.toISOString())
        })
        return processedDates
    }

    const onSubmit = function (data) {

        console.log(data)
        let validDaysSelection = validateDaySelections(data.surveyUsing)
        if (data.surveyUsing === "Dates" && validDaysSelection) {
            data.dates = processDates(selectedDates, data.startTime, data.timezone)
            data.days = []
            console.log("sending data!!!!")
            //sendMeeting(data)
        }
        else if (data.surveyUsing === "Days" && validDaysSelection) {
            data.days = selectedDays
            data.dates = []
            console.log("sending data!!!!")
            //sendMeeting(data)
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
        setLoading(true)
        fetch('/api/meetings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meeting)
        })
            .then(res => {
                setLoading(false)
                res.json()
            })
            .then(data => {
                console.log(data);
                history.push("/" + data.code);
            })

    }

    useEffect(() => {
        if (daySelectionError) setDaySelectionError(null)
    }, [selectedDates, selectedDays])

    function TimeSelector() {
        if (showCal) return <Calendar selectedDates={selectedDates} setselectedDates={setselectedDates} />
        return <Week selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
    }

    const validateTimeSelections = () => {
        let startTime = parseInt(document.getElementsByName("startTime")[0].value)
        let endTime = parseInt(document.getElementsByName("endTime")[0].value)
        return endTime > startTime
    }

    const validateDaySelections = (surveyUsing) => {
        if (surveyUsing === "Dates") {
            if (selectedDates.length === 0) {
                setDaySelectionError("Please select at least one date.")
                return false
            }
            else if (selectedDates.length > 7) {
                setDaySelectionError("You may only selct up to 7 dates.")
                return false
            }
            else {
                return true
            }
        }
        else {
            if (selectedDays.length === 0) {
                setDaySelectionError("Please select at least one day.")
                return false
            }
            else {
                return true
            }
        }
    }

    console.log(errors)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Event Name" name="name" ref={register({
                required: {
                    value: true,
                    message: "You must enter an event name"
                }, minLength: {
                    value: 1,
                    message: "Event name must be between 1-100 characters long"
                }, maxLength: {
                    value: 100,
                    message: "Event name must be between 1-100 characters long"
                }
            })} />
            {errors.name &&
                <div className="error">{errors.name.message}</div>}
            <input type="text" placeholder="Description (optional)" name="description" ref={register({
                maxLength: {
                    value: 200,
                    message: "Event description must be less than 200 characters long"
                }
            })} />
            {errors.description &&
                <div className="error">{errors.description.message}</div>}
            <div onChange={onChange}>
                <input name="surveyUsing" type="radio" value="Dates" ref={register({ required: true })} /> Dates
            <input name="surveyUsing" type="radio" value="Days" ref={register({ required: true })} />Days
              </div>

            <TimeSelector />
            {daySelectionError && <div>{daySelectionError}</div>}

            {showCal && <select name="timezone" ref={register({ required: true })}>{timezones.map(tz => <option >{tz}</option>)}</select>}

            <select name="startTime" ref={register({
                required: true,
                validate: validateTimeSelections,
            })}>
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
            <select name="endTime" ref={register({
                required: true,
                validate: validateTimeSelections,
            })}>

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
            {
                ((errors.endTime && errors.endTime.type === "validate") ||
                    errors.startTime && errors.startTime.type === "validate") &&
                <div className="error">Start time must be before end time!</div>

            }
            <input type="submit" value={loading ? "CREATING EVENT!!!" : "Create Event"} />
        </form>
    );
}

