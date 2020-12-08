import React from 'react'

import './styles.css'

function TimeTable({ values }) {

    function TimeTableCell({time, count}) {
        return (
            <tr>
                <th className="table-time-cell">{time}</th>
            </tr>
        )
    }

    console.log("generating timetable", values)
    let timeTable = []

    values.forEach((value, i) => {
        timeTable.push(<TimeTableCell time={value} count = {i} />)
    })
    
    return (
        <table className="table-time">
            <tbody>
                <tr >
                    <th className="table-time-cell" style={{ lineHeight: "4rem", height: "0.75rem", width: "120px" }}></th>
                </tr>
                {timeTable}
            </tbody>
        </table>
    )
}

function areEqual(prevProps, nextProps) {
    return prevProps.values[0] === nextProps.values[0]
}
const MemoizedTimeTable = React.memo(TimeTable, areEqual)
export default MemoizedTimeTable