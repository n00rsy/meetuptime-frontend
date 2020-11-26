import React, { useState, useEffect  } from "react";
import { useForm } from 'react-hook-form';
import Moment from 'moment-timezone';
import Calendar from './calendar'
import Week from './week'

export default function CreateForm() {

    const [showCal, setShowCal] = useState(true)
      const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            Timezone: Moment.tz.guess(),
            From: "9",
            To: "17",
            SurveyUsing: "Dates"
        }
    });
    const onSubmit = function(data) {
        console.log(data);
    } 

    const onChange = function(data) {
        if(data.target.value === "Dates") {
            setShowCal(true)
        }
        else {
            setShowCal(false)
        }
    }



    let timezones = Moment.tz.names()

    function buildOption (x) {
        return <option >{x}</option>
    }

    function TimeSelector() {
        if(showCal) return <Calendar/>
        return <Week/>
    }

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="text" placeholder="Event Name" name="Event Name" ref={register({required: true, maxLength: 100})}/>
              <input type="text" placeholder="Description (optional)" name="Description (optional)" ref={register({maxLength: 100})}/>

              <div onChange = {onChange}> 
              <input name="SurveyUsing" type="radio" value="Dates" ref={register({ required: true })}/> Dates
            <input name="SurveyUsing" type="radio" value="Days" ref={register({ required: true })} />Days
              </div>
              
              <TimeSelector/>

          <select name="Timezone" ref={register({ required: true })}>{timezones.map(buildOption)}</select>
              <select name="From" ref={register({ required: true })}>
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
              <select name="To" ref={register({ required: true })}>
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

