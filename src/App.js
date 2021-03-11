import React, {useEffect} from "react";
import TodoList from "./components/pages/TodoList/TodoList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Header from "./components/Header";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import NotFound from "./components/pages/NotFound/NotFound";
import SingleTask from "./components/pages/SingleTask/SingleTask";
import Signup from "./components/pages/Signup/Signup";
import Signin from "./components/pages/Signin/Signin";
import Counter from "./components/pages/Counter/Counter";
import {
    Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Footer from "./components/Footer";
import {connect} from 'react-redux';
import Loader from "./components/Loader/Loader";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {history} from './history';

function App({loading, successMsg, errorMsg}) {
    useEffect(() => {
        if (successMsg) {
            toast.success(successMsg, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }

        if (errorMsg) {
            toast.error(errorMsg, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }

    }, [successMsg, errorMsg]);

    return (
        <div className="App">
            <Router history={history}>
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
                            path="/sign-up"
                            exact
                            component={Signup}
                        />
                        <Route
                            path="/sign-in"
                            exact
                            component={Signin}
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
            {loading && <Loader/>}
            <ToastContainer/>
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