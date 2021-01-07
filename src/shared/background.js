import React from 'react'
import { isMobile } from 'react-device-detect'


export function ViewBackground() {
    if (isMobile) {
        return (
            <div style={{ height: "60vh", width: "100%", backgroundColor: "var(--bg)", overflow: "hidden" }} />
        )
    }

    return (
        <svg viewBox="0 0 500 150" preserveAspectRatio="xMidYMid slice" style={{ height: "65rem", width: "100%" }}>
            <path d="M-0.84,73.52 C202.31,113.97 299.38,-15.28 514.39,112.00 L500.00,0.00 L0.00,0.00 Z" style={{ stroke: "none", fill: "var(--bg)" }}>
            </path>
        </svg>

    )
}
export function CreateBackground() {
    if (isMobile) {
        return (
            <div style={{ height: "30rem", width: "100%", backgroundColor: "white", overflow: "hidden" }} />
        )
    }
    return (
        <svg viewBox="0 0 500 150" preserveAspectRatio="xMidYMid slice" style={{ height: "40rem", width: "100%" }}>
            <path d="M-33.07,4.25 C171.78,273.65 396.39,-137.85 604.06,176.94 L500.00,0.00 L0.00,0.00 Z" style={{ stroke: "none", fill: "white" }}>
            </path>
        </svg>
    )
}

export function StaticPageBackground() {
    if (isMobile) {
        return (
            <div style={{ height: "30rem", width: "100%", backgroundColor: "var(--bg)", overflow: "hidden" }} />
        )
    }
    return (
        <svg viewBox="0 0 500 150" preserveAspectRatio="xMidYMid slice" style={{ height: "40rem", width: "100%" }}>
            <path d="M-4.79,39.95 C149.26,80.42 277.93,16.28 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" style={{ stroke: "none", fill: "var(--bg)" }}>
            </path>
        </svg>
    )
}

export default function Background({ page }) {
    switch (page) {
        case 'create':
            return (
                <div className="background">
                    <CreateBackground />
                </div>
            )
        case 'static':
            return (
                <div className="background">
                    <StaticPageBackground />
                </div>
            )
        default:
            return (
                <div className="background">
                    <ViewBackground />
                </div>
            )
    }
}