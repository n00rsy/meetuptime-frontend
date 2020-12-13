import React from 'react'
import '../index.css'
export default function Footer() {
    return (
        <div className = "footer">
            <p className = "footer-p">Like meetuptime? Hit us with a FAT Donation</p>
            <button className = "button-secondary">Donate</button>
            <p className = "footer-p" >Think we can do better? <a style = {{color: "#5BC0BE"}} href="http://google.com/" target="_blank">Submit feedback</a></p>
        </div>
    )
}