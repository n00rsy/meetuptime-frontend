import React from 'react'
import '../index.css'
export default function Footer() {
    return (
        <div className = "footer">
            <p className = "footer-p">Like PlanPoll? Hit us with a donation!</p>
            <button className = "button-secondary">Donate</button>
            <p className = "footer-p" >Think we can do better? <a style = {{color: "#5BC0BE"}} href="https://docs.google.com/forms/d/e/1FAIpQLScVYq6mIZ4e7V7uCpYZtcBd3OEpeCYMXVRI3cDlJcBs8UtYVg/viewform?usp=sf_link" target="_blank" rel="noreferrer">Submit feedback</a></p>
        </div>
    )
}