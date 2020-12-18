import React from 'react'
import {isMobile} from'react-device-detect'

export function ViewBackground() {
    if (isMobile) {
        return (
            <div style={{ height: "60vh", width: "100%", backgroundColor: "#d1a7a7", overflow: "hidden" }} />
        )
    }
    return (
        <div style={{ height: "100vh", width: "100%", overflow: "hidden" }} >
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
                <path d="M-8.17,51.80 C158.29,85.36 344.52,28.13 529.06,67.59 L500.00,0.00 L0.00,0.00 Z" style={{ stroke: "none", fill: "#d1a7a7" }}>
                </path>
            </svg>
        </div>
    )
}
export function CreateBackground() {
    if (isMobile) {
      return (
        <div style={{ height: "65vh", width: "100%", backgroundColor: "white", overflow: "hidden" }} />
      )
    }

    console.log("returning background")
    return (
        <svg viewBox="0 0 500 150" preserveAspectRatio="xMidYMid slice" style={{ height: "200%", width: "100%" }}>
          <path d="M-33.07,4.25 C171.78,273.65 396.39,-137.85 604.06,176.94 L500.00,0.00 L0.00,0.00 Z" style={{ stroke: "none", fill: "white" }}>
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
        default:
            return (
                <div className="background">
                    <ViewBackground />
                </div>
            )
    }
}