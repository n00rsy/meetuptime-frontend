import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'

export default function NavigationBar() {

    return (
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">meetuptime</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto" activeKey={window.location.pathname}>
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link  href="/howto">How to</Nav.Link>
      <Nav.Link  href="/about">About</Nav.Link>
      <Nav.Link  href="/faq">FAQ</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )

}