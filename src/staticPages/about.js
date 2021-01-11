import React, {useEffect} from 'react'
import StaticPage from './staticPage'

export default function About() {

    useEffect(() => {
        document.getElementsByClassName('app-wrapper')[0].style.backgroundColor = 'white'
    }, [])

    function Body() {
        return(
            <div>
                <p className = "header" style = {{textAlign:"center"}}>Everyone’s busy nowadays. 💼</p>
                <p className = "header_p">PlanPoll is a tool for you to make polls to figure out the best time for meetings to happen.🤝</p>
                <p>I’m Noor, founder and builder of PlanPoll. I’m a current junior at Rutgers University studying CS. I built this app to help schedule club meetings at my school. I’m always looking for ways to improve PlanPoll - please let me know what you think on the <a href="https://docs.google.com/forms/d/e/1FAIpQLScVYq6mIZ4e7V7uCpYZtcBd3OEpeCYMXVRI3cDlJcBs8UtYVg/viewform?usp=sf_link" target="_blank" rel="noreferrer">feedback form</a>.</p>
                <p>PlanPoll is <span style = {{fontWeight:"bold"}}>free</span> and can be used by <span style = {{fontWeight:"bold"}}>anyone, anywhere</span>. Ads help cover our running costs.</p>
                <p>To get in touch, check out my <a href="https://n00rsy.com/">personal website.</a></p>
                <p>By the way, this project is completely open source. Check out the code on <a href = "https://github.com/n00rsy/planpoll-frontend">Github</a>.</p>

            </div>
        )
    }

    return (
        <StaticPage header = "About" body = {Body()} />
    )
}