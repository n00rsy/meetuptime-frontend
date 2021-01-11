import React, {useEffect} from 'react'
import StaticPage from './staticPage'

export default function HowTo() {

    useEffect(() => {
        document.getElementsByClassName('app-wrapper')[0].style.backgroundColor = 'white'
    }, [])

    function Body() {
        return(
            <div>
                <p className = "header_p">PlanPoll is a tool for you to make polls to figure out the best time for meetings to happen.🤝</p>
                <h2 className = "header">1. Create 🏗️</h2>
                <p>Head over to the PlanPoll <a href = "/">homepage</a>, where you can create a new event poll. After creating an event, you’ll be given a unique link to your poll that you can share with your group.</p>
                <h2 className = "header">2. Poll ✏️</h2>
                <p>Share your link with event attendees! Anyone with the link can sign in and fill out a response.</p>
                <h2 className = "header">3. Meet 📅</h2>
                <p>After everyone’s filled out the poll, simply check the time table to see everyone’s availability. The darker the color, the more people available!</p>
                <p className = "header_p">That's it! We hope you enjoy making polls with PlanPoll! 🚀</p>
                
            </div>
        )
    }

    return (
        <StaticPage header = "How To" body = {Body()} />
    )
}