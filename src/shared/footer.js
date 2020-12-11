import React from 'react'
import '../index.css'
export default function Footer() {
    return (
        <div className = "footer">
            <p>Like meetuptime? Hit us with a FAT Donation</p>
            <button>Donate</button>
            <p>Think we can do better? <a style = {{color: "#5BC0BE"}} href="http://google.com/" target="_blank">Submit feedback</a></p>
        </div>
    )
}