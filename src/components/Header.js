import React from "react";
import Navbar from "react-bootstrap/Navbar";

export default function Header(props) {
    return (
        <Navbar bg="dark" variant="dark" className="mb-5">
            {props.children}
        </Navbar>
    )
}