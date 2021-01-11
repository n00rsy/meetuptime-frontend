import React, { useEffect } from 'react'
import StaticPage from './staticPage'

export default function Faq() {

    useEffect(() => {
        document.getElementsByClassName('app-wrapper')[0].style.backgroundColor = 'white'
    }, [])

    function Body() {
        return (
            <div>
                <p className = "header" style = {{textAlign:"center"}}> Got questions? We have answers.</p>
                <p style={{ fontWeight: "bold" }}>1. How long are meeting links active?</p>
                <p>Meetings using days of the week are active for 30 days, while meetings using specific dates are active until 1 week after their end date.</p>
                <p style={{ fontWeight: "bold" }}>2. Is there a limit to how many people can respond to my poll?</p>
                <p>Currently, polls are limited to 99 respondents.</p>
                <p style={{ fontWeight: "bold" }}>3. Why can’t I set a timezone for a meeting using days of the week?</p>
                <p>Because of daylight savings time, it is actually impossible to convert between different time zones given an arbitrary date.</p>
            </div>
        )
    }

    return (
        <StaticPage header="FAQ" body={Body()} />
    )
}