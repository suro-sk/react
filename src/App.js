import React from "react";
import TodoList from "./components/pages/TodoList/TodoList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Header from "./components/Header";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import NotFound from "./components/pages/NotFound/NotFound";
import SingleTask from "./components/pages/SingleTask/SingleTask";
import Counter from "./components/pages/Counter/Counter";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Footer from "./components/Footer";
import {connect} from 'react-redux';
import Loader from "./components/Loader/Loader";

function App(props) {
    return (
        <div className="App">
            <Router>
                <Header/>
                <div className="container page-holder">
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={TodoList}
                        />
                        <Route
                            path="/task/:id"
                            exact
                            component={SingleTask}
                        />
                        <Route
                            path="/about-us"
                            exact
                            component={About}
                        />
                        <Route
                            path="/contact-us"
                            exact
                            component={Contact}
                        />
                        <Route
                            path="/counter"
                            exact
                            component={Counter}
                        />
                        <Route
                            path="/not-found"
                            exact
                            component={NotFound}
                        />

                        <Redirect to="/not-found"/>
                    </Switch>
                </div>
                <Footer/>
            </Router>
            {props.loading && <Loader/>}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        successMsg: state.successMsg,
        errorMsg: state.errorMsg
    };
};

export default connect(mapStateToProps)(App);