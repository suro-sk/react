import React from "react";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";

export default function Header(props) {
    return (
        <Navbar bg="dark" variant="dark" className="mb-5">
            <NavLink to="/" className="navbar-brand">ToDo List</NavLink>
            <Nav className="ml-auto">
                <NavLink
                    to="/counter"
                    className="nav-link"
                    activeClassName="active"
                >Counter</NavLink>
                <NavLink
                    to="/about-us"
                    className="nav-link"
                    activeClassName="active"
                >About Us</NavLink>
                <NavLink
                    to="/contact-us"
                    activeClassName="active"
                    className="nav-link">Contact Us</NavLink>
            </Nav>
        </Navbar>
    )
}