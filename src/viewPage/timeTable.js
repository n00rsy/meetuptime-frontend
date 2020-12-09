import React from 'react'
import Moment from 'moment-timezone'

import './styles.css'

function TimeTable({ startingMoment, numTimeslots, surveyUsing }) {

    function TimeTableCell({time, count, style={} }) {
        return (
            <tr>
                <th className="time-table-cell" style={style}>{time}</th>
            </tr>
        )
    }

    console.log("generating timetable", startingMoment, numTimeslots)
        let timeTable = [], last = numTimeslots-1, hoursMoment = Moment(startingMoment, "h")
        for (let time = 0; time < numTimeslots; time++) {

            if (time === last) {
                timeTable.push(<TimeTableCell time=""/>)
            }
    
            if (time % 4 === 0 || time === last) {
                let currentTime = hoursMoment.format("h:mm A")
                //console.log("sending time: ", currentTime)
                timeTable.push(<TimeTableCell time={currentTime} style={{borderTop: "2px solid white", fontSize:"0.7rem"}}/>)
                hoursMoment.add(1, 'hours')
            }
            else {
                timeTable.push(<TimeTableCell time=""/>)
            }
        }
    
    return (
        <table className="time-table">
            <tbody>
                <tr >
                    <th className="time-table-cell" style={{ lineHeight: "4rem", height: surveyUsing === "Dates" ? "3.25rem" : "2rem", width: "120px" }}></th>
                </tr>
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