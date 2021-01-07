import React from 'react'
import './styles.css'
export default function StaticPage({ header, body }) {
    return (
        <div className="static-wrapper">
            <h1>{header}</h1>
            <div className="main-container">
                <div className="body-wrapper">{body}</div>
            </div>
        </div>
    )
}