import TodoList from "./components/pages/TodoList/TodoList";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from 'react-bootstrap';
import './App.scss';
import Header from "./components/Header";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import NotFound from "./components/pages/NotFound/NotFound";
import SingleTask from "./components/pages/SingleTask/SingleTask";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
import Footer from "./components/Footer";
import React from "react";

function App() {
    return (
        <div className="App">
            <Router>
                <Header>
                    <Link to="/" className="navbar-brand">ToDo List</Link>
                    <Nav className="ml-auto">
                        <Link to="/about-us" className="nav-link">About Us</Link>
                        <Link to="/contact-us" className="nav-link">Contact Us</Link>
                    </Nav>
                </Header>
                <div className="container page-holder">
                    <Switch>
                        <Route
                            path="/"
                            exact>
                            <TodoList/>
                        </Route>
                        <Route
                            path="/task/:id"
                            exact>
                            <SingleTask/>
                        </Route>
                        <Route
                            path="/about-us"
                            exact>
                            <About/>
                        </Route>
                        <Route
                            path="/contact-us"
                            exact>
                            <Contact/>
                        </Route>
                        <Route
                            path="/not-found"
                            exact>
                            <NotFound/>
                        </Route>

                        <Redirect to="/not-found"/>
                    </Switch>
                </div>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
