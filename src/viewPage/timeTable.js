import React from 'react'
import Moment from 'moment-timezone'

import './styles.css'

function TimeTable({ startingMoment, numTimeslots, surveyUsing }) {

    function TimeTableCell({time, count, style = {} }) {
        return (
            <tr key = {count}>
                <th className="time-table-cell" style={style}>{time}</th>
            </tr>
        )
    }

    console.log("generating timetable", startingMoment, numTimeslots)
        let timeTable = [], last = numTimeslots-1, hoursMoment = Moment(startingMoment, "h")
        for (let time = 0; time < numTimeslots; time++) {

            if (time === last) {
                timeTable.push(<TimeTableCell count = {time + 1} time=""/>)
            }
    
            if (time % 4 === 0 || time === last) {
                let currentTime = hoursMoment.format("h:mm A")
                //console.log("sending time: ", currentTime)
                timeTable.push(<TimeTableCell time={currentTime} count = {time} style={{borderTop: "3px solid white",fontSize:"0.7rem", lineHeight: "1.5rem"}}/>)
                hoursMoment.add(1, 'hours')
            }
            else {
                timeTable.push(<TimeTableCell count = {time} time=""/>)
            }
        }
    
    return (
        <table className="time-table">
            <tbody>
                <tr key = "s" >
                    <th key = "s" className="time-table-cell" style={{ lineHeight: "4rem", height: surveyUsing === "Dates" ? "3.75rem" : "2.25rem", width: "120px" }}></th>
                </tr >
                {timeTable}
            </tbody>
        </table>
    )
}

function areEqual(prevProps, nextProps) {
    return prevProps.startingMoment === nextProps.startingMoment
}
const MemoizedTimeTable = React.memo(TimeTable, areEqual)
export default MemoizedTimeTable