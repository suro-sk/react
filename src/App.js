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
import {
    Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Footer from "./components/Footer";
import {connect} from 'react-redux';
import Loader from "./components/Loader/Loader";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {history} from './history';
import {getUser} from "./components/store/actions";

function App({loading, successMsg, errorMsg, isUserLoggedIn, getUser}) {
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

    useEffect(()=>{
        isUserLoggedIn && getUser()
    },[isUserLoggedIn, getUser]);

    return (
        <div className="App">
            <Router history={history}>
                <Header/>
                <div className="container page-holder">
                    <Switch>
                        <AuthRoute
                            path="/"
                            exact
                            component={TodoList}
                            isPrivate
                        />
                        <AuthRoute
                            path="/task/:id"
                            exact
                            component={SingleTask}
                            isPrivate
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
                        <AuthRoute
                            path="/sign-up"
                            exact
                            component={Signup}
                        />
                        <AuthRoute
                            path="/sign-in"
                            exact
                            component={Signin}
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
        errorMsg: state.errorMsg,
        isUserLoggedIn: state.isUserLoggedIn
    };
};

const mapDispatchToProps = {
    getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);