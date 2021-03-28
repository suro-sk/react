import React from "react";
import {Navbar} from "react-bootstrap";
import linkedinIco from '../assets/linkedin.svg'
import githubIco from '../assets/github.svg'

export default function Footer() {
    return (
        <footer className="mt-5">
            <Navbar bg="dark" variant="dark" className="justify-content-center">
                <Navbar.Brand className="m-0">Find me on:</Navbar.Brand>
            </Navbar>
            <Navbar bg="dark" className="justify-content-center">
                <a className="m-2" href="https://www.linkedin.com/in/suro-kostanyan-58a48818b/" target="_blank"
                   rel="noreferrer">
                    <img src={linkedinIco} alt="linkedin"/>
                </a>
                <a className="m-2" href="https://github.com/suro-sk" target="_blank" rel="noreferrer">
                    <img src={githubIco} alt="github"/>
                </a>
            </Navbar>
        </footer>
    )
}