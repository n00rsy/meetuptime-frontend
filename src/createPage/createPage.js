import React from 'react';
import CreateForm from './createForm'
import './styles.css'
import { isMobile } from "react-device-detect";
/*
OLD BACKGROUND CODE: 
<div class="background">
        <div style={{ height: "100vh", width: "100%", overflow: "hidden" }} >
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
            <path d="M-50.56,98.98 C148.08,25.95 336.57,90.09 527.88,43.71 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: "none", fill: "#d1a7a7" }}>
            </path>
          </svg>
        </div>
      </div>

      MOBILE: 
      <div style={{ height: "65vh", width: "100%", marginTop: "35vh", backgroundColor: "#d1a7a7", overflow: "hidden" }} >
          
        </div>
*/

function Background() {
  if (isMobile) {
    return (
      <div style={{ height: "65vh", width: "100%", marginTop: "35vh", backgroundColor: "#d1a7a7", overflow: "hidden" }} />
    )
  }
  return (
    <div style={{ height: "100vh", width: "100%", overflow: "hidden" }} >
      <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
        <path d="M-50.56,98.98 C148.08,25.95 336.57,90.09 527.88,43.71 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: "none", fill: "#d1a7a7" }}>
        </path>
      </svg>
    </div>
  )
}

export default function CreatePage() {
  return (

    <div className="create-form-container">
      <div className="background">
        <Background />
      </div>
      <CreateForm></CreateForm>
    </div>
  );
}