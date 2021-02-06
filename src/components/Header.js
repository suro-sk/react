import React from "react";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";

export default function Header(props) {
    return (
        <Navbar bg="dark" variant="dark" className="mb-5">
            <Link to="/" className="navbar-brand">ToDo List</Link>
            <Nav className="ml-auto">
                <Link to="/about-us" className="nav-link">About Us</Link>
                <Link to="/contact-us" className="nav-link">Contact Us</Link>
            </Nav>
        </Navbar>
    )
}