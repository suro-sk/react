import React from "react";
import {Navbar, Nav, Button} from "react-bootstrap";
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import {signOut} from "./store/actions";

function Header({isUserLoggedIn, signOut, user}) {

    function signOutHandler() {
        const tokens = localStorage.getItem('tokens');
        const jwt = JSON.parse(tokens).jwt
        signOut({jwt})
    }

    return (
        <header className="mb-5">
            <Navbar bg="dark" variant="dark" expand="md">
                <NavLink to="/" className="navbar-brand">ToDo List</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink
                            to="/about-us"
                            className="nav-link"
                            activeClassName="active"
                        >About Us</NavLink>
                        <NavLink
                            to="/contact-us"
                            activeClassName="active"
                            className="nav-link">Contact Us</NavLink>
                        {
                            !isUserLoggedIn &&
                            <>
                                <NavLink
                                    to="/sign-up"
                                    activeClassName="active"
                                    className="nav-link">Sign Up</NavLink>
                                <NavLink
                                    to="/sign-in"
                                    activeClassName="active"
                                    className="nav-link">Sign In</NavLink>
                            </>
                        }
                        {
                            user &&
                            <Navbar.Text className="ml-5">
                                Signed in as: <span className="text-light">{user}</span>
                            </Navbar.Text>
                        }
                        {
                            isUserLoggedIn && user &&
                            <Button className="ml-4" onClick={signOutHandler}>Sign Out</Button>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.isUserLoggedIn,
        user: state.user,
    };
};

const mapDispatchToProps = {
    signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);